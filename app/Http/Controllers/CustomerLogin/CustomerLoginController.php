<?php

namespace App\Http\Controllers\CustomerLogin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\PaymentRequest;
use App\Models\Country\Country;
use App\Models\Customer\Customer;
use App\Models\Customer\CustomerPricePlan;
use App\Models\Customer\CustomerWorkflow;
use App\Models\Customer\KadodoID;
use App\Models\CustomerVerification\WorkflowModuleVerification;
use App\Models\Payment\PaymentDetail;
use App\Models\PricePlan\PricePlan;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class CustomerLoginController extends Controller
{
    public function loginForm(): Response
    {
        if (Auth::guard('customer')->check()) {
            Auth::guard('customer')->logout();
            request()->session()->invalidate();
            request()->session()->regenerateToken();
        }

        return Inertia::render('CustomerLogin/CustomerLoginForm');
    }

    public function ValidatePassword(Request $request): RedirectResponse
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

    public function customerDashboard(): Response
    {
        $priceplan = PricePlan::all();

        return Inertia::render('CustomerLogin/CustomerDashboard', [
            'pricePlan' => $priceplan,
        ]);
    }

    public function customerLoginConditionalcheck(): RedirectResponse
    {
        $customer = Auth::guard('customer')->user();
        $customerId = $customer?->id;

        $priceplanExist = CustomerPricePlan::where('customer_id', $customerId)->exists();

        if ($priceplanExist) {
            $customerPriceplan = CustomerPricePlan::where('customer_id', $customerId)
                ->latest()
                ->first();
            $paymentExist = PaymentDetail::where('customer_priceplan_id', $customerPriceplan?->id)
                ->where('payment_status', 'completed')
                ->exists();
            $workflowExist = CustomerWorkflow::where('customer_priceplan_id', $customerPriceplan?->id)->exists();
            $customerPriceplan?->with('pricePlan');

            if ($paymentExist) {

                if ($workflowExist) {

                    return redirect()->route('customer-dashboard');
                } else {
                    return redirect()->route('customer-workflow-create', ['pricePlanId' => $customerPriceplan?->price_plan_id, 'customerPriceplanId' => $customerPriceplan]);
                }
            } else {
                return redirect('/pricing');
            }
        } else {
            return redirect('/pricing');
        }

    }

    public function customerPayment(int $pricePlanId): Response
    {
        $priceplan = PricePlan::where('id', $pricePlanId)->first();
        $countryDetail = Country::where('name', 'Ghana')->first();

        return Inertia::render('CustomerLogin/CustomerPayment', [
            'priceplan' => $priceplan,
            'countryDetail' => $countryDetail,
        ]);
    }

    public function updateCustomerPayment(PaymentRequest $request): RedirectResponse
    {
        $customer_id = Auth::guard('customer')->user()?->id;
        try {
            $customerPriceplan = CustomerPricePlan::create([
                'customer_id' => $customer_id,
                'price_plan_id' => $request->priceplanId,
            ]);
            $paymentDetail = PaymentDetail::create([
                'customer_priceplan_id' => $customerPriceplan->id,
                'price_plan_amount' => $request->pricePlanAmount,
                'tax_amount' => $request->taxAmount,
                'total_amount' => $request->totalAmount,
                'payment_amount' => $request->paymentAmount,
                'payment_status' => $request->paymentStatus,
                'payment_method' => $request->paymentMethod,
                'coupon_id' => $request->couponId,
                'discount_amount' => $request->discountAmount,
            ]);
        } catch (Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->route('customer-login-check')
            ->with(['message' => 'Payment Added Successfully']);
    }

    public function verificationDetails(string $kadodoId): Response
    {

        $kadodoId = KadodoID::where('kadodo_id', $kadodoId)->first();
        $customerPriceplan = CustomerPricePlan::where('id', $kadodoId?->customer_priceplan_id)
            ->with('pricePlan', 'customer.company', 'verificationStatus', 'paymentDetails')
            ->first();
        $moduleVerification = WorkflowModuleVerification::where('customer_workflow_id', $customerPriceplan?->id)->get();

        return Inertia::render('Customer/VerificationDetails', [
            'kadodoId' => $kadodoId,
            'customerPriceplan' => $customerPriceplan,
            'moduleVerification' => $moduleVerification,
        ]);

    }
}
