<?php

namespace App\Http\Livewire\Frontend\DocumentStructure;

use Livewire\Component;
use Livewire\WithFileUploads;
use Aws\Credentials\CredentialProvider;
use Aws\Lambda\LambdaClient;
use App\Models\DocumentStructuring;
use App\Models\DocumentStructuringSuggestion;
use App\Services\AWS\AwsLabsPlaygroundService;
use Aws\S3\S3Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Livewire\WithPagination;

class DocumentStruct extends Component
{
    use WithFileUploads, WithPagination;

    public $inputFile, $fileName, $dsId,
        $result, $realPath, $resultView, $message = "";
    public $responseResult;
    protected $listeners = [
        'storeDocumentStructuringFile'
    ];
    protected $keyname;
    public $isExtractingDoc = false;
    public $filtered = [];
    protected $documentStructureDBRecord;
    protected $documentStructuringSuggestionsFromDB;

    public function render()
    {
        $documents = DocumentStructuring::where('status', '=', 'success')->orderByDesc('created_at')->simplePaginate(7);
        return view('livewire.frontend.document-structure.document-struct', ['documents' => $documents]);
    }

    public function viewThisDoc(DocumentStructuring $document)
    {
        $this->reset('filtered', 'documentStructuringSuggestionsFromDB');
        $this->dsId = $document->id;
        $this->displayResponse(json_decode($document->data, true));
    }


    public function updatedinputFile()
    {

        $this->validate([
            'inputFile' => 'required|max:10000',
        ]);
        $this->reset('filtered');

        $this->isExtractingDoc = true;
        // $this->fileName =  $this->inputFile->getClientOriginalName();
        // $this->realPath = $this->inputFile->getRealPath();
        // $this->inputFilePath =  $this->realPath;
        $this->dispatchBrowserEvent('show-image-loading');
        $this->emit('storeDocumentStructuringFile');
    }


    public function storeDocumentStructuringFile()
    {
        $this->storeFileOnS3($this->inputFile);

        $this->saveDetailsInDB();

        $this->invokeLambdaFunction();
    }

    /**
     * storeFileOnS3
     * This function stores the file on AWS s3 bucket and executes the lambda
     * function and return the response or exception respectively.
     * @param  mixed $file
     * @return void
     */
    public function storeFileOnS3($file)
    {
        $s3client = AwsLabsPlaygroundService::s3Client();
        $this->keyname = 'labs-playground/document-structuring/' . $this->inputFile->getClientOriginalName();

        // Upload data.
        $s3client->putObject([
            'Bucket'     => 'rnd-genuse',
            'Key'        => $this->keyname,
            'SourceFile' => $this->inputFile->getRealPath(),
        ]);
    }

    protected function saveDetailsInDB()
    {
        //store record in document_structuring table
        $this->documentStructureDBRecord = DocumentStructuring::create([
            'user_id'      => Auth::user()->id,
            'file_name'    => $this->inputFile->getClientOriginalName(),
            's3_file_path' => $this->keyname,
            'status'       => 'pending'
        ]);
    }

    protected function invokeLambdaFunction()
    {
        $client = AwsLabsPlaygroundService::lambdaClient();

        $payload = array(
            'get_response' => true,
            'source_bucket' => 'rnd-genuse',
            'source_key' => $this->keyname,
            'additional_data' => array("process_id" => "rnd-tools-(test/prod)")
        );

        $result = $client->invoke([
            'FunctionName' => config('constants.document_structuring.function_name'),
            'Qualifier' => 'dev',
            'Payload' => json_encode($payload)
        ]);

        $response = json_decode($result['Payload']->getContents(), true);

        if ($response) {
            $this->documentStructureDBRecord->data = json_encode($response['data']);
            $this->documentStructureDBRecord->status = $response['status'];
        }
        $this->documentStructureDBRecord->save();

        $this->dsId = $this->documentStructureDBRecord->id;
        $this->displayResponse($response['data']);
        $this->isExtractingDoc = false;
    }


    /**
     * suggestion
     *
     * @param  mixed $id
     * @param  mixed $type
     * @param  mixed $index
     * @return void
     */
    public function suggestion($type, $index)
    {
        DocumentStructuringSuggestion::updateOrCreate(
            [
                'document_structuring_id' => $this->dsId,
                'user_id'                 => user()->id,
                'index'                   => $index,
            ],
            [
                'type'                    => $type
            ]
        );

        // return ['status' => 'success', 'msg' => 'Your suggestion is recorded successfully'];
    }

    /**
     * displayResponse
     *
     * @param  mixed $data
     * @return void
     */
    public function displayResponse($data)
    {
        $this->documentStructuringSuggestionsFromDB = DocumentStructuringSuggestion::whereDocumentStructuringId($this->dsId)->get()->pluck('type', 'index');
        if (!is_null($data)) {
            $rows = $data;

            if (isset($rows['style_mapping'])) {
                $this->filtered = array_filter($rows['style_mapping'], function ($row) {
                    return trim($row['text']) != '';
                });
            } else {
                $this->filtered = array_filter($rows, function ($row) {
                    return trim($row['text']) != '';
                });
            }
        }
    }


    /**
     * saveType
     *
     * @param  mixed $rowId
     * @param  mixed $type
     * @return void
     */
    public function saveType($rowId, $type)
    {
        $this->suggestion($type, $rowId);
        $this->documentStructuringSuggestionsFromDB = DocumentStructuringSuggestion::whereDocumentStructuringId($this->dsId)->get()->pluck('type');
        $tempDoc = DocumentStructuring::findOrFail($this->dsId);
        $this->reset('filtered');
        $this->displayResponse(json_decode($tempDoc->data, true));
        // $this->dispatchBrowserEvent('show-suggestion-message', ['row_id' => $rowId, 'type' => ucfirst($type)]);
    }
}
