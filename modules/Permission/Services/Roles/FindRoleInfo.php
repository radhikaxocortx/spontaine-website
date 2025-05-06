<?php

namespace Modules\Permission\Services\Roles;

use Modules\Permission\DTOs\Role;

class FindRoleInfo
{
    public function findRole(string $role): ?Role
    {

        $roles = RoleList::getRoles();

        foreach ($roles as $roleRecord) {
            if ($roleRecord->role === $role) {
                return $roleRecord;
            }
        }

        return null;
    }
}
