<?php

namespace App\Models\EntityTemplate;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EntityTemplateItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'entity_template_group_id',
        'field_number',
        'field_name',
        'type',
        'default_value',
        'domain',
        'parameter',

    ];

    /**
     * @return BelongsTo<EntityTemplateGroup, $this>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(EntityTemplateGroup::class, 'entity_template_group_id', 'id');
    }
}
