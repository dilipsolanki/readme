<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Hubble;
use Illuminate\Http\Request;

class HubbleFileUploadCallbackController extends Controller
{
    public function index(Request $request)
    {
        // $request = '{"status": "success", "fetch_id": "0840c720-fbff-11eb-a8e6-723dac6d0c80--7a1cabf2-c5ed-4b04-9140-5e65a3383898", "data": {"paragraph_details": [{"id": 1, "text": "Recent studies have suggested that manner in which HCT behaves biologically could be anticipated by examining lower toxicity enhancement, better pharmacokinetics markers, and signal intensity (SI) in sulfadoxine-enhanced images.", "metadata": {"rndkey": "p-0"}, "data": [{"is_valid": true, "id": 1, "offsets": [0, 228], "hypothesis": [{"id": 2, "rank": 1, "edits": [{"category": "Rephrase", "category_broad": "Readability", "category_umbrella": "Rephrase", "desc_category": "Suggests phrasing for improved clarity and readability", "desc_category_broad": "Looks for possible enhancements to improve the clarity and readability of the text", "display_edit_suppression": "default", "end": 75, "explanation": "Consider rephrasing \u201cmanner in which HCT behaves biologically\u201d as \u201cthe biological behavior of HCT\u201d for better readability.", "replacement": "the biological behavior of HCT", "start": 35}, {"category": "Word Choice", "category_broad": "Vocabulary", "category_umbrella": "Word usage", "desc_category": "Checks if the choice of words used is suitable in the context", "desc_category_broad": "Checks for correct word usage and selection", "display_edit_suppression": "default", "end": 161, "explanation": "Consider replacing \u201cpharmacokinetics\u201d with \u201cpharmacokinetic\u201d if appropriate in the given context.", "replacement": "pharmacokinetic", "start": 145}]}]}]}], "metadata": {"lang_version": "en-US"}, "job_config": {"lang_version": "en-us", "actions": ["m2", "m3", "e1", "x1", "p1", "d1"], "related_edits_merge": null, "chunk_edit_suppression_type": "lite"}}, "job_config": {"lang_version": "en-us", "actions": ["m2", "m3", "e1", "x1", "p1", "d1"], "related_edits_merge": null, "chunk_edit_suppression_type": "lite"}}';

        file_put_contents(storage_path() . '/hubble_callback.txt', $request);

        // $callbackData = json_decode($request);
        if ($request['fetch_id']) {
            Hubble::whereFetchId($request['fetch_id'])->update([
                'file_status' => $request['status']
            ]);
        }
    }
}
