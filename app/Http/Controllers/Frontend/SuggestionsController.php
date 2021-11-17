<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\IncorrectSuggestions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SuggestionsController extends Controller
{
    public function saveSuggestions(Request $request)
    {
        // 'user_id' => Auth::user()->id,
        //     'incorrect_suggestion' => strip_tags($request->get('incorrect_word')),
        //     'suggestion' => strip_tags($request->get('suggestion')),
        //     'selected_word' => $request->selected_word,
        //     'type'           => 'spell-check',

        IncorrectSuggestions::create([
            'user_id' => Auth::id(),
            'selected_word' => $request->selected_word,
            'incorrect_word' => $request->incorrect_word,
            'suggestions' => $request->suggestions,
            'tool' => 'spell-check'
        ]);

        return response()->json(['success']);
    }
}
