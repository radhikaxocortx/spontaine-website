<?php

namespace App\Http\Controllers\CustomerLogin;

use App\Http\Controllers\Controller;
use App\Models\Customer\Customer;
use App\Models\Customer\CustomerPricePlan;
use App\Models\PricePlan\PricePlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerLoginController extends Controller
{
    public function loginForm()
    {
        return Inertia::render('CustomerLogin/CustomerLoginForm');
    }

    public function ValidatePassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $customer = Customer::where('email', $request->email)
            // ->where('email_verified', true)
            ->first();
        $verifiedCustomer = Customer::where('email', $request->email)
            ->where('email_verified', true)
            ->first();

        if (! $customer) {
            return back()->withErrors(['email' => 'The email is not Registered.']);
        }
        if (! Hash::check($request->password, $customer->password)) {
            return back()->withErrors(['password' => 'Wrong Password!']);
        } else {
            return redirect()->route('customer-verification', ['customerId' => $customer->email]);
        }
    }

    public function choosePriceplan(Request $request)
    {
        $customerId = $request->customerId;
        if (CustomerPricePlan::where('customer_id', $customerId)->exists()) {
            return redirect()->route('customer-dashboard');
        }
        $priceplan = PricePlan::all();

        return Inertia::render('CustomerLogin/ChoosePriceplan', [
            'pricePlan' => $priceplan,
        ]);
    }

    public function customerDashboard()
    {
        return Inertia::render('CustomerLogin/CustomerDashboard');
    }
}
