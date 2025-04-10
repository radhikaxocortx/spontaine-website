<?php

namespace Modules\OTP;

class SendOtp
{
    public function sendOtp(string $method): OtpNotifier
    {
        if ($method === 'sms') {
            return new SmsOtp;
        }

        if ($method === 'email') {
            return new EmailOtp;
        }
    }
}
