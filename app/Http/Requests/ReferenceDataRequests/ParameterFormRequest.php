<?php

namespace App\Http\Requests\ReferenceDataRequests;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ParameterFormRequest extends Data
{
    public function __construct(
        #[Exists('reference_data_domains', 'id')]
        public int $domainId,
        #[Max(255)]
        public string $parameter,
        public bool $hasSecondValue,
    ) {}
}
