<?php

use Illuminate\Support\Facades\Route;
use Modules\Controllers\PagesController;

\Illuminate\Support\Facades\Route::middleware('auth')->group(function () {

    Route::resource('pages', PagesController::class);

});
