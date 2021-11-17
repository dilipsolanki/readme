 
<div class="flex space-x-4 h-3/4"  @if($status !='' && $status !='success' ) wire:poll.3000ms @endif>
<div class="flex-1  w-2/3 h-screen">
        <iframe class="w-9/12 h-5/6" src="/storage/app/public/{{$fileName}}"></iframe>
</div>
<div class="flex-1 h-screen">
<div class="space-x-4 ">
        <div class="inline-block h-9 w-7" >
            <a href= "{{ $xmlPath}}">
            <img id="downloadXML" src="/img/downloadXML.jpg"></a>
        </div>

        <div class="inline-block h-9 w-7">
            <a href= {{$jsonPath}}><img id="downloadJson" src="/img/downloadJson.png"></a>
        </div>

        <div class="inline-block h-9 w-7">
            <a href={{$textPath}}><img id="downloadTxt" src="/img/downLoadTxt.png"></a>
        </div>

</div>
<div>
        <h3>Content of the File</h3>
            </div>
            <div class="overflow-scroll h-4/6">
          
               {{$pdfText}} 
            </div>
    </div>
 
</div>

</div>

   
    


