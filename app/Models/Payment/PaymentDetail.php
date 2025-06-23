<?php

namespace App\Models\Payment;

use App\Models\Customer\CustomerPricePlan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentDetail extends Model
{
    protected $table = 'payment_details';

    use SoftDeletes;

    protected $fillable = [
        'customer_priceplan_id',
        'price_plan_amount',
        'tax_amount',
        'total_amount',
        'payment_amount',
        'payment_status',
        'payment_method',
        'coupon_id',
        'discount_amount',
    ];

    public function customerPriceplan(): BelongsTo
    {
        return $this->belongsTo(CustomerPricePlan::class, 'customer_priceplan_id', 'id');
    }
}
