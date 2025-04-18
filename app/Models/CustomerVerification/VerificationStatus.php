<?php

namespace App\Models\CustomerVerification;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VerificationStatus extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'customer_workflow_id',
        'status',
        'notes',
        'customer_notes',
        'kadodo_id',
        'status_date',
    ];
}
