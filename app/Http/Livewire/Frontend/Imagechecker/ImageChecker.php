<?php

namespace App\Http\Livewire\Frontend\Imagechecker;

use Livewire\Component;
use Livewire\WithFileUploads;
use Aws\Credentials\CredentialProvider;
use Aws\Lambda\LambdaClient;
use Aws\S3\S3Client;
use Illuminate\Http\Request;
use App\Models\ImageCheckerModel;
use App\Services\AWS\AwsLabsPlaygroundService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Livewire\WithPagination;

//use Intervention\Image\Facades\Image;



class ImageChecker extends Component
{
    use WithFileUploads, WithPagination;

    public $isCheckingImage = false;
    public $imgFile, $fileName, $realPath, $fileExtension, $responseFlag;
    // public $fileNameWithPath = "fsdfsd";
    protected $memoizedProvider;
    public $labelArray = [];
    public $fileNameToDisplay, $keyname;
    public $imageWidth = 0.02, $imageHeight = 0.03;
    public $displayString = "The image does not contains identifiable faces and/or artifacts (tattoo's, birthmark's etc)";
    protected $listeners = [
        'extractInfoFromImage'
    ];

    public function render()
    {
        $images = ImageCheckerModel::orderBy('created_at', 'desc')->paginate(15);
        return view('livewire.frontend.imagechecker.image-checker', ['images' => $images]);
    }

    public function updatedImgFile()
    {
        $this->validate([
            'imgFile' => 'required|mimes:jpeg,png|max:10000',
        ]);
        $this->isCheckingImage = true;

        $this->fileName = time() . '_' . $this->imgFile->getClientOriginalName();
        $this->realPath = $this->imgFile->getRealPath();
        $this->fileExtension = $this->imgFile->getClientOriginalExtension();
        $this->fileNameToDisplay = "i-checker/" . $this->fileName;
        $this->imgFile->storeAs('image-checker-images', $this->fileName);
        $this->dispatchBrowserEvent('show-image-loading');
        $this->emit('extractInfoFromImage');
    }

    // Invoke the lambda function
    public function extractInfoFromImage()
    {
        try {
            // Upload file on s3 in the given bucket
            $this->uploadFileOnS3();

            // Add entry intoDB
            $imageChecker = $this->saveImageChecker();

            // Invoke the lambda function and get the result
            $response = $this->invokeLambdaFunction($imageChecker);

            // Set the variable true to display
            $this->isCheckingImage = true;

            // Set the result variables
            $this->displayResponse($response);
        } catch (\Throwable $e) {
            throwErrorDetails($e, __FILE__, __LINE__);
            // \Log::info('Error near func. storeFileOnS3 - ' . $e->getMessage());
            return ['status' => 'failed', 'msg' => $e->getMessage()];
        }
    }

    /**
     * saveImageChecker
     *
     * @return $imageChecker
     */
    public function saveImageChecker()
    {
        $imageChecker = ImageCheckerModel::create([
            'user_id'      => Auth::user()->id,
            'file_name'    => $this->fileName,
            's3_file_path' => $this->keyname,
            'width'        => $this->imageWidth,
            'height'       => $this->imageHeight,
            'extension'    => $this->fileExtension,
            'status'       => 'processing'
        ]);
        // $imageChecker->save();
        return $imageChecker;
    }


    /**
     * displayResponse
     *
     * @param  mixed $response
     * @return void
     */
    public function displayResponse($response)
    {
        $this->isCheckingImage = false;
        $this->responseFlag = $response['flagged'];

        if ($this->responseFlag) {
            $this->displayString = "The image does contains identifiable faces and/or artifacts (tattoo's, birthmark's etc)";
        }
        $this->labelArray = $response['labels'];
       
    }

    /**
     * invokeLambdaFunction
     *
     * @return void
     */
    public function invokeLambdaFunction($imageChecker)
    {

        // Load settings from config
        $settings = config('constants.image_checker');
        $client = AwsLabsPlaygroundService::lambdaClient();

        // Set payLoad via settings variable
        $payload = array(
            's3_key' => $this->keyname,
            'auth_key' => $settings['auth_key'],
            'callback_url' => $settings['callback_url'],
            'request_id' => $settings['request_id']
        );

        // Set the function name
        $function =  $settings['function_name'];

        // Set the resultNew
        $resultNew = $client->invoke([
            'FunctionName' => $function,
            'Payload' => json_encode($payload)
        ]);

        $response = json_decode($resultNew['Payload']->getContents(), true);

        // Update the record with response and success
        if ($resultNew) {
            $imageChecker->data = json_encode($response);
            $imageChecker->status = 'success';
        }
        $imageChecker->save();


        return $response;
    }


    /**
     * uploadFileOnS3
     *
     * @return void
     */
    public function uploadFileOnS3()
    {
        $bucket = 'rnd-genuse';
        $s3client = AwsLabsPlaygroundService::s3Client();
        $this->keyname = 'labs-playground/image-checker/' . $this->imgFile->getClientOriginalName();
        // put file  in the given object
        $result = $s3client->putObject([
            'Bucket'     => $bucket,
            'Key'        => $this->keyname,
            'SourceFile' => $this->realPath
        ]);

        return $result;
    }

    public function showSelectedImage($selectedImage)
    {
        $this->fileNameToDisplay = "i-checker/" . $selectedImage['file_name'];
        $decodedData = json_decode($selectedImage['data']);
        $this->labelArray = $decodedData->labels;
        $this->responseFlag = $decodedData->flagged;
        if ($this->responseFlag) {
            $this->displayString = "The image does contains identifiable faces and/or artifacts (tattoo's, birthmark's etc)";
        }
    }
}
