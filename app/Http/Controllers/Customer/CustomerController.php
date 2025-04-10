<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerFormRequest;
use App\Libs\ExceptionMessage;
use App\Models\Customer\Customer;
use App\Models\Customer\CustomerOrganization;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
use App\Services\ProcessWorkflowInfo;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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

            return redirect()
                ->route('customer-verification', ['customerId' => $customer->email])
                ->with(['message' => 'Customer Created Successfully']);
        } catch (Exception $e) {

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
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()
            ->route('customer-workflow-create', ['priceplanId' => $request->price_plan_id, 'customerPriceplanId' => $customerPriceplan->id]);
    }

    public function createCustomerWorkflow($priceplanId, $customerPriceplanId)
    {
        return Inertia::render('Customer/CustomerWorkflowCreate', [
            'priceplanId' => $priceplanId,
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

            CustomerWorkflow::insert($infoRecords);
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
            ->with('pricePlan', 'customer')
            ->first();

        return response()->json([
            'customerPriceplan' => $customerPriceplan,
        ]);
    }
}
