<?php

namespace App\Http\Controllers\VerifiedIdentity;

use App\Http\Controllers\Controller;
use App\Models\Customer\CustomerPricePlan;
use Inertia\Inertia;
use Inertia\Response;

class VerifiedIdentityController extends Controller
{
    public function __invoke(string $customerId): Response
    {
        $customer = CustomerPricePlan::where('customer_id', $customerId)
            ->with('pricePlan', 'customer', 'verificationStatus')
            ->first();

        return Inertia::render('VerifiedIdentity/VerifiedIdentityPage', [
            'customerPricePlan' => $customer,
        ]);
    }
}
