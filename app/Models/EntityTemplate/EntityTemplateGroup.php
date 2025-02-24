<?php

namespace App\Models\EntityTemplate;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EntityTemplateGroup extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'group_number',
        'description',
        'entity_template_id',

    ];

    /**
     * @return HasMany<EntityTemplateItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(EntityTemplateItem::class, 'entity_template_group_id', 'id');
    }

    /**
     * @return BelongsTo<EntityTemplate, $this>
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(EntityTemplate::class, 'entity_template_id', 'id');
    }
}
