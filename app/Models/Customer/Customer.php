<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Customer extends Authenticatable
{
    use SoftDeletes;

    protected $table = 'customers';

    protected $fillable = [
        'first_name',
        'last_name',
        'telephone',
        'address_line_1',
        'address_line_2',
        'city',
        'country',
        'postal_code',
        'email',
        'password',
        'company_id',
        'email_verified',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    public function company()
    {
        return $this->belongsTo(CustomerOrganization::class, 'company_id');
    }
}
