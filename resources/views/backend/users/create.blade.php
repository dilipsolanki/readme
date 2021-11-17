<x-backendapp>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Permissions') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg">
                <x-error-message :errors="$errors"></x-error-message>
                <div class="container mx-auto mt-8 bg-white shadow-md">
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1 font-semibold">Add User</h2>
                        <a href="{{ route('backend.users.index') }}" class="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-200 hover:text-blue-800">Back to all users</a>
                    </div>

                    <form method="POST" action="{{ route('backend.users.store') }}" class="w-full max-w-sm p-4">
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
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-email">
                                    Email
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-email" type="email" name="email" value="">
                            </div>
                        </div>
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-password">
                                    Password
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-password" type="password" name="password" value="">
                            </div>
                        </div>
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-confirm-password">
                                    Confirm Password
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-confirm-password" type="password" name="password_confirmation" value="">
                            </div>
                        </div>
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
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
                                <button class="px-2 py-1 text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none" type="submit">
                                    Add User
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-backendapp>