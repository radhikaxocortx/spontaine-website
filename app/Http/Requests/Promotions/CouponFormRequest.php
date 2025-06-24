<?php

namespace App\Http\Requests\Promotions;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CouponFormRequest extends Data
{
    public function __construct(
        #[Required]
        public string $couponCode,

        #[Required, Date, Rule('date')]
        public string $startDate,

        #[Required, Date, Rule('date', 'after_or_equal:startDate')]
        public string $endDate,

        #[Required]
        public float $discountPercent,

        #[Required]
        public float $discountLimit,

        #[Required, Exists('price_plans', 'id')]
        public int $pricePlanId,
    ) {}
}
