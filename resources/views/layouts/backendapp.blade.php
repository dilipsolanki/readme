<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    @livewireStyles

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>

<body class="font-sans antialiased">
    <x-jet-banner />
    <div x-data="{
                        isSideMenuOpen: false,
                        dark: false,
                        isNotificationsMenuOpen: false,
                        isProfileMenuOpen: false
                    }" class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'overflow-hidden': isSideMenuOpen }">

        @include('layouts.menu')
        @include('layouts.mobile-menu')
        <div class="flex flex-col flex-1 w-full">
            @include('layouts.navigation-dropdown')
            <!-- Page Content -->
            <main class="h-full overflow-y-auto">
                {{ $slot }}
            </main>
        </div>

        @stack('modals')

        @livewireScripts
    </div>
</body>

</html>