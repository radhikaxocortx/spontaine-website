<?php

declare(strict_types=1);

namespace Modules\Permission\Services\Roles;

use Modules\Permission\DTOs\PermissionAction;
use Modules\Permission\DTOs\PermissionAttribute;
use Modules\Permission\DTOs\Role;

/**
 * If allowed_attributes is null, the action is allowed for all attributes.
 * if allowed_values is [*] then the action is allowed for all values.
 */
final class RoleList
{
    /**
     * @return array<Role>
     */
    public static function getRoles(): array
    {
        $roles = config('permission.roles.roles', []);

        return array_map(
            fn (array $role) => new Role(
                role: $role['role'],
                isAdmin: $role['is_admin'],
                actions: array_map(
                    fn (array $action) => new PermissionAction(
                        action: $action['action'],
                        allowedAttributes: $action['allowed_attributes'] === null
                            ? null
                            : array_map(
                                fn (array $attribute) => new PermissionAttribute(
                                    attribute: $attribute['attribute'],
                                    allowedValues: $attribute['allowed_values']
                                ),
                                $action['allowed_attributes']
                            )
                    ),
                    $role['actions']
                )
            ),
            $roles
        );
    }
}
