<?php

namespace App\Models\PricePlan;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PricePlan extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'code',
        'validity',
        'description',
        'min_quantity_required',
        'rate',
        'additional_rate',
    ];
}
