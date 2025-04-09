<?php

namespace App\Http\Requests\Workflow;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class WorkflowInfo extends Data
{
    public function __construct(
        public ?int $oldRecordId,
        public int $workflowItemId,
        public string|array|null $value,
        public ?UploadedFile $file,
        public string $type,
    ) {}
}
