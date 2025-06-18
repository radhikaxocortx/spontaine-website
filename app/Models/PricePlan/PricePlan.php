<?php

namespace App\Models\PricePlan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PricePlan extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'code',
        'validity',
        'description',
        'rate',
    ];
}
