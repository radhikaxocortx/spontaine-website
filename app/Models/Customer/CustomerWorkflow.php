<?php

namespace App\Models\Customer;

use App\Models\EntityTemplate\EntityTemplateItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerWorkflow extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'workflow_item_id',
        'customer_id',
        'value',
        'number_value',
        'date_value',
        'mime_type',
    ];

    public function workflowItem(): BelongsTo
    {
        return $this->belongsTo(EntityTemplateItem::class, 'workflow_item_id', 'id');
    }
}
