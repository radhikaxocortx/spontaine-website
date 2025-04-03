<?php

namespace Modules\OTP;

use Illuminate\Support\Facades\Mail;
use Modules\OTP\Mail\OTPMail;
use Modules\OTP\Models\OTP;

class EmailOtp implements OtpNotifier
{
    public function send(string $destination, $type): array
    {
        $otp = rand(100000, 999999);

        try {
            Mail::to($destination)->send(new OTPMail((string) $otp));
            OTP::create(['email' => $destination, 'otp' => $otp]);

            return ['message' => 'Email sent Successfully'];
        } catch (\Exception $e) {
            return [

                'error' => 'Failed to send OTP: '.$e->getMessage(),
            ];
        }
    }
}
