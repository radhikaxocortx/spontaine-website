<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use Modules\PageBuilder\Models\Document;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class DocumentPolicy
{
    public function viewAny(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'media.viewAny'));

        return $specification->isSatisfied();
    }

    public function create(User $user): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'media.create'));

        return $specification->isSatisfied();
    }

    public function delete(User $user, Document $document): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'media.delete'));

        return $specification->isSatisfied();
    }
}
