<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageCheckController extends Controller
{
    public function index()
    {
        return view('frontend.image-checker.index');
    }
}
