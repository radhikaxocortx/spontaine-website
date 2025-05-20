<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PersonalInformationFormRequest extends Data
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
        #[Email(), Rule('unique:customers,email')]
        #[Max(255)]
        public string $email,
    ) {}
}
