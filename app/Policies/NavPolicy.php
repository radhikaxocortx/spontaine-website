<?php

namespace App\Policies;

use App\Models\User;
use App\Services\UserPermissions\UserRoleService;

class NavPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function nav(User $user): bool
    {
        $roleService = new UserRoleService();

        return $roleService->roleHasPermission($user->role, 'nav');
    }
}
