<div
    x-show.transition.in.opacity.duration.750ms="selected_tab === 'content'"
    class="relative"
    x-data="{ placeholderText : 'Type or paste your text here'}"
>
    @error('hubble.originalMessage')
    <div class="bg-monza-200 text-monza-800 px-2 py-1 rounded border border-monza-300 mb-4">
        Please enter the content in order to proceed.
    </div>
    @enderror
    <div
        class="absolute z-10 py-4 text-lg text-gray-400 cursor-default"
        x-text="placeholderText"
        @click="setFocuOnEnteredText()"
    ></div>
   
    <div class="my-4">
        <div
            class="py-4 text-lg font-normal leading-9 tracking-wide text-gray-700 outline-none "
            id="enteredText"
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
            contenteditable="@if($hubble['fetch_id']) 'true' @endif"
            x-ref="hubbleContentContainer"
            x-effect="$el.innerHTML = contentToHubble;($el.innerText.length > 0) ? placeholderText = '' : placeholderText = 'Type or paste your text here.'"
            @input="enterText = $el.innerHTML;($el.innerText.length > 0) ? placeholderText = '' : placeholderText = 'Type or paste your text here.'"
        >
        </div>
    </div>
    @if(!$hubble['fetch_id'])
    <div class="mt-4">

        <button
            class="px-2 py-1 font-semibold text-gray-100 rounded items-center @if($hubbling) bg-gray-400 cursor-not-allowed @else bg-blue-600 hover:bg-blue-500 cursor-pointer @endif"
            @click="contentToHubble = $refs.hubbleContentContainer.innerText"
            id="letsHubbleIt"
        >

            @if($hubbling)
            <x-bi-arrow-clockwise class="animate-spin mr-1"></x-bi-arrow-clockwise>
            @endif
            HUBBLE IT
            
        </button>

        <button
            class="ml-2 px-2 py-1 font-light text-gray-700 border border-gray-400 rounded items-center hover:bg-gray-50 cursor-pointer bg-gray-200"
            id="generateSampleText"
            type="button"
            @click="placeholderText = '';generateSampleText()"
        >
            Generate Sample
        </button>
    </div>
    @endif

</div>