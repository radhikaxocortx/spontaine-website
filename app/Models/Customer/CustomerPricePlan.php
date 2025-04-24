<?php

namespace App\Models\Customer;

use App\Models\CustomerVerification\VerificationStatus;
use App\Models\Payment\AdminPayment;
use App\Models\PricePlan\PricePlan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerPricePlan extends Model
{
    protected $table = 'customer_price_plans';

    use SoftDeletes;

    protected $fillable = [
        'customer_id',
        'price_plan_id',
        'kadodo_id',
    ];

    public function pricePlan(): BelongsTo
    {
        return $this->belongsTo(PricePlan::class, 'price_plan_id', 'id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function verificationStatus(): BelongsTo
    {
        return $this->belongsTo(VerificationStatus::class, 'customer_workflow_id', 'id');
    }

    public function paymentDetails(): HasOne
    {
        return $this->hasOne(AdminPayment::class, 'customer_workflow_id', 'id');
    }
}
