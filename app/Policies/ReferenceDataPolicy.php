<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ReferenceData\ReferenceData;
use App\Models\User;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class ReferenceDataPolicy
{
    /**
     * Determine whether the user can view any reference data.
     */
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'reference-data.viewAny'));

        return $specification->isSatisfied();
    }

    /**
     * Determine whether the user can view the reference data.
     */
    public function view(User $user, ReferenceData $referenceData): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'reference-data.view'));

        return $specification->isSatisfied();
    }

    /**
     * Determine whether the user can create reference data.
     */
    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'reference-data.create'));

        return $specification->isSatisfied();
    }

    /**
     * Determine whether the user can update the reference data.
     */
    public function update(User $user, ReferenceData $referenceData): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'reference-data.update'));

        return $specification->isSatisfied();
    }

    /**
     * Determine whether the user can delete the reference data.
     */
    public function delete(User $user, ReferenceData $referenceData): bool
    {

        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'reference-data.delete'));

        return $specification->isSatisfied();
    }
}
