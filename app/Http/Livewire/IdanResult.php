<?php

namespace App\Http\Livewire;


use Livewire\Component;
use Livewire\WithFileUploads;
use Aws\Credentials\CredentialProvider;
use Aws\Lambda\LambdaClient;
use Aws\S3\S3Client;
use Illuminate\Http\Request;

class IdanResult extends Component
{
    use WithFileUploads;
    public $pdfFile;
    public $fileName;
    public $realPath;
    public $pdfFilePath;
    public $returnArray;
    public $status = 'default';
    public $xmlPath, $textPath, $jsonPath , $pdfText = "";
     
    protected $listeners = [
        'idan_result' => 'storeFileOnS3'
    ];

    public function mount($fileName, $realPath, $returnArray)
    {
    
        $this->fileName = $fileName;
        $this->realPath = $realPath;
        $this->returnArray = $returnArray;
    }

    public function storeFileOnS3($fileName, $realPath, $returnArray)
    {
       
            $pdfText = '';
            $sectionDisplay = '';
            $xmlPath = '';$jsonPath = '';$textPath = '';
            if(isset($returnArray) && is_array($returnArray)){
                foreach($returnArray as $key => $values){
                    if($key == 'response') {
                        $this->status = 'success';
                        foreach($values as $ikey => $ivalues){
                            foreach($ivalues as $i2key => $i2values){
                                if(isset($i2values['text'])){

                                    $pdfText .= $i2values['text']."<br>";
                                    $sectionDisplay = $i2values['style_display'];

                                    $pdfText .= '<div><h7 style="color:#337ab7"><b></b></h7><span style="color: grey; font-size: small">'
                                        .$sectionDisplay.'</span></div><br>';

                                }
                            }
                        }
                    }

                    if ($key == 'paths'){
                        foreach($values as $ikey => $ivalues){
                            $xmlPath = $values['path_cermxml'];
                            $jsonPath = $values['path_json'];
                            $textPath =  $values['path_txt'];

                        }
                    }

                }
            }

            /**If no text appears **/
            if($pdfText == '')
                $pdfText = 'Oops! The uploaded file has unsupported content. Please contact admin.';
            $name = $realPath.'#zoom=50';

       

    }
    public function render()
    {
        $this->storeFileOnS3($this->fileName,$this->realPath, $this->returnArray);
        return view('livewire.frontend.idan.idan-result');
    }
}
