<div @if($status !='' && $status !='success' ) wire:poll.3000ms @endif>
    <div class="flex flex-col gap-5 p-2 bg-white rounded shadow-lg select-none sm:p-4 sm:flex-row ">
        <div class="flex flex-col flex-1 gap-5 sm:p-2">
            <div class="flex flex-col flex-1 gap-3">
                <div class="flex gap-3 mt-auto">
                    <div class="w-10 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                    <div class="w-60 h-8 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-5 p-2 mt-4 bg-white rounded shadow-lg select-none sm:p-4 sm:flex-row ">
        <div class="flex flex-col flex-1 gap-5 sm:p-2">
            <div class="flex flex-col flex-1 gap-3">
                <div class="flex gap-3 mt-auto">
                    <div class="w-10 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                    <div class="w-60 h-8 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-5 p-2 mt-4 bg-white rounded shadow-lg select-none sm:p-4 sm:flex-row ">
        <div class="flex flex-col flex-1 gap-5 sm:p-2">
            <div class="flex flex-col flex-1 gap-3">
                <div class="flex gap-3 mt-auto">
                    <div class="w-10 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                    <div class="w-60 h-8 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@if($status == 'success')
<script>
    document.addEventListener('livewire:load', function() {
        Livewire.emit('success_rcvd_back_to_parent', "{{ $jsonResult }}");
    });
</script>
@endif