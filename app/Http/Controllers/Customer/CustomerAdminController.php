<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerAuthentication\ModuleStatusUpdateRequest;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
use App\Models\CustomerVerification\WorkflowModuleVerification;
use App\Models\Workflow\Workflow;
use Illuminate\Http\Request;
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
            ->with('customer.company', 'pricePlan')
            ->firstOrFail();
        $customerPriceplanInfo = CustomerWorkflow::where('customer_priceplan_id', $id)->get();
        $CustomerPriceplanTemplate = Workflow::where('priceplan_id', $customerPriceplan->price_plan_id)
            ->where('name', 'like', '%'.'Business Verification'.'%')
            ->with('workflowModules.workflowItems')
            ->first();
        $customerModuleStatus = WorkflowModuleVerification::where('customer_workflow_id', $id)->get();

        return Inertia::render('AdminView/CustomerAdminShow', [
            'customerPriceplan' => $customerPriceplan,
            'customerPriceplanInfo' => $customerPriceplanInfo,
            'CustomerPriceplanTemplate' => $CustomerPriceplanTemplate,
            'customerModuleStatus' => $customerModuleStatus,
        ]);
    }

    public function workflowModuleAuthenticate(ModuleStatusUpdateRequest $request)
    {
        $exists = WorkflowModuleVerification::where('customer_workflow_id', $request->customer_workflow_id)
            ->where('module_id', $request->module_id)
            ->exists();

        if ($exists) {
            return back()->with(['error' => 'Something went wrong: Duplicate entry.']);
        }
        try {
            $workflowModuleVerification = WorkflowModuleVerification::create($request->all());
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

        try {
            $workflowModuleVerification->update($request->all());
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with(['message' => 'Module Status Updates Successfully']);
    }
}
