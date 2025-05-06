<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class CountryPolicy
{
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'country.viewAny'));

        return $specification->isSatisfied();
    }

    public function view(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'country.view'));

        return $specification->isSatisfied();
    }

    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'country.create'));

        return $specification->isSatisfied();
    }

    public function update(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'country.update'));

        return $specification->isSatisfied();
    }

    public function delete(User $user): bool
    {

        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'country.delete'));

        return $specification->isSatisfied();
    }
}
