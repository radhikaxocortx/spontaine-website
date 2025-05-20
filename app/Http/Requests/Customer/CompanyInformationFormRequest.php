<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CompanyInformationFormRequest extends Data
{
    public function __construct(
        #[Rule('unique:customer_organizations,company_legal_entity_name')]
        #[Max(255)]
        public string $companyLegalEntityName,
        #[Max(1000)]
        public string $companyAddressLine1,
        #[Max(1000)]
        public string $companyAddressLine2,
        #[Max(255)]
        public string $companyCity,
        #[Max(255)]
        public string $companyCountry,
        #[Max(255)]
        public string $companyPostalCode,
        #[Rule('unique:customer_organizations,company_tax_id')]
        #[Max(255)]
        public string $companyTaxId,
        #[Rule('unique:customer_organizations,company_registration_id')]
        #[Max(255)]
        public string $companyRegistrationId,
    ) {}
}
