<?php

namespace App\Http\Requests\EntityTemplate;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class TemplateItemFormRequest extends Data
{
    public function __construct(
        #[Exists('entity_templates', 'id')]
        public int $workflowModuleId,
        public int $fieldNumber,
        public string $fieldName,
        public string $type,
        public ?string $defaultValue,
        public ?string $domain,
        public ?string $parameter,
        public ?string $placeholder,

    ) {}
}
