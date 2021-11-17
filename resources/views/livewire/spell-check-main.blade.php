<div class="flex justify-center h-screen px-5 py-6 container mx-auto">
    <x-loading target="runSpellCheck" />
    <div
        class="w-full"
        x-data="{
                    suggestedWordToReplace: @entangle('suggestedWordToReplace'),
                    content: @entangle('spellCheck.originalMessage'),
                    textCopied: false,
                    fullScreen: false,
                    suggestionsModal: false,
                    suggestedWordSelected : '',
                    ...init()
                }"
    >
        <div
            class="flex justify-between p-4 text-gray-200 bg-gray-600 border-b border-gray-400 border-dotted rounded-t-md"
            id="mainContainer"
        >

            <span class="text-2xl font-bold">Spell Check Correction</span>
            <span class="flex">

                <span
                    class="flex px-2 py-1 rounded-md cursor-pointer hover:bg-gray-800"
                    x-cloak
                    x-on:click="document.documentElement.requestFullscreen();fullScreen=true;"
                    x-show="!fullScreen"
                >

                    <x-maximize-icon></x-maximize-icon>

                    <span
                        id="copyText"
                        class="hidden md:inline-block"
                    >
                        Full Screen
                    </span>
                </span>

                <span
                    class="flex px-2 py-1 rounded-md cursor-pointer hover:bg-gray-800"
                    x-cloak
                    x-on:click="document.exitFullscreen();fullScreen=false;"
                    x-show="fullScreen"
                >

                    <x-minimize-icon></x-minimize-icon>

                    <span
                        id="copyText"
                        class="hidden md:inline-block"
                    >
                        Exit Full Screen
                    </span>
                </span>

                <span
                    class="flex px-2 py-1 rounded-md cursor-pointer hover:bg-gray-800"
                    x-cloak
                    x-on:click="navigator.clipboard.writeText($refs.userContent.innerText); textCopied=true;"
                >

                    <x-copy-icon></x-copy-icon>

                    <span
                        id="copyText"
                        x-show="!textCopied"
                        class="hidden md:inline-block"
                        x-init="$watch('textCopied', value => {
                            if(value){
                                setTimeout(function () {
                                    textCopied = false
                                }, 4000)
                            }
                        })"
                    >
                        Copy
                    </span>
                    <span
                        id="copyText"
                        x-show="textCopied"
                        class="hidden font-semibold text-green-400 md:inline-block"
                    >
                        Copied!
                    </span>
                </span>
                <span
                    class="flex px-2 py-1 rounded-md cursor-pointer hover:bg-gray-800"
                    wire:click="resetContent"
                >

                    <x-delete-icon></x-delete-icon>
                    <span class="hidden md:inline-block">Clear</span>
                </span>
            </span>
        </div>

        <form
            wire:submit.prevent="runSpellCheck"
            class="h-full"
        >
            <div class="relative p-4 border-b border-gray-400 border-dotted bg-gray-50 h-2/3">
                <div
                    class="absolute top-0 bottom-0 left-0 right-0 h-auto p-4 overflow-y-scroll outline-none"
                    id="enteredText"
                    spellcheck="false"
                    autocorrect="off"
                    autocapitalize="off"
                    contenteditable="true"
                    x-ref="userContent"
                    x-effect="$el.innerHTML = content"
                >
                </div>
            </div>

            <div class="flex items-center p-4 text-gray-200 bg-gray-600 rounded-b-md">
                <button
                    id="runSpellCheck"
                    @click="content = $refs.userContent.innerText"
                    class="px-2 py-1 text-green-700 bg-green-300 rounded hover:bg-green-500"
                >
                    Run Spell Check
                </button>
                @if($spellCheck['totalErrors'] > 0)
                <div class="py-1 pr-2 ml-4 bg-red-200 rounded">
                    <span class="px-2 py-1 text-sm font-bold text-white bg-red-400">{{ $spellCheck['totalErrors']
                        }}</span>
                    <span class="text-red-700">issues found.</span>
                </div>
                @endif
            </div>
        </form>

        <x-suggestion-modal
            currentSelectedWordFromOriginalMessage="{{ $spellCheck['currentSelectedWordFromOriginalMessage'] }}"
            currentSelectedWordSuggestions="{{ $currentSelectedWordSuggestions }}"
            offsetOfCurrentSelectedWordFromOriginalMessage="{{ $offsetOfCurrentSelectedWordFromOriginalMessage }}"
        />

        <input
            type="text"
            id="current_suggestions"
            value="{{ $currentSelectedWordSuggestions }}"
            class="hidden border-red-600"
        />
        <input
            type="text"
            id="suggestedWordSelected"
            value=""
            x-model="suggestedWordSelected"
            class="hidden border-red-600"
        />

        <div
            @notify.window="$wire.set('spellCheck.currentSelectedWordFromOriginalMessage', $event.target.innerText);$wire.set('currentSelectedWordSuggestions', $event.detail.wordSuggestions);$wire.set('offsetOfCurrentSelectedWordFromOriginalMessage', $event.detail.offset);handleDropdownPosition();">
        </div>
        <div @clearvalues.window="$wire.set('currentSelectedWordSuggestions', '')"></div>
    </div>
</div>
<script>
    document.getElementById('enteredText').addEventListener("paste", function (e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    });
    document.addEventListener('fullscreenchange', exitHandler);

    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.fullScreen = false;
        }
    }

    function init() {
        return {
            saveSuggestion: function (elem) {
                
                this.suggestedWordToReplace= document.getElementById('selectedWord').innerText;
                this.suggestedWordToReplace = this.suggestedWordSelected;

                var formData = {
                    selected_word: this.suggestedWordSelected,
                    incorrect_word: document.getElementById('selectedWord').innerText,
                    suggestions: document.getElementById('current_suggestions').value
                }
                fetch('/save-suggestion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.head.querySelector('meta[name=csrf-token]').content
                    },
                    body: JSON.stringify(formData)
                })
                    .then(() => {

                    })
                    .catch(() => {

                    });

            }
        }
    }

function getCoOrdAndFetchCorrections(e, $dispatch, offsetVal) {

    var theThing = document.getElementById('modalToShowSpellChecks');
    var container = document.getElementById('mainContainer');

    var parentPosition = getPosition(container);
    var xPosition = e.clientX - parentPosition.x - (theThing.clientWidth / 2);
    var yPosition = e.clientY - parentPosition.y - (theThing.clientHeight / 2);
    console.log(window.outerWidth, xPosition);
    if(window.outerWidth < (parseInt(xPosition) + 300)){
        xPosition = (parseInt(window.outerWidth)-(parseInt(xPosition) + 100));
    }
    theThing.style.left = xPosition + "px";
    theThing.style.top = yPosition + "px";
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
    
    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;
        
            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }
        el = el.offsetParent;
    }
    yPos -= 150;
    return {
        x: xPos,
        y: yPos
    };
}
</script>