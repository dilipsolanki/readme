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
                        <h1 class="text-xl">User Management</h1>
                        <div>
                            <a href="{{ route('backend.roles.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Roles</a>
                            <a href="{{ route('backend.permissions.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Permissions</a>
                        </div>
                    </div>
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1 font-semibold">Users ({{ $users->count() }})</h2>
                        <a href="{{ route('backend.users.create') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Add User</a>
                    </div>

                    <table class="w-full bg-white shadow">
                        <thead>
                            <tr>
                                <th class="p-2 text-left bg-gray-200 border">Name</th>
                                <th class="p-2 text-left bg-gray-200 border">Email</th>
                                <th class="p-2 text-left bg-gray-200 border">Date/Time Added</th>
                                <th class="p-2 text-left bg-gray-200 border">User Roles</th>
                                <th class="p-2 text-left bg-gray-200 border">Operations</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($users as $user)
                            <tr>
                                <td class="p-2 text-left border">{{ $user->name }}</td>
                                <td class="p-2 text-left border">{{ $user->email }}</td>
                                <td class="p-2 text-left border">{{ $user->created_at->format('F d, Y h:ia') }}</td>
                                <td class="p-2 text-left border">{{ $user->roles()->pluck('name')->implode(', ') }}</td>
                                {{-- Retrieve array of roles associated to a user and convert to string --}}
                                <td class="flex p-2 text-left border">
                                    <a href="{{ route('backend.users.edit', $user->id) }}" class="mr-2 text-blue-600">
                                        Edit
                                    </a>
                                    <form action="{{ route('backend.users.destroy',$user->id) }}" method="POST">
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