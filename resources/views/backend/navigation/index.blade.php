<x-backendapp>
    <div class="pb-12 mt-8">
        <div class="pb-8 mx-auto bg-white rounded shadow max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg">
                <div class="container mx-auto my-8">
                    @if(Session::has('flash_message'))
                    <div class="container mb-4">
                        <div class="px-2 py-2 text-blue-800 bg-blue-200 border border-blue-500 rounded">
                            <em> {!! session('flash_message') !!}</em>
                        </div>
                    </div>
                    @endif

                    @if (count($errors) > 0)
                    <div class="container mb-4">
                        <ul>
                            @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                    @endif
                    <div class="flex items-end justify-between mb-4">
                        <h1 class="text-xl">Enabled Navigations</h1>
                        <div>
                            <!-- <a href="{{ route('backend.users.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Users</a>
                            <a href="{{ route('backend.roles.index') }}" class="px-2 py-1 text-white bg-indigo-500 rounded">Roles</a> -->
                        </div>
                    </div>
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1 font-semibold">Navigations ({{ $toolNavigationCount }})</h2>
                        <a href="{{ route('backend.navigation.create') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Add Navigation</a>
                    </div>

                    <table class="w-full bg-white shadow">
                        <thead>
                            <tr>
                                <th class="p-2 text-left bg-gray-200 border">Navigation Name</th>
                                <th class="p-2 text-left bg-gray-200 border">Tool Name</th>
                            </tr>
                        </thead>

                        <tbody>
                        @if(!empty($toolNavigationArray))
                        @foreach ($toolNavigationArray as $key => $toolNavigationValue)
                            @if ($key != 'totalCount')
                    
                            <tr>
                                <td class="p-2 text-left border">{{ $toolNavigationValue['nav_name'] }}</td>
                                <td class="p-2 text-left border">{{ $toolNavigationValue['tool_name'] }}</td>
                                <td class="flex p-2 text-left border">
                                    <a href="{{ route('backend.navigation.edit', $key) }}" class="mr-2 text-blue-600">
                                        Edit
                                    </a>
                                    <form action="{{ route('backend.navigation.destroy',$key) }}" method="POST">
                                        @method('DELETE')
                                        @csrf
                                        <button type="submit" class="text-red-600">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @endif
                            @endforeach
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-backendapp>