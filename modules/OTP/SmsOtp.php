<?php

namespace Modules\OTP;

class SmsOtp implements OtpNotifier
{
    public function send(string $destination, $type): array
    {
        // send otp to sms
    }
}
