<x-backendapp>
    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-2">
            <div class="overflow-hidden sm:rounded-lg">
                <x-error-message :errors="$errors"></x-error-message>
                <div class="container mx-auto mt-8 bg-white shadow-lg">
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1">Edit Tool ({{ $tool->name}})</h2>
                        <a href="{{ route('backend.tools.index') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Back to all tools</a>
                    </div>

                    <form method="POST" action="{{ route('backend.tools.update', $tool->id) }}" class="w-full max-w-2xl p-4">
                        @method('PUT')
                        @csrf
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
                                    Name
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-full-name" type="text" value="{{ $tool->name }}" name="name">
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-short-desc">
                                    Short Desc
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <textarea rows="7" class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-short-desc" name="short_desc">{{ $tool->short_desc }}</textarea>
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-link">
                                    Link
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <select name="route_name" class="bg-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-link">
                                    @foreach ($routes as $route)
                                    @if($tool->route_name == $route)
                                    <option selected="selected" value="{{ $route }}">{{ $route }}</option>
                                    @else
                                    <option value="{{ $route }}">{{ $route }}</option>
                                    @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-is_enabled">
                                    Enable?
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-5 h-5 text-green-600 rounded" id="inline-is_enabled" type="checkbox" value="1" name="is_enabled" {{  $tool->is_enabled ? 'checked' : '' }}>
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-is_locked">
                                    Is Locked?
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-5 h-5 text-green-600 rounded" id="inline-is_locked" type="checkbox" value="1" name="is_locked" {{  $tool->is_locked ? 'checked' : '' }}>
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-owner">
                                    Owner
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-owner" type="text" value="{{ $tool->owner }}" name="owner">
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-sort-number">
                                    Sort Number
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-sort-number" type="number" value="{{ $tool->sort_number }}" name="sort_number">
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-primary-api-endpoint">
                                    Primary API Endpoint
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-primary-api-endpoint" type="text" value="{{ $tool->primary_api_endpoint }}" name="primary_api_endpoint">
                            </div>
                        </div>


                        <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                                <button class="px-2 py-1 text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none" type="submit">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-backendapp>