<div class="container min-w-6xl mx-auto">
    <x-loading target="compareStrings,findSynonymStringOrWordsInContext" />
    <div class="grid grid-rows-2">

        <div
            class="text-gray-800 mt-6"
            x-data="{ selected_tab: 'option-1' }"
        >
            <nav class="mb-3">
                <ul class="flex">
                    <li
                        class="px-4 py-2 bg-white border-t border-b border-l border-blue-500 rounded-l"
                        :class="{ 'bg-blue-600 text-white': selected_tab === 'option-1' }"
                    >
                        <a
                            href=""
                            @click.prevent="selected_tab = 'option-1'; $wire.resetValues();"
                        >Compare Words or Phrases</a>
                    </li>
                    <li
                        class="px-4 py-2 bg-white border-t border-b border-r border-blue-500 rounded-r"
                        :class="{ 'bg-blue-600 text-white': selected_tab === 'option-2' }"
                    >
                        <a
                            href=""
                            @click.prevent="selected_tab = 'option-2'; $wire.resetValues();"
                        >Find Words in Context</a>
                    </li>
                </ul>
            </nav>
            <div x-show.transition.in.opacity.duration.750ms="selected_tab === 'option-1'">
                <div class="mt-4 flex items-center">
                    <div class="mr-4 flex items-center">
                        <input
                            type="text"
                            class="border border-gray-400 rounded"
                            name="string1"
                            wire:model.lazy="string_one"
                        >
                        <span class="mx-3 text-sm font-semibold">Vs</span>
                        <input
                            type="text"
                            class="border border-gray-400 rounded"
                            name="string2"
                            wire:model.lazy="string_two"
                            wire:keydown.enter="compareStrings"
                        >
                    </div>
                    <div>
                        <button
                            class="bg-green-600 rounded-md hover:bg-green-500 text-white px-3 py-2 flex items-center justify-center font-semibold"
                            wire:click.prevent="compareStrings"
                            id="compareStrings"
                        >
                            <x-bi-arrow-left-right class="mr-1"></x-bi-arrow-left-right>Compare
                        </button>
                    </div>
                </div>
                <div class="bg-sweet-corn-200 p-2 rounded border border-sweet-corn-400 mt-4 w-1/2">
                    <div class="font-bold">Examples: </div>
                    @foreach($compareStringExamples as $key => $exampleString)
                    <div
                        class="text-blue-700 cursor-pointer"
                        wire:click.prevent="setStringsFromExampleAndCompare({{ $key }})"
                        wire:key="{{  $key }}"
                    >
                        {{ $exampleString }}
                    </div>
                    @endforeach
                </div>
                <div class="mt-4 w-1/2">
                    @if(isset($comparisonResults['lum_total']) && $comparisonResults['lum_total'] > 0)

                    @foreach($comparisonResults as $key => $value)
                    @php
                    $percentage = round(($value/$comparisonResults['lum_total'])*100) . '%';
                    @endphp
                    @if($key != 'lum_total')
                    <div class="bg-white rounded shadow-sm overflow-hidden p-1 my-2">
                        <div class="relative h-8 flex items-center justify-center">
                            <div
                                class="absolute top-0 bottom-0 left-0 rounded bg-light-blue-100-accent"
                                style="width: {{ $percentage }};"
                            ></div>
                            <div class="relative text-indigo-900 font-semibold">{{ $key }} &mdash; {{
                                number_format($value) }} ({{ $percentage }})</div>
                        </div>
                    </div>
                    @endif
                    @endforeach
                    @endif
                </div>
            </div>
            <div x-show.transition.in.opacity.duration.750ms="selected_tab === 'option-2'">
                <div class="mt-4 flex items-center w-full">
                    <div class="mr-4 flex items-center w-1/2">
                        <input
                            type="text"
                            class="w-full border border-gray-300 rounded"
                            wire:model.lazy="synonyms_string"
                            wire:keydown.enter="findSynonymStringOrWordsInContext"
                        >
                    </div>
                    <div>
                        <button
                            class="bg-green-600 rounded-md hover:bg-green-500 text-white px-3 py-2 flex items-center justify-center font-semibold"
                            wire:click.prevent="findSynonymStringOrWordsInContext"
                            id="findSynonyms"
                        >
                            <x-bi-search class="mr-1"></x-bi-search>Search
                        </button>
                    </div>
                </div>
                <div class="bg-sweet-corn-200 p-2 rounded border border-sweet-corn-400 mt-4 w-2/3">
                    <div class="font-bold">Type something and hit enter, try these examples: </div>
                    @foreach($findWordsInContextExamples as $key => $exampleString)
                    <div
                        class="text-blue-700 cursor-pointer"
                        wire:click.prevent="setSynonymStringAndFindWordsInContext({{ $key }})"
                        wire:key="{{  $key }}"
                    >
                        {{ $exampleString }}
                    </div>
                    @endforeach
                </div>
                @if(isset($comparisonResults['no_lumiere_results']))
                <div class="mt-6 bg-sweet-corn-50 px-2 py-3 rounded border border-sweet-corn-200 w-2/3">No results
                    found.</div>
                @else
                @if(collect($comparisonResults)->count() > 0 && $asteriskPosition == 0 && $synonyms_string)
                <div class="mt-3 bg-gray-100 p-2 rounded border border-gray-300 w-2/3">
                    <b>{{ $synonyms_string }}</b> appears <b>{{ $totalOccurences }}</b> times in our database.
                </div>
                <div class="mt-4 w-2/3 bg-white shadow-md p-2 border border-gray-300">
                    <table>
                        @foreach($comparisonResults as $key => $value)
                        @php
                        $stringValues = explode($synonyms_string, $key);
                        @endphp
                        <tr class="h-12">
                            <td class="text-right mr-1">
                                {!! $stringValues[0] !!}
                            </td>
                            <td class="min-w-max">
                                <b class="bg-sweet-corn-300 px-1 py-1 rounded">
                                    {{ $synonyms_string }}
                                </b>
                            </td>
                            <td>
                                {!! $stringValues[1] !!}
                            </td>
                        </tr>
                        @endforeach
                    </table>
                </div>
                @elseif(collect($comparisonResults)->count() > 0 && $asteriskPosition > 0 && $synonyms_string)
                <div class="mt-4 w-2/3 bg-white shadow-md p-2 border border-gray-300">
                    @foreach($comparisonResults as $key => $value)
                    <div class="flex p-2 border-b border-gray-400 @if($loop->even) bg-gray-100 @else bg-white @endif">
                        <div>{!! $key !!}</div>
                    </div>
                    @endforeach
                </div>
                @endif
                @endif
            </div>

        </div>


    </div>

</div>
<script>
    window.addEventListener('strings-are-ready-trigger-compare', event => {
        document.getElementById('compareStrings').click();
    });

    window.addEventListener('synonym-strings-is-ready-trigger-search', event => {
        document.getElementById('findSynonyms').click();
    });
</script>