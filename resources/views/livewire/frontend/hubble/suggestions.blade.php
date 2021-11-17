<div>
    <div x-on:suggestion-actioned-successfully.window="resetSuggestionPanel()"></div>
    <div class="flex justify-between mr-1 bg-nav rounded shadow-inner p-2 bg-opacity-80" id="suggestionBoxHeader">
        <div class="bg-sweet-corn-400 px-2 py-1 rounded font-bold text-sm border border-sweet-corn-500">
            Suggestions: {{ $acceptedCount }}/{{ count($suggestionsArray['data']) }}
        </div>
        <div>
            @if($acceptedAll)
            <a href="#" wire:click.prevent="undoAllSuggestions" class="flex space-x-1 items-center bg-blue-600 text-gray-100 font-bold hover:bg-opacity-80 px-2 py-1 text-sm rounded-md w-auto">
                <x-bi-arrow-counterclockwise></x-bi-arrow-counterclockwise>
                <span>Undo All</span>
            </a>
            @else
            <a href="#" wire:click.prevent="acceptAllSuggestions" class="flex space-x-1 items-center bg-green-100 border border-green-500 hover:bg-green-300 px-2 py-1 text-sm rounded-md w-auto">
                <x-bi-check2></x-bi-check2>
                Accept All
            </a>
            @endif
        </div>
    </div>
    <div class="suggestion-list-wrap" id="suggestion-list-wrap">
        @foreach($suggestionsArray['data'] as $sug)
        @php
        $currentWord = $sug['original_word'];
        $currentDataKey = $sug['dataKey'];
        @endphp
        <div id="{{ $sug['dataKey'] }}" wire:key="{{ $sug['dataKey'] }}">
            <a class="flex items-center justify-between p-3 my-5 border border-gray-100 rounded shadow-xl cursor-pointer hover:bg-gray-100 bg-white" id="errword" data-key="{{ $sug['dataKey'] }}" data-key_error="{{ $sug['dataKey'] }}" @click="selectedSuggestionNo !== '{{ $sug['dataKey'] }}' ? selectedSuggestionNo = '{{ $sug['dataKey'] }}' : selectedSuggestionNo=null" x-show="selectedSuggestionNo != '{{ $sug['dataKey'] }}'">
                <div class="flex items-center">
                    <strike class="px-2 py-1 mr-2 bg-red-100 rounded">
                        {{ $sug['original_word'] }}
                    </strike>
                    <span class="font-semibold text-gray-400">→</span>
                    <div class="ml-4">
                        {{ $sug['changed_word'] }}
                    </div>
                </div>
                @if(isset($sug['checked']) && $sug['checked'] == 1 && $sug['type'] == 'Accepted')
                <x-bi-check-circle class="h-6 w-6 text-green-800"></x-bi-check-circle>
                @endif
                @if(isset($sug['checked']) && $sug['checked'] == 1 && $sug['type'] == 'Declined')
                <x-bi-x-circle class="h-6 w-6 text-red-800"></x-bi-x-circle>
                @endif
            </a>
            <div class="p-4 my-3 overflow-hidden transition-all duration-700 bg-white rounded shadow-lg suggestionBox" data-user='suggestionBox' id="error_{{ $sug['dataKey'] }}" x-show="selectedSuggestionNo == '{{ $sug['dataKey'] }}'">
                <div id="suggestionBox_close">
                    <svg class="h-6 w-6 text-red-800" data-popup="suggestionBox_close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                </div>

                <div class="text-xs font-semibold text-gray-500 uppercase pr-5">
                    {{ $sug['category'] }} &mdash; {{ $sug['category_broad'] }}
                </div>

                <div class="flex items-center mt-2">
                    <strike class="px-2 py-1 mr-2 bg-red-100 rounded">
                        {{ $sug['original_word'] }}
                    </strike>
                    <span class="font-semibold text-gray-400">→</span>
                    <div class="ml-4">
                        {{ $sug['changed_word'] }}
                    </div>
                </div>
                <div class="mt-4 text-gray-400">
                    {{ $sug['explanation'] }}
                </div>
                <div class="flex mt-4">
                    @if($sug['type'] == '' || (isset($sug['type']) && $sug['type'] == 'Undo'))
                    <a href='' class="px-2 py-1 text-xs text-white bg-blue-600 rounded" wire:click.prevent="updateHubble('Accepted', 1, '{{ $sug['dataKey'] }}')">Apply</a>
                    <a href='' class="px-2 py-1 mx-3 text-xs text-blue-800 bg-blue-200 rounded" wire:click.prevent="updateHubble('Declined', 1, '{{ $sug['dataKey'] }}')">Decline</a>
                    <a href='' class="px-2 py-1 text-xs text-gray-800 bg-gray-200 rounded" wire:click.prevent='$emit("openModal", "incorrect-suggestion-feedback", {{ json_encode(["spellWord" => "$currentWord", "emit_this_after_saving_feedback" => "hubbleFeedbackSaved", "tool_name" => "hubble", ["dataKey" => $currentDataKey]]) }})'>Report
                        inaccurate</a>
                    @else
                    <a href='' class="px-2 py-1 text-xs text-white bg-blue-600 rounded flex" wire:click.prevent="updateHubble('Undo', 0, '{{ $sug['dataKey'] }}', '{{ $sug['type'] }}')">
                        <x-bi-arrow-clockwise class="mr-1"></x-bi-arrow-clockwise>Undo
                    </a>
                    @endif
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>

<script>
    document.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'error-word') {
            var key = e.target.getAttribute("data-key");
            var elem = document.getElementById(key);
            var topPos = elem.offsetTop;
            var height = document.querySelector(".hubbleSuggestionBox").offsetHeight;
            scrollTo(document.getElementById('hubbleSuggestionBox'), topPos - 100, height);
            setTimeout(function() {
                var error_key = document.getElementById('error_' + key);
                error_key.style.boxShadow = "0 0 34px 0 rgba(0, 0, 0, 0.46)";
            }, 50);
        }
        if (e.target && e.target.className == 'corrected-word-sentence') {
            var err_key = e.target.getAttribute("data-key_err");
            setTimeout(function() {
                var errorkey = document.getElementById('error_' + err_key);
                errorkey.style.boxShadow = "0 0 34px 0 rgba(0, 0, 0, 0.46)";
            }, 50);
        }
        if (e.target && e.target.id == 'errword') {
            var err_key_new = e.target.getAttribute("data-key_error");
            setTimeout(function() {
                var errkey = document.getElementById('error_' + err_key_new);
                errkey.style.boxShadow = "0 0 34px 0 rgba(0, 0, 0, 0.46)";
            }, 50);
        }

        if (e.target && e.target.getAttribute('data-popup')=="suggestionBox_close")
         {
            setTimeout(function() {
            document.querySelectorAll("[class*=suggestionBox]").forEach(el => el.style.display = "none");
        }, 50);
        }
        var hubblebox_suggestion = document.getElementById("suggestion-list-wrap");
        var hubblebox_Width = hubblebox_suggestion.offsetWidth;
        document.querySelectorAll("[class*=suggestionBox]").forEach(el => el.style.maxWidth = (hubblebox_Width - 13) + "px");
    });

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
        var animateScroll = function() {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    window.onscroll = function() {
        suggestionBoxHeader()
        hubblebox_Height();
    };
    window.onresize = function() {
        var hubblebox_suggestion = document.getElementById("suggestion-list-wrap");
        var hubblebox_Width = hubblebox_suggestion.offsetWidth;
        document.querySelectorAll("[class*=suggestionBox]").forEach(el => el.style.maxWidth = (hubblebox_Width - 13) + "px");
    };
    // hubblebox_inner get height
    function hubblebox_Height() {
        var hubblebox_inner = document.getElementById("hubblebox_inner");
        var hubblebox_Height = hubblebox_inner.offsetHeight;
        document.getElementById("suggestion-list-wrap").style.maxHeight = (hubblebox_Height - 30) + "px";
    };
    var hubHeader = document.getElementById("hubbleSuggestionBox");
    var sugHeader = document.getElementById("suggestionBoxHeader");
    var sugHeader_offsetTop = hubHeader.offsetTop + 24;

    function suggestionBoxHeader() {
        if (window.pageYOffset > sugHeader_offsetTop) {
            sugHeader.classList.add("suggestionBoxHeader_sticky");
        } else {
            sugHeader.classList.remove("suggestionBoxHeader_sticky");
        }
        var suggestionList = document.getElementById("suggestion-list-wrap");
        var suggestionListWidth = suggestionList.offsetWidth;
        document.getElementById("suggestionBoxHeader").style.maxWidth = (suggestionListWidth - 13) + "px";
    }
</script>