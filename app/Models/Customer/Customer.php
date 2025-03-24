<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
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
