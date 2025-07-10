<?php

namespace App\Http\Requests\CustomerAuthentication;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class AdminPaymentRequest extends Data
{
    public function __construct(
        #[Exists('customer_price_plans', 'id')]
        public string $customerPriceplanId,
        public float $pricePlanAmount,
        public float $taxAmount,
        public float $totalAmount,
        public float $paymentAmount,
        public string $paymentStatus,
        public string $paymentMethod,
        public ?int $couponId,
        public ?float $discountAmount,
        public ?string $notes,
        public string $accountingReference,
        public int $updated_by,
    ) {}
}
