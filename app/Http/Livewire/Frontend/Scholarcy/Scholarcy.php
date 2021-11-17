<?php

namespace App\Http\Livewire\Frontend\Scholarcy;

use App\Jobs\ProcessHistory;
use App\Models\CentralStoringHistory as ModelsCentralStoringHistory;
use App\Models\ToolDetailsSushi;
use App\Services\AWS\AwsLabsPlaygroundService;
use Livewire\Component;
use Livewire\WithFileUploads;
use Aws\Credentials\CredentialProvider;
use Aws\Lambda\LambdaClient;
use Aws\S3\S3Client;
use App\Models\CentralStoringHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Livewire\WithPagination;

class Scholarcy extends Component
{
    use WithFileUploads, WithPagination;

    // Declaring the public access variable and protected listeners array.
    public $scholarcyFile, $uploadedFileName, $uploadedFileRealPath,
        $uploadedFileExtension, $s3FileURL, $invokeLambdaFunctionResponse;
    public $displayResult = [];
    public $isExtractingDoc = false;

    // Constanct bucket
    public $bucket = 'rnd-genuse';
    protected $memoizedProvider;
    protected $listeners = ['uploadScholarcyFile'];
    protected $historyUpdateId;

    /**
     * render
     * This function renders the html of scholarcy and
     * return the appropriate and selected blade.
     * @return void
     */
    public function render()
    {
        $documents = CentralStoringHistory::whereToolName('Scholarcy')->orderByDesc('created_at')->simplePaginate(7);
        return view('livewire.frontend.scholarcy.scholarcy', ['documents' => $documents]);
    }


    /**
     * updatedscholarcyFile
     * This function sets the global variables of class
     * and emits the listener to save the file on S3
     * @return void
     */
    public function updatedscholarcyFile()
    {
        $this->isExtractingDoc = true;
        $toolDetails = ToolDetailsSushi::whereAbbr('SCH')->get();
        $this->historyUpdateId = CentralStoringHistory::whereToolName($toolDetails[0]->tool_name)->whereUserId(user()->id)->count() + 1;

        $this->reset('displayResult');

        $sendJobData = [
            'user_id' => user()->id,
            'tool_id' => round(@$toolDetails[0]->tool_id),
            'tool_name' => $toolDetails[0]->tool_name,
            'request_payload' => json_encode([
                'file_name' => $this->scholarcyFile->getClientOriginalName()
            ]),
            'is_file_content' => 1,
            'update_id' => $this->historyUpdateId
        ];

        ProcessHistory::dispatch($sendJobData)->onQueue('history');

        $this->uploadedFileName = $this->scholarcyFile->getClientOriginalName();
        $this->uploadedFileRealPath = $this->scholarcyFile->getRealPath();
        // $this->uploadedFileExtension = $this->scholarcyFile->getClientOriginalExtension();
        $this->dispatchBrowserEvent('show-image-loading');
        $this->emit('uploadScholarcyFile', $this->historyUpdateId);
    }

    /**
     * uploadScholarcyFile
     * This function stores the file on S3
     * @return void
     */
    public function uploadScholarcyFile($historyUpdateId)
    {
        $this->historyUpdateId = $historyUpdateId;

        // Upload File on S3
        $this->uploadFileOnS3();

        // Invoke the function.
        $this->invokeLambdaFunction();

        // Display Response.
        $this->displayResponse();
    }
    /**
     * uploadFileOnS3
     *
     * @return void
     */
    public function uploadFileOnS3()
    {
        $s3client = AwsLabsPlaygroundService::s3Client();
        $this->keyname = 'labs-playground/scholarcyFiles/' . $this->scholarcyFile->getClientOriginalName();

        // put file  in the given object
        $result = $s3client->putObject([
            'Bucket'     => $this->bucket,
            'Key'        => $this->keyname,
            'SourceFile' => $this->uploadedFileRealPath
        ]);

        // Get the s3FileURL
        $this->s3FileURL = $result['ObjectURL'];
    }

    /**
     * invokeLambdaFunction
     *
     * @return void
     */
    public function invokeLambdaFunction()
    {
        try {
            $client = AwsLabsPlaygroundService::lambdaClient();

            /// @TODO Uncomment the actuL FILE URL // 
            $payload = array(
                'url' =>  AwsLabsPlaygroundService::getPreSignedS3Url($this->bucket, $this->keyname),
                // "bucket" => $this->bucket,
                // "object" =>  $this->keyname
            );

            // Set the resultNew
            $resultNew = $client->invoke([
                'FunctionName' => config('constants.scholarcy.function_name'),
                'Payload' => json_encode($payload),
            ]);

            $this->invokeLambdaFunctionResponse = json_decode($resultNew['Payload']->getContents(), true);
        } catch (\Throwable $e) {

            return ['status' => 'failed', 'msg' => 'Scholarcy Failed with' . $e->getMessage()];
        }
    }

    /**
     * displayResponse
     * This function uses the response of LambdaFunction and 
     * displays the data accordingly.
     * @param  mixed $resultResponse
     * @return void
     */
    public function displayResponse()
    {
        $this->displayResult = [];
        foreach ($this->invokeLambdaFunctionResponse as $key => $value) {
            if ($key === 'body') {
                foreach ($value as $bKey => $bValue) {
                    $this->displayResult['Meta Data']['Author'] = isset($value['metadata']['author']) ? $value['metadata']['author'] : 'NA';
                    $this->displayResult['Meta Data']['Abstract'] = isset($value['metadata']['abstract']) ? $value['metadata']['abstract'] : 'NA';

                    // $this->displayResult['Summary'] = implode(' ', $value['summary']);
                    // $this->displayResult['Highlights'] = implode(' ', $value['highlights']);
                    // dd($value['highlights'], $this->displayResult['Summary']);
                    // Get Summary
                    foreach ($value['summary'] as $summaryKey => $summaryValue)
                        $this->displayResult['Summary'][$summaryKey + 1] = $summaryValue;

                    // Get Highlights
                    foreach ($value['highlights'] as $highlightsKey => $highLightsValue)
                        $this->displayResult['Highlights'][$highlightsKey + 1] = $highLightsValue;
                }
            }
        }
        // End of For

        $toolDetails = ToolDetailsSushi::whereAbbr('SCH')->get();
        $sendJobData = [
            'user_id' => user()->id,
            'tool_id' => round(@$toolDetails[0]->tool_id),
            'tool_name' => $toolDetails[0]->tool_name,
            'request_payload' => json_encode([
                'file_name' => $this->scholarcyFile->getClientOriginalName()
            ]),
            'response_payload' => collect($this->displayResult)->toJson(),
            'is_file_content' => 1,
            'update_id' => $this->historyUpdateId
        ];

        ProcessHistory::dispatch($sendJobData)->onQueue('history');
    }

    public function viewThisDoc(CentralStoringHistory $document)
    {
        $this->displayResult = json_decode($document->response_payload, true);
    }
}
