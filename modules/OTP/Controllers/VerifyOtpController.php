<?php

namespace Modules\OTP\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VerifyOtpController extends Controller
{
    public function verifyOtp($customerId)
    {
        return Inertia::render('OTP/OtpPage', [
            'customerId' => $customerId,
        ]);
    }
}
