<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Tools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;


class ToolsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tools = Tools::orderBy('sort_number')->get(); //Get all tools
        return view('backend.tools.index')->with('tools', $tools);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $routes = collect(Route::getRoutes())->map(function ($route) {
            if (Str::startsWith($route->getName(), 'dashboard')) {
                return $route->action['as'];
            }
        })->filter(function ($value) {
            return !is_null($value);
        });

        return view('backend.tools.create', ['routes' => $routes]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validate name, email and password fields
        $this->validate($request, [
            'name' => 'required|max:120',
            'short_desc' => 'required|max:320',
            'route_name' => 'required|unique:tools',
            'owner' => 'required',
            'sort_number' => 'required|integer',
            'primary_api_endpoint' => 'url'
        ]);

        $tool = Tools::create([
            'name' => $request->name,
            'short_desc' => $request->short_desc,
            'route_name' => $request->route_name,
            'owner' => $request->owner,
            'is_enabled' => isset($request->is_enabled) ? 1 : 0,
            'sort_number' => $request->sort_number,
            'primary_api_endpoint' => $request->primary_api_endpoint,
            'is_locked' => isset($request->is_locked) ? 1 : 0
        ]);

        // Clear all_tools from cache
        Cache::forget('all_tools');


        return redirect()->route('backend.tools.index')
            ->with(
                'flash_message',
                'Tool <em>' . $tool->name . '</em> added!'
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return redirect('backend.tools.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $routes = collect(Route::getRoutes())->map(function ($route) {
            if (Str::startsWith($route->getName(), 'dashboard')) {
                return $route->action['as'];
            }
        })->filter(function ($value) {
            return !is_null($value);
        });

        $tool = Tools::findOrFail($id);

        return view('backend.tools.edit', compact('tool', 'routes'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tool = Tools::findOrFail($id); //Get tool with the given id

        //Validate name, email and password fields
        $this->validate($request, [
            'name' => 'required|max:120',
            'short_desc' => 'required|max:320',
            'route_name' => 'required',
            'owner' => 'required',
            'sort_number' => 'required|integer',
        ]);

        $input = $request->only(['name', 'short_desc', 'route_name', 'owner', 'is_enabled', 'sort_number', 'primary_api_endpoint','is_locked']);
        $input['is_enabled'] = isset($input['is_enabled']) ? 1 : 0;
        $input['is_locked'] = isset($input['is_locked']) ? 1 : 0;
        $input['route_name'] = $input['route_name'];

        $tool->fill($input)->save();

        // Clear all_tools from cache
        Cache::forget('all_tools');

        return redirect()->route('backend.tools.index')
            ->with(
                'flash_message',
                'Tool <em>' . $tool->name . '</em> updated!'
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Tools::findOrFail($id);
        $role->delete();

        return redirect()->route('backend.tools.index')
            ->with(
                'flash_message',
                'Tool deleted!'
            );
    }

}
