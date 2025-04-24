<?php

namespace App\Http\Requests\PricePlanRequest;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PricePlanFormRequest extends Data
{
    public function __construct(
        public string $name,
        public string $code,
        public int $validity,
        public string $description,
        public string $type,
        public string $min_quantity_required,
        public int $rate,
    ) {}
}
