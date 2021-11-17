<div class="bg-white mt-2 rounded shadow">
    <div class="border-b border-gray-300 text-2xl font-bold px-6 py-3 flex justify-between items-center">
        <span>{{ Str::headline($toolName) }}: {{ Str::headline($navType) }}</span>
        <span class="cursor-pointer" wire:click="$emit('closeModal')"><x-bi-x-lg></x-lg-bi-x></span>
    </div>
    <div class="p-6 tracking-wide text-gray-700">
        {!! $output !!}
    </div>
</div>
