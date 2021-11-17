<div class="bg-white shadow rounded-md pb-3 mb-4" wire:poll.4s>
    <!-- wire:poll.4s -->
    <div
        class="bg-sweet-corn-500 border-b border-sweet-corn-600 rounded-t-md font-bold tracking-wider text-xm uppercase px-4 py-2 mb-3">Recent Queries
    </div>
    @if($queries->count() > 0)
        @foreach($queries as $queryString)
            <div
                class="px-4 py-1 flex items-center text-blue-500 cursor-pointer hover:underline text-lg"
                @click.prevent="$refs.enteredString.textContent = $event.target.innerText; enterAndSearch();"
            >
                <x-bi-search class="w-3 h-3 text-gray-600 mr-2"></x-bi-search>{{ $queryString->query }}
            </div>
        @endforeach
        <div class="m-2">{{ $queries->links('frontend.lumiere.lumiere-recent-queries-pagination-view') }}</div>
    @endif
</div>
