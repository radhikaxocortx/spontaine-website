<?php

namespace App\Models\EntityTemplate;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EntityTemplate extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'step',
        'name',
        'description',

    ];
}
