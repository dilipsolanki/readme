<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\FeedbackSuggestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackSuggestionController extends Controller
{
    public function saveFeedback(Request $request)
    {
        dd($request->reason);
        // FeedbackSuggestion::create([
        //     'user_id' => Auth::id(),
        //     'incorrect_suggestion' => 
        //     'reason' => 
        //     'recommendation' => 
        //     'tool' => 'spell-check'
        // ]);

        return response()->json(['success']);
    }
}
