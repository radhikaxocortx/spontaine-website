<?php

namespace App\Models\Counttry;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description',
        'currency',
        'currency_code',
        'base_cxy_conv_rate',
        'tax_name',
        'tax_code',
        'tax_rate',
    ];
}
