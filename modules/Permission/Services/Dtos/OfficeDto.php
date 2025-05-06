<?php

namespace Modules\Permission\Services\Dtos;

class OfficeDto
{
    public function __construct(
        public readonly string|int $officeKey,
        public readonly string $officeName,
        public readonly string|int $parentOfficeKey,
        public readonly int $level,
    ) {}
}
