<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerFormRequest;
use App\Libs\ExceptionMessage;
use App\Mail\WorkflowAdminMail;
use App\Mail\WorkflowCustomerMail;
use App\Models\Customer\Customer;
use App\Models\Customer\CustomerOrganization;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
use App\Models\CustomerVerification\WorkflowModuleVerification;
use App\Models\User;
use App\Models\Workflow\Workflow;
use App\Services\ProcessWorkflowInfo;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerController extends Controller
{
    use ProcessWorkflowInfo;

    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/CustomerCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerFormRequest $request)
    {

        if ($request->haveCompany === true && $request->companyCountry !== 'SIERRA LEONE' && empty($request->companyPostalCode)) {
            return redirect()->back()->withErrors([
                'company_postal_code' => 'Company postal code is required.',
            ]);
        }
        DB::beginTransaction();

        try {
            $company = null;
            if ($request->haveCompany) {
                $company = CustomerOrganization::create([
                    'company_legal_entity_name' => $request->companyLegalEntityName,
                    'company_address_line_1' => $request->companyAddressLine1,
                    'company_address_line_2' => $request->companyAddressLine2,
                    'company_city' => $request->companyCity,
                    'company_country' => $request->companyCountry,
                    'company_postal_code' => $request->companyPostalCode,
                    'company_tax_id' => $request->companyTaxId,
                    'company_registration_id' => $request->companyRegistrationId,
                ]);
            }
            $customer = Customer::create([
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'telephone' => $request->telephone,
                'address_line_1' => $request->addressLine1,
                'address_line_2' => $request->addressLine2,
                'city' => $request->city,
                'country' => $request->country,
                'postal_code' => $request->postalCode,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'company_id' => $company?->id,
            ]);
            DB::commit();

            return redirect()
                ->route('customer-register-admin-email', [
                    'email' => $request->email,
                    'kadodo_id' => $customer->id,
                    'name' => $customer->first_name,
                    'phone' => $customer->telephone,
                ])
                ->with(['message' => 'Customer Created Successfully']);
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->route('sign-up.create')->with(['error' => $e->getMessage()]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updatePriceplan(Request $request)
    {
        $request->validate([
            'price_plan_id' => 'required|exists:price_plans,id',
            'customer_id' => 'required|exists:customers,id',
        ]);
        try {
            $customerPriceplan = CustomerPricePlan::create($request->all());
            $kadodoId = 'KD'.time().$customerPriceplan->id;
            $customerPriceplan->update(['kadodo_id' => $kadodoId]);
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('customer-workflow-create', ['pricePlanId' => $request->price_plan_id, 'customerPriceplanId' => $customerPriceplan->id]);
    }

    public function createCustomerWorkflow($pricePlanId, $customerPriceplanId)
    {
        return Inertia::render('Customer/CustomerWorkflowCreate', [
            'pricePlanId' => $pricePlanId,
            'customerPriceplanId' => $customerPriceplanId,
        ]);
    }

    public function customerWorkflowSave(Request $request)
    {
        DB::beginTransaction();
        $filesToCleanUp = [];

        try {
            $customerPriceplanId = $request->customerPriceplanId;

            [$infoRecords, $filesToCleanUp] = $this->process(
                $request->additionalInfo ?? [],
                'customer_workflow',
            );

            foreach ($infoRecords as &$infoRecord) {
                $infoRecord['customer_priceplan_id'] = $customerPriceplanId;
            }
            $customerDetail = CustomerPricePlan::where('id', $request->customerPriceplanId)
                ->with('customer', 'pricePlan')
                ->first();

            /** @var \App\Models\Customer\Customer|null $customer */
            $customer = $customerDetail->customer;
            /** @var \App\Models\PricePlan\PricePlan|null $pricePlan */
            $pricePlan = $customerDetail->pricePlan;

            CustomerWorkflow::insert($infoRecords);
            Mail::to(User::pluck('email')->toArray())
                ->send(new WorkflowAdminMail([
                    'type' => $pricePlan->type,
                    'email' => $customer->email,
                    'name' => $customer->first_name,
                    'phone' => $customer->telephone,
                    'date' => $customerDetail->created_at->format('Y-m-d'),
                    'time' => $customerDetail->created_at->format('H:i:s'),
                    'address' => $customer->address_line_1,
                ]));
            Mail::to($customer->email)->send(new WorkflowCustomerMail($customer->first_name));
        } catch (Exception $e) {
            DB::rollBack();
            Storage::delete($filesToCleanUp);

            return back()->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        DB::commit();

        return redirect()->route('customer-dashboard')
            ->with(['message' => 'Customer Workflow Saved Successfully']);
    }

    public function findCustomerPriceplan($customerId)
    {
        $customerPriceplan = CustomerPricePlan::where('customer_id', $customerId)
            ->with('pricePlan', 'customer', 'verificationStatus')
            ->get();

        return response()->json([
            'customerPriceplan' => $customerPriceplan,
        ]);
    }

    public function customerWorkflowShow(Request $request)
    {
        $customerPriceplan = CustomerPricePlan::where('id', $request->id)
            ->with('pricePlan', 'customer', 'verificationStatus')
            ->first();
        $customerPriceplanInfo = CustomerWorkflow::where('customer_priceplan_id', $request->id)->get();
        $CustomerPriceplanTemplate = Workflow::where('priceplan_id', $customerPriceplan->price_plan_id)
            ->where('name', 'like', '%'.'Business Verification'.'%')
            ->with('workflowModules.workflowItems')
            ->first();
        $moduleUpdateStatus = WorkflowModuleVerification::where('customer_workflow_id', $request->id)->get();

        return Inertia::render('Customer/CustomerWorkflowShow', [
            'customerPriceplan' => $customerPriceplan,
            'customerPriceplanInfo' => $customerPriceplanInfo,
            'CustomerPriceplanTemplate' => $CustomerPriceplanTemplate,
            'moduleUpdateStatus' => $moduleUpdateStatus,
        ]);
    }
}
