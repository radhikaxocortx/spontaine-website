<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\AccountSecurityFormRequest;
use App\Http\Requests\Customer\AddressDetailFormRequest;
use App\Http\Requests\Customer\CompanyInformationFormRequest;
use App\Http\Requests\Customer\OtpRequest;
use App\Http\Requests\Customer\PersonalInformationFormRequest;
use App\Mail\AdminMailForCustomerRegister;
use App\Mail\RegisteredCustomerMail;
use App\Models\Customer\Customer;
use App\Models\Customer\CustomerOrganization;
use App\Models\Customer\CustomerPricePlan;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Modules\OTP\Models\OTP;
use Modules\OTP\SendOtp;

class CustomerCreateController extends Controller
{
    public function personalInformation(PersonalInformationFormRequest $request): Response
    {
        session()->forget('customer_personal_information');
        session(['customer_personal_information' => $request->all()]);

        $addressDetails = session('customer_address_details');

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => 2,
            'addressDetails' => $addressDetails,
        ]);
    }

    public function addressDetails(AddressDetailFormRequest $request): Response
    {
        session()->forget('customer_address_details');
        session(['customer_address_details' => $request->all()]);

        $companyInformation = session('customer_company_information');

        if ($request->haveCompany === false) {
            return Inertia::render('CustomerCreate/CustomerCreatePage', [
                'step' => 4,
                'companyInformation' => $companyInformation,
            ]);
        }

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => 3,
            'companyInformation' => $companyInformation,
        ]);
    }

    public function companyInformation(CompanyInformationFormRequest $request): Response
    {
        session()->forget('customer_company_information');
        session(['customer_company_information' => $request->all()]);

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => 4,
        ]);
    }

    public function accountSecurity(AccountSecurityFormRequest $request): RedirectResponse|Response
    {
        session()->forget('customer_account_security');
        $data = session('customer_personal_information');

        $email = $data['email'];

        session(['customer_account_security' => Hash::make($request->password)]);

        // sending otp for customer verification
        $response = (new SendOtp)->sendOtp('email')->send($email, 'email');
        if ($response['error']) {
            return redirect()->back()->with([
                [
                    'error' => $response['message'],
                ],
            ]);
        }

        return Inertia::render('OTP/OtpPage', [
            'customerId' => $email,
            'verifyingEmail' => 'true',
            'submitUrl' => route('verify-customer-otp'),
        ]);
    }

    public function verifyCustomerOtp(OtpRequest $request): RedirectResponse
    {
        $otpRecord = OTP::otp($request->customerId, $request->otp)
            ->valid()
            ->latest()
            ->first();

        if (! $otpRecord) {
            return redirect()->back()->with('error', 'Invalid one time use key.');
        }

        $otpRecord->delete();

        return redirect()
            ->route('customer-create');
    }

    public function createCustomer(): RedirectResponse
    {
        $personalInformation = session('customer_personal_information');
        $addressDetails = session('customer_address_details');
        $companyInformation = session('customer_company_information');
        $accountSecurity = session('customer_account_security');

        if (! $personalInformation || ! $addressDetails || ! $accountSecurity) {
            return redirect()->route('sign-up.create')->with('error', 'Session expired. Please try again.');
        }

        DB::beginTransaction();
        try {
            $company = null;
            if ($addressDetails['have_company']) {
                $company = CustomerOrganization::create([
                    'company_legal_entity_name' => $companyInformation['company_legal_entity_name'],
                    'company_address_line_1' => $companyInformation['company_address_line1'],
                    'company_address_line_2' => $companyInformation['company_address_line2'],
                    'company_city' => $companyInformation['company_city'],
                    'company_country' => $companyInformation['company_country'],
                    'company_postal_code' => $companyInformation['company_postal_code'],
                    'company_tax_id' => $companyInformation['company_tax_id'],
                    'company_registration_id' => $companyInformation['company_registration_id'],
                ]);
            }

            $customer = Customer::create([
                'first_name' => $personalInformation['first_name'],
                'last_name' => $personalInformation['last_name'],
                'telephone' => $personalInformation['telephone'],
                'address_line_1' => $addressDetails['address_line1'],
                'address_line_2' => $addressDetails['address_line2'],
                'city' => $addressDetails['city'],
                'country' => $addressDetails['country'],
                'postal_code' => $addressDetails['postal_code'],
                'email' => $personalInformation['email'],
                'password' => $accountSecurity,
                'email_verified' => true,
                'company_id' => $company?->id,
            ]);
            if (! empty($personalInformation['priceplan_id'])) {
                CustomerPricePlan::create([
                    'customer_id' => $customer->id,
                    'price_plan_id' => $personalInformation['priceplan_id'],
                ]);
            }
            Mail::to(User::pluck('email')->toArray())
                ->send(new AdminMailForCustomerRegister([
                    'email' => $personalInformation['email'],
                    'name' => $personalInformation['first_name'],
                    'phone' => $personalInformation['telephone']]));
            Mail::to($personalInformation['email'])
                ->send(new RegisteredCustomerMail(
                    $personalInformation['email'],
                    $personalInformation['first_name']));

            Auth::guard('customer')->login($customer);

            session()->forget('customer_address_details');
            session()->forget('customer_company_information');
            session()->forget('customer_personal_information');
            session()->forget('customer_account_security');

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('sign-up.create')->with('error', 'Registration failed. Try again.');
        }
        DB::commit();

        return redirect()->route('customer-login-check')->with('message', 'Registration complete and logged in.');

    }

    public function previousAddressDetails(): Response
    {
        $personalInformation = session('customer_personal_information');

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => 1,
            'personalInformation' => $personalInformation,
        ]);
    }

    public function previousCompanyInformation(): Response
    {
        $addressDetails = session('customer_address_details');

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => 2,
            'addressDetails' => $addressDetails,
        ]);
    }

    public function previousAccountSecurity(): Response
    {
        $data = session('customer_address_details');

        if ($data['have_company'] === false) {
            return Inertia::render('CustomerCreate/CustomerCreatePage', [
                'step' => 2,
                'addressDetails' => $data,
            ]);
        }

        $companyInformation = session('customer_company_information');

        return Inertia::render('CustomerCreate/CustomerCreatePage', [
            'step' => 3,
            'companyInformation' => $companyInformation,
        ]);
    }
}
