<?php

namespace App\Models\Customer;

use App\Models\CustomerVerification\VerificationStatus;
use App\Models\Payment\PaymentDetail;
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

    /**
     * @return BelongsTo<PricePlan, $this>
     */
    public function pricePlan(): BelongsTo
    {
        return $this->belongsTo(PricePlan::class, 'price_plan_id', 'id');
    }

    /**
     * @return BelongsTo<Customer, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    /**
     * @return HasOne<VerificationStatus, $this>
     */
    public function verificationStatus(): HasOne
    {
        return $this->hasOne(VerificationStatus::class, 'customer_workflow_id', 'id');
    }

    /**
     * @return HasOne<PaymentDetail, $this>
     */
    public function paymentDetails(): HasOne
    {
        return $this->hasOne(PaymentDetail::class, 'customer_priceplan_id', 'id');
    }

    /**
     * @return HasOne<KadodoID, $this>
     */
    public function kadodoID(): HasOne
    {
        return $this->hasOne(KadodoID::class, 'customer_priceplan_id', 'id');
    }
}
