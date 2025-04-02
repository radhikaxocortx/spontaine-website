<?php

namespace Modules\OTP;

interface OtpNotifier
{
    public function send(string $destination, $type): array;
}
