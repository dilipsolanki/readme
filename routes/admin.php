<?php

use Illuminate\Support\Facades\Route;

Route::get('/admin/dashboard', function(){
    return 'Welcome Admin!';
})->name('admin.dashboard');