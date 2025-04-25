<?php

namespace App\Models\CustomerVerification;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkflowModuleVerification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'customer_workflow_id',
        'module_id',
        'status',
        'customer_notes',
        'internal_notes',
        'verification_date',
        'allow_update',
        'customer_updated',
    ];
}
