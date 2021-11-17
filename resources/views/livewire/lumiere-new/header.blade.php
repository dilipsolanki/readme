<div
    class="container mx-auto"
    x-data="lumiere"
>
    <div class="flex mt-6 mb-6">
        <div class="p-4 mr-1 w-full md:w-4/5">
            <div class="bg-sweet-corn-200 rounded relative p-4 md:p-6 mx-3 md:mx-0 shadow-big-right">
                <div class="border border-gray-400">
                    <div
                        class="flex items-center justify-center bg-white"
                        id="searchContainer"
                    >
                        <div class="px-2 py-4 bg-white ml-1">
                            <x-bi-search class="w-5 h-5 text-gray-500"></x-bi-search>
                        </div>
                        <div class="grid w-full">
                            <div
                                id="searchStringForL"
                                contenteditable="true"
                                x-ref="enteredString"
                                @blur="showSuggestionBox=false"
                                @focus="showSuggestionBox=true; setWidthForDescContainer();"
                                @keydown.enter="validateInput($event, $wire) ? $wire.call('searchL', $event.target.innerText.trim()) : null;"
                                class="w-full p-2 tracking-wider focus:outline-none focus:border-transparent font-semibold rounded-lg text-xl"
                            ></div>
                            <!-- wire:keydown.enter="searchL($event.target.innerText)" -->
                        </div>
                        <div class="text-right mr-3 text-gray-600">
                            <span id="charatersEntered">0</span>/40
                        </div>
                    </div>
                    <div
                        class="bg-white border border-gray-300 absolute z-20 shadow-lg"
                        id="helpDescriptionContainer"
                        x-show="showSuggestionBox"
                        x-cloak
                    >
                        <div class="grid p-4">
                            <div class="flex items-center hover:bg-gray-100 py-2">
                                <!-- <span class="bg-blue-100 pt-1 px-2 pb-1 rounded text-lg font-light">paper</span> -->
                                <span class="ml-2">Type any word or phrase to get examples of how it is used in a sentence (e.g., "although previous studies have")</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 py-2">
                                <!-- <span class="bg-blue-100 pt-2 px-3 rounded text-2xl font-light">*</span> -->
                                <span class="ml-2">Use <span class="bg-blue-100 pt-2 px-2 rounded text-lg font-light">*</span> inside a phrase to find word alternatives in that context (e.g., "as a matter of *")</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 py-2">
                                <!-- <span class="bg-blue-100 pt-1 px-2 pb-1 rounded text-lg font-light">*paper*</span> -->
                                <span class="ml-2">Use <span class="bg-blue-100 pt-2 px-2 rounded text-lg font-light">*</span> on both sides of a word to get synonyms of that word in that context (e.g., "in *certain* cases")</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 py-2">
                                <!-- <span class="bg-blue-100 pt-1 px-2 pb-1 rounded text-lg font-light">VS</span> -->
                                <span class="ml-2">Use <span class="bg-blue-100 pt-1 px-2 pb-1 rounded text-sm font-light">VS</span> between two words or expressions to compare their frequency (e.g., "particularly VS especially")</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @if($loading)
            <div
                id="loadingContainer"
                class="mx-3 md:mx-0 bg-white mt-4 rounded shadow h-1/2"
            ></div>
            @endif

            @if($noResultFoundMessage)
                <div class="mt-4 p-3 rounded border border-gray-300 text-gray-900 font-semibold bg-white">{{ $noResultFoundMessage }}</div>
            @endif

            @if(count($compareResults) > 0)
            <div class="bg-gray-600 bg-opacity-20 mt-6 p-3 rounded space-y-2 mb-6">
                @foreach($compareResults as $key => $value)
                <div class="whitespace-nowrap relative flex flex-nowrap py-2 border-b border-gray-300 bg-gray-100 px-3 rounded">
                    @php
                    $colorToApply = $flippedArray[$key];
                    $percentage = round(($value/array_sum($compareResults))*100);
                    @endphp
                    <div
                        class="absolute top-0 bottom-0 left-0 rounded opacity-50"
                        style="width: {{ $percentage }}%; background: {{ $colorToApply }};"
                    ></div>
                    <div class="z-10 flex justify-between w-full">
                        <span class="font-bold">{!! $key !!}</span>
                        <span class="mr-2">{{ $percentage }}%</span>
                    </div>
                </div>
                @endforeach
            </div>
            @endif

            
            <div class="p-2 bg-red-custom-100 mt-4 rounded-md @if(blank($errorMessage)) hidden @endif" id="errorMessageContainer">{{ $errorMessage }}</div>
            <div id="errorLottie" class="my-6"></div>
        

            
            @if(is_array($this->dictionary) && count($this->dictionary) > 0)
            
            <div class="mt-4 bg-white shadow-md p-4 rounded mb-4 border border-gray-300">
                <div class="flex items-center justify-between">
                    <div class="font-thin uppercase text-gray-600 text-sm mb-2">Dictionary</div>
                    <div>
                        <x-bi-chevron-up class="cursor-pointer font-bold" x-show="showDictionary" @click="showDictionary = false"></x-bi-chevron-up>
                        <x-bi-chevron-down class="cursor-pointer font-bold" x-show="!showDictionary" @click="showDictionary = true"></x-bi-chevron-down>
                    </div>
                </div>
                <div class="font-bold mb-2 flex items-center">
                    <x-bi-volume-up class="h-5 w-5" onclick="convertTextToSpeech()"></x-bi-volume-up>
                    <span class="text-2xl" id="hearTheWord">{{ $lumiereQueryString }}</span>
                </div>
                <div class="" x-show="showDictionary">
                    @foreach($this->dictionary as $dictionary)
                        <div class="flex border-b border-dashed py-2 border-gray-400">
                            <div class="w-2/3">
                                <div class="text-gray-500 mb-1">{{ $dictionary['pos'] }}</div>
                                <div class="">
                                    {{ $dictionary['definition'] }}
                                </div>
                            </div>
                            <div class="w-1/3">
                                <div class="text-gray-500 mb-1">synonmys</div>
                                <div class="">
                                    @foreach($dictionary['synonymous_list'] as $synonmToShow)
                                        <span class="cursor-pointer underline text-blue-700" wire:click="searchL('{{ $synonmToShow }}')">{{ $synonmToShow }}</span>@if(!$loop->last)<span>, </span>@endif
                                    @endforeach
                                    
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            @endif

            @if($totalOccurences > 0)
            <div class="mt-3 bg-spring-sun-500 p-2 rounded border border-spring-sun-700">
                <b>{{ $lumiereQueryString }}</b> appears <b>{{ $totalOccurences }}</b> times in our database.
            </div>
            @endif

            @if(count($synonmysOutput) > 0)
            @php
                $totalOfAllRecords = collect($synonmysOutput)->sum();
            @endphp

            @if($this->asteriskPosition > 0)
                <div class="mt-4 rounded space-y-1 mb-6 p-4 bg-white">
            @else
                <div class="bg-gray-300 bg-opacity-50 mt-4 p-4 rounded space-y-3 mb-6 shadow">
            @endif

                @foreach($synonmysOutput as $key => $synonm)
                    @php
                        $percentageVal = number_format(($synonm / $totalOfAllRecords)*100, 2);
                    @endphp
                    @if($this->asteriskPosition > 0)
                        <div class="whitespace-nowrap relative flex flex-nowrap py-2 border-b border-gray-300 bg-gray-100">
                            <div class="absolute bg-light-green-700-accent top-0 bottom-0 z-0 bg-opacity-25" style="width: {{ $percentageVal }}%;"></div>
                            <div class="z-10 pl-3 flex justify-between w-full">
                                <span>{!! $key !!}</span>
                                <span class="mr-2">{{ $percentageVal }}%</span>
                            </div>
                        </div>
                    @else
                        <div class="bg-white p-3 rounded whitespace-nowrap overflow-x-hidden">
                            {!! $key !!}
                        </div>
                    @endif
                    
                @endforeach
            </div>
            @endif
        </div>
        <div class="mt-4 w-1/5 hidden md:inline-block mr-2">
            <div>
                <livewire:show-recent-lumiere-queries />
            </div>
            <div class="bg-white shadow rounded-md pb-3">
                <div
                    class="bg-sweet-corn-300 border-b border-sweet-corn-600 rounded-t-md font-bold tracking-wider text-xm uppercase px-4 py-2 mb-3">
                    Try these examples
                </div>
                @foreach($examplesArray as $exampleString)
                    <div
                        class="px-4 py-1 flex items-center text-blue-500 cursor-pointer hover:underline text-lg"
                        @click.prevent="$refs.enteredString.textContent = $event.target.innerText; enterAndSearch();"
                    >
                        <x-bi-search class="w-3 h-3 text-gray-600 mr-2"></x-bi-search>{{ $exampleString }}
                    </div>
                @endforeach
                
            </div>
        </div>
    </div>
</div>
<script>
    let speech = new SpeechSynthesisUtterance();
    let voices;
    speech.lang = "en-US";
    populateVoices();
    document.addEventListener("DOMContentLoaded", setWidthForDescContainer);

    document.getElementById('searchStringForL').addEventListener("paste", function (e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
        updateWordCounter(e);
    });

    document.addEventListener('alpine:init', () => {
        Alpine.data('lumiere', () => ({
            enteredString: '',
            showDictionary: false,
            showSuggestionBox: false,
            enterAndSearch() {
                let element = document.getElementById('searchStringForL');
                element.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
            },
            init() {
                this.$refs.enteredString.textContent = this.enteredString;
                document.getElementById('searchStringForL').addEventListener('keyup', (evt) => {
                    updateWordCounter(evt);
                    // if (evt.which === 13) {
                    //     validateInput();
                    //     evt.preventDefault();
                    //     document.getElementById('searchStringForL').blur();
                    // }
                });
            }
        }));
    });

    function setWidthForDescContainer() {
        var helpDescContainer = document.getElementById('helpDescriptionContainer');
        helpDescContainer.style.width = document.getElementById('searchContainer').offsetWidth + 'px';
    }

    function populateVoices() {
        window.speechSynthesis.onvoiceschanged = function() {
            voices = window.speechSynthesis.getVoices();
        };
    }

    function convertTextToSpeech() {
        speech.voice = voices[49];
        speech.rate = 0.9;
        speech.pitch = 0.9;
        speech.text = document.getElementById("hearTheWord").innerText;
        window.speechSynthesis.speak(speech);
    }
</script>