<?php

namespace App\Models\UIBuilder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\UIBuilder\NavMenuItem
 *
 * @property int $id
 * @property string $section
 * @property string|null $section_malayalam
 * @property array $items
 * @property string|null $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereItems($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereSectionMalayalam($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|NavMenuItem withoutTrashed()
 * @mixin \Eloquent
 */
class NavMenuItem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'section',
        'section_malayalam',
        'items',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
