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
                    wire:model.defer="inputFile"
                    accept=".doc,.docx"
                    class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                >
                <div class="p-6 absolute inset-0 m-auto text-lg flex items-center justify-center" id="fileUploadContainer">
                    <div class="flex justify-center items-center">
                        <x-bi-file-earmark-word class="text-blue-500 w-24 h-24"></x-bi-file-earmark-word>
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
                        <td class="px-2 py-1 border-b border-gray-300">{{ $document->file_name }}</td>
                        <td class="px-2 py-1 border-b border-gray-300">{{ $document->status }}</td>
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

    @if($isExtractingDoc && blank($filtered))
    <div class="flex justify-center items-center w-full rounded md:absolute relative right-0 md:right-3">
        <div id="image-loader" class="w-full h-96"></div>
    </div>
    @endif

    @if(count($filtered) > 0)
    <div class="mt-4 bg-white p-4 rounded shadow">
        <table class="w-full table-auto">
        @foreach($filtered as $row)
            <tr class="@if(isset($filtered['style_mapping']) && $decodedData->style_mapping) bg-red-100 @endif border-b border-gray-400">
                <td class="p-2">
                    {{isset($row['style_display']) ? $row['style_display'] : $row['style']}}
                </td>
                <td class="text-center p-2">:</td>
                <td class="tracking-wider py-3 leading-7">{{ $row['text'] }}</td>
                <td class="w-24">
                    <div class="flex space-x-3 items-center justify-center" id="ds_row_{{ $row['index'] }}">
                        
                        @if(isset($this->documentStructuringSuggestionsFromDB[$row['index']]))
                            {{ ucfirst($this->documentStructuringSuggestionsFromDB[$row['index']]) }}
                        @else
                            <x-bi-check-circle class="h-6 w-6 text-green-800 cursor-pointer" wire:click="saveType({{ $row['index'] }},'valid');"></x-bi-check-circle>
                            <x-bi-x-circle class="h-6 w-6 text-red-800 cursor-pointer" wire:click="saveType({{ $row['index'] }}, 'invalid');"></x-bi-x-circle>
                        @endif
                    </div>
                </td>
            </tr>
        @endforeach
        </table>
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
