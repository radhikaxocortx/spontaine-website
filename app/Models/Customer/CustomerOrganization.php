<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerOrganization extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'company_legal_entity_name',
        'company_address_line_1',
        'company_address_line_2',
        'company_city',
        'company_postal_code',
        'company_country',
        'company_tax_id',
        'company_registration_id',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'company_id');
    }
}
