<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use App\Models\Workflow\Workflow;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class WorkflowPolicy
{
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow.viewAny'));

        return $specification->isSatisfied();
    }

    public function view(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow.view'));

        return $specification->isSatisfied();
    }

    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow.create'));

        return $specification->isSatisfied();
    }

    public function update(User $user, Workflow $workflow): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow.update'));

        return $specification->isSatisfied();
    }

    public function delete(User $user, Workflow $workflow): bool
    {

        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'workflow.delete'));

        return $specification->isSatisfied();
    }
}
