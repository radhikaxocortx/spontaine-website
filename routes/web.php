<?php

use App\Http\Controllers\AutoComplete\AutoCompleteController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Country\CountryController;
use App\Http\Controllers\Customer\CustomerAdminController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Customer\CustomerCreateController;
use App\Http\Controllers\Customer\SignUpController;
use App\Http\Controllers\CustomerLogin\CustomerLoginController;
use App\Http\Controllers\Email\EmailController;
use App\Http\Controllers\EntityTemplate\EntityTemplateController;
use App\Http\Controllers\EntityTemplate\EntityTemplateItemController;
use App\Http\Controllers\EntityTemplate\workflowAPIController;
use App\Http\Controllers\PricePlan\PricePlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferenceData\ParameterManagementController;
use App\Http\Controllers\ReferenceData\ReferenceDataAPIController;
use App\Http\Controllers\ReferenceData\ReferenceDataController;
use App\Http\Controllers\VerifiedIdentity\VerifiedIdentityController;
use App\Http\Controllers\Workflow\FileDownloadController;
use App\Http\Controllers\Workflow\WorkflowController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\OTP\Controllers\RegisterOtpController;
use Modules\OTP\Controllers\ValidateOtpController;
use Modules\OTP\Controllers\VerifyOtpController;
use Modules\PageBuilder\Controllers\NavEditor\NavEditorController as NavEditorNavEditorController;
use Modules\PageBuilder\Controllers\UIBuilder\FooterController as UIBuilderFooterController;
use Modules\PageBuilder\Models\Page;

Route::get('/', function () {
    $page = Page::where('url', 'home')
        ->firstOrFail();

    return Inertia::render('PageBuilder/ViewBuilderPage', [
        'page' => $page,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('customer-admin-view', [CustomerAdminController::class, 'customerAdminView'])
        ->name('customer-admin-view');
    Route::get('customer-admin-show/{id}', [CustomerAdminController::class, 'customerAdminShow'])
        ->name('customer-admin-show');
    Route::post('customer-workflow-authenticate', [CustomerAdminController::class, 'workflowAuthenticate'])
        ->name('customer-workflow-authenticate');
    Route::patch('customer-workflow-authenticate-update', [CustomerAdminController::class, 'workflowAuthenticateUpdate'])
        ->name('customer-workflow-authenticate-update');
    Route::post('workflow-module-authenticate', [CustomerAdminController::class, 'workflowModuleAuthenticate'])
        ->name('workflow-module-authenticate');
    Route::patch('workflow-module-authenticate-update', [CustomerAdminController::class, 'workflowModuleAuthenticateUpdate'])
        ->name('workflow-module-authenticate-update');
    Route::get('verification-completed/{customerPriceplanId}', [CustomerAdminController::class, 'verificationCompleted'])
        ->name('verification-completed');

    Route::resource('parameter-management', ParameterManagementController::class)
        ->parameters(['parameter-management' => 'parameterManagement']);

    // Add Payment
    Route::post('add-payment', [CustomerAdminController::class, 'addPayment'])
        ->name('add-payment');
});
// Sign Up Form
Route::middleware('guest')->group(function () {
    Route::get('customer-create-page/{step}', [SignUpController::class, 'customerCreate'])
        ->name('customer-create-page');
    Route::resource('sign-up', CustomerController::class)
        ->parameters(['sign-up' => 'customer']);
    Route::post('personal-information', [CustomerCreateController::class, 'personalInformation'])
        ->name('personal-information');
    Route::post('address-details', [CustomerCreateController::class, 'addressDetails'])
        ->name('address-details');
    Route::post('company-information', [CustomerCreateController::class, 'companyInformation'])
        ->name('company-information');
    Route::post('account-security', [CustomerCreateController::class, 'accountSecurity'])
        ->name('account-security');
    Route::get('previous-address-details', [CustomerCreateController::class, 'previousAddressDetails'])
        ->name('previous-address-details');
    Route::get('previous-company-information', [CustomerCreateController::class, 'previousCompanyInformation'])
        ->name('previous-company-information');
    Route::get('previous-account-security', [CustomerCreateController::class, 'previousAccountSecurity'])
        ->name('previous-account-security');
    Route::post('verify-customer-otp', [CustomerCreateController::class, 'verifyCustomerOtp'])
        ->name('verify-customer-otp');

});

// Kadodo ID
Route::get('verification-details/{kadodoId}', [CustomerLoginController::class, 'verificationDetails'])
    ->name('verification-details');
Route::post('kadodo-id-generate', [CustomerAdminController::class, 'kadodoIdGenerate'])
    ->name('kadodo-id-generate');

// Reference Data
Route::resource('/reference-data', ReferenceDataController::class);
Route::get('domain-list', [ReferenceDataAPIController::class, 'domainList'])
    ->name('domain-list');
Route::get('parameter-list', [ReferenceDataAPIController::class, 'parameterList'])
    ->name('parameter-list');
Route::get('unique-ref-data-values', [ReferenceDataAPIController::class, 'uniqueValues'])
    ->name('unique-ref-data-values');
Route::get('cascaded-ref-data', [ReferenceDataAPIController::class, 'cascadedValues'])
    ->name('cascaded-ref-data');
Route::get('find-reference-data/{domain}/{parameter}', [ReferenceDataAPIController::class, 'findReferenceData'])
    ->name('find-reference-data');

// Price Plan
Route::resource('price-plan', PricePlanController::class)
    ->parameters(['price-plan' => 'pricePlan']);

// Country
Route::resource('/country', CountryController::class)
    ->parameters(['country' => 'country']);

// workflow
Route::resource('workflow', WorkflowController::class)
    ->parameters(['workflow' => 'workflow']);
Route::apiResource('/entity-templates', EntityTemplateController::class)
    ->parameters(['entity-templates' => 'entityTemplates']);
Route::apiResource('entity-template-item', EntityTemplateItemController::class)
    ->parameters(['entity-template-item' => 'templateItem']);

Route::get('workflow-module', workflowAPIController::class)
    ->name('workflow-module');

Route::get('workflow-test', [workflowAPIController::class, 'workflowTest'])
    ->name('workflow-test');

// AutoComplete
Route::get('country-list', [AutoCompleteController::class, 'findCountry'])
    ->name('country-list');
Route::get('priceplan-list', [AutoCompleteController::class, 'findPriceplan'])
    ->name('priceplan-list');

Route::get('customer-verification/{customerId}/{verifyingEmail}', [RegisterOtpController::class, 'sendOtp'])
    ->name('customer-verification');
Route::get('verify-otp/{customerId}/{verifyingEmail}', [VerifyOtpController::class, 'verifyOtp'])
    ->name('verify-otp');
Route::post('validate-otp', [ValidateOtpController::class, 'validateOtp'])
    ->name('validate-otp');
Route::get('customer-register-email/{email}/{name}', [EmailController::class, 'customerRegisterEmail'])
    ->name('customer-register-email');
Route::get('customer-register-admin-email/{email}/{name}/{phone}', [EmailController::class, 'customerRegisterAdminEmail'])
    ->name('customer-register-admin-email');

// customer
Route::get('customer-login', [CustomerLoginController::class, 'loginForm'])
    ->name('customer-login');
Route::get('customer-create', [CustomerCreateController::class, 'createCustomer'])
    ->name('customer-create');
Route::post('validate-customer', [CustomerLoginController::class, 'ValidatePassword'])
    ->name('validate-customer');

Route::middleware(['auth:customer'])->group(function () {
    Route::get('customer-login-check', [CustomerLoginController::class, 'customerLoginConditionalcheck'])
        ->name('customer-login-check');
    Route::get('customer-payment/{pricePlanId}', [CustomerLoginController::class, 'customerPayment'])
        ->name('customer-payment');
    Route::post('update-customer-payment', [CustomerLoginController::class, 'updateCustomerPayment'])
        ->name('update-customer-payment');
    Route::get('customer-dashboard', [CustomerLoginController::class, 'customerDashboard'])
        ->name('customer-dashboard');
    Route::get('customer-workflow-create/{pricePlanId}/{customerPriceplanId}', [CustomerController::class, 'createCustomerWorkflow'])
        ->name('customer-workflow-create');
    Route::get('find-customer-priceplan/{customerId}', [CustomerController::class, 'findCustomerPriceplan'])
        ->name('find-customer-priceplan');
    Route::post('customer-workflow-save', [CustomerController::class, 'customerWorkflowSave'])
        ->name('customer-workflow-save');
    Route::post('customer-workflow-update', [CustomerController::class, 'customerWorkflowUpdate'])
        ->name('customer-workflow-update');
    Route::get('customer-workflow-show/{id}', [CustomerController::class, 'customerWorkflowShow'])
        ->name('customer-workflow-show');
    Route::post('customer-workflow-status-update', [CustomerController::class, 'customerWorkflowStatusUpdate'])
        ->name('customer-workflow-status-update');
});

Route::get('verified-identity/{customer}', VerifiedIdentityController::class)
    ->name('verified-identity');

Route::resource('nav-editor', NavEditorNavEditorController::class);
Route::resource('footer-editor', UIBuilderFooterController::class);

Route::post('send-contact-mail', [ContactController::class, 'sendMail']);

// file-download
Route::get('file-download', FileDownloadController::class)
    ->name('file-download');

require __DIR__.'/auth.php';
