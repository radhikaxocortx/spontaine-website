<?php

declare(strict_types=1);

namespace Modules\Permission\DTOs;

use JsonSerializable;

/**
 * @property-read string $attribute
 * @property-read array<string> $allowedValues
 */
final readonly class PermissionAttribute implements JsonSerializable
{
    /**
     * @param  array<string>  $allowedValues
     */
    public function __construct(
        public string $attribute,
        public array $allowedValues
    ) {}

    /**
     * @return array{attribute: string, allowed_values: array<string>}
     */
    public function jsonSerialize(): array
    {
        return [
            'attribute' => $this->attribute,
            'allowed_values' => $this->allowedValues,
        ];
    }

    public function isAllowed(string $value): bool
    {
        if ($this->allowedValues === ['*']) {
            return true;
        }

        return in_array($value, $this->allowedValues);
    }
}
