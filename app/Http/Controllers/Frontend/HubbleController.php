<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Hubble;
use App\Models\User;
use App\Models\ModelHasRoles;
use Illuminate\Http\Request;

class HubbleController extends Controller
{
    public function index($fetch_id = null)
    {
       
        // return view('coming-soon');
        $hubble = null;
        if ($fetch_id) {
            $hubble = Hubble::whereFetchId($fetch_id)->first();
        }
        return view('frontend.hubble.index', [
            'fetch_id' => $fetch_id,
            'hubbleModel' => $hubble
            
        ]);
    }

    public function history(Request $request)
    {
        $search = $request->get('search');
        $getUserRoleId = ModelHasRoles::where('model_id',auth()->id())->pluck('role_id')->toArray();
        if(empty($search)){
            if (in_array(1, $getUserRoleId)) {
            $hubbleRecords=  Hubble::with('getHubbleAuthor')->select('id', 'user_id','fetch_id', 'content', 'file_status')->orderBy('updated_at','desc')->paginate(20);
            } else {
            $hubbleRecords = Hubble::with('getHubbleAuthor')->select('id', 'user_id','fetch_id', 'content', 'file_status')->whereUserId(auth()->id())->orderBy('updated_at','desc')->paginate(20);
            }
        } else {
            $hubbleRecords = Hubble::with('getHubbleAuthor')->select('id', 'user_id','fetch_id', 'content', 'file_status')->whereUserId(base64_decode($search))->orderBy('updated_at','desc')->paginate(20)->appends(['search'=>$search]);
        }

        /*Get all user Information */
        $getAllUsers = User::select(['id','name'])->get();

        return view('frontend.hubble.history', ['hubbleRecords' => $hubbleRecords,'userRole' => $getUserRoleId,'allUsers'=>$getAllUsers]);
        
    } 

    public function revisionSummary($fetch_id = null){
        $hubble = null;
        if ($fetch_id) {
            $hubble = Hubble::whereFetchId($fetch_id)->first();
            $user = User::where('id',$hubble->user_id)->first();
        }

        return view('frontend.hubble.revision-summary', [
            'user'=>$user 
        ]);
    }
    

    public function delete($recordId)
    {
        $hubbleRecord = Hubble::whereUserId(auth()->id())->findOrFail($recordId);
        $hubbleRecord->delete($recordId);
        return redirect()->back()->with('success', 'Record deleted successfully.');
    }
}
