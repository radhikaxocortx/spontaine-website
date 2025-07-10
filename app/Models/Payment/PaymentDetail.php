<?php

namespace App\Models\Payment;

use App\Models\Customer\CustomerPricePlan;
use App\Models\Promotion\Coupon;
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
        'notes',
        'accounting_reference',
        'updated_by',
    ];

    /**
     * @return BelongsTo<CustomerPricePlan, $this>
     */
    public function customerPriceplan(): BelongsTo
    {
        return $this->belongsTo(CustomerPricePlan::class, 'customer_priceplan_id', 'id');
    }

    /**
     * @return BelongsTo<Coupon, $this>
     */
    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'id');
    }
}
