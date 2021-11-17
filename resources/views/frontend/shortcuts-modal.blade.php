<div
    class="overflow-auto"
    style="background-color: rgba(0,0,0,0.5)"
    x-show="isShortCutsModalOpen"
    :class="{ 'absolute inset-0 z-10 flex items-center justify-center': isShortCutsModalOpen }"
>
    <div
        class="bg-white shadow-2xl m-4 sm:m-8 w-1/4 rounded"
        x-show="isShortCutsModalOpen"
        @click.away="isShortCutsModalOpen = false"
    >
        <div class="flex justify-between items-center border-b p-4 text-xl bg-gray-200 rounded-t border-gray-300">
            <h6 class="text-xl font-bold flex items-center">
                <x-bi-keyboard-fill class="mr-2"></x-bi-keyboard-fill>Keyboard Shortcuts
            </h6>
            <button
                type="button"
                @click="isShortCutsModalOpen = false"
            >✖</button>
        </div>
        <div class="p-4">
            <div class="flex items-center justify-between p-2 border-b border-gray-300">
                <div>Go to Dashboard</div>
                <div>
                    <kbd class="kbdClass">.</kbd><kbd class="kbdClass">d</kbd>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 border-b border-gray-300">
                <div>Go to Spell-check</div>
                <div>
                    <kbd class="kbdClass">.</kbd><kbd class="kbdClass">s</kbd>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 border-b border-gray-300">
                <div>Go to Hubble</div>
                <div>
                    <kbd class="kbdClass">.</kbd><kbd class="kbdClass">h</kbd>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 border-b border-gray-300">
                <div>Go to Lumière</div>
                <div>
                    <kbd class="kbdClass">.</kbd><kbd class="kbdClass">l</kbd>
                </div>
            </div>
            <div class="flex items-center justify-between p-2 border-b border-gray-300">
                <div>Go to PDF Extraction</div>
                <div>
                    <kbd class="kbdClass">.</kbd><kbd class="kbdClass">p</kbd>
                </div>
            </div>


        </div>
    </div>
</div>