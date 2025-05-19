<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\RequiredUnless;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class AddressDetailFormRequest extends Data
{
    public function __construct(

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
        public bool $haveCompany,
    ) {}
}
