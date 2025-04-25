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
use App\Models\CustomerVerification\VerificationStatus;
use App\Models\CustomerVerification\WorkflowModuleVerification;
use App\Models\Payment\AdminPayment;
use App\Models\ReferenceData\ReferenceData;
use App\Models\Workflow\Workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CustomerAdminController extends Controller
{
    public function customerAdminView(Request $request)
    {
        $customerPriceplans = CustomerPricePlan::with('customer', 'pricePlan')
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

    public function customerAdminShow(Request $request)
    {

        $id = $request->id;
        $customerPriceplan = CustomerPricePlan::where('id', $id)
            ->with('customer.company', 'pricePlan', 'paymentDetails.updatedBy')
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
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return back()->with(['message' => 'Payment Added Successfully']);
    }

    public function workflowAuthenticate(WorkflowAuthenticateRequest $request)
    {
        if ($request->status == 'Approved') {
            $allApproved = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
                ->where('status', '!=', 'Approved')
                ->doesntExist();
            if (! $allApproved) {
                return back()->with([
                    'error' => 'Approve all modules before approving the workflow.',
                ]);
            }
        }

        $customerDetail = CustomerPricePlan::where('id', $request->customer_workflow_id)
            ->with('customer')
            ->first();

        /** @var \App\Models\Customer\Customer|null $customer */
        $customer = $customerDetail->customer;
        try {
            $VerificationStatus = VerificationStatus::create($request->all());
            Mail::to($customer->email)->send(new StatusUpdateMailToCustomer(['name' => $customer->first_name, 'note' => $VerificationStatus->customer_notes]));

        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Workflow Status Updates Successfully']);
    }

    public function workflowAuthenticateUpdate(WorkflowAuthenticateRequest $request)
    {
        if ($request->status == 'Approved') {
            $allApproved = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
                ->where('status', '!=', 'Approved')
                ->doesntExist();
            if (! $allApproved) {
                return back()->with([
                    'error' => 'Approve all modules before approving the workflow.',
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
        $customer = $customerDetail->customer;

        try {
            $workflowAuthenticateModule->update($request->all());
            Mail::to($customer->email)->send(new StatusUpdateMailToCustomer(['name' => $customer->first_name, 'note' => $workflowAuthenticateModule->customer_notes]));

        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Workflow Status Updates Successfully']);
    }

    public function workflowModuleAuthenticate(ModuleStatusUpdateRequest $request)
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
        $customer = $customerDetail->customer;

        try {
            $workflowModuleVerification = WorkflowModuleVerification::create($request->all());
            Mail::to($customer->email)->send(new ModuleUpdateEmailToCustomer([

                'name' => $customer->first_name,
                'note' => $workflowModuleVerification->customer_notes,
            ]));
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Module Status Updates Successfully']);
    }

    public function workflowModuleAuthenticateUpdate(ModuleStatusUpdateRequest $request)
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
        $customer = $customerDetail->customer;
        try {
            $workflowModuleVerification->update([
                ...$request->all(),
                'customer_updated' => false,
            ]);
            Mail::to($customer->email)->send(new ModuleUpdateEmailToCustomer([

                'name' => $customer->first_name,
                'note' => $workflowModuleVerification->customer_notes,
            ]));
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Module Status Updates Successfully']);
    }
}
