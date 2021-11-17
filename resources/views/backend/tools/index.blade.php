<x-backendapp>
    <div class="pb-12 mt-8">
        <div class="pb-8 mx-auto bg-white rounded shadow max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg">
                <div class="container mx-auto mt-8">
                    @if(Session::has('flash_message'))
                    <div class="container mb-4">
                        <div class="px-2 py-2 text-blue-800 bg-blue-200 border border-blue-500 rounded">
                            <em> {!! session('flash_message') !!}</em>
                        </div>
                    </div>
                    @endif

                    <x-error-message :errors="$errors"></x-error-message>

                    <div class="flex items-end justify-between mb-4">
                        <h1 class="text-xl">Tools Management</h1>
                    </div>
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1 font-semibold">Tools ({{ $tools->count() }})</h2>
                        <a href="{{ route('backend.tools.create') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Add Tool</a>
                    </div>

                    <table class="w-full bg-white shadow">
                        <thead>
                            <tr>
                                <th class="p-2 text-left bg-gray-200 border">#</th>
                                <th class="p-2 text-left bg-gray-200 border">Name</th>
                                <th class="p-2 text-left bg-gray-200 border">Short Description</th>
                                <th class="p-2 text-left bg-gray-200 border">Link</th>
                                <th class="p-2 text-left bg-gray-200 border">Owner</th>
                                <th class="p-2 text-left bg-gray-200 border">Status</th>
                                <th class="p-2 text-left bg-gray-200 border">Operations</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($tools as $tool)
                            <tr>
                                <td class="p-2 text-left border">{{ $tool->sort_number }}</td>
                                <td class="p-2 text-left border">{{ $tool->name }}</td>
                                <td class="p-2 text-left border">{{ $tool->short_desc }}</td>
                                <td class="p-2 text-left border">
                                    <a href="{{ route($tool->route_name) }}" class="text-blue-700">
                                        {{ route($tool->route_name) }}
                                    </a>
                                </td>
                                <!-- <td class="p-2 text-left border">{{ $tool->created_at->format('F d, Y h:ia') }}</td> -->
                                <td class="p-2 text-left border">{{ $tool->owner }}</td>
                                <td class="p-2 text-left border">
                                    <span class="uppercase text-sm px-2 py-1 rounded-md {{  ($tool->is_enabled == 1) ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700' }}">
                                        {{ $tool->is_enabled == 1 ? 'enabled' : 'disabled' }}
                                    </span>
                                </td>
                                <td class="flex p-2 text-left border">
                                    <a href="{{ route('backend.tools.edit', $tool->id) }}" class="mr-2 text-blue-600">
                                        Edit
                                    </a>
                                    <form action="{{ route('backend.tools.destroy',$tool->id) }}" method="POST">
                                        @method('DELETE')
                                        @csrf
                                        <button type="submit" class="text-red-600">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-backendapp>