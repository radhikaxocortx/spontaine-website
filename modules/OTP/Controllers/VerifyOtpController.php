<?php

namespace Modules\OTP\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VerifyOtpController extends Controller
{
    public function verifyOtp(string $customerId, string $verifyingEmail)
    {
        $isVerifyingEmail = filter_var($verifyingEmail, FILTER_VALIDATE_BOOLEAN);

        return Inertia::render('OTP/OtpPage', [
            'customerId' => $customerId,
            'verifyingEmail' => $isVerifyingEmail,
        ]);
    }
}
