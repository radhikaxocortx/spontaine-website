<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerFormRequest;
use App\Libs\ExceptionMessage;
use App\Mail\AdminMailForCustomerRegister;
use App\Mail\RegisteredCustomerMail;
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
use Illuminate\Support\Facades\Auth;
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
    public function create(Request $request)
    {

        return Inertia::render('Customer/CustomerCreate', [
            'priceplan_id' => $request->priceplan_id ?? null,
        ]);

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
        session(['customer_registration_data' => $request->all()]);

        return redirect()
            ->route('customer-verification', ['customerId' => $request->email, 'verifyingEmail' => 'true']);

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

    public function createCustomer()
    {
        $data = session('customer_registration_data');

        if (! $data) {
            return redirect()->route('sign-up.create')->with('error', 'Session expired. Please try again.');
        }

        DB::beginTransaction();
        try {
            $company = null;
            if ($data['have_company']) {
                $company = CustomerOrganization::create([
                    'company_legal_entity_name' => $data['company_legal_entity_name'],
                    'company_address_line_1' => $data['company_address_line1'],
                    'company_address_line_2' => $data['company_address_line2'],
                    'company_city' => $data['company_city'],
                    'company_country' => $data['company_country'],
                    'company_postal_code' => $data['company_postal_code'],
                    'company_tax_id' => $data['company_tax_id'],
                    'company_registration_id' => $data['company_registration_id'],
                ]);
            }

            $customer = Customer::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'telephone' => $data['telephone'],
                'address_line_1' => $data['address_line1'],
                'address_line_2' => $data['address_line2'],
                'city' => $data['city'],
                'country' => $data['country'],
                'postal_code' => $data['postal_code'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'email_verified' => true,
                'company_id' => $company?->id,
            ]);
            if ($data['priceplan_id']) {
                CustomerPricePlan::create([
                    'customer_id' => $customer->id,
                    'price_plan_id' => $data['priceplan_id'],
                ]);
            }
            Mail::to(User::pluck('email')->toArray())
                ->send(new AdminMailForCustomerRegister(['email' => $data['email'], 'name' => $data['first_name'], 'phone' => $data['telephone']]));
            Mail::to($data['email'])->send(new RegisteredCustomerMail($data['email'], $data['first_name']));
            Auth::guard('customer')->login($customer);
            session()->forget('customer_registration_data');

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('sign-up.create')->with('error', 'Registration failed. Try again.');
        }
        DB::commit();

        return redirect()->route('customer-login-check')->with('message', 'Registration complete and logged in.');

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

    public function customerWorkflowUpdate(Request $request)
    {
        DB::beginTransaction();
        $filesToCleanUp = [];

        try {
            $customerPriceplanId = $request->customerPriceplanId;
            $itemIds = collect($request->additionalInfo)->pluck('workflow_item_id')->all();
            CustomerWorkflow::where('customer_priceplan_id', $customerPriceplanId)
                ->whereIn('workflow_item_id', $itemIds)
                ->delete();

            [$infoRecords, $filesToCleanUp] = $this->process(
                $request->additionalInfo ?? [],
                'customer_workflow',
            );

            foreach ($infoRecords as &$infoRecord) {
                $infoRecord['customer_priceplan_id'] = $customerPriceplanId;
            }

            CustomerWorkflow::insert($infoRecords);

        } catch (Exception $e) {
            DB::rollBack();
            Storage::delete($filesToCleanUp);

            return back()->with(['error' => ExceptionMessage::getMessage($e)]);
        }

        DB::commit();

        return back()
            ->with(['message' => 'Customer Workflow Updated Successfully']);
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

    public function customerWorkflowStatusUpdate(Request $request)
    {
        $validatedRequest = $request->validate([
            'customer_workflow_id' => ['required', 'integer', 'exists:customer_price_plans,id'],
            'module_id' => ['required', 'integer', 'exists:entity_templates,id'],
            'customer_status' => ['required', 'boolean'],
        ]);
        $updated = WorkflowModuleVerification::where('customer_workflow_id', $validatedRequest['customer_workflow_id'])
            ->where('module_id', $validatedRequest['module_id'])
            ->update(['customer_updated' => $validatedRequest['customer_status']]);

        return back()->with(['message' => 'This Module is marked as completed.']);

    }
}
