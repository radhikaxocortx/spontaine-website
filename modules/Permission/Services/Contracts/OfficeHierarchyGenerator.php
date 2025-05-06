<?php

declare(strict_types=1);

namespace Modules\Permission\Services\Contracts;

use Modules\Permission\Services\Dtos\OfficeDto;

/**
 * @template T
 */
interface OfficeHierarchyGenerator
{
    /**
     * Generates a hierarchy of offices starting from the given organization identifier.
     *
     * @param  T  $organizationIdentifier  The identifier of the organization to generate hierarchy from
     * @return OfficeDto[] Array of office DTOs representing the hierarchy
     */
    public function getHierarchy(mixed $organizationIdentifier): array;
}
