<?php

namespace App\Models\Workflow;

use App\Models\Country\Country;
use App\Models\PricePlan\PricePlan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workflow extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'country_id',
        'priceplan_id',
        'status',
        'active_from',
        'description',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function priceplan(): BelongsTo
    {
        return $this->belongsTo(PricePlan::class, 'priceplan_id', 'id');
    }
}
