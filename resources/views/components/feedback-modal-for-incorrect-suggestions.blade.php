<div class="mt-6" x-cloak>
    <!-- Dialog (full screen) -->
    <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full" style="background-color: rgba(0,0,0,.5);" x-show="openFeedBackModal" x-transition:enter.duration.500ms x-transition:leave.duration.500ms>

        <!-- A basic modal dialog with title, body and one button to close -->
        <div class="h-auto mx-2 text-left bg-white rounded shadow-xl md:max-w-xl md:mx-0" @click.away="openFeedBackModal = false; $dispatch('clearvalues');">
            <div class="mx-8 mt-3 text-center sm:mt-0 sm:text-left ">
                <h3 class="flex items-center justify-between w-full py-4 mb-6 leading-6 text-gray-900 border-b border-gray-300">
                    <span class="text-xl font-semibold">Feedback</span>
                    <span class="cursor-pointer" @click="openFeedBackModal = false">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </span>
                </h3>

                <div class="mb-6">
                    <form class="w-11/12" wire:ignore wire:submit.prevent="saveFeedbackForIncorrectSuggestion">
                        @csrf
                        <input type="text" name="suggestedWordSelected" class="hidden" {{
                               $attributes->wire('model') }} />

                        <input class="w-full px-2 py-2 border border-gray-200 rounded" type="text" name="reason" required wire:model.defer="feedback.reason" placeholder="Tell us why its incorrect suggestion?" />

                        <input class="w-full px-2 py-2 my-4 border border-gray-200 rounded" type="text" name="recommendation" required wire:model.defer="feedback.recommendation" placeholder="According to you, what should be the correct suggestion?" />
                        <button class="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Submit
                            Feedback</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>