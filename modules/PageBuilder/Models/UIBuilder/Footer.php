<?php

namespace Modules\PageBuilder\Models\UIBuilder;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Footer extends Model
{
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
