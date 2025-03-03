<?php

use Illuminate\Support\Facades\Route;
use Modules\PageBuilder\Controllers\ImageSearchController;
use Modules\PageBuilder\Controllers\ImageUploadController;
use Modules\PageBuilder\Controllers\PagesController;
use Modules\PageBuilder\Controllers\UpdateBlockController;
use Modules\PageBuilder\Controllers\VideoSearchController;
use Modules\PageBuilder\Controllers\VideoUploadController;
use Modules\PageBuilder\Controllers\ViewBuilderController;

Route::middleware('auth')->group(function () {
    Route::resource('pages', PagesController::class);
    Route::post('image-upload', ImageUploadController::class)
        ->name('image-upload');
    Route::get('image-search', ImageSearchController::class)
        ->name('image-search');
    Route::post('update-block/{id}', UpdateBlockController::class)
        ->name('update-block');
    Route::post('video-upload', VideoUploadController::class)
        ->name('video-upload');
    Route::get('video-search', VideoSearchController::class)
        ->name('video-search');
});

Route::get('{slug}', ViewBuilderController::class)
    ->name('view-builder');
