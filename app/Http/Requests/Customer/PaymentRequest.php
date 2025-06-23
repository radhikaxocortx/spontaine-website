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
        #[Exists('price_plans', 'id')]
        public int $priceplanId,
        #[Rule('required')]
        public float $pricePlanAmount,
        #[Rule('required')]
        public float $taxAmount,
        #[Rule('required')]
        public float $totalAmount,
        #[Rule('required')]
        public float $paymentAmount,
        #[Rule('required')]
        public string $paymentStatus,
        #[Rule('required')]
        public string $paymentMethod,
        #[Rule('nullable')]
        #[Exists('coupons', 'id')]
        public ?int $couponId,
        #[Rule('nullable')]
        public ?float $discountAmount,
    ) {}
}
