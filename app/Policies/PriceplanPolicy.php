<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class PriceplanPolicy
{
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'price-plan.viewAny'));

        return $specification->isSatisfied();
    }

    public function view(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'price-plan.view'));

        return $specification->isSatisfied();
    }

    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'price-plan.create'));

        return $specification->isSatisfied();
    }

    public function update(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'price-plan.update'));

        return $specification->isSatisfied();
    }

    public function delete(User $user): bool
    {

        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'price-plan.delete'));

        return $specification->isSatisfied();
    }
}
