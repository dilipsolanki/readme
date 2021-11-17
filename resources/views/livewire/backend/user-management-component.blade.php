<div x-data="{ countOfSelectedUsers: 0, showHideRoles: false }"
     @user-roles-assigned="showHideRoles = false;">

    <!-- <x-loading target="selectedUser"></x-loading> -->

    @if(Session::has('flash_message'))
    <div class="container mb-4">
        <div class="px-2 py-2 text-blue-800 bg-blue-200 border border-blue-500 rounded">
            <em> {!! session('flash_message') !!}</em>
        </div>
    </div>
    @endif

    <x-error-message :errors="$errors"></x-error-message>

    <div class="flex items-end justify-between pt-6 mb-4">
        <h1 class="text-xl">User Management</h1>
        <div>
            <a href="{{ route('backend.users.create') }}"
               class="px-2 py-1 mr-1 text-sm text-gray-900 bg-gray-300 rounded hover:bg-gray-400">Add User</a>

            <div class="relative inline-block"
                 x-show="countOfSelectedUsers > 0"
                 x-on:click.away="showHideRoles = false;">
                <a href="#"
                   class="px-2 py-1 text-sm bg-blue-500 rounded text-gray-50 hover:bg-blue-600"
                   x-on:click="showHideRoles = !showHideRoles">Assign Role</a>
                <div class="absolute grid grid-flow-row p-4 bg-white border border-gray-200 rounded shadow-lg"
                     x-show="showHideRoles"
                     x-transition:enter.duration.250ms
                     x-transition:leave.duration.250ms>
                    @foreach ($roles as $kr => $kv)
                    <label class="inline-flex px-1 my-1">
                        <input type="checkbox"
                               value="{{ $kr }}"
                               class="form-checkbox"
                               wire:model="selectedRole" />
                        <span class="ml-2">{{ $kv }}</span>
                    </label>
                    @endforeach
                    <div class="flex items-end justify-end mt-4 mb-2">
                        <button wire:click="assignRoleToUsers"
                                class="px-2 py-1 text-sm bg-green-500 rounded hover:bg-green-600 ">Assign</button>
                    </div>
                </div>
            </div>


            <!-- <a href="{{ route('backend.roles.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Roles</a>
            <a href="{{ route('backend.permissions.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Permissions</a> -->
        </div>
    </div>
    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
        <h2 class="pb-1 font-semibold">Users ({{ $users->count() }})</h2>
        <div>
            <!-- <a href="{{ route('backend.users.create') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Add User</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-900 bg-blue-500 rounded hover:bg-blue-300">Assign Role</a> -->
            <select class="py-1 text-gray-700 rounded"
                    wire:model="searchByRole">
                <option value="-1">All Roles</option>
                @foreach ($roles as $kr => $kv)
                <option value="{{ $kv }}">{{ $kv }}</option>
                @endforeach
            </select>
            <input type="text"
                   placeholder="Search..."
                   class="py-1 text-gray-700 placeholder-gray-400 rounded"
                   wire:model.debounce.500ms="searchString" />
        </div>
    </div>

    <table class="w-full bg-white shadow">
        <thead>
            <tr>
                <th class="p-2 text-left bg-gray-200 border border-gray-400"></th>
                <th class="p-2 text-left bg-gray-200 border border-gray-400">Name</th>
                <th class="p-2 text-left bg-gray-200 border border-gray-400">Email</th>
                <th class="p-2 text-left bg-gray-200 border border-gray-400">Date/Time Added</th>
                <th class="p-2 text-left bg-gray-200 border border-gray-400">User Roles</th>
                <th class="p-2 text-left bg-gray-200 border border-gray-400">Operations</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($users as $user)
            <tr>
                <td class="p-2 text-center border">
                    <input type="checkbox"
                           wire:model="selectedUser"
                           value="{{ $user->id }}"
                           wire:key="{{ $user->id }}"
                           x-on:click="$event.target.checked ? countOfSelectedUsers++ : countOfSelectedUsers--" />
                </td>
                <td class="p-2 text-left border">{{ $user->name }}</td>
                <td class="p-2 text-left border">{{ $user->email }}</td>
                <td class="p-2 text-left border">{{ $user->created_at->format('F d, Y h:ia') }}</td>
                <td class="p-2 text-left border">{{ $user->roles()->pluck('name')->implode(', ') }}</td>
                {{-- Retrieve array of roles associated to a user and convert to string --}}
                <td class="flex p-2 text-left border">
                    <a href="{{ route('backend.users.edit', $user->id) }}"
                       class="mr-2 text-blue-600">
                        Edit
                    </a>
                    <form action="{{ route('backend.users.destroy',$user->id) }}"
                          method="POST">
                        @method('DELETE')
                        @csrf
                        <button type="submit"
                                class="text-red-600">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="mt-6">
        {{ $users->links() }}
    </div>
</div>