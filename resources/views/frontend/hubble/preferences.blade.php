<div class="p-4 bg-gray-50 border border-blue-100 mt-6 transform overflow-auto ease-in-out transition-all duration-300 shadow-big-right absolute z-10 md:relative" :class="openSideBar ? 'translate-x-0' : '-translate-x-full'">
    <div class="grid gap-4 pb-4 overflow-y-scroll lg:overflow-y-auto top-0" x-show="openSideBar" x-cloak>
        <div class="bg-monza-100 text-monza-900 px-2 py-1 italic rounded inline-block border border-monza-200 text-center" x-show="fetchId">Selected Preferences (Read Only)</div>
        <div class="h-10 px-2 py-4">
            <div class="flex w-full">
                <label for="toggleB" class="flex items-center justify-between w-full cursor-pointer" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                    <!-- label -->
                    <div class="text-sm font-bold text-blue-800 uppercase flex space-x-2 items-center">
                        <x-bi-arrow-right class="mr-2"></x-bi-arrow-right>Recommended Prefs
                    </div>
                    <!-- toggle -->
                    <div class="relative">
                        <!-- input -->
                        <input type="checkbox" id="toggleB" class="sr-only" name="recommended" @click="($event.target.checked == true) ? selectLang = 1 : ''" wire:click="checkHubbleConfigOptionsRecommended((typeof enterText === 'undefined'?'':enterText))" wire:model.defer="hubbleConfigOptions.recommended" :disabled="fetchId ? true : false">
                        <!-- line -->
                        <div class="block w-10 h-6 bg-gray-300 border border-gray-200 rounded-full line"></div>
                        <!-- dot -->
                        <div class="absolute w-4 h-4 transition bg-white rounded-full dot left-1 top-1">
                        </div>
                    </div>
                </label>
            </div>
        </div>
        <div class="px-2">
            <div class="mb-2 text-base font-bold text-blue-800 flex items-center">
                <x-bi-arrow-right class="mr-2"></x-bi-arrow-right>Model Selection
            </div>
            <div>
                <div>
                    <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                        <input type="radio" class="text-blue-600 form-radio" name="hubble_model" @click="selectModel = 1" value="1" @if($hubbleConfigOptions['recommended'] || $hubble['fetch_id']) disabled @endif wire:model.defer="hubbleConfigOptions.model">
                        <span class="ml-2 @if($hubbleConfigOptions['recommended']) text-gray-400 @endif">Phoenix
                            (1st Gen)</span>
                    </label>
                </div>
                <div>
                    <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                        <input type="radio" class="text-blue-600 form-radio" name="hubble_model" @click="selectModel = 2" value="2" @if($hubbleConfigOptions['recommended'] || $hubble['fetch_id']) disabled @endif wire:model.defer="hubbleConfigOptions.model">
                        <span class="ml-2 @if($hubbleConfigOptions['recommended']) text-gray-400 @endif">Gemini
                            (2nd Gen)</span>
                    </label>
                </div>
                <div>
                    <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                        <input type="radio" class="text-blue-600 form-radio" name="hubble_model" @click="selectModel = 3" value="3" @if($hubbleConfigOptions['recommended'] || $hubble['fetch_id']) disabled @endif wire:model.defer="hubbleConfigOptions.model">
                        <span class="ml-2 @if($hubbleConfigOptions['recommended']) text-gray-400 @endif">Lynx
                            (3rd Gen)</span>
                    </label>
                </div>

            </div>
        </div>
        <div class="px-2">
            <div class="flex w-full">
                <div class="flex w-full">
                    <label for="" class="w-full">
                        <!-- label -->
                        <div class="text-base font-bold text-blue-800 flex items-center">
                            <x-bi-arrow-right class="mr-2"></x-bi-arrow-right>Language Preference
                        </div>
                        <div class="flex items-center justify-start mt-3">
                            <div class="mr-4">
                                <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                                    <input type="radio" class="text-blue-600 form-radio" name="hubble_lang_pref" value="1" @click="selectLang = 1" wire:model.defer="hubbleConfigOptions.language_pref" :disabled="fetchId ? true : false">
                                    <span class="ml-2">Auto Detect</span>
                                </label>
                            </div>
                            <div>
                                <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                                    <input type="radio" class="text-blue-600 form-radio" name="hubble_lang_pref" value="2" @click="selectLang = 2" wire:model.defer="hubbleConfigOptions.language_pref" :disabled="fetchId ? true : false">
                                    <span class="ml-2">Select Language</span>
                                </label>
                            </div>
                        </div>
                        <div class="flex items-center justify-start" x-show="selectLang == 2" x-transition:enter.duration.500ms x-transition:leave.duration.500ms>
                            <div class="mr-4">
                                <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                                    <input type="radio" class="text-blue-600 form-radio" name="hubble_lang_us_uk" value="en-us" wire:model.defer="hubbleConfigOptions.language_us_uk" :disabled="fetchId ? true : false">
                                    <span class="ml-2">US</span>
                                </label>
                            </div>
                            <div>
                                <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                                    <input type="radio" class="text-blue-600 form-radio" name="hubble_lang_us_uk" value="en-gb" wire:model.defer="hubbleConfigOptions.language_us_uk" :disabled="fetchId ? true : false">
                                    <span class="ml-2">UK</span>
                                </label>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div class="px-2">
            <div class="mb-2 text-base font-bold text-blue-800 flex items-center">
                <x-bi-arrow-right class="mr-2"></x-bi-arrow-right>Beta Features
            </div>
            <div class="flex w-full">
                <label :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'" for="spellCheck" @class([ 'flex items-center justify-between w-full' , 'cursor-not-allowed'=> $hubbleConfigOptions['recommended'],
                    'cursor-pointer'=> !$hubbleConfigOptions['recommended']
                    ])>
                    <!-- label -->
                    <div class="text-lg text-blue-800">
                        Spell Check
                    </div>
                    <!-- toggle -->
                    <div class="relative">
                        <!-- input -->
                        <input type="checkbox" id="spellCheck" name="spell_check" class="sr-only" @if($hubbleConfigOptions['recommended'] || $hubble['fetch_id']) disabled @endif wire:model.defer="hubbleConfigOptions.spell_check">
                        <!-- line -->
                        <div class="block w-10 h-6 @if($hubbleConfigOptions['recommended']) bg-gray-300 @else bg-gray-600 @endif border border-gray-200 rounded-full line">
                        </div>
                        <!-- dot -->
                        <div class="absolute w-4 h-4 transition bg-white rounded-full dot left-1 top-1">
                        </div>
                    </div>
                </label>
            </div>

            <div class="flex w-full my-3" x-show="selectModel != 3 && selected_tab == 'file-upload' ">

                <label :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'" x-transition:enter.duration.500ms x-transition:leave.duration.500ms for="consistencyCheck" @class([ 'flex items-center justify-between w-full' , 'cursor-not-allowed'=> $hubbleConfigOptions['recommended'],
                    'cursor-pointer'=> !$hubbleConfigOptions['recommended'],
                    ])>
                    <!-- label -->
                    <div class="text-lg text-blue-800">
                        Consistency Check
                    </div>
                    <!-- toggle -->
                    <div class="relative">
                        <!-- input -->
                        <input type="checkbox" id="consistencyCheck" name="consistency_check" class="sr-only" @if($hubbleConfigOptions['recommended'] || $hubble['fetch_id']) disabled @endif wire:model.defer="hubbleConfigOptions.consistency_check">
                        <!-- line -->
                        <div class="block w-10 h-6 @if($hubbleConfigOptions['recommended']) bg-gray-300 @else bg-gray-600 @endif border border-gray-200 rounded-full line">
                        </div>
                        <!-- dot -->
                        <div class="absolute w-4 h-4 transition bg-white rounded-full dot left-1 top-1">
                        </div>
                    </div>
                </label>

            </div>


            <div class="flex flex-wrap w-full my-6">
                <label :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'" for="chunkEdits" @class([ 'flex items-center justify-between w-full' , 'cursor-not-allowed'=> $hubbleConfigOptions['recommended'],
                    'cursor-pointer'=> !$hubbleConfigOptions['recommended']
                    ])>
                    <!-- label -->
                    <div class="text-lg text-blue-800">
                        Chunk Edits Suppression
                    </div>
                    <!-- toggle -->
                    <div class="relative">
                        <!-- input -->
                        <input type="checkbox" id="chunkEdits" name="chunk_edits" class="sr-only" @if($hubbleConfigOptions['recommended'] || $hubble['fetch_id']) disabled @endif wire:model.defer="hubbleConfigOptions.chunk_edits" @click="($event.target.checked) ? chunkEditSuppression=true : chunkEditSuppression=false;">
                        <!-- line -->
                        <div class="block w-10 h-6 @if($hubbleConfigOptions['recommended']) bg-gray-300 @else bg-gray-600 @endif border border-gray-200 rounded-full line">
                        </div>
                        <!-- dot -->
                        <div class="absolute w-4 h-4 transition bg-white rounded-full dot left-1 top-1">
                        </div>
                    </div>
                </label>
                <p class="block mt-2 text-sm text-gray-500">Turn 'ON' to allow edits to chunks<br /> of upto 3
                    words
                </p>
            </div>
            <div class="flex flex-wrap w-full" x-show="chunkEditSuppression">
                <label for="chunkEditsLite" @class([ 'flex items-center justify-between w-full' , 'cursor-not-allowed'=> $hubbleConfigOptions['recommended'],
                    'cursor-pointer'=> !$hubbleConfigOptions['recommended']
                    ])>
                    <!-- label -->
                    <div class="text-lg text-blue-800">
                        Suppression Type
                    </div>
                </label>
                <div class="flex items-center justify-start" x-transition:enter.duration.500ms x-transition:leave.duration.500ms>
                    <div class="mr-4">
                        <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                            <input type="radio" class="text-blue-600 form-radio" name="hubble_chunk_edits_lite" value="regular" wire:model.defer="hubbleConfigOptions.chunk_edits_lite" :disabled="fetchId ? true : false">
                            <span class="ml-2">Regular</span>
                        </label>
                    </div>
                    <div>
                        <label class="inline-flex items-center" :class="fetchId ? 'cursor-not-allowed' : 'cursor-pointer'">
                            <input type="radio" class="text-blue-600 form-radio" name="hubble_chunk_edits_lite" value="lite" wire:model.defer="hubbleConfigOptions.chunk_edits_lite" :disabled="fetchId ? true : false">
                            <span class="ml-2">Lite</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>