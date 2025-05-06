<?php

declare(strict_types=1);

namespace Modules\Permission\DTOs;

use JsonSerializable;

/**
 * @property-read string $action
 * @property-read array<PermissionAttribute>|null $allowedAttributes
 */
final readonly class PermissionAction implements JsonSerializable
{
    /**
     * @param  array<PermissionAttribute>|null  $allowedAttributes
     */
    public function __construct(
        public string $action,
        public ?array $allowedAttributes = null
    ) {}

    /**
     * @return array{
     *     action: string,
     *     allowed_attributes: PermissionAttribute[]|null
     * }
     */
    public function jsonSerialize(): array
    {
        return [
            'action' => $this->action,
            'allowed_attributes' => $this->allowedAttributes,
        ];
    }

    /**
     * @return array<PermissionAttribute>
     */
    public function findAttributes(string $attribute): array
    {
        $attributes = [];

        if ($this->allowedAttributes === null) {
            return $attributes;
        }

        foreach ($this->allowedAttributes as $allowedAttribute) {
            if ($allowedAttribute->attribute === $attribute) {
                $attributes[] = $allowedAttribute;
            }
        }

        return $attributes;
    }
}
