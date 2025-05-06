<?php

declare(strict_types=1);

namespace Modules\Permission\Services\CheckPermission;

use Modules\Permission\Services\Contracts\OfficeHierarchyGenerator;

final class OfficeAccessSpecification extends PermissionBaseSpecification
{
    public function __construct(
        private readonly string|int $usersOfficeKey,
        private readonly string|int $requestedOfficeKey,
    ) {
        $hierarchyGenerator = app(OfficeHierarchyGenerator::class);
        $hierarchy = $hierarchyGenerator->getHierarchy($this->usersOfficeKey);

        $found = false;
        foreach ($hierarchy as $office) {
            if ($office->officeKey === $this->requestedOfficeKey) {
                $found = true;
            }
        }

        parent::__construct($found);
    }

    public function isSatisfied(): bool
    {
        return $this->satisfied;
    }
}
