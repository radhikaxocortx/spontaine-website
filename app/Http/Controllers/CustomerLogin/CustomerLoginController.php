<?php

namespace App\Http\Controllers\CustomerLogin;

use App\Http\Controllers\Controller;
use App\Models\Customer\Customer;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
use App\Models\Customer\KadodoID;
use App\Models\PricePlan\PricePlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerLoginController extends Controller
{
    public function loginForm()
    {
        if (Auth::guard('customer')->check()) {
            Auth::guard('customer')->logout();
            request()->session()->invalidate();
            request()->session()->regenerateToken();
        }

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
            return back()->withErrors(['email' => 'This email is not Registered.']);
        }
        if (! Hash::check($request->password, $customer->password)) {
            return back()->withErrors(['password' => 'Wrong Password!']);
        } else {
            return redirect()->route('customer-verification', ['customerId' => $customer->email, 'verifyingEmail' => 'false']);
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
        $priceplan = PricePlan::all();

        return Inertia::render('CustomerLogin/CustomerDashboard', [
            'pricePlan' => $priceplan,
        ]);
    }

    public function customerLoginConditionalcheck()
    {
        $customer = Auth::guard('customer')->user();
        $customerId = $customer->id;

        $priceplanExist = CustomerPricePlan::where('customer_id', $customerId)->exists();

        if ($priceplanExist) {
            $customerPriceplan = CustomerPricePlan::where('customer_id', $customerId)
                ->latest()
                ->first();
            $workflowExist = CustomerWorkflow::where('customer_priceplan_id', $customerPriceplan->id)->exists();

            if ($workflowExist) {

                $kadodoIDExist = KadodoID::where('customer_priceplan_id', $customerPriceplan->id)->exists();
                if ($kadodoIDExist) {
                    return redirect()->route('customer-dashboard');
                } else {
                    return redirect()->route('customer-payment', ['id' => $customerPriceplan->id]);
                }

            } else {
                return redirect()->route('customer-workflow-create', ['pricePlanId' => $customerPriceplan->price_plan_id, 'customerPriceplanId' => $customerPriceplan]);
            }

        } else {
            return redirect()->route('choose-priceplan');
        }

    }

    public function customerPayment(Request $request)
    {
        $customerPriceplan = CustomerPricePlan::where('id', $request->id)->with('pricePlan')->first();

        return Inertia::render('CustomerLogin/CustomerPayment', ['customerPriceplan' => $customerPriceplan]);
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

        return redirect()->route('customer-login-check');

    }
}
