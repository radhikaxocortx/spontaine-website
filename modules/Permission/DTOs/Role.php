<?php

declare(strict_types=1);

namespace Modules\Permission\DTOs;

use JsonSerializable;

/**
 * @property-read string $role
 * @property-read bool $isAdmin
 * @property-read array<PermissionAction> $actions
 */
final readonly class Role implements JsonSerializable
{
    /**
     * @param  array<PermissionAction>  $actions
     */
    public function __construct(
        public string $role,
        public bool $isAdmin,
        public array $actions = []
    ) {}

    /**
     * @return array{
     *     role: string,
     *     is_admin: bool,
     *     actions: PermissionAction[]
     * }
     */
    public function jsonSerialize(): array
    {
        return [
            'role' => $this->role,
            'is_admin' => $this->isAdmin,
            'actions' => $this->actions,
        ];
    }

    public function findAction(string $action): ?PermissionAction
    {
        foreach ($this->actions as $actionRecord) {
            if ($actionRecord->action === $action) {
                return $actionRecord;
            }
        }

        return null;
    }
}
