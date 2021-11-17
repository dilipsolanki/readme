<x-app-layout>

    <div class="my-4" x-data="{
            openSideBar: false,
            sideBarExist: false
        }">
        @include('frontend.hubble.secondary-nav',['allUsers'=>$allUsers])
        @if(Session::has('message'))
        <div class="bg-blue-100 p-2 rounded border border-gray-300">
            {{ Session::get('message') }}
        </div>
        @endif

        
        @role('administrator')
            @if(isset($allUsers) && count($allUsers) > 0)
                <div class="p-3 flex-1 flex flex-wrap items-center mt-4 mx-2 md:mx-6">
                    <div class="container mx-auto">
                        <select x-on:change="filterHubbleByUser(this)" id="hubbleUsersList" class="py-1 border border-gray-400 rounded">
                            <option value="0" data-id="0">All Users</option>
                            @foreach($allUsers as $singleUser)
                                @php $isSelection = ''; @endphp
                                @if(!empty(Request::get('search')))
                                    @php
                                        $selectedValue = Request::get('search');
                                        if(base64_decode($selectedValue) == $singleUser->id){
                                        $isSelection = 'selected';
                                        }
                                    @endphp
                                @endif
                            <option value="{{@$singleUser->id}}" data-id="{{base64_encode($singleUser->id)}}" {{@$isSelection}}>{{ucfirst(@$singleUser->name)}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            @endif
        @endrole
    

        @if($hubbleRecords->count() > 0)
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 container mx-auto mt-4 w-11/12">
            @foreach($hubbleRecords as $record)
            <div class="bg-white p-2 shadow-md rounded hover:shadow-lg h-45">
                <div class="mb-2 text-gray-500 text-sm h-28">
                    <a href="{{ route('dashboard.hubble', $record->fetch_id) }}/?hubbleAuthor={{ $record->getHubbleAuthor->name }}">
                        {!! substr(strip_tags($record->content), 0, 100) !!}...
                    </a>
                </div>
                <div class="border-t border-gray-200 pt-2 flex items-center justify-between">
                    <span>
                        {{ $record->extended->count() }}
                    </span>
                    <a href="{{ route('hubble.delete', $record->id) }}">
                        <x-bi-trash-fill class="text-gray-400 hover:text-gray-600"></x-bi-trash-fill>
                    </a>
                </div>
                @if (in_array(1, $userRole))
                <span class="text-gray-400 mt-1 pt-1 border-t flex items-center justify-start">
                    <x-bi-person-fill class="mr-1"></x-bi-person-fill>{{ ucfirst(@$record->getHubbleAuthor->name) }}
                </span>
                @endif
            </div>
            @endforeach
        </div>
        @else
        <div class="bg-sweet-corn-200 p-2 rounded border border-sweet-corn-400 mx-auto container mt-8">
            No records found.
        </div>
        @endif
        <div class="grid container mx-auto mt-8">
            {{$hubbleRecords->links()}}
        </div>
    </div>

</x-app-layout>
