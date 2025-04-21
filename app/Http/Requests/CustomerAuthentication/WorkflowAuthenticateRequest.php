<?php

namespace App\Http\Requests\CustomerAuthentication;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class WorkflowAuthenticateRequest extends Data
{
    public function __construct(
        public int $customer_workflow_id,
        public string $status_date,
        public ?string $status,
        public ?string $notes,
        public ?string $customer_notes,

    ) {}
}
