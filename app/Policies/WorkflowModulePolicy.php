<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\EntityTemplate\EntityTemplate;
use App\Models\User;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class WorkflowModulePolicy
{
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-module.viewAny'));

        return $specification->isSatisfied();
    }

    public function view(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-module.view'));

        return $specification->isSatisfied();
    }

    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-module.create'));

        return $specification->isSatisfied();
    }

    public function update(User $user, EntityTemplate $entityTemplate): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-module.update'));

        return $specification->isSatisfied();
    }

    public function delete(User $user, EntityTemplate $entityTemplate): bool
    {

        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-module.delete'));

        return $specification->isSatisfied();
    }
}
