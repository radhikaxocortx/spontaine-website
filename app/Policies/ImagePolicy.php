<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use Modules\PageBuilder\Models\Image;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class ImagePolicy
{
    public function delete(User $user, Image $image): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'media.delete'));

        return $specification->isSatisfied();
    }
}
