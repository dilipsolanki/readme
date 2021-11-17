<?php


namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\ToolNavigation;
use App\Models\Tools;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;


class ToolNavigationController extends Controller
{
    public $toolName;
    public $toolsArray;
    
      public function index()
    {
        
    
    
        // @TODO confirm if we need to move to repo facade
        $toolNavigation = DB::table("tool_navigation as tn")
        ->leftJoin("tools as t", function($join){
            $join->on("t.id", "=", "tn.tool_id");
        })
        ->select("tn.id", "nav_name", "name", "tn.content")
        ->orderBy("id","desc")
        ->get();

        $toolNavigationCount = 0;
        $toolNavigationArray = array();
        foreach($toolNavigation as $key => $toolNavigationValue){
            
                $toolNavigationCount++;
                $toolNavigationArray[$toolNavigationValue->id] =
                array('nav_name' => ucfirst($toolNavigationValue->nav_name),
                'tool_name' => $toolNavigationValue->name
                );
                
        }
       
   
          
        return view('backend.navigation.index',
         compact('toolNavigationArray', 'toolNavigationCount'));
    }

      /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      
        // Get Tools id and name to be displayed.
        $tools = Tools::get();
        foreach($tools as $key => $tool){
            $toolsArray[$tool['id']] = $tool['name'];
        }
        return view('backend.navigation.create')->with(
            'routes', $toolsArray);
    }

    /***
     * 
     */
    public function store(Request $request)
    {
       

        $navigationName= $request['navigation'];
        $toolId= $request['route_name'];
        $content= $request['content'];

        $toolName = Tools::find($toolId);
                   
        $tool = ToolNavigation::create([
            'nav_name' => $navigationName,
            'tool_id' => $toolId,
            'content' => json_encode($content),
        ]);

        //dd($tool);

        return redirect()->route('backend.navigation.index')
        ->with(
            'flash_message',
            '<em>' .$navigationName .  ' added for '. $toolName->name .'</em>'
        );
    }


     /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
  
      public function edit($id){
       
     
        /* Retrive ToolNavigation Info */
        $toolNavigationEdit = ToolNavigation::findOrFail($id);
 
        /* Fetch Tool Id */
        $toolId = $toolNavigationEdit->tool_id;
       
        /* Retreive ToolsInfo */
        $toolEdit = Tools::findOrFail($toolId);
       
        /* Add ToolName to ToolNavigationArray */
        $toolNavigationEdit->toolName = $toolEdit->name;

        $toolNavigationEdit->content = json_decode($toolNavigationEdit->content);
        
        
     
        return view('backend.navigation.edit')->with(
            'toolNavigationEdit', $toolNavigationEdit);
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
       
        $toolNavigationUpdate = ToolNavigation::findOrFail($id);
   
        $input = $request->all();
    
        $input['content'] = json_encode($input['content']);
        
        $toolNavigationUpdate->fill($input)->save();

        return redirect()->route('backend.navigation.index')
            ->with(
                'flash_message',
                'Tool <em>' . $toolNavigationUpdate->nav_name . '</em> updated!'
            );
    }

    /**
     * Delete the record functionality
     */
    public function destroy($id){

        $toolNavigation = ToolNavigation:: findOrFail($id);
        

        $toolNavigation->delete();
        
        return redirect()->route('backend.navigation.index')
            ->with(
                'flash_message',
                'Navigation deleted!'
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
        return redirect('backend.navigation.index');
    }



    
}
