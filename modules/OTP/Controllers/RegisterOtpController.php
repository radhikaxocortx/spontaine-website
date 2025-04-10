<?php

namespace Modules\OTP\Controllers;

use App\Http\Controllers\Controller;
use Modules\OTP\SendOtp;

class RegisterOtpController extends Controller
{
    public function sendOtp($customerId, SendOtp $sendOtp)
    {
        $response = $sendOtp->sendOtp('email')->send($customerId, 'email');
        if ($response['error']) {
            return redirect()->back()->with([
                [
                    'error' => $response['message'],
                ],
            ]);
        }

        return redirect()->route('verify-otp', ['customerId' => $customerId])
            ->with([
                'message' => 'OTP sent successfully',
            ]);
    }
}
