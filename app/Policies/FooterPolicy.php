<?php

namespace App\Policies;

use App\Models\User;
use App\Services\UserPermissions\UserRoleService;

class FooterPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function footer(User $user): bool
    {
        $roleService = new UserRoleService();

        return $roleService->roleHasPermission($user->role, 'footer');
    }
}
