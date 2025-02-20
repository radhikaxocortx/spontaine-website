<?php

namespace App\Http\Requests\CountryRequest;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CountryFormRequest extends Data
{
    public function __construct(
        public string $name,
        public string $code,
        public string $description,
        public string $currency,
        public string $currency_code,
        public string $base_cxy_conv_rate,
        public string $tax_name,
        public string $tax_code,
        public string $tax_rate,
    ) {}
}
