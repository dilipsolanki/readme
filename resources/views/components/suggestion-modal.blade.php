<div
    @click.away="suggestionsModal=false; $dispatch('clearvalues');"
    id="modalToShowSpellChecks"
    class="absolute grid grid-cols-none p-2 bg-white border border-gray-100 rounded-md shadow-xl w-96"
    x-show="suggestionsModal"
>
    <div
        class="pb-1 mb-1 font-bold border-b border-gray-200"
        id="selectedWord"
    >
        {{ $currentSelectedWordFromOriginalMessage }}
    </div>
    <div
        id="selectedWordSuggestions"
        class="py-1 mb-1 text-sm leading-9 border-b border-gray-200"
    >
        <?php
        $suggestions = explode(',', $currentSelectedWordSuggestions);
        ?>

        @foreach ($suggestions as $suggestion)
        <span
            x-on:click='suggestionsModal=false;suggestedWordSelected="{{ $suggestion }}";saveSuggestion("{{ $offsetOfCurrentSelectedWordFromOriginalMessage }}");$dispatch("clearvalues");'
            class='px-2 py-1 bg-blue-100 rounded cursor-pointer hover:bg-blue-200 suggestedWord'
        >{{ $suggestion }}</span>
        @endforeach
    </div>
    <div class="text-sm">
        <button
            class="text-blue-600 cursor-pointer"
            wire:click='$emit("openModal", "incorrect-suggestion-feedback", {{ json_encode(["spellWord" => "$currentSelectedWordFromOriginalMessage", "emit_this_after_saving_feedback" => "spellCheckFeedbackSaved", "tool_name" => "spell-check"]) }})'
        >
            Incorrect suggestion(s)?
        </button>
    </div>
</div>
<script>
    function handleDropdownPosition() {
        const screenPadding = 16;
        var mainContainer = document.getElementById('mainContainer');

        var modalToShowSpellChecks = document.getElementById('modalToShowSpellChecks');

        //setTimeout(function () {
            // const modalCoOrdinates = modalToShowSpellChecks.getBoundingClientRect();
            // const mainContainerCoOrdinates = mainContainer.getBoundingClientRect();
            // const dropdownRightX = modalCoOrdinates.x + modalCoOrdinates.width;
            // const placeholderRightX = mainContainerCoOrdinates.x + mainContainerCoOrdinates.width;
            
            // let ctmWindowWidth = window.outerWidth - 60;
        
            //if (dropdownRightX > window.outerWidth) {
                //modalToShowSpellChecks.style.max-width = ctmWindowWidth;
                // modalToShowSpellChecks.style.left = 'auto';
                // modalToShowSpellChecks.style.right = '30px';
                // modalToShowSpellChecks.style.top = (modalToShowSpellChecks.offsetTop + 30) + 'px';
                // modalToShowSpellChecks.style.transform = `translateX(${(window.outerWidth - placeholderRightX) - screenPadding}px)`;
            //}
        //}, 500);
    }
</script>