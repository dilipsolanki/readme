<div class="flex space-x-4 h-3/4">
    <div class="flex-1 w-2/3 h-screen">
        <iframe
            class="w-11/12 h-5/6"
            src="/pdftoolsfile/MathsCalculation (1).pdf"
        ></iframe>
    </div>
    <div class="flex-1 h-screen">
        <div class="content-extraction-header">
            <div>Content of the File</div>
            <div class="space-x-4 ">
                <a href="{{ $xmlPath}}">
                    <img
                        id="downloadXML"
                        src="/img/downloadXML.jpg"
                    ></a>

                <a href={{$jsonPath}}><img
                        id="downloadJson"
                        src="/img/downloadJson.png"
                    ></a>

                <a href={{$textPath}}><img
                        id="downloadTxt"
                        src="/img/downLoadTxt.png"
                    ></a>
            </div>
        </div>
        <div class="overflow-scroll h-4/6">
            {!! $pdfText !!}
        </div>
    </div>
</div>