<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerAuthentication\ModuleStatusUpdateRequest;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
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

        return Inertia::render('AdminView/CustomerAdminShow', [
            'customerPriceplan' => $customerPriceplan,
            'customerPriceplanInfo' => $customerPriceplanInfo,
            'CustomerPriceplanTemplate' => $CustomerPriceplanTemplate,
        ]);
    }

    public function workflowModuleAuthenticate(ModuleStatusUpdateRequest $request)
    {

        dd($request->all());
    }
}
