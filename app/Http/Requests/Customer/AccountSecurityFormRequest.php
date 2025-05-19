<?php

namespace App\Http\Requests\Customer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class AccountSecurityFormRequest extends Data
{
    public function __construct(
        #[Rule('required|string|min:8|confirmed')]
        public string $password,
        #[Rule('required|string|min:8|same:password')]
        public string $retypePassword,
    ) {}
}
