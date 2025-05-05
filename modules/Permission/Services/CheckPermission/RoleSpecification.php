<?php

declare(strict_types=1);

namespace Modules\Permission\Services\CheckPermission;

use Modules\Permission\DTOs\PermissionAction;
use Modules\Permission\Services\Roles\FindRoleInfo;

final class RoleSpecification extends PermissionBaseSpecification
{
    /**
     * @param array<int, array{
     *     attribute: string,
     *     value: string
     * }>|null $attributes
     */
    public function __construct(
        private readonly string $role,
        private readonly string $action,
        private readonly ?array $attributes = null
    ) {
        parent::__construct($this->checkAction());
    }

    private function checkAction(): bool
    {
        $role = app(FindRoleInfo::class)->findRole($this->role);

        if ($role === null) {
            return false;
        }

        $action = $role->findAction($this->action);

        return $this->checkAttributes($action);
    }

    private function checkAttributes(?PermissionAction $action): bool
    {
        if ($action === null) {
            return false;
        }

        if ($this->attributes === null || empty($this->attributes) || $action->allowedAttributes === null) {
            return true;
        }

        $allAttributesAllowed = true;
        foreach ($this->attributes as $attributeToCheck) {
            $attributes = $action->findAttributes($attributeToCheck['attribute']);

            $isAttributeAllowed = false;
            foreach ($attributes as $attribute) {
                if ($attribute->isAllowed($attributeToCheck['value'])) {
                    $isAttributeAllowed = true;
                    break;
                }
            }

            if (! $isAttributeAllowed) {
                $allAttributesAllowed = false;
                break;
            }
        }

        return $allAttributesAllowed;
    }
}
