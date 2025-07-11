<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class KadodoID extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'customer_priceplan_id',
        'kadodo_id',
        'valid_from',
        'valid_to',
    ];

    /**
     * @return BelongsTo<CustomerPricePlan, $this>
     */
    public function customerPriceplan(): BelongsTo
    {
        return $this->belongsTo(CustomerPricePlan::class, 'customer_priceplan_id', 'id');
    }
}
