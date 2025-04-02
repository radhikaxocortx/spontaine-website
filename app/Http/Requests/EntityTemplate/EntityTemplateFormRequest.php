<?php

namespace App\Http\Requests\EntityTemplate;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class EntityTemplateFormRequest extends Data
{
    public function __construct(
        public readonly int $workflowId,
        public readonly string $sequence,
        public readonly string $name,
        #[Max(1000)]
        public readonly ?string $description,
        public readonly ?string $prevButton,
        public readonly string $nextButton,

    ) {}
}
