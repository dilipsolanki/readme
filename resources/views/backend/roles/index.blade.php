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
                        <h1 class="text-xl">Roles Management</h1>
                        <div>
                            <a href="{{ route('backend.users.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Users</a>
                            <a href="{{ route('backend.permissions.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Permissions</a>
                        </div>
                    </div>
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1 font-semibold">Roles ({{ $roles->count() }})</h2>
                        <a href="{{ route('backend.roles.create') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Add Role</a>
                    </div>

                    <table class="w-full bg-white shadow">
                        <thead>
                            <tr>
                                <th class="p-2 text-left bg-gray-200 border">Role</th>
                                <th class="p-2 text-left bg-gray-200 border">Permissions</th>
                                <th class="p-2 text-left bg-gray-200 border">Operations</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($roles as $role)
                            <tr>
                                <td class="p-2 text-left border">{{ $role->name }}</td>
                                <td class="p-2 text-left border">{!! str_replace(array('[',']','"'),'', $role->permissions()->pluck('name')) !!}</td>
                                <td class="flex p-2 text-left border">
                                    <a href="{{ route('backend.roles.edit', $role->id) }}" class="mr-2 text-blue-600">
                                        Edit
                                    </a>
                                    <form action="{{ route('backend.roles.destroy', $role->id) }}" method="POST">
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