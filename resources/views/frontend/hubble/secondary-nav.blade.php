<div class="p-3 flex-1 flex flex-wrap items-center justify-between mt-4 mx-6 bg-blue-200 rounded border border-blue-300">
    <div class="flex flex-wrap">
        <div
        x-show="sideBarExist"
        class="mr-4"
    >
            <span
                x-show='openSideBar'
                x-on:click.prevent="openSideBar = false"
                class="bg-indigo-500 rounded border border-indigo-500 py-1 text-gray-100 flex items-center w-8 md:w-52 font-semibold cursor-pointer hover:bg-opacity-80 uppercase justify-center"
            >
                <x-bi-x-square-fill class="md:mr-2"></x-bi-x-square-fill><span class="hidden md:inline-block">Hide
                    Preferences</span>
            </span>
            <span
                x-show='!openSideBar'
                x-on:click.prevent="openSideBar = true"
                class="bg-indigo-500 rounded border border-indigo-500 py-1 text-gray-100 flex items-center w-8 md:w-52 font-semibold cursor-pointer hover:bg-opacity-80 uppercase justify-center"
            >
                <x-bi-list class="md:mr-2 bg-white text-black"></x-bi-list><span class="hidden md:inline-block">Show
                    Preferences</span>
            </span>
        </div>

        <div class="items-center relative group">
            <a
                href="{{  route('dashboard.hubble') }}"
                class="bg-nav rounded border border-blue-500 px-2 py-1 text-gray-100 flex items-center justify-center font-semibold cursor-pointer hover:bg-opacity-80 uppercase"
            >
                <x-bi-plus-square-fill class="mr-2"></x-bi-plus-square-fill>
                <span class="hidden md:inline-block">Fresh Hubble</span>
                <span class="inline-block md:hidden">New</span>
            </a>
            <div
                class=" flex-wrap items-center absolute z-50 -bottom-18 left-0 bg-nav bg-opacity-90 space-y-1 border border-white rounded-b-lg hidden group-hover:flex">
                <span
                    class="cursor-pointer border-b border-gray-200 px-2 py-1 w-full text-white uppercase text-sm"
                    @click.prevent="selected_tab = 'content';hideHubbleFormContainerAndReload();"
                >New
                    Content</span>
                <span
                    class="cursor-pointer border-b border-gray-200 px-2 py-1 w-full text-white uppercase text-sm"
                    @click.prevent="selected_tab = 'file-upload';hideHubbleFormContainerAndReload();"
                >Upload
                    a
                    document</span>
            </div>
        </div>

        <a
            href="{{  route('hubble.history') }}"
            class="bg-nav rounded border border-blue-500 px-2 py-1 text-gray-100 flex items-center justify-center font-semibold cursor-pointer hover:bg-opacity-80 ml-4 uppercase">
            <x-bi-file-earmark-text-fill class="mr-2"></x-bi-file-earmark-text-fill>History
        </a>
    </div>
    <!-- <div class="flex flex-row-reverse">
        <div class="bg-gray-50 border border-light-blue-100 divide-x divide-light-blue-300 justify-center rounded-md p-1">
            <x-about-how-to-component toolName="{{ Request::segment(1) }}" navType="about"></x-about-how-to-component>
            <x-about-how-to-component toolName="{{ Request::segment(1) }}" navType="how_to"></x-about-how-to-component>
        </div>
    </div> -->
</div>
<script>
    function hideHubbleFormContainerAndReload() {
        var element = document.getElementById("hubbleFormContainer");
        if (typeof (element) != 'undefined' && element != null)
            element.classList.add("invisible");
        window.location.href = "{{ route('dashboard.hubble') }}";
    }
    //Function for filter Hubble by users
    function filterHubbleByUser(event){
        var element =  document.getElementById("hubbleUsersList").selectedOptions[0].getAttribute('data-id'); 
        window.location.href = "{{ url('/') }}/hubble/history/?search="+element;
    }
    
</script>