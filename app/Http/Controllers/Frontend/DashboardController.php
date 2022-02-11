<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\FavoriteTool;
use App\Models\Tools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    public function index()
    {

        $tools = Cache::rememberForever('all_tools', function () {
            return Tools::whereIsEnabled(true)->orderBy('sort_number')->get();
        });
        $faveTools = FavoriteTool::whereUserId(auth()->user()->id)->get()->pluck('favorite_tools')->toArray();
        if (!empty($faveTools)) {
            $faveTools = explode(',', rtrim($faveTools[0], ','));
        }
        echo "my test";
        return view('dashboard', ['tools' => $tools, 'faveTools' => $faveTools]);
    }

    public function saveFavorites(Request $request)
    {
        FavoriteTool::updateOrCreate(
            ['user_id' => auth()->user()->id],
            ['favorite_tools' => $request->faves]
        );
    }
}
