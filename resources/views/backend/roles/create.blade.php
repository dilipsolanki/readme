<x-backendapp>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Permissions') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg">
                <div class="container mx-auto mt-8 bg-white shadow-md">

                    <x-error-message :errors="$errors"></x-error-message>

                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1">Add Role</h2>
                        <a href="{{ route('backend.roles.index') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Back to all roles</a>
                    </div>

                    <form method="POST" action="{{ route('backend.roles.store') }}" class="w-full max-w-sm p-4">
                        @csrf
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
                                    Name
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-full-name" type="text" value="" name="name">
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
                                    Assign Permissions
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                @foreach ($permissions as $permission)
                                <div>
                                    <input type="checkbox" name="permissions[]" value="{{ $permission->id }}" />
                                    {{ ucfirst($permission->name) }}
                                </div>
                                @endforeach
                            </div>
                        </div>
                        <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                                <button class="px-2 py-1 text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-backendapp>