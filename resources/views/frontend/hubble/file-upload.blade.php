<div x-show.transition.in.opacity.duration.750ms="selected_tab === 'file-upload'" class="py-4 bg-blue-100">
    @error('uploadedFile') <div class="bg-monza-200 text-monza-800 px-2 py-1 rounded border border-monza-300 mb-4">{{
        $message }}</div> @enderror
    <div class="form-group">
        <label>Upload a file: </label>
        <input type="file" class="form-control" accept=".doc,.docx" wire:model.defer="uploadedFile" @if($hubbling) disabled @endif>
    </div>
    <div class="flex items-center space-x-4 mt-6">
        <button wire:click.prevent="uploadFileAndHubbleFirstThousandWords" type="submit" class="px-2 py-1 font-semibold text-gray-100 rounded flex items-center @if($hubbling) bg-gray-400 cursor-not-allowed @else bg-blue-600
            hover:bg-blue-500 cursor-pointer @endif" @if($hubbling) disabled @endif>
            @if($hubbling)
            <x-bi-arrow-clockwise class="animate-spin mr-1"></x-bi-arrow-clockwise>
            @endif
            Edit first 1000 words on screen
        </button>
        <span class="font-semibold">OR</span>
        <button wire:click.prevent="uploadFileAndStartHubble" type="submit" class="px-2 py-1 font-semibold text-gray-100 rounded flex items-center @if($hubbling) bg-gray-400 cursor-not-allowed @else bg-blue-600
            hover:bg-blue-500 cursor-pointer @endif" @if($hubbling) disabled @endif>
            @if($hubbling)
            <x-bi-arrow-clockwise class="animate-spin mr-1"></x-bi-arrow-clockwise>
            @endif
            Download Edited File
        </button>
    </div>
</div>