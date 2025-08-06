<?php

namespace Modules\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'page_title',
        'description',
        'url',
        'published',
        'featured',
        'blocks',
        'type',
        'preview_image',
        'preview_video',
        'author',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'blocks' => 'array',
        'published' => 'boolean',
        'featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
