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
        'blocks',
        'type',
        'preview_image',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'blocks' => 'array',
    ];
}
