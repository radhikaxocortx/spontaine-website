<?php

use App\Http\Controllers\AutoComplete\AutoCompleteController;
use App\Http\Controllers\Country\CountryController;
use App\Http\Controllers\EntityTemplate\EntityTemplateController;
use App\Http\Controllers\EntityTemplate\EntityTemplateGroupController;
use App\Http\Controllers\EntityTemplate\EntityTemplateItemController;
use App\Http\Controllers\PricePlan\PricePlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferenceData\ReferenceDataAPIController;
use App\Http\Controllers\ReferenceData\ReferenceDataController;
use App\Http\Controllers\Workflow\WorkflowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
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

// Entity Template
Route::apiResource('/entity-templates', EntityTemplateController::class)
    ->parameters(['entity-templates' => 'entityTemplates']);
Route::apiResource('entity-template-group', EntityTemplateGroupController::class)
    ->parameters(['entity-template-group' => 'templateGroup']);
Route::apiResource('entity-template-item', EntityTemplateItemController::class)
    ->parameters(['entity-template-item' => 'templateItem']);

// AutoComplete
Route::get('country-list', [AutoCompleteController::class, 'findCountry'])
    ->name('country-list');
Route::get('priceplan-list', [AutoCompleteController::class, 'findPriceplan'])
    ->name('priceplan-list');

require __DIR__.'/auth.php';
