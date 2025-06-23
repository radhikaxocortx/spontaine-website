<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerAuthentication\AdminPaymentRequest;
use App\Http\Requests\CustomerAuthentication\ModuleStatusUpdateRequest;
use App\Http\Requests\CustomerAuthentication\WorkflowAuthenticateRequest;
use App\Mail\ModuleUpdateEmailToCustomer;
use App\Mail\StatusUpdateMailToCustomer;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
use App\Models\Customer\KadodoID;
use App\Models\CustomerVerification\VerificationStatus;
use App\Models\CustomerVerification\WorkflowModuleVerification;
use App\Models\Payment\AdminPayment;
use App\Models\PricePlan\PricePlan;
use App\Models\ReferenceData\ReferenceData;
use App\Models\Workflow\Workflow;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class CustomerAdminController extends Controller
{
    public function customerAdminView(Request $request): Response
    {
        Gate::authorize('viewAny', CustomerPricePlan::class);

        $customerPriceplans = CustomerPricePlan::with('customer', 'pricePlan', 'verificationStatus')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('customer', function ($q) use ($search) {
                        $q->where('first_name', 'like', '%'.$search.'%')
                            ->orWhere('telephone', 'like', '%'.$search.'%');
                    })
                        ->orWhereHas('pricePlan', function ($q) use ($search) {
                            $q->where('name', 'like', '%'.$search.'%');
                        });
                });
            })
            ->paginate(10);

        return Inertia::render('AdminView/CustomerAdminView', ['customerPriceplans' => $customerPriceplans]);
    }

    public function customerAdminShow(Request $request): Response
    {
        Gate::authorize('view', CustomerPricePlan::class);

        $id = $request->id;
        $customerPriceplan = CustomerPricePlan::where('id', $id)
            ->with('customer.company', 'pricePlan', 'verificationStatus', 'paymentDetails.updatedBy', 'kadodoID')
            ->firstOrFail();
        $customerPriceplanInfo = CustomerWorkflow::where('customer_priceplan_id', $id)->get();
        $CustomerPriceplanTemplate = Workflow::where('priceplan_id', $customerPriceplan->price_plan_id)
            ->where('name', 'like', '%'.'Business Verification'.'%')
            ->with('workflowModules.workflowItems')
            ->first();
        $customerModuleStatus = WorkflowModuleVerification::where('customer_workflow_id', $id)->get();
        $customerWorkflowStatus = VerificationStatus::where('customer_workflow_id', $id)->first();

        $status = ReferenceData::fullData()
            ->where('domain', 'Customer Verification')
            ->where('parameter', 'Status')
            ->get();
        $paymentMethods = ReferenceData::fullData()
            ->where('domain', 'Payment')
            ->where('parameter', 'Payment Method')
            ->get();

        return Inertia::render('AdminView/CustomerAdminShow', [
            'customerPriceplan' => $customerPriceplan,
            'customerPriceplanInfo' => $customerPriceplanInfo,
            'CustomerPriceplanTemplate' => $CustomerPriceplanTemplate,
            'customerModuleStatus' => $customerModuleStatus,
            'customerWorkflowStatus' => $customerWorkflowStatus,
            'statuses' => $status,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function addPayment(AdminPaymentRequest $request)
    {
        try {
            $adminPayment = AdminPayment::create($request->all());
            $customerPriceplan = CustomerPricePlan::where('id', $adminPayment->customer_workflow_id)->first();
            $pricePlan = PricePlan::where('id', $customerPriceplan?->price_plan_id)->first();
            $validFrom = $adminPayment?->created_at?->format('Y-m-d');
            $validTo = $adminPayment?->created_at?->copy()->addMonths($pricePlan?->validity)->format('Y-m-d');

            $kadodoIdData = [
                'customer_priceplan_id' => $customerPriceplan?->id,
                'kadodo_id' => $customerPriceplan?->kadodo_id,
                'valid_from' => $validFrom,
                'valid_to' => $validTo,
            ];
            KadodoID::create($kadodoIdData);
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return back()->with(['message' => 'Payment Added And Kadodo ID Generated Successfully']);
    }

    public function kadodoIdGenerate(Request $request)
    {
        $validatedData = $request->validate([
            'customer_priceplan_id' => 'required|exists:customer_price_plans,id',
            'kadodo_id' => 'required|unique:kadodo_i_d_s,kadodo_id',
            'valid_from' => 'required|date|date_format:Y-m-d',
            'valid_to' => 'required|date|date_format:Y-m-d|after:valid_from',
        ]);

        try {

            $kadodoId = KadodoID::create($validatedData);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return back()->with('message', 'Payment Added and Kadodo ID Generated Successfully');

    }

    public function workflowAuthenticate(WorkflowAuthenticateRequest $request): RedirectResponse
    {
        if ($request->status == 'Verified') {
            $allApproved = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
                ->where('status', '!=', 'Verified')
                ->doesntExist();
            if (! $allApproved) {
                return back()->with([
                    'error' => 'All modules must be validated  before setting application status as Verified',
                ]);
            }
        }

        $customerDetail = CustomerPricePlan::where('id', $request->customer_workflow_id)
            ->with('customer')
            ->first();

        /** @var \App\Models\Customer\Customer|null $customer */
        $customer = $customerDetail?->customer;
        try {
            $VerificationStatus = VerificationStatus::create($request->all());
            Mail::to($customer?->email)->send(new StatusUpdateMailToCustomer([
                'name' => $customer?->first_name,
                'note' => $VerificationStatus->customer_notes ?? '',
                'status' => $VerificationStatus->status,
            ]));

        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Workflow Status Updates Successfully']);
    }

    public function workflowAuthenticateUpdate(WorkflowAuthenticateRequest $request): RedirectResponse
    {
        if ($request->status == 'Verified') {
            $allApproved = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
                ->where('status', '!=', 'Verified')
                ->doesntExist();
            if (! $allApproved) {
                return back()->with([
                    'error' => 'All modules must be validated  before setting application status as Verified',
                ]);
            }
        }
        $workflowAuthenticateModule = VerificationStatus::where('customer_workflow_id', $request->customer_workflow_id)
            ->first();

        if (! $workflowAuthenticateModule) {
            return back()->with(['error' => 'Something went wrong: No record found.']);
        }

        $customerDetail = CustomerPricePlan::where('id', $request->customer_workflow_id)
            ->with('customer')
            ->first();

        /** @var \App\Models\Customer\Customer|null $customer */
        $customer = $customerDetail?->customer;

        try {
            $workflowAuthenticateModule->update($request->all());
            Mail::to($customer?->email)->send(new StatusUpdateMailToCustomer([
                'name' => $customer?->first_name,
                'note' => $workflowAuthenticateModule->customer_notes ?? '',
            ]));

        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Workflow Status Updates Successfully']);
    }

    public function verificationCompleted($customerPriceplanId): RedirectResponse
    {
        $VerificationStatus = VerificationStatus::where('customer_workflow_id', $customerPriceplanId)->first();

        if (! $VerificationStatus) {
            return back()->with(['error' => 'Verification record not found.']);
        }

        $VerificationStatus->update([
            'mark_as_updated' => true,
        ]);

        return back()->with(['message' => 'Verification marked as completed']);
    }

    public function workflowModuleAuthenticate(ModuleStatusUpdateRequest $request): RedirectResponse
    {
        $exists = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
            ->where('module_id', $request->module_id)
            ->exists();

        if ($exists) {
            return back()->with(['error' => 'Something went wrong: Duplicate entry.']);
        }
        $customerDetail = CustomerPricePlan::where('id', $request->customer_workflow_id)
            ->with('customer')
            ->first();

        /** @var \App\Models\Customer\Customer|null $customer */
        $customer = $customerDetail?->customer;

        try {
            $workflowModuleVerification = WorkflowModuleVerification::create($request->all());
            $VerificationStatus = VerificationStatus::where('customer_workflow_id', $request->customer_workflow_id)
                ->exists();
            if (! $VerificationStatus) {
                VerificationStatus::create([
                    'customer_workflow_id' => $request->customer_workflow_id,
                    'status' => 'In Process',
                ]);
            }
            if ($workflowModuleVerification->customer_notes) {
                Mail::to($customer?->email)->send(new ModuleUpdateEmailToCustomer([

                    'name' => $customer?->first_name,
                    'note' => $workflowModuleVerification->customer_notes,
                ]));
            }
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Module Status Updates Successfully']);
    }

    public function workflowModuleAuthenticateUpdate(ModuleStatusUpdateRequest $request): RedirectResponse
    {
        $workflowModuleVerification = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
            ->where('module_id', $request->module_id)
            ->first();

        if (! $workflowModuleVerification) {
            return back()->with(['error' => 'Something went wrong: No record found.']);
        }
        $customerDetail = CustomerPricePlan::where('id', $request->customer_workflow_id)
            ->with('customer')
            ->first();

        /** @var \App\Models\Customer\Customer|null $customer */
        $customer = $customerDetail?->customer;
        try {
            $workflowModuleVerification->update([
                ...$request->all(),
                'customer_updated' => false,
            ]);
            if ($request->customer_notes) {
                Mail::to($customer?->email)->send(new ModuleUpdateEmailToCustomer([

                    'name' => $customer?->first_name,
                    'note' => $request->customer_notes,
                ]));
            }
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Module Status Updates Successfully']);
    }
}
