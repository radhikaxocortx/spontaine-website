<?php

namespace App\Models\EntityTemplate;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EntityTemplateItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'workflow_module_id',
        'field_number',
        'field_name',
        'type',
        'default_value',
        'domain',
        'parameter',

    ];
}
