<?php

namespace App\Http\Livewire;

use App\Models\Hubble;
use App\Models\ToolDetailsSushi;
use App\Models\User;
use App\Models\HubbleExtended;
use Aws\Credentials\CredentialProvider;
use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Livewire\Component;
use Livewire\WithFileUploads;
use App\Jobs\ProcessHistory;

class HubbleMain extends Component
{
    use WithFileUploads;

    public $uploadedFile;
    public $uploadedFileName;
    public $isFetchIdForFile = false;

    public $hubble = [
        'id' => '',
        'originalMessage' => '',
        'fetch_id' => ''
    ];

    public $hubbleConfigOptions = [
        'recommended' => true,
        'model' => "2",
        'language_pref' => "1",
        'language_us_uk' => 'en-us',
        'spell_check' => false,
        'consistency_check' => false,
        'chunk_edits' => true,
        'chunk_edits_lite' => 'regular',
        'wordCount' => 0,
        'modelNotforCC' => "3",
    ];

    public $hubbling = false;
    public $hubbleRecord;
    public $finalData;
    public $hubbleReqData;
    public $suggestionsArray = ['data' => ''];
    public $showSuggestions = false;
    public $changedWord;
    public $checkingForExistingFetchId = false;
    public $revisionSummary = '';
    public $hubbleAuthor = '';
    public $showHideRevisionSummary = false;
    public $fileDownloadLink = '';
    protected $hubbleFileApiUrl = '';
    protected $hubbleContentApiUrl = '';
    protected $authorizationToken = '';

    public $hubbleModel;
    protected $listeners = [
        'success_rcvd_back_to_parent' => 'receiveDataAndPrepareSuggestion',
        'success_rcvd_for_file_now_back_to_parent' => 'receivedDataAndAllowFileDownload',
        'hubbleFeedbackSaved',
        'prepareParams',
        'processFileViaIdanAndGetThousandWords',
        'getRevisionSummary',
        'original_content_updated' => 'originalContentUpdated'
    ];

    public function mount($hubbleModel)
    {
        $this->authorizationToken = config('constants.hubble_auth_token');

        $this->hubbleFileApiUrl = config('constants.hubble_file_api_url');
        $this->hubbleContentApiUrl = config('constants.hubble_api_url');

        if ($hubbleModel && is_object($hubbleModel)) {
            $this->hubble = array_merge($this->hubble, $hubbleModel->toArray());

            $this->checkingForExistingFetchId = true;
            $this->hubbling = true;
            $this->reset('suggestionsArray', 'showSuggestions');

            $this->hubbleConfigOptions = json_decode($this->hubble['data'], true);

            if (!$this->hubble['entered_file_path']) {
                $this->isFetchIdForFile = false;
                $this->hubble['originalMessage'] = $this->hubble['content'];
                $this->hubbleConfigOptions['wordCount'] = str_word_count($this->hubble['entered_content']);
                $hubbleExtendedData = HubbleExtended::whereHubbleId($this->hubble['id'])->orderBy('id')->get()->toArray();
                $this->suggestionsArray = ['data' => $hubbleExtendedData];
                $this->showSuggestions = true;
            } else {
                $this->isFetchIdForFile = true;
                $this->uploadedFileName = $this->hubble['entered_file_name'];
            }

            // LYNX customization
            if ($this->hubbleConfigOptions['model'] == 3) {
                $this->hubbleContentApiUrl = config('constants.hubble_lynx_url');
                // 'https://test.hubble.cactuslabs.io/api/v1/submit';
                $this->hubbleFileApiUrl = config('constants.hubble_lynx_url');
                // 'https://test.hubble.cactuslabs.io/api/v1/submit';
                $this->authorizationToken = config('constants.hubble_lynx_token');
                // 'lAa0lNdzCFnUMZhtkNEN6SUGZoisVUHM2L4OZiyD2CA';
            }
        }
    }

    public function render()
    {
        // $this->consoleLog('foo');
        if ($this->checkingForExistingFetchId)
            $this->getRevisionSummary();
        return view('livewire.frontend.hubble.hubble-main');
    }

    public function resetValues()
    {
        $this->reset('hubbleConfigOptions');
    }

    public function originalContentUpdated($updatedContent)
    {
        $this->hubble['originalMessage'] = $updatedContent;
    }

    public function uploadFileAndHubbleFirstThousandWords()
    {
        $this->validate([
            'uploadedFile' => 'required|mimes:doc,docx', // 1MB Max
        ]);
        $this->hubbling = true;
        $fileName = time() . '.' . $this->uploadedFile->getClientOriginalExtension();
        // $this->uploadedFile->storeAs('local', $fileName);
        $this->uploadedFile->storeAs('local', $fileName);
        $this->emit('processFileViaIdanAndGetThousandWords', $fileName);
    }

    public function uploadFileAndStartHubble()
    {
        $this->validate([
            'uploadedFile' => 'required|mimes:doc,docx', // 1MB Max
        ]);
        $this->hubbling = true;
        $this->uploadedFileName = $this->uploadedFile->getClientOriginalName();
        $this->emit('prepareParams', $this->uploadedFileName);
    }

    public function processFileViaIdanAndGetThousandWords($fileName)
    {
        $basePath = base_path();
        $storagePath = storage_path();
        $jarFile  =   $basePath . '/Hubble/labs/read_content_idan.jar';
        $jarLicense  =   $basePath . '/Hubble/labs/javalicense.lic';

        $script = "java -jar $jarFile $jarLicense $storagePath" . '/app/local/' . $fileName;

        putenv('LANG=en_US.UTF-8');
        $result =  exec($script, $output, $error);
        if ($result) {
            $resultObject = json_decode($output[0], true);
            tap(collect($resultObject['data'])->take(1000))->map(function ($item, $value) {
                if ($item['is_valid']) {
                    $this->hubble['originalMessage'] .= $item['text'];
                }
            });
            $this->dispatchBrowserEvent('thousand-words-found');
            $this->letsHubble();
        } else {
            echo "Failed";
        }
    }

    public function checkHubbleConfigOptionsRecommended($userMessage)
    {
        $this->hubble['originalMessage'] = $userMessage;
        if ($this->hubbleConfigOptions['recommended'])
            $this->resetValues();
    }

    public function letsHubble()
    {
        $this->validate([
            'hubble.originalMessage' => 'required',
        ]);
        $this->hubbling = true;

        $this->reset('suggestionsArray', 'showSuggestions');
        $this->hubbleConfigOptions['wordCount'] = str_word_count($this->hubble['originalMessage']);

        $this->hubbleRecord = Hubble::create([
            'user_id' => Auth::id(),
            'content' => $this->hubble['originalMessage'],
            'entered_content' => $this->hubble['originalMessage'],
            'entered_file_name' => '',
            'entered_file_path' => '',
            'data' => json_encode($this->hubbleConfigOptions)
        ]);
        $this->hubbleReqData = $this->hubbleRecord;
        $this->hubble = array_merge($this->hubble, $this->hubbleRecord->toArray());
        $toolDetails = ToolDetailsSushi::whereAbbr('HB')->get();
        $sendJobData = [
            'user_id' => Auth::id(),
            'tool_id' => round($toolDetails[0]->tool_id),
            'tool_name' => $toolDetails[0]->tool_name,
            'request_payload' => collect($this->hubble)->toJson(),
            'is_file_content' => 0,
            'update_id' => $this->hubble['id'],
            'response_payload' => ''
        ];
        // dispatch the job on history queue
        ProcessHistory::dispatch($sendJobData)->onQueue('history');

        $this->emit('prepareParams');
    }

    public function prepareParams($fileName = null)
    {
        $this->authorizationToken = config('constants.hubble_auth_token');
        $this->hubbleFileApiUrl = config('constants.hubble_file_api_url');
        $this->hubbleContentApiUrl = config('constants.hubble_api_url');

        // For preProcessParam
        $withPreProcessParam = ["a1", "e1", "x1", "p1", "d1"];
        $withNoPreProcessParam = ["e1", "x1", "p1", "d1"];

        switch ($this->hubbleConfigOptions['model']) {
            case 1:
                array_unshift($withPreProcessParam, "m1");
                array_unshift($withNoPreProcessParam, "m1");
                break;
            case 2:
                array_unshift($withPreProcessParam, "m2", "m3");
                array_unshift($withNoPreProcessParam, "m2", "m3");
                break;
            case 3:
                array_unshift($withPreProcessParam, "m2", "m3", "m5");
                array_unshift($withNoPreProcessParam, "m2", "m3", "m5");
                $this->hubbleContentApiUrl = config('constants.hubble_lynx_url');
                // 'https://test.hubble.cactuslabs.io/api/v1/submit';
                $this->hubbleFileApiUrl = config('constants.hubble_lynx_url');
                // 'https://test.hubble.cactuslabs.io/api/v1/submit';
                $this->authorizationToken = config('constants.hubble_lynx_token');
                // 'lAa0lNdzCFnUMZhtkNEN6SUGZoisVUHM2L4OZiyD2CA';
                break;
            default:
        }

        // match($this->hubbleConfigOptions['model']){

        //     1 => array_unshift($withPreProcessParam, "m1"),
        //     1 => array_unshift($withNoPreProcessParam, "m1"),

        //     2 => array_unshift($withPreProcessParam, "m2", "m3"),
        //     2 => array_unshift($withNoPreProcessParam, "m2", "m3"),

        //     3 => array_unshift($withPreProcessParam, "m2", "m3", "m5"),
        //     3 => array_unshift($withNoPreProcessParam, "m2", "m3", "m5"),
        //     3 => $this->hubbleContentApiUrl = 'https://test.hubble.cactuslabs.io/api/v1/submit', 
        //     3 => $this->hubbleFileApiUrl = 'https://test.hubble.cactuslabs.io/api/v1/submit',
        //     3 => $this->authorizationToken = 'lAa0lNdzCFnUMZhtkNEN6SUGZoisVUHM2L4OZiyD2CA',

        // };

        //For autoDetect
        // $chunkSuppress = isset() ? true : false;
        $a1Value = isset($this->hubbleConfigOptions['spell_check']) ? $withPreProcessParam : $withNoPreProcessParam;

        // Extracting the lang version selected.
        $langVer = $this->hubbleConfigOptions['language_us_uk']; // en-us or en-gb


        // For Consistency Check if selected add the action b1 and 
        if (isset($this->hubbleConfigOptions['consistency_check']) && $this->hubbleConfigOptions['consistency_check'] == true) {
            array_unshift($a1Value, "b1");
            $this->hubbleFileApiUrl = config('constants.hubble_cc_url');
            // 'https://test.hubble.cactuslabs.io/api/v1/submit'
            $this->authorizationToken = config('constants.hubble_cc_token');
            // 'RJwqRznWUOTTNiycf6bnpFpKzg3ORb1dZXnfA4hRPQs';
        }

        $header = [
            'Accept'        => 'application/json',
            'Content-type'  => 'application/json',
            'Authorization' => 'Bearer ' . $this->authorizationToken,
        ];

        if ($this->hubbleConfigOptions['language_pref'] == 1) {
            $jobConfigArray = array(
                'chunk_edit_suppression' => $this->hubbleConfigOptions['chunk_edits'],
                // 'chunk_edit_suppression_type' => (isset($this->hubbleConfigOptions['chunk_edits_lite'])) ? 'lite' : 'regular'
            );
        } else {
            $jobConfigArray = array(
                'job_lang_version' => $langVer,
                'chunk_edit_suppression' => $this->hubbleConfigOptions['chunk_edits'],
                // 'chunk_edit_suppression_type' => (isset($this->hubbleConfigOptions['chunk_edits_lite'])) ? 'lite' : 'regular'
            );
        }

        if ($this->hubbleConfigOptions['chunk_edits']) {
            $jobConfigArray += array('chunk_edit_suppression_type' => $this->hubbleConfigOptions['chunk_edits_lite']);
        }

        // PREPARE FILE UPLOAD HUBBLE PARAMS
        if (isset($fileName)) {
            $bodyArray = [
                'actions'           => $a1Value,
                'suggestions_count' => 1,
                'metadata'          =>
                [
                    'k1' => 'v1',
                ],
                'job_type' => 'document',
                'file_name' => $fileName

            ];
        } else {
            $contentArray = explode("\n", $this->hubble['originalMessage']);
            foreach ($contentArray as $key => $val) {
                $newContentArray[] = array('text' => $val, 'metadata' => array('rndkey' => 'p-' . $key));
            }

            $bodyArray = [
                'actions'           => $a1Value,
                'suggestions_count' => 1,
                'metadata'          =>
                [
                    'lang_version' => 'en-US',
                ],
                'paragraphs'        => $newContentArray
            ];
        }

        $bodyArray['job_config'] = $jobConfigArray;

        $params = [
            'headers' => $header,
            'body'    => json_encode($bodyArray),
        ];

        try {
            $client = new Client([
                'verify' => false, // to be removed
            ]);

            if ($fileName) {
                $response = $client->post($this->hubbleFileApiUrl, $params);
            } else
                $response = $client->post($this->hubbleContentApiUrl, $params);
            $result = $response->getBody()->getContents();
            if ($result) {
                $jsonDecodedResult = json_decode($result);
                if ($fileName) {
                    $this->hubble['fetch_id'] = $this->uploadFileOnGivenUrl($jsonDecodedResult, $fileName);
                } else {
                    $this->hubble['fetch_id'] = $jsonDecodedResult->fetch_id;
                }
            }
        } catch (\Exception $e) {
            Log::info('Hubble API Exception Error ' . $e->getMessage());
        }

        if (isset($fileName)) {
            $this->reset('suggestionsArray', 'showSuggestions');
            $this->hubbleRecord = Hubble::create([
                'user_id' => Auth::id(),
                'content' => '',
                'entered_content' => '',
                'entered_file_name' => $fileName,
                'entered_file_path' => '/rnd-tools/hubble_user_file/' . $fileName,
                'data' => json_encode($this->hubbleConfigOptions),
                'fetch_id' => $this->hubble['fetch_id'],
                'file_status' => 'in-progress'
            ]);
            $this->hubble = array_merge($this->hubble, $this->hubbleRecord->toArray());
            // AWS

            $provider = CredentialProvider::instanceProfile();
            $memoizedProvider = CredentialProvider::memoize($provider);
            $s3 = new S3Client([
                'region'      => 'us-east-1',
                'version'     => '2006-03-01',
                'credentials' => $memoizedProvider
            ]);

            $keyname = 'rnd-tools/hubble_user_file/' . $fileName;
            try {
                $result = $s3->putObject([
                    'Bucket'     => 'rnd-genuse',
                    'Key'        => $keyname,
                    'SourceFile' => $this->uploadedFile->getRealPath()
                ]);
            } catch (S3Exception $e) {
                echo $e->getMessage() . PHP_EOL;
            }

            $this->emit('check_status_for_fetch_id_file_upload', $this->hubble);
        } else {
            // update the fetch_id in our database record for the respective hubble record
            if (!empty($jsonDecodedResult->fetch_id) && $jsonDecodedResult->status == 'success') {
                Hubble::whereId($this->hubble['id'])->update([
                    'fetch_id' => $jsonDecodedResult->fetch_id
                ]);
                $this->hubble['fetch_id'] = $jsonDecodedResult->fetch_id;
            }

            $this->emit('check_status_for_fetch_id', $this->hubble);
        }
        $this->dispatchBrowserEvent('fetch-id-rcvd-from-hubble', ['fetch_id_from_hubble' => $this->hubble['fetch_id']]);
        // $this->emit('check_status_for_fetch_id', $this->hubbleRecord);
    }

    public function receivedDataAndAllowFileDownload()
    {
        // $this->hubbling = false;
        $this->fileDownloadLink = 'ready to download';
        $this->hubbleFileDownloadLink(false);
    }

    public function hubbleFileDownloadLink($dispatchAndDownloadFile = true)
    {
        $this->authorizationToken = config('constants.hubble_auth_token');
        if ($this->hubbleConfigOptions['model'] == 3) {
            $this->authorizationToken = config('constants.hubble_lynx_token');
            // 'lAa0lNdzCFnUMZhtkNEN6SUGZoisVUHM2L4OZiyD2CA';
        }
        if ($this->hubbleConfigOptions['consistency_check'])
            $this->authorizationToken = config('constants.hubble_cc_token');
        // 'RJwqRznWUOTTNiycf6bnpFpKzg3ORb1dZXnfA4hRPQs';

        $params = [
            'headers' => [
                'Content-type'  => 'application/json',
                'Authorization' => 'Bearer ' . $this->authorizationToken,
            ]
        ];

        try {
            $clientFetch = new Client();

            if ($this->hubbleConfigOptions['model'] == 3 || $this->hubbleConfigOptions['consistency_check'] == true) {
                $responseNew = $clientFetch->request('GET', config('constants.hubble_lynx_fetch_url') . '?fetch_id=' . $this->hubble['fetch_id'] . '&get_json_data=True', $params);
            } else {
                // https://hubble.cactuslabs.io/api/v1/fetch
                $responseNew = $clientFetch->request('GET', config('constants.hubble_file_api_fetch_url') . '?fetch_id=' . $this->hubble['fetch_id'] . '&get_json_data=True', $params);
            }

            $result = $responseNew->getBody()->getContents();
            $jsonObject = json_decode($result);
            if ($dispatchAndDownloadFile)
                $this->dispatchBrowserEvent('hubble-file-is-ready-download-it', ['file_download_url' => $jsonObject->data->document_url]);
            $this->emit('success_rcvd_back_to_parent', $result);
        } catch (\Exception $e) {
            Log::info('Hubble API Exception Error when getting download link for ' . $this->hubble['fetch_id'] . '. And the error: ' . $e->getMessage());
        }
    }

    public function receiveDataAndPrepareSuggestion($receivedData)
    {
        $this->showHideRevisionSummary = false;
        $this->prepareSuggestedData(htmlspecialchars_decode($receivedData));

        $hubbleExtendedData = HubbleExtended::whereHubbleId($this->hubble['id'])->orderBy('id')->get()->toArray();
        if ($this->hubble['fetch_id'] && $this->checkingForExistingFetchId && count($hubbleExtendedData) > 0) {
            $this->suggestionsArray = ['data' => $hubbleExtendedData];
        } else {
            DB::table('hubble')
                ->where('id', $this->hubble['id'])
                ->update([
                    'content'    => $this->fixEncoding($this->finalData['formattedContent']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);

            $proposedSuggestionArray = $this->finalData['proposedSuggestionArray'];
            $proposedSuggestionArray = collect($proposedSuggestionArray)->map(function ($item) {
                $item['hubble_id'] = $this->hubble['id'];
                $item['changed_word'] = $item['replacement'];
                $item['original_word'] = $item['wordFound'];
                $item['user_id'] = Auth::id();
                $item['checked'] = 0;
                $item['created_at'] = Carbon::now();
                $item['updated_at'] = Carbon::now();
                return collect($item)->forget(['startOffset', 'endOffset', 'replacement', 'wordFound']);
            })->toArray();

            HubbleExtended::insert($proposedSuggestionArray);
            $this->suggestionsArray = ['data' => $proposedSuggestionArray];
            if ((is_array($this->hubble) && !$this->hubble['entered_file_path']) || (is_object($this->hubble) && !$this->hubble->entered_file_path)) {
                $this->hubble['originalMessage'] = $this->finalData['formattedContent'];
            }
        }
        if ((is_array($this->hubble) && !$this->hubble['entered_file_path']) || (is_object($this->hubble) && !$this->hubble->entered_file_path)) {
            $this->showSuggestions = true;
        }
        $this->hubbling = false;

        $this->emit('getRevisionSummary');
    }

    public function getRevisionSummary()
    {
        if ($this->suggestionsArray['data'] && is_array($this->suggestionsArray['data'])) {

            $this->revisionSummary = collect($this->suggestionsArray['data'])->groupBy(['category_broad', function ($item) {
                return $item['category'];
            }], true)->toArray();


            $this->revisionSummary = collect($this->revisionSummary)->map(function ($item) {
                $itemCount = collect($item)->map(function ($i) {
                    return count($i);
                });

                $item['count'] = $itemCount->sum();
                return $item;
            });

            $totalCount = collect($this->revisionSummary)->sum(function ($item) {
                return $item['count'];
            });

            $this->revisionSummary['totalCount'] = $totalCount;

            $hubbleDetails = Hubble::whereFetchId($this->hubble['fetch_id'])->first();
            if (!empty($hubbleDetails)) {
                $user = User::where('id', $hubbleDetails->user_id)->first();
                $this->hubbleAuthor = $user->name;
            }
            $this->revisionSummary = $this->revisionSummary->toArray();

            $toolDetails = ToolDetailsSushi::whereAbbr('HB')->get();
            $sendJobData = [
                'fetch_id' => $this->hubble['fetch_id'],
                'user_id' => Auth::id(),
                'tool_id' => round(@$toolDetails[0]->tool_id),
                'tool_name' => $toolDetails[0]->tool_name,
                'request_payload' => collect($this->hubble)->toJson(),
                'is_file_content' => 0,
                'update_id' => $this->hubble['id'],
                'response_payload' => collect($this->revisionSummary)->toJson()
            ];
            ProcessHistory::dispatch($sendJobData)->onQueue('history');


            $this->showHideRevisionSummary = true;
            $this->hubbling = false;
            $this->dispatchBrowserEvent('revision-summary-ready');
        }
    }

    function fixEncoding($in_str)
    {
        $cur_encoding = mb_detect_encoding($in_str);
        if ($cur_encoding == "UTF-8" && mb_check_encoding($in_str, "UTF-8")) {
            return $in_str;
        } else {
            return utf8_encode($in_str);
        }
    }

    public function prepareSuggestedData($receivedData)
    {
        // Decoding the json response.
        $jsonResponseObject = json_decode($receivedData);

        // Returning the array format.
        $contentText = $paragraphDetails = $proposedSuggestionArray = array();
        $languageResult = '';

        // Check if the paragraph details is available,
        // if set, take it the result array.
        $paragraphDetails = isset($jsonResponseObject->data->paragraph_details) ? $jsonResponseObject->data->paragraph_details : '';

        $languageResult = isset($jsonResponseObject->data->job_config->lang_version) ? $jsonResponseObject->data->job_config->lang_version : $jsonResponseObject->data->metadata->lang_version;

        // If there is content or paragraph available,
        // then suggestions array exists
        if (!empty($paragraphDetails)) {

            // For each paragraph result ,collect the suggestions.
            foreach ($paragraphDetails as $suggestionKey => $suggestionValue) {

                // Collect the paragraph array.
                $contentText = $paragraphDetails[$suggestionKey]->text;

                // Taking iterative paragraphs.
                // E,g: $proposedSuggestionArray['text0']['content'] = giventext
                $proposedSuggestionArray['text' . $suggestionKey]['content'] = $paragraphDetails[$suggestionKey]->text;

                // Check if suggestion data exist.
                /// @TODO check if it is always available, then remove the check.
                if (isset($suggestionValue->data)) {
                    $suggestedDataArray = $suggestionValue->data;
                }

                // Iterating to the suggestionArray to check if there
                // is suggestions array available.
                foreach ($suggestedDataArray as $dataKey => $dataVal) {

                    // Without is_valid no need to iterate.
                    if ($dataVal->is_valid) {

                        // Read edits counts of the selected paragraph in loop, if available.
                        if (is_array($dataVal->hypothesis[0]->edits) && count($dataVal->hypothesis[0]->edits) > 0) {
                            $editsArray = $dataVal->hypothesis[0]->edits;

                            // Iterate through all the suggestion given for the selected paragraph.
                            // Startoffset, EndOffset, category, wordFound, replacement, and explaination.
                            // datakey is link between right and leftside of screen.
                            // Note: Each paragraph offset starts with zero.
                            foreach ($editsArray as $editKey => $editVal) {

                                $startOffset = $editVal->start;
                                $endOffset = $editVal->end;
                                $category = '';
                                $proposedSuggestionArray['text' . $suggestionKey][$suggestionKey . $startOffset . $suggestionKey . $endOffset] = array(
                                    'startOffset' =>  $startOffset,
                                    'endOffset'   =>  $endOffset,
                                    'dataKey'     =>  $suggestionKey . '_' . $startOffset . '_' .  $endOffset,
                                    'category'    => ($editVal->category) == 'NA' ? 'No category available' : $editVal->category,
                                    'category_broad'    => ($editVal->category_broad) == 'NA' ? 'No category available' : $editVal->category_broad,
                                    'wordFound'   => $this->extractErrorWords($startOffset, $endOffset, $contentText),
                                    'replacement' => $startOffset == $endOffset ? $editVal->replacement . ' ' : $editVal->replacement,
                                    'explanation' => isset($editVal->explanation) ? $editVal->explanation : 'No Explanation',
                                );
                            } // end of for one suggestion

                        } // end of if valid

                    } // end of for each all suggestion

                } // end of if is valid

            } // end of for all paragraph array

        } // end of if paragraph exists

        // Assigning the array which consists of proposedSuggestionArray with
        // 'formattedContent' array of paragraph with each one.
        $formattedContent = $this->getFormattedContent($proposedSuggestionArray);

        // ReturningArray which will contain the formatted content.
        $proposedNewSuggestionArray = [];

        // Traversing each paragraph, extracting only the required keys
        // to display.
        // ProposedNewSuggestionArray will consists of all keys of suggestions and
        // formatted content array.
        foreach ($formattedContent as $fkey => $fval) {

            $tempFormattedContent = $fval;
            foreach ($fval as $fIkey => $fIval) {

                if (isset($fval['formattedContent'])) {

                    unset($tempFormattedContent['content']);
                    unset($tempFormattedContent['formattedContent']);

                    $proposedNewSuggestionArray[$fkey]['suggestions'] = $tempFormattedContent;
                    $proposedNewSuggestionArray[$fkey]['formattedContent'] = $fval['formattedContent'];
                }
            }
        }

        // For displaying right side of the screen.
        $displayArray = array();

        // For displaying the left side of the screen.
        $displayString = array();


        foreach ($proposedNewSuggestionArray as $pKey => $pVal) {
            //array_push($displayArray,$pVal['suggestions']);
            foreach ($pVal['suggestions'] as $pvkey => $pvVal) {
                array_push($displayArray, $pvVal);
            }
            array_push($displayString, $pVal['formattedContent']);
        }


        // Return the final array with status success.
        $this->finalData = [
            'formattedContent'        => implode("</br>", $displayString),
            'proposedSuggestionArray' => $displayArray,
            'status'                  => 'success',
            'languageResult'          =>  strtolower($languageResult)
        ];
    }

    public function extractErrorWords($startOffset, $endOffset, $content)
    {
        // Convert to UTF-8 for safe side
        iconv(mb_detect_encoding($content, mb_detect_order(), true), "UTF-8", $content);

        // Assign endOffset.
        $eos = $endOffset;

        // Assign startOffset
        $sos = $startOffset;

        // Extract the wordlength after a math of eos and sos.
        $wordLength = ($eos - $sos);

        // mb_substr is used to ensure the non english character is marked correctly.
        $extractedWord = mb_substr($content, $sos, $wordLength);

        // Replace br with none.
        $extractedWord = str_replace("</br>", "", $extractedWord);

        // Return the extracted word.
        return $extractedWord;
    }

    function mb_substr_replace($string, $replacement, $start, $length = null, $encoding = null)
    {
        if (extension_loaded('mbstring') === true) {
            $string_length = (is_null($encoding) === true) ? mb_strlen($string) : mb_strlen($string, $encoding);

            if ($start < 0) {
                $start = max(0, $string_length + $start);
            } else if ($start > $string_length) {
                $start = $string_length;
            }

            if ($length < 0) {
                $length = max(0, $string_length - $start + $length);
            } else if ((is_null($length) === true) || ($length > $string_length)) {
                $length = $string_length;
            }

            if (($start + $length) > $string_length) {
                $length = $string_length - $start;
            }

            if (is_null($encoding) === true) {
                return mb_substr($string, 0, $start) . $replacement . mb_substr($string, $start + $length, $string_length - $start - $length);
            }

            return mb_substr($string, 0, $start, $encoding) . $replacement . mb_substr($string, $start + $length, $string_length - $start - $length, $encoding);
        }

        return (is_null($length) === true) ? substr_replace($string, $replacement, $start) : substr_replace($string, $replacement, $start, $length);
    }

    public function getFormattedContent($result)
    {

        // @TODO remove this after testingonce
        $content = $result['text0'];

        //@TODO remove Tempcontent and $i after check
        $tempContent = "";

        // Using this to prepend to the offset of paragraph to distinguish between two lines.
        $i = 0;

        // $proposedSuggestionArray =  $result
        // Iterate through each elements of array.
        foreach (($result) as $resOuterkey => $resOuterVal) {

            // Extract the original content of the array.
            $contentSent = ($result[$resOuterkey]['content']);

            // Unset the content from the $result
            unset($resOuterVal['content']);


            // keySort (Sorting via key from smaller to higherno)
            ksort($resOuterVal);
            //dd(array_reverse($resOuterVal));
            // Traversing the suggestions array from desc to asc order
            foreach (array_reverse($resOuterVal) as $iKey => $iVal) {


                // Assign the end off set
                $eos = $iVal['endOffset'];

                // Assign the start offset
                $sos = $iVal['startOffset'];

                // @TODO remove this if not used
                $tempContent = "";

                // Get the wordlength from offset difference
                $wordLength = ($iVal['endOffset'] - $iVal['startOffset']);

                // If wordlength is greater than 0, then it is replacement
                // else it is an insertion.

                // using mb_susbtr to replace (for non-english characters)
                // Change the original contentSent with new replacement, such that new changes occurs on the
                // replaced content.
                if ($wordLength > 0) {
                    $replacement = mb_substr($contentSent, $sos, $wordLength);
                    $contentSent = $this->mb_substr_replace(
                        $contentSent,
                        '<a class="error-word" data-key="' . $i . '_'  . $sos . '_' . $eos . '" @click="selectedSuggestionNo!==\'' . $i . '_'  . $sos . '_' . $eos . '\' ? selectedSuggestionNo=\'' . $i . '_'  . $sos . '_' . $eos . '\' : selectedSuggestionNo=null">' . $replacement . '</a>',
                        $sos,
                        $wordLength
                    );
                } else {
                    $replacement = "?";
                    $contentSent = $this->mb_substr_replace(
                        $contentSent,
                        '<a class="error-word" data-key="' . $i . '_'  . $sos . '_' . $eos . '" @click="selectedSuggestionNo!==\'' . $i . '_'  . $sos . '_' . $eos . '\' ? selectedSuggestionNo=\'' . $i . '_'  . $sos . '_' . $eos . '\' : selectedSuggestionNo=null">' . $replacement . '</a>',
                        // '<a class="px-1 bg-red-100 border-b-2 border-red-500 highlight-insert" data-key="' . $i . '_'   . $sos . '_' . $eos . '">' . $replacement . '</a>',
                        $sos,
                        0
                    );
                } // endofIf

            } // end of one paragraph
            $i++; // Next iteration

            // to display new line in browser replacing with br
            $contentSent = str_replace("\n", "</br>", $contentSent);

            // Add new formattedContent to the given array result.
            $result[$resOuterkey]['formattedContent'] = $contentSent;
            $contentSent = "";
        }

        //@TODO remove and test
        $content['content'] = str_replace("\n", "</br>", $tempContent);

        // Return the result with new key for each paragraph.
        return $result;
    }



    public function hubbleFeedbackSaved($additionalOptionalParameters)
    {
        $this->emit('feedbackSaveUpdateHubble', 'Declined', 1, $additionalOptionalParameters['dataKey']);
    }

    public function uploadFileOnGivenUrl($apiResultObject, $fileName)
    {
        // retrive all the required variable
        if ($apiResultObject->status == "success") {

            $urlToUpload = $apiResultObject->upload_url;
            $fetchId = $apiResultObject->fetch_id;

            // $fileTempName = $_FILES['file']['tmp_name'];
            // $fileName = $_FILES['file']['name'];
            // Hard code file for testing.
            //$fileName = "/home/hafizak/Desktop/Hkkk.docx";
            // $file = fopen( $fileName, 'rb' );
            // $size = filesize( $fileName );
            // $fileData = fread( $file, $size );

            $storagePath = storage_path();
            $fileContent = file_get_contents($this->uploadedFile->getRealPath());

            $client = new Client([
                'verify' => false, // to be removed
            ]);

            $options['headers'] = [
                "x-amz-meta-fetch-id" => $fetchId,
                "x-amz-meta-token" => $this->authorizationToken,
                'Authorization' => $this->authorizationToken,
                "x-amz-acl" => "bucket-owner-full-control"
            ];
            $options['body'] = $fileContent;

            $response = $client->request('PUT', $urlToUpload, $options);
            $response->getBody();
            $response->getStatusCode();

            return $fetchId;

            /* if($response){
             return $this->getFileLink($fetchId);
          }*/
        }
    }
}
