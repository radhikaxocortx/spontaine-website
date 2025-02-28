<?php

namespace App\Models\EntityTemplate;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EntityTemplate extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'sequence',
        'name',
        'description',
        'workflow_id',
    ];

    public function workflowItems(): HasMany
    {
        return $this->hasMany(EntityTemplateItem::class, 'workflow_module_id', 'id');
    }
}
