<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\SpellCheckController;
use App\Http\Controllers\Frontend\LumiereController;
// use App\Http\Livewire\Frontend\Idan;
use App\Http\Controllers\Frontend\IdanController;
use App\Http\Controllers\Frontend\ImageCheckController;
// use App\Http\Livewire\Frontend\Ds;
use App\Http\Controllers\Frontend\HubbleController;
use App\Http\Controllers\Frontend\SubMenuController;
use App\Http\Controllers\Frontend\ErrorMarkingController;
use App\Http\Controllers\Frontend\DocumentStructuringController;
use App\Http\Controllers\Frontend\ScholarcyController;

Route::group(['as' => 'dashboard.'], function () {
    Route::group(['middleware' => ['auth', 'role_or_permission:administrator|member|spell-check|access spell check']], function () {
        Route::get('spell-check', [SpellCheckController::class, 'index'])->name('spell-check')->breadcrumb('Spell Check', 'dashboard');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|hubble|member']], function () {
        Route::get('hubble/{fetch_id?}', [HubbleController::class, 'index'])->name('hubble')->breadcrumb('Hubble', 'dashboard');
        // Route::get('hubble/{fetch_id}', [HubbleController::class, 'getHubbleDataFromFetchId'])->name('hubble.data_from_fetch_id');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|member|image-checker']], function () {
        Route::get('image-checker', [ImageCheckController::class, 'index'])->name('image-checker')->breadcrumb('Image Checker', 'dashboard');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|member|document-structuring']], function () {
        Route::get('document-structuring', [DocumentStructuringController::class, 'index'])->name('document-structuring')->breadcrumb('Document Structuring', 'dashboard');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|subject-area-detector']], function () {
        Route::get('subject-area-detector', [SubjectAreaDetectorController::class, 'index'])->name('subject-area-detector')->breadcrumb('SA Detector', 'dashboard');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|error-marking']], function () {
        Route::get('error-marking', [ErrorMarkingController::class, 'index'])->name('error-marking');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|hubble-edit-validation']], function () {
        Route::get('hubble-edit-validation', [HubbleEditValidationController::class, 'index'])->name('hubble-edit-validation');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|member|pdf-extraction']], function () {
        Route::get('pdf-extraction', [IdanController::class, 'index'])->name('pdf-extraction')->breadcrumb('PDF Extraction', 'dashboard');
    });

    // Route::group(['middleware' => ['auth', 'role:administrator|member']], function () {
    //     Route::get('about/{toolname}', [SubMenuController::class, 'aboutus'])->name('sub-menu-aboutus');
    //     Route::get('howto/{toolname}', [SubMenuController::class, 'howto'])->name('sub-menu-howto');
    // });

    Route::group(['middleware' => ['auth', 'role_or_permission:administrator|lumiere']], function () {
        Route::get('lumiere', [LumiereController::class, 'index'])->name('lumiere')->breadcrumb('Lumière', 'dashboard');
    });

    Route::group(['middleware' => ['auth', 'role:administrator|scholarcy']], function () {
        Route::get('scholarcy', [ScholarcyController::class, 'index'])->name('scholarcy')->breadcrumb('Scholarcy', 'dashboard');
    });
});
