<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer\CustomerPricePlan;
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

        return Inertia::render('AdminView/CustomerAdminShow', ['customerPriceplan' => $customerPriceplan]);
    }
}
