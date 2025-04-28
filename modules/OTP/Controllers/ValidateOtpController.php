<?php

namespace Modules\OTP\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\OTP\Models\OTP;

class ValidateOtpController extends Controller
{
    public function validateOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
            'customerId' => 'required|string',
            'verifyingEmail' => 'required|boolean',
        ]);

        $otpRecord = OTP::otp($request->customerId, $request->otp)
            ->valid()
            ->latest()
            ->first();

        if (! $otpRecord) {
            return redirect()->back()->with('error', 'Invalid one time use key.');
        }

        $otpRecord->delete();
        if ($request->verifyingEmail) {
            return redirect()
                ->route('customer-create');
        }

        $customer = Customer::where('email', $request->customerId)->first();

        if (! $customer) {
            return redirect()->back()->with('error', 'Customer not found.');
        }

        // customer login
        Auth::guard('customer')->login($customer);

        return redirect()->route('customer-login-check')->with('message', 'One time use key verified and logged in successfully.');
    }
}
