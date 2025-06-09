<?php

namespace App\Models\ReferenceData;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReferenceDataParameters extends Model
{
    protected $fillable = [
        'domain_id',
        'parameter',
        'has_second_value',
    ];

    public function domain(): BelongsTo
    {
        return $this->belongsTo(ReferenceDataDomain::class, 'domain_id', 'id');
    }
}
