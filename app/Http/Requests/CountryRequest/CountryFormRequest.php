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
        public string $currency,
        public string $tax_rate,
    ) {}
}
