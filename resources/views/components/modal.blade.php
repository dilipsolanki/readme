@props(['formAction' => false])

<div>
    @if($formAction)
    <form wire:submit.prevent="{{ $formAction }}">
        @endif
        <div class="p-4 bg-white border-b sm:px-6 sm:py-4 border-gray-150 flex justify-between items-center">
            @if(isset($title))
            <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ $title }}
            </h3>
            @endif
            <x-bi-x-lg wire:click="$emit('closeModal')" class="cursor-pointer"></x-bi-x-lg>
        </div>
        <div class="px-4 bg-white sm:px-6 sm:py-2">
            <div class="space-y-6">
                {{ $content }}
            </div>
        </div>

        <div class="px-4 pb-5 mt-4 bg-white sm:px-6 sm:flex">
            {{ $buttons }}
        </div>
        @if($formAction)
    </form>
    @endif
</div>