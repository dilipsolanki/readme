<x-backendapp>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Permissions') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-xl sm:rounded-lg">
            
                <x-error-message :errors="$errors"></x-error-message>

                <div class="container mx-auto mt-8 bg-white shadow-md">
                    <div class="flex items-end justify-between bg-gray-700 px-4 py-3 rounded-t text-white">
                        <h2 class="pb-1 font-semibold">Add Permission</h2>
                        <a href="{{ route('backend.permissions.index') }}"
                            class="bg-blue-500 hover:bg-blue-200 hover:text-blue-800 px-2 py-1 rounded text-white text-sm">Back to all
                            permissions</a>
                    </div>

                    <form method="POST" action="{{ route('backend.permissions.store') }}" class="p-4 w-full max-w-sm">
                        @csrf
                        <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Permission
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input
                                    class="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                                    id="inline-full-name" type="text" value="" name="name">
                            </div>
                        </div>

                        <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Role
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                @foreach ($roles as $role)
                                <div>
                                    <input type="checkbox" name="roles[]" value="{{ $role->id }}" /> {{ ucfirst($role->name) }}
                                </div>
                                @endforeach
                            </div>
                        </div>
                        <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                                <button
                                    class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-1 px-2 rounded"
                                    type="submit">
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