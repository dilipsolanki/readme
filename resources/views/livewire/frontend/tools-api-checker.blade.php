<div @if($isItDown) wire:poll.{{ $pollTime }}ms @endif>
    @if($tool->is_locked==false)
        <a href="{{ route($tool->route_name) }}" class="flex items-center text-blue-500 hover:underline">
            <span>Explore the tool!</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1978f0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
            </svg>
        </a>
        @else
        <x-bi-lock-fill class="text-yellow-500 w-5 h-5"></x-bi-lock-fill>
        @endif
</div>