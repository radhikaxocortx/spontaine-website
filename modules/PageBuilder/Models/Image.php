<?php

namespace Modules\PageBuilder\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'name',
        'url',
        'mime',
        'created_by',
        'updated_by',
    ];
}
