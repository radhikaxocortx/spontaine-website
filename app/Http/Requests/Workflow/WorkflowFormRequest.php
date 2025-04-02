<?php

namespace App\Http\Requests\Workflow;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class WorkflowFormRequest extends Data
{
    public function __construct(
        public string $name,
        public ?string $description,
        public string $country_id,
        public string $priceplan_id,
        public string $status,
        public string $active_from
    ) {}
}
