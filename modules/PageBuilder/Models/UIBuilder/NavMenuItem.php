<?php

namespace Modules\PageBuilder\Models\UIBuilder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NavMenuItem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'title_malayalam',
        'is_link',
        'link_info',
        'items',
        'position',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'items' => 'array',
        'link_info' => 'array',
    ];
}
