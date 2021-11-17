<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ToolNavigation;
use App\Models\Tools;

class SubMenuController extends Controller
{

    public function index()
    {
        //return view('frontend.spell-check.index');
    }

    public function aboutus($request)
    {
        $name = 'dashboard.' . $request;
        $tool = Tools::where('route_name', '=', 'dashboard.' . $request)
            ->first();

        $toolNavigationData = ToolNavigation::where('nav_name', '=', 'about_us')
            ->where('tool_id', '=', $tool->id)
            ->first();

        $aboutUsContent = json_decode($toolNavigationData->content);
        $aboutUsContent = str_replace('<ol>', '<ol class="list-decimal list-inside space-y-2">', $aboutUsContent);
        $aboutUsContent = str_replace('<ul>', '<ul class="list-disc list-inside space-y-2">', $aboutUsContent);
        $aboutUsContent = str_replace('<strong>', '<strong class="text-lg font-bold text-gray-700">', $aboutUsContent);
        return view('frontend.tool-navigation.about-us', compact('aboutUsContent'));
    }

    public function howto($request)
    {

        $name = 'dashboard.' . $request;
        $tool = Tools::where('route_name', '=', 'dashboard.' . $request)
            ->first();

        $toolNavigationData = ToolNavigation::where('nav_name', '=', 'how_to')
            ->where('tool_id', '=', $tool->id)
            ->first();

        $howToContent = json_decode($toolNavigationData->content);
        $howToContent = str_replace('<ol>', '<ol class="list-decimal list-inside space-y-2">', $howToContent);
        $howToContent = str_replace('<ul>', '<ul class="list-disc list-inside space-y-2">', $howToContent);
        $howToContent = str_replace('<strong>', '<strong class="text-lg font-bold text-gray-700">', $howToContent);
        // dd(json_decode($howToContent));
        return view('frontend.tool-navigation.how-to', compact('howToContent'));
    }
}
