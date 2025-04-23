<?php

namespace Modules\OTP\Controllers;

use App\Http\Controllers\Controller;
use Modules\OTP\SendOtp;

class RegisterOtpController extends Controller
{
    public function sendOtp(string $customerId, string $verifyingEmail, SendOtp $sendOtp)
    {

        $isVerifyingEmail = filter_var($verifyingEmail, FILTER_VALIDATE_BOOLEAN);
        $verify = $isVerifyingEmail ? 'true' : 'false';
        $response = $sendOtp->sendOtp('email')->send($customerId, 'email');
        if ($response['error']) {
            return redirect()->back()->with([
                [
                    'error' => $response['message'],
                ],
            ]);
        }

        return redirect()->route('verify-otp', ['customerId' => $customerId, 'verifyingEmail' => $verify])
            ->with([
                'message' => 'OTP sent successfully',
            ]);
    }
}
