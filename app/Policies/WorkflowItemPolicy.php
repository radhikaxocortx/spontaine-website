<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\EntityTemplate\EntityTemplateItem;
use App\Models\User;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class WorkflowItemPolicy
{
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-item.viewAny'));

        return $specification->isSatisfied();
    }

    public function view(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-item.view'));

        return $specification->isSatisfied();
    }

    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-item.create'));

        return $specification->isSatisfied();
    }

    public function update(User $user, EntityTemplateItem $entityTemplateItem): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-item.update'));

        return $specification->isSatisfied();
    }

    public function delete(User $user, EntityTemplateItem $entityTemplateItem): bool
    {

        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow-item.delete'));

        return $specification->isSatisfied();
    }
}
