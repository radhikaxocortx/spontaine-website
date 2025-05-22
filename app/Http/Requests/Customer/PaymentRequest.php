<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PaymentRequest extends Data
{
    public function __construct(
        #[Exists('customer_price_plans', 'id')]
        public int $customerPriceplanId,
        #[Rule('required')]
        public float $pricePlanAmount,
        #[Rule('required')]
        public float $taxAmount,
        #[Rule('required')]
        public float $totalAmount,
        public float $paymentAmount,
        public string $paymentStatus,
    ) {}
}
