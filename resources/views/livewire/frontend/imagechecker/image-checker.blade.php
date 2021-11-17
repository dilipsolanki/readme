<div class="m-4 md:mx-9">
    <div class="p-2 mb-4 rounded">
        @if(!blank($fileNameToDisplay))
            <a href="{{ route('dashboard.image-checker') }}" class="underline text-blue-700 cursor-pointer">&lt; Back</a>
        @endif
    </div>
    <div class="grid md:flex">
        <div
            class="justify-center flex items-center @if(!$fileNameToDisplay) bg-sweet-corn-200 border border-dashed @endif border-gray-700 rounded relative h-72 w-full md:w-1/2 mr-0 md:mr-6">
            <div
                class="absolute top-0 left-0 bg-green-400 h-6"
                id="showUploadProgress"
            ></div>
            @if(!$fileNameToDisplay)
            <form wire:submit.prevent="save">
                <input
                    type="file"
                    wire:model.defer="imgFile"
                    accept=".jpeg,.png"
                    class="cursor-pointer relative block opacity-0 w-full h-full p-36 z-50"
                >
            
                <div
                    class="p-6 absolute inset-0 m-auto text-lg flex items-center justify-center"
                    id="fileUploadContainer"
                >
                    <div class="flex justify-center items-center">
                        
                    </div>
                    <div class="space-y-2 text-sm md:text-xl text-center">
                        <div class="cursor-pointer">
                            Drop your files anywhere to upload
                        </div>
                        <div class="">
                            OR
                        </div>
                        <div class="text-blue-700 underline">
                            Click here to upload
                        </div>
                    </div>
                </div>
                <div
                    class="p-6 absolute top-2 right-0 left-0 m-auto text-lg items-center justify-center hidden"
                    id="showProgressContentContainer"
                >
                    Upload in progress...
                </div>
            </form>
            @endif

            <!-- Image Preview -->
            @if($fileNameToDisplay)
                <div class="bg-white rounded absolute top-0 left-0 right-2 bg-auto bg-no-repeat bg-center h-full" style="background-image: url({{ $fileNameToDisplay }});"></div>
            @endif
            <!-- End of Image Preview -->

        </div>
        <input
            type="text"
            wire:model="$fileNameToDisplay"
            class="hidden"
        />

        @if($isCheckingImage && blank($labelArray))
        <div class="flex justify-center items-center w-full md:w-1/2 bg-gray-200 rounded border border-gray-50 md:absolute relative right-0 md:right-3">
            <div id="image-loader" class="w-full md:w-1/3 h-72"></div>
        </div>
        @endif
        @if(!blank($labelArray))  
            <div class="flex h-72 w-full md:w-1/2 bg-white rounded mt-4 md:mt-0">
                <div class="p-4 w-full">
                    <div class="space-x-2 flex bg-white mt-4">
                        <p class="@if($responseFlag) bg-red-300 @else bg-sweet-corn-400 @endif font-semibold p-2 rounded-sm w-full">{{ $displayString }}</p>
                    </div>
                    <div class="space-x-2 flex bg-white mt-4 items-center">
                        <p class="w-40">Possible Identifiers: </p>
                        <div class="flex space-x-2 flex-wrap">
                            @foreach($labelArray as $label)
                                <span class="bg-blue-100 px-2 my-1 rounded">{{ $label }}</span>
                            @endforeach
                        </div>
                    </div>
                    <div class="space-x-2 flex bg-white"></div>
                </div>
            </div>
        @endif
    </div>
    @if(count($images) > 0)
    <div class="mt-4 bg-white p-4 rounded">
        <table class="w-full table-auto">
            @foreach($images as $image)
                @php
                    $decodedData = json_decode($image->data);
                @endphp
                <tr class="@if(isset($decodedData->flagged) && $decodedData->flagged) bg-red-100 @endif border-b border-gray-400">
                    <td class="p-2">
                        <a wire:click.prevent="showSelectedImage({{ $image }});" class="text-blue-600">
                            {{ isset($decodedData->file_name) ? $decodedData->file_name : 'NA' }}
                        </a>
                    </td>
                    <td class="p-2 hidden md:block">
                        @if(isset($decodedData->labels))
                                {{ implode(', ', $decodedData->labels) }}
                        @endif
                    </td>
                    <td class="p-2"><span class="uppercase px-1 border border-gray-600 text-xs rounded">{{ $image->status }}</span></td>
                    <!-- <td class="flex justify-center items-center content-center mt-2">
                        <button class="border border-blue-600 cursor-pointer rounded text-sm bg-blue-500 text-white font-semibold flex px-2 items-center justify-center" wire:click="showSelectedImage({{ $image }});" >
                            <x-bi-eye class="mr-1"></x-bi-eye><span class="hidden md:block">View</span>
                        </button>
                    </td> -->
                    <td class="text-center p-2">{{ $image->created_at->diffForHumans() }}</td>
                </tr>
            @endforeach
        </table>
        <div class="mt-4">
            {{ $images->links() }}
        </div>
    </div>
    @endif
</div>
@push('scripts')
    <script>
        window.addEventListener('show-image-loading', showImageLoadingAnimation);

        function showImageLoadingAnimation() {
            var animation = bodymovin.loadAnimation({
                // animationData: { /* ... */ },
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
