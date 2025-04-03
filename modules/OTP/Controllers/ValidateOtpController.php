<?php

namespace Modules\OTP\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer\Customer;
use Illuminate\Http\Request;
use Modules\OTP\Models\OTP;

class ValidateOtpController extends Controller
{
    public function validateOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|digits:6',
            'customerId' => 'required|string',
        ]);

        $otpRecord = OTP::otp($request->customerId, $request->otp)
            ->valid()
            ->latest()
            ->first();

        if (! $otpRecord) {
            return redirect()->back()->with(['error' => 'Invalid OTP.']);
        }
        $otpRecord->delete();
        Customer::where('email', $request->customerId)
            ->update(['email_verified' => true]);

        return redirect()->route('dashboard')
            ->with([
                'message' => 'OTP verified successfully.',
            ]);
    }
}
