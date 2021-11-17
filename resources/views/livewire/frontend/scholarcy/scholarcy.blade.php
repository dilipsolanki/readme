<div class="space-y-9 m-4 md:m-9">
    <div class="bg-white shadow p-4 flex flex-wrap">
        <div class="w-2/3 justify-center flex items-center border border-dashed border-gray-700 rounded bg-sweet-corn-200 relative h-auto">
            <div class="absolute top-0 left-0 bg-sweet-corn-600 h-40" id="showUploadProgress"></div>
        
            <form wire:submit.prevent="submit" enctype="multipart/form-data">
                <!-- <input type="file" 
                wire:model="pdfFile" 
                accept=".doc, .pdf" 
                class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"> -->

                <input
                    type="file"
                    wire:model.defer="scholarcyFile"
                    accept=".doc,.docx,.pdf"
                    class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                >
                <div class="p-6 absolute inset-0 m-auto text-lg flex items-center justify-center" id="fileUploadContainer">
                    <div class="flex justify-center items-center">
                        <x-bi-file-earmark-text class="text-blue-500 w-24 h-24"></x-bi-file-earmark-text>
                    </div>
                    <div class="ml-4 space-y-2 text-sm md:text-base">
                        <div class="cursor-pointer">
                            Drop your files anywhere to uploads
                        </div>
                        <div class="">
                            OR
                        </div>
                        <div class="text-blue-700 underline">
                            Click here to upload
                        </div>

                    </div>

                </div>
                <!-- <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button> -->
                <div class="p-6 absolute top-2 right-0 left-0 m-auto text-lg items-center justify-center hidden" id="showProgressContentContainer">
                    Upload in progress...
                </div>
            </form>
        </div>
        <div class="w-1/3 px-2" x-data="{
            selectedRowId: 0
        }">
            @if(count($documents) > 0)
                <table class="w-full">
                @foreach($documents as $document)
                    <tr x-bind:class="selectedRowId == {{ $document->id }} ? 'bg-gray-200' : ''">
                        <td class="px-2 py-1 border-b border-gray-300">{{ json_decode($document->request_payload, true)['file_name'] }}</td>
                        <td class="px-2 py-1 border-b border-gray-300">{{ Carbon\Carbon::parse($document->created_at)->diffForHumans() }}</td>
                        <td class="px-2 py-1 border-b border-gray-300 text-right">
                            <span class="bg-blue-200 hover:bg-blue-300 bg-opacity-50 cursor-pointer px-2 py-1 text-sm rounded"
                            @click="selectedRowId = {{ $document->id }}"
                            wire:click="viewThisDoc({{ $document }})">View</span>
                        </td>
                    </tr>
                @endforeach
                </table>
                <div class="mt-3">
                    {{ $documents->links() }}
                </div>
            @endif
        </div>
    </div>

    @if($isExtractingDoc && blank($displayResult))
    <div class="flex justify-center items-center w-full rounded md:absolute relative right-0 md:right-3">
        <div id="image-loader" class="w-full h-96"></div>
    </div>
    @endif

    @if(count($displayResult) > 0)
        <div class="w-full space-y-4 mt-6 md:mt-0">
        @foreach($displayResult as $outerKey => $row)
            <div x-data={show:true} class="rounded-sm" :key="{{ $outerKey }}">
                <div
                :class="{ 'rounded-t' : show , 'rounded' : !show}"
                class="py-3 px-2 bg-indigo-500 font-bold text-white cursor-pointer hover:bg-indigo-400 flex items-center justify-between"
                id= {{$outerKey}}
                @click="show=!show">
                    <span class="uppercase">{{ $outerKey }}</span>
                    <span x-show="show">
                        <x-bi-chevron-up></x-bi-chevron-up>
                    </span>
                    <span x-show="!show">
                        <x-bi-chevron-down></x-bi-chevron-down>
                    </span>
                </div>
            
                <div x-show="show" class="bg-white shadow rounded-b p-4">
                    @foreach($row as $key => $innerValue)
                    <div> <span class="font-bold"> {!! $key !!}  </span>: {!! $innerValue !!} </div>
                    @endforeach
                </div>
            </div>
            @endforeach
        </div>
    @else
    <div class="relative w-full h-screen">
        <div id="image-loader" class="w-full absolute md:w-4/5 top-0 md:-top-44" id="showProgressContentContainer">
        </div>
    </div>
    @endif

    
</div>

@push('scripts')
<script>
    window.addEventListener('show-image-loading', showImageLoadingAnimation);

    function showImageLoadingAnimation() {
        var animation = bodymovin.loadAnimation({
            
            container: document.getElementById('image-loader'), // required
            path: '/icons/document-scan.json', // required
            renderer: 'svg', // required
            loop: true, // optional
            autoplay: true, // optional
        });
    }
</script>
@endpush

<script>
    let input = document.querySelector('input[type="file"]');
    input.addEventListener('livewire-upload-start', () => {

    });
    input.addEventListener('livewire-upload-finish', () => {
        // document.getElementById('showProgressContentContainer').classList.add('hidden');
        // document.getElementById('showProgressContentContainer').classList.remove('flex');

        // document.getElementById('fileUploadContainer').classList.add('flex');
        // document.getElementById('fileUploadContainer').classList.remove('hidden');
    });
    input.addEventListener('livewire-upload-error', () => console.log('livewire-upload-error'));
    input.addEventListener('livewire-upload-progress', (event) => {
        document.getElementById('fileUploadContainer').classList.remove('flex');
        document.getElementById('fileUploadContainer').classList.add('hidden');
        document.getElementById('showProgressContentContainer').classList.remove('hidden');
        document.getElementById('showProgressContentContainer').classList.add('flex');
        document.getElementById('showUploadProgress').style.width = event.detail.progress + '%';
    });

</script>
