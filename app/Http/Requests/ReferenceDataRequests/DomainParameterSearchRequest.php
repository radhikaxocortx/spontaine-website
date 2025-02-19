<?php

namespace App\Http\Requests\ReferenceDataRequests;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class DomainParameterSearchRequest extends Data
{
    public function __construct(
        public ?string $domain,
        public ?string $parameter,
        public ?string $valueTwo,
    ) {}
}
