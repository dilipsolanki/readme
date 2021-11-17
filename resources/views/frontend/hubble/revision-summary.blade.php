<div
    class="bg-blue-50 bg-opacity-60 rounded border border-blue-100 shadow-lg hidden md:grid"
    x-show="showHideRevisionSummary"
>
    <div
        class="flex items-center justify-between text-lg uppercase bg-nav p-2 mb-2 shadow-inner bg-opacity-80 rounded-t">
        <div class="font-bold text-white">Revision Summary</div>
        <div
            @click="showHideRevisionSummaryContainer = !showHideRevisionSummaryContainer"
            class="cursor-pointer"
        >
            <x-bi-chevron-down
                x-show="!showHideRevisionSummaryContainer"
                class="text-white"
            ></x-bi-chevron-down>
            <x-bi-chevron-up
                x-show="showHideRevisionSummaryContainer"
                class="text-white"
            ></x-bi-chevron-up>
        </div>
    </div>
    @if(is_array($revisionSummary))
    <div
        class="flex pb-2 px-1 mt-2"
        x-show="showHideRevisionSummaryContainer"
    >
        @foreach($revisionSummary as $key => $value)
        @if($key != 'totalCount')
        <div class="w-1/4 flex flex-col bg-gray-50 border border-blue-200 mx-1 px-3 py-2 rounded-lg relative">
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-black text-lg">{{ str_replace('and', '&', $key) }}</h2>
                <div
                    class="text-xs font-bold text-blue-800 bg-white rounded-full p-2 h-11 w-11 items-center flex justify-center absolute -right-2 -top-2 border-2 border-blue-400">
                    {{ round(($revisionSummary[$key]['count']/$revisionSummary['totalCount'])*100) }}%
                </div>
            </div>

            <div class="text-gray-600 text-sm space-y-2 p-2">
                @foreach($value as $k => $v)
                @if($k != 'count')
                <div class="flex items-center justify-between">
                    <span>{{ $k }}</span>
                    <span>{{ count($v) }}</span>
                </div>
                @endif
                @endforeach
            </div>
        </div>
        @endif
        @endforeach
    </div>
    @endif
</div>