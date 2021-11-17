<?php

namespace App\Http\Livewire\Frontend;

use Livewire\Component;
use Livewire\WithFileUploads;
use Aws\Credentials\CredentialProvider;
use Aws\Lambda\LambdaClient;
use Aws\S3\S3Client;
use Illuminate\Http\Request;
use App\Services\AWS\AwsLabsPlaygroundService;

class Idanmain extends Component
{
    use WithFileUploads;

    public $pdfFile, $fileName, $result, $realPath, $photo, $resultView, $message = "";
    public $fileNameWithPath = "fsdfsd";
    public $returnArray;
    public $fileNameToDisplay;
    public $xmlPath, $textPath, $jsonPath, $sectionDisplay, $pdfText = "";
    protected $listeners = [
        'idan-result',
        'extractData'
    ];
    public $isExtractingPDF = false;

    public function updatedPdfFile()
    {
        $this->validate([
            'pdfFile' => 'required|mimes:pdf|max:10000',
        ]);
        $this->isExtractingPDF = true;

        $this->fileName =  $this->pdfFile->getClientOriginalName();
        $this->realPath = $this->pdfFile->getRealPath();
        $this->pdfFilePath =  $this->realPath;

        $this->emit('extractData');
    }

    public function render()
    {
        return view('livewire.frontend.idan.idan-main');
    }

    public function extractData()
    {
        $fileName = time() . "_" . $this->fileName;

        $this->fileNameToDisplay = "storage/" . $fileName;

        $this->pdfFile->storeAs('public', $fileName);
        try {

            $uploadFile = $this->realPath;;
            $s3client = AwsLabsPlaygroundService::s3Client();
            $bucket = 'rnd-genuse';
            $keyname = 'labs-playground/docst-rnd-tools/' . $this->fileName;
            $finalKeyName = 'labs-playground/docst-idanfile/' . $this->fileName;
            $result = $s3client->putObject([
                'Bucket'     => $bucket,
                'Key'        => $keyname,
                'SourceFile' => $this->fileNameToDisplay
            ]);
            $client = AwsLabsPlaygroundService::lambdaClient();

            $payload = array(
                'get_response' => true,
                'source_bucket' => $bucket,
                'source_key' => $keyname,
                'store_json' => true,
                'final_bucket' => $bucket,
                'final_key' =>  $finalKeyName,
                'store_json' => true,
                'store_txt' => true,
                'additional_data' => array("process_id" => "rnd-tools-(test/prod)")
            );
            $function = 'nv-idan-extract-dev'; 
            $result = $client->invokeAsync([
                'FunctionName' => $function,
                'Payload' => json_encode($payload)
            ]);

            $responseG = $result->wait();
            $this->returnArray = json_decode($responseG['Payload']->getContents(), true);
            ////Added here
            $this->pdfText = '';
            $this->sectionDisplay = '';
            if (isset($this->returnArray) && is_array($this->returnArray)) {
                foreach ($this->returnArray as $key => $values) {
                    if ($key == 'response') {
                        $this->status = 'success';
                        foreach ($values as $ikey => $ivalues) {
                            foreach ($ivalues as $i2key => $i2values) {
                                if (isset($i2values['text'])) {

                                    $this->pdfText .= $i2values['text'] . "<br>";
                                    $this->sectionDisplay = $i2values['style_display'];

                                    $this->pdfText .= '<div><h7 style="color:#337ab7"><b></b></h7><span style="color: grey; font-size: small">'
                                        . $this->sectionDisplay . '</span></div><br>';
                                }
                            }
                        }
                    }

                    if ($key == 'paths') {
                        foreach ($values as $ikey => $ivalues) {
                            $this->xmlPath = $values['path_cermxml'];
                            $this->jsonPath = $values['path_json'];
                            $this->textPath =  $values['path_txt'];
                        }
                    }
                }
            }
            $this->isExtractingPDF = false;
        } catch (\Throwable $e) {
            \Log::info('Error near func. storeFileOnS3 - ' . $e->getMessage());
            return ['status' => 'failed', 'msg' => $e->getMessage()];
        }
    }
}
