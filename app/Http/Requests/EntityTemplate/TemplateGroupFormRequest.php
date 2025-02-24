<?php

namespace App\Http\Requests\EntityTemplate;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class TemplateGroupFormRequest extends Data
{
    public function __construct(
        public string $name,
        public string $groupNumber,
        #[Max(1000)]
        public ?string $description,
        #[Exists('entity_templates', 'id')]
        public int $entityTemplateId,
    ) {}
}
