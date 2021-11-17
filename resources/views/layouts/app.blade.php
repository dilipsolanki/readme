<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >
    <meta
        name="csrf-token"
        content="{{ csrf_token() }}"
    >

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
    >

    <!-- Styles -->
    <link
        rel="stylesheet"
        href="{{ mix('css/app.css') }}"
    >

    @livewireStyles

    <!-- Scripts -->
    <script
        src="{{ mix('js/app.js') }}"
        defer
    ></script>
    <script type="text/javascript">
        var APP_URL = "{{ json_encode(url('/')) }}";
    </script>

</head>

<body class="font-sans antialiased bg-blue-100" x-data="{ isShortCutsModalOpen : false, appBaseUrl: APP_URL }" x-global="LP_DATA">
    <x-jet-banner />

    <div class="min-h-screen bg-blue-100">
        @livewire('navigation-menu')
        <main class="flex">
            <div class="w-full">
                <livewire:about-how-to-container-component></livewire:about-how-to-container-component>
                
                {{ $slot }}
            </div>
        </main>
    </div>

    @stack('modals')

    @livewire('livewire-ui-modal')

    @livewireScripts

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <x-livewire-alert::scripts />
    <x-lean::console-log :environment="['local', 'test']" />


    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.6.4/lottie_svg.min.js"></script>
    @stack('scripts')
    <!--  script starts here -->
    @if(app()->environment() == 'prod')
<script type="text/javascript">
    (function(bi, gi, nt) {
        window._bigint = {"track" : function(l, de, da) {
            window._bigint._oB.push({"l": l, "de": de, "da": da});
        }, "_oB": []
        };
        var _sD = ((/(test|local|dev|staging)[0-9]*\./gi).test(window.location.hostname)) ? "test1." : "";
        _sD = (nt === undefined || nt === "") ? _sD : (nt + ".");
        var _sE = (bi === undefined || bi === "") ? "cactusglobal.io" : bi;
        var _aE = (gi === undefined || gi === "") ? "cactusglobal.io" : gi;
        window.cactusglobal_io = {};
        window.cactusglobal_io.endpoint = "https://" + _sD + _aE + "/v1/";
        var d = new Date();
        var jsElm = document.createElement("script");
        jsElm.async = 1;
        jsElm.type = "application/javascript";
        jsElm.src = "https://" + _sD + _sE + "/assets/client-track.js?" + d.getFullYear() + '' + d.getMonth() + '' + d.getDate() + '' + d.getHours();
        document.head.appendChild(jsElm);
    })("cf.cactusglobal.io", "api.cactusglobal.io");
</script> 
@endif
<!--  script ends here -->
    @include('frontend.shortcuts-modal')
</body>

</html>