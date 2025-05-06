<?php

declare(strict_types=1);

namespace Modules\Permission\Services\CheckPermission;

class PermissionBaseSpecification
{
    protected readonly bool $satisfied;

    public function __construct(bool $satisfied = true)
    {
        $this->satisfied = $satisfied;
    }

    public function and(PermissionBaseSpecification $specification): PermissionBaseSpecification
    {
        $satisfied = $this->satisfied && $specification->isSatisfied();

        return new PermissionBaseSpecification($satisfied);
    }

    public function or(PermissionBaseSpecification $specification): PermissionBaseSpecification
    {
        $satisfied = $this->satisfied || $specification->isSatisfied();

        return new PermissionBaseSpecification($satisfied);
    }

    public function not(): PermissionBaseSpecification
    {
        return new PermissionBaseSpecification(! $this->satisfied);
    }

    public function isSatisfied(): bool
    {
        return $this->satisfied;
    }
}
