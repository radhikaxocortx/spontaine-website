<?php

namespace App\Models\UIBuilder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @property int $id
 * @property array<array-key, mixed> $items
 * @property string|null $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereItems($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Footer withoutTrashed()
 * @mixin \Eloquent
 */
class Footer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'items',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
