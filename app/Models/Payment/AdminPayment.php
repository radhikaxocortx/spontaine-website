<?php

namespace App\Models\Payment;

use App\Models\Customer\CustomerPricePlan;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdminPayment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'customer_workflow_id',
        'amount',
        'payment_method',
        'notes',
        'payment_date',
        'accounting_reference',
        'updated_by',
    ];

    public function customerWorkflow(): BelongsTo
    {
        return $this->belongsTo(CustomerPricePlan::class, 'customer_workflow_id', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}
