<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use Modules\PageBuilder\Models\Video;
use Modules\Permission\Services\CheckPermission\AdminSpecification;
use Modules\Permission\Services\CheckPermission\RoleSpecification;

class VideoPolicy
{
    public function delete(User $user, Video $video): bool
    {
        $specification = (new AdminSpecification($user->role ?? ''))
            ->or(new RoleSpecification($user->role ?? '', 'media.delete'));

        return $specification->isSatisfied();
    }
}
