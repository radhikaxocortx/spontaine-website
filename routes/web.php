<?php

use App\Http\Controllers\AutoComplete\AutoCompleteController;
use App\Http\Controllers\Country\CountryController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\CustomerLogin\CustomerLoginController;
use App\Http\Controllers\EntityTemplate\EntityTemplateController;
use App\Http\Controllers\EntityTemplate\EntityTemplateItemController;
use App\Http\Controllers\EntityTemplate\workflowAPIController;
use App\Http\Controllers\PricePlan\PricePlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferenceData\ReferenceDataAPIController;
use App\Http\Controllers\ReferenceData\ReferenceDataController;
use App\Http\Controllers\Workflow\WorkflowController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\OTP\Controllers\RegisterOtpController;
use Modules\OTP\Controllers\ValidateOtpController;
use Modules\OTP\Controllers\VerifyOtpController;
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
});
// Sign Up Form
Route::middleware('guest')->group(function () {
    Route::resource('sign-up', CustomerController::class)
        ->parameters(['sign-up' => 'customer']);
});
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

Route::get('customer-verification/{customerId}', [RegisterOtpController::class, 'sendOtp'])
    ->name('customer-verification');
Route::get('verify-otp/{customerId}', [VerifyOtpController::class, 'verifyOtp'])
    ->name('verify-otp');
Route::post('validate-otp', [ValidateOtpController::class, 'validateOtp'])
    ->name('validate-otp');

// customer
Route::get('customer-login', [CustomerLoginController::class, 'loginForm']);
Route::post('validate-customer', [CustomerLoginController::class, 'ValidatePassword'])
    ->name('validate-customer');
Route::middleware(['auth:customer'])->group(function () {
    Route::get('choose-priceplan/{customerId}', [CustomerLoginController::class, 'choosePriceplan'])
        ->name('choose-priceplan');
    Route::get('customer-dashboard', [CustomerLoginController::class, 'customerDashboard'])
        ->name('customer-dashboard');
    Route::post('update-priceplan', [CustomerController::class, 'updatePriceplan'])
        ->name('update-priceplan');
    Route::get('customer-workflow-create/{priceplanId}/{customerPriceplanId}', [CustomerController::class, 'createCustomerWorkflow'])
        ->name('customer-workflow-create');

    Route::post('customer-workflow-save', [CustomerController::class, 'customerWorkflowSave'])
        ->name('customer-workflow-save');
});
require __DIR__.'/auth.php';
