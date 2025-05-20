<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class OtpRequest extends Data
{
    public function __construct(
        #[Rule('email')]
        public string $customerId,
        #[Rule('numeric|length:6')]
        public string $otp,
        public ?bool $verifyingEmail,
    ) {}
}
