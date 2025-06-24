<?php

namespace App\Models\Promotion;

use App\Models\PricePlan\PricePlan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
    protected $table = 'coupons';

    use SoftDeletes;

    protected $fillable = [
        'coupon_code',
        'start_date',
        'end_date',
        'discount_percent',
        'discount_limit',
        'price_plan_id',
    ];

    public function pricePlan(): BelongsTo
    {
        return $this->belongsTo(PricePlan::class, 'price_plan_id', 'id');
    }
}
