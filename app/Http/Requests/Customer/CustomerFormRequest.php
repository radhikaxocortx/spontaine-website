<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Attributes\Validation\RequiredUnless;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CustomerFormRequest extends Data
{
    public function __construct(
        #[Rule('nullable|exists:price_plans,id')]
        public ?int $priceplanId,
        #[Max(255)]
        public string $firstName,
        #[Max(255)]
        public string $lastName,
        #[Max(255)]
        public string $telephone,
        #[Max(1000)]
        public string $addressLine1,
        #[Max(1000)]
        public ?string $addressLine2,
        #[Max(255)]
        public string $city,
        #[Max(255)]
        public string $country,
        #[Max(255)]
        #[RequiredUnless('country', 'SIERRA LEONE')]
        public ?string $postalCode,
        #[Email(), Rule('unique:customers,email')]
        #[Max(255)]
        public string $email,
        #[Max(255)]
        public string $password,
        #[Rule('same:password')]
        #[Max(255)]
        public string $retypePassword,
        public bool $haveCompany,
        #[RequiredIf('haveCompany', 'true')]
        #[Rule('unique:customer_organizations,company_legal_entity_name')]
        #[Max(255)]
        public ?string $companyLegalEntityName,
        #[Max(1000)]
        #[RequiredIf('haveCompany', 'true')]
        public ?string $companyAddressLine1,
        #[Max(1000)]
        public ?string $companyAddressLine2,
        #[RequiredIf('haveCompany', 'true')]
        #[Max(255)]
        public ?string $companyCity,
        #[RequiredIf('haveCompany', 'true')]
        #[Max(255)]
        public ?string $companyCountry,
        #[Max(255)]
        public ?string $companyPostalCode,
        #[RequiredIf('haveCompany', 'true')]
        #[Rule('unique:customer_organizations,company_tax_id')]
        #[Max(255)]
        public ?string $companyTaxId,
        #[RequiredIf('haveCompany', 'true')]
        #[Rule('unique:customer_organizations,company_registration_id')]
        #[Max(255)]
        public ?string $companyRegistrationId,
    ) {}
}
