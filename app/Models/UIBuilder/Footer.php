<?php

namespace App\Models\UIBuilder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\UIBuilder\Footer
 *
 * @property int $id
 * @property array $items
 * @property string|null $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Footer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Footer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Footer onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Footer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereItems($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Footer withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Footer withoutTrashed()
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
