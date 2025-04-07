<?php

namespace App\Http\Controllers\CustomerLogin;

use App\Http\Controllers\Controller;
use App\Models\Customer\Customer;
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
            ->where('email_verified', true)
            ->first();

        if (! $customer) {
            return back()->with(['error' => 'Invalid credentials.']);
        }
        if (! Hash::check($request->password, $customer->password)) {
            return back()->with(['error' => 'Wrong Password!']);
        } else {
            return redirect()->route('customer-verification', ['customerId' => $customer->email]);
        }
    }

    public function choosePriceplan()
    {
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
