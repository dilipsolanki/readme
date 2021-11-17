<x-app-layout>

    <div class="py-12">
        <div class="w-full mx-auto sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <section class="text-gray-600 body-font">
                    <div class="container px-5 mx-auto">
                        <div class="flex flex-row-reverse px-2 my-2 md:mr-2 md:px-0">
                            <input
                                type="text"
                                id="searchString"
                                style="transition: width 0.2s ease 0s;"
                                class="w-full border border-gray-400 rounded-full outline-none appearance-none md:focus:w-1/3 md:w-1/4 form-input focus:outline-none focus:ring-0 focus:border-blue-400"
                                onkeyup="searchTools()"
                                placeholder="Search for a tool (Press '/' to focus)"
                            />
                        </div>
                        <div class="flex flex-wrap -mx-2">
                            @foreach ($tools as $tool)
                            <div class="w-full p-4 lg:w-1/3 md:w-1/2 individualToolContainer">
                                <div
                                    class="flex h-full p-4 transition duration-500 transform border border-gray-100 rounded-lg shadow-lg bg-white sm:rounded-lg hover:scale-105">
                                    <div class="relative flex-grow">
                                        <div
                                            class="pb-1 mb-2 text-lg font-semibold text-gray-900 border-b flex items-center justify-between">
                                            <h2 class="title-font toolName flex items-center">
                                                <span class="transform transition hover:-rotate-12 origin-bottom-left">
                                                    @includeFirst(['frontend.icons.' . str_replace('dashboard.', '',
                                                    $tool->route_name), 'frontend.icons.general'], ['class' => 'h-10
                                                    w-10
                                                    rounded-md customClass'])
                                                </span>
                                                <span class="ml-2 font-semibold tracking-wide text-lg">{{ $tool->name
                                                    }}</span>
                                            </h2>
                                            <span>
                                                <button
                                                    class="fave focus:outline-none @if(in_array($tool->id, $faveTools)) faved @endif"
                                                    aria-label="Favourite"
                                                    id="tool_{{ $tool->id }}"
                                                ></button>
                                            </span>
                                        </div>

                                        <p class="pb-2 mb-4 text-base h-32">
                                            {{ $tool->short_desc }}
                                        </p>
                                        <div
                                            class="absolute bottom-0 flex items-end justify-between w-full pt-2 mt-2 border-t">
                                            <span class="text-gray-400">{{ $tool->owner }}</span>
                                            
                                            <div>
                                                @if(!$tool->is_locked)
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</x-app-layout>
<script>
    function searchTools() {
        var searchString = document.getElementById('searchString').value;
        var getToolNames = Array.from(document.querySelectorAll('.toolName'));
        getToolNames.filter((item) => {
            var toolName = item.innerText;
            if (toolName.toLowerCase().includes(searchString)) {
                item.closest('.individualToolContainer').style.display = '';
            } else {
                item.closest('.individualToolContainer').style.display = 'none';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) {
            document.getElementById('searchString').blur();
            e.preventDefault()
        }
    });

    document.querySelectorAll('.fave').forEach(fave => fave.addEventListener('click', function (event) {
        if (event.target.classList.contains('faved')) {
            event.target.classList.remove('faved');
        } else {
            event.target.classList.add('faved');
        }

        var favedTools = [...document.querySelectorAll('.faved')];
        var selectedTools = '';
        [...favedTools].forEach(tool => {
            selectedTools += (tool.id).replace('tool_', '') + ',';
        });

        console.log(selectedTools);

        fetch('save-faves', {
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "X-CSRF-TOKEN": "{{ csrf_token() }}"
            },
            method: 'POST',
            body: JSON.stringify({
                faves: selectedTools
            })
        }).then(data => {
            // console.log(data);
        });
    }));
</script>