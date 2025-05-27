<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SignUpController extends Controller
{
    public function customerCreate(Request $request): Response
    {
        $step = $request->step ?? 1;
        $personalInformation = session('customer_personal_information');
        $addressDetails = session('customer_address_details');
        $companyInformation = session('customer_company_information');

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => $step,
            'personalInformation' => $personalInformation,
            'addressDetails' => $addressDetails,
            'companyInformation' => $companyInformation,
        ]);
    }
}
