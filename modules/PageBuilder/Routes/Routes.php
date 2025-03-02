<?php

use Illuminate\Support\Facades\Route;
use Modules\PageBuilder\Controllers\ImageSearchController;
use Modules\PageBuilder\Controllers\ImageUploadController;
use Modules\PageBuilder\Controllers\PagesController;
use Modules\PageBuilder\Controllers\UpdateBlockController;

Route::middleware('auth')->group(function () {

    Route::resource('pages', PagesController::class);

    Route::post('image-upload', ImageUploadController::class)
        ->name('image-upload');

    Route::get('image-search', ImageSearchController::class)
        ->name('image-search');

    Route::post('update-block/{id}', UpdateBlockController::class)
        ->name('update-block');
});
