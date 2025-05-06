<?php

declare(strict_types=1);

namespace Modules\Permission\Services\CheckPermission;

use Modules\Permission\Services\Roles\FindRoleInfo;

final class AdminSpecification extends PermissionBaseSpecification
{
    public function __construct(
        private readonly string $role
    ) {
        parent::__construct($this->checkIsAdmin());
    }

    private function checkIsAdmin(): bool
    {
        $role = app(FindRoleInfo::class)->findRole($this->role);

        if ($role === null) {
            return false;
        }

        return $role->isAdmin;
    }
}
