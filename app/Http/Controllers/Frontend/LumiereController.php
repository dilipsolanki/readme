<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use GuzzleHttp\Client;
use Illuminate\Http\Response;
use stdClass;

class LumiereController extends Controller
{
    public $queryString;
    protected $totalTokensToAppendPrepend = 6;
    protected $asteriskPosition = 0;
    public $outputSynonmys = [];

    public function index()
    {
        // if (user()->hasRole('administrator'))
        return view('frontend.lumiere.index-new');
        // return view('frontend.lumiere.index');
    }
}
