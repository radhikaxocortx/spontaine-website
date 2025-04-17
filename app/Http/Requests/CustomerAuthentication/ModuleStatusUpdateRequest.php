<?php

namespace App\Http\Requests\CustomerAuthentication;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ModuleStatusUpdateRequest extends Data
{
    public function __construct(
        public int $customer_workflow_id,
        public int $workflow_module_id,
        public string $verification_date,
        public ?string $status,
        public ?string $customer_notes,
        public ?string $internal_notes,
        public bool $allow_update,
    ) {}
}
