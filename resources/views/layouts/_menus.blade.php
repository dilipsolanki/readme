<div class="h-full overflow-y-hidden text-white bg-gray-800 shadow">
    <a class="flex items-center justify-center w-full h-16 text-3xl font-bold tracking-wide text-white bg-indigo-600" href="{{ route('dashboard') }}">
        {{ config('app.name') }}
    </a>
    <ul class="mt-6">
        <li class="flex relative px-6 py-3 {{ request()->routeIs('backend.dashboard') ? 'bg-indigo-500 text-white font-bold' : 'text-white' }}">
            {!! request()->routeIs('backend.dashboard') ? '<span class="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden="true"></span>' : '' !!}
            <a data-turbolinks-action="replace" class="inline-flex items-center w-full" href="{{route('backend.dashboard')}}">
                <svg class="w-5 h-5" ari a-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                    </path>
                </svg>
                <span class="ml-4">{{ __('Dashboard') }}</span>
            </a>
        </li>

        <li class="flex relative px-6 py-3 {{ Route::is('backend.users.*') ? 'bg-indigo-500 text-white font-bold' : 'text-white' }}">
            {!! Route::is('backend.users.*') ? '<span class="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden="true"></span>' : '' !!}
            <a data-turbolinks-action="replace" class="inline-flex items-center w-full" href="{{route('backend.users.index')}}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                <span class="ml-4">{{ __('Users') }}</span>
            </a>
        </li>

        <li class="flex relative px-6 py-3 {{ Route::is('backend.roles.*') ? 'bg-indigo-500 text-white font-bold' : 'text-white' }}">
            {!! Route::is('backend.roles.*') ? '<span class="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden="true"></span>' : '' !!}
            <a data-turbolinks-action="replace" class="inline-flex items-center w-full" href="{{route('backend.roles.index')}}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 icon icon-tabler icon-tabler-settings-automation" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <path d="M10 9v6l5 -3z" />
                </svg>
                <span class="ml-4">{{ __('Roles') }}</span>
            </a>
        </li>

        <li class="flex relative px-6 py-3 {{ Route::is('backend.permissions.*') ? 'bg-indigo-500 text-white font-bold' : 'text-white' }}">
            {!! Route::is('backend.permissions.*') ? '<span class="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden="true"></span>' : '' !!}
            <a data-turbolinks-action="replace" class="inline-flex items-center w-full" href="{{route('backend.permissions.index')}}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 icon icon-tabler icon-tabler-lock" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>
                <span class="ml-4">{{ __('Permissions') }}</span>
            </a>
        </li>

        <li class="flex relative px-6 py-3 {{ Route::is('backend.tools.*') ? 'bg-indigo-500 text-white font-bold' : 'text-white' }}">
            {!! Route::is('backend.tools.*') ? '<span class="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden="true"></span>' : '' !!}
            <a data-turbolinks-action="replace" class="inline-flex items-center w-full" href="{{route('backend.tools.index')}}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 icon icon-tabler icon-tabler-settings" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <span class="ml-4">{{ __('Tools') }}</span>
            </a>
        </li>

        <li class="flex relative px-6 py-3 {{ Route::is('backend.navigation.*') ? 'bg-indigo-500 text-white font-bold' : 'text-white' }}">
            {!! Route::is('backend.navigation.*') ? '<span class="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden="true"></span>' : '' !!}
            <a data-turbolinks-action="replace" class="inline-flex items-center w-full" href="{{route('backend.navigation.index')}}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings-automation w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <path d="M10 9v6l5 -3z" />
                </svg>
                <span class="ml-4">{{ __('Navigation') }}</span>
            </a>
        </li>
    </ul>
</div>