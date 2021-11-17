<x-modal form-action="saveFeedbackForIncorrectSuggestion">
    <x-slot name="title">
        Feedback for <span class="italic font-semibold" wire:model>{{ $spellWord }}</span>
    </x-slot>

    <x-slot name="content">
        <input type="text" name="suggestedWordSelected" class="invisible hidden" wire:model="spellWord" />

        <input class="w-full px-2 py-2 border border-gray-200 rounded" type="text" name="reason" required wire:model.defer="reason" placeholder="Tell us why its incorrect suggestion?" />

        <input class="w-full px-2 py-2 my-4 border border-gray-200 rounded" type="text" name="recommendation" required wire:model.defer="recommendation" placeholder="According to you, what should be the correct suggestion?" />
    </x-slot>

    <x-slot name="buttons">
        <button type="submit" class="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Submit Feedback</button>
    </x-slot>
</x-modal>