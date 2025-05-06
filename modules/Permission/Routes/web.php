<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your module. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group.
|
*/

Route::middleware('web')->group(function () {
    Route::get('/permission-test', function () {
        return config('permission.name');
    });
});
