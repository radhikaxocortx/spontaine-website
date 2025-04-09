<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerPricePlan extends Model
{
    protected $table = 'customer_price_plans';

    use SoftDeletes;

    protected $fillable = [
        'customer_id',
        'price_plan_id',
    ];
}
