<?php

namespace Modules\OTP;

class EmailOtp implements OtpNotifier
{
    public function send(string $destination, $type): array
    {
        // send otp to email
    }
}
