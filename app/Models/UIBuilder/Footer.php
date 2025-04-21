<?php

namespace App\Models\UIBuilder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Footer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'items',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
