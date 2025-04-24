<?php

namespace App\Http\Requests\CustomerAuthentication;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class AdminPaymentRequest extends Data
{
    public function __construct(
        #[Rule('unique:admin_payments,customer_workflow_id')]
        public int $customer_workflow_id,
        #[Rule('exists:users,id')]
        public int $updated_by,
        public int $amount,
        public string $payment_method,
        public string $notes,
        public string $payment_date,
        public string $accounting_reference,
    ) {}
}
