<div class="space-y-9 m-4 md:m-9">
    <div
        class="justify-center flex items-center border border-dashed border-gray-700 rounded bg-sweet-corn-200 relative  h-40">
        <div
            class="absolute top-0 left-0 bg-sweet-corn-600 h-40"
            id="showUploadProgress"
        ></div>
        @if($isExtractingPDF)
        <div class="text-xl text-gray-700">
            Extracting Content from <span class="font-semibold text-black">{{ $fileName }}</span>...
        </div>
        @else
        <form wire:submit.prevent="save">
            <input
                type="file"
                wire:model.defer="pdfFile"
                accept=".pdf"
                class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
            >
            <div
                class="p-6 absolute top-2 right-0 left-0 m-auto text-lg flex items-center justify-center"
                id="fileUploadContainer"
            >
                <div class="flex justify-center items-center">
                    <x-bi-file-earmark-pdf class="text-monza-500 w-24 h-24"></x-bi-file-earmark-pdf>
                </div>
                <div class="ml-4 space-y-2 text-sm md:text-base">
                    <div class="cursor-pointer">
                        Drop your files anywhere to upload
                    </div>
                    <div class="">
                        OR
                    </div>
                    <div class="text-blue-700 underline">
                        Click here to upload
                    </div>
                </div>
            </div>
            <div
                class="p-6 absolute top-2 right-0 left-0 m-auto text-lg items-center justify-center hidden"
                id="showProgressContentContainer"
            >
                Upload in progress...
            </div>
        </form>
        @endif
    </div>
    <input
        type="text"
        wire:model="$fileNameToDisplay"
        class="hidden"
    />

    @if($isExtractingPDF)
    <div class="">
        <svg
            version="1.1"
            id="svg-animation-example"
            class="svg-line-drawing rtl-magazine-animation"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            width="720"
            height="310"
            viewBox="0 0 720 310"
            xml:space="preserve"
            aria-hidden="true"
        >
            <defs>
                <clipPath id="mask-page">
                    <path
                        class="stroke-alt stroke-width linecap"
                        d="m240,275 l240,0 0,-217 -240,0z"
                    />
                </clipPath>
            </defs>
            <!-- content page -->
            <g clip-path="url(#mask-page)">
                <g class="ani-move-page is-animated">
                    <!-- section one -->
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,275 m254,-203 l212,0 0,112 -212,0z"
                        fill="none"
                    />
                    <path
                        class="stroke-alt stroke-width linecap"
                        d="m0,275 m272,-172 a13 13 180 0 1 26,0 a13 13 180 0 1 -26,0"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,275 m254,-203 m22,112 l34,-44 a9 9 180 0 1 13,-1 l15,16 38,-48 a5 5 180 0 1 8.4,0 l60,77"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,275 m254,-67 l212,0 m-212,10 l54,0 m25,0 l54,0 m25,0 l54,0 m-212,10 l54,0 m25,0 l54,0 m25,0 l54,0"
                        fill="none"
                    />
                    <!-- button section one -->
                    <path
                        class="stroke stroke-width linecap"
                        d="m350,250 a10 10 180 0 1 20,0 a10 10 180 0 1 -20,0 m6.8,-1.7 l3.2,3.2 3.2,-3.2"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m318,290 l0,430"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m333,306 l54,0 m-54,10 l54,0 m-54,10 l133,0 m-133,10 l133,0"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m333,356 l133,0 0,78 -133,0 0,-78 m0,90 l54,0 m-54,10 l54,0 m-54,20 133,0 0,78 -133,0 0,-78 m0,90 l54,0 m-54,10 l54,0 m-54,20 133,0 0,78 -133,0 0,-78 m0,90 l54,0 m-54,10 l54,0 m-54,20"
                        fill="none"
                    />
                    <!-- section two -->
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,680 m0,275 m254,-203 l212,0 0,112 -212,0z"
                        fill="none"
                    />
                    <path
                        class="stroke-alt stroke-width linecap"
                        d="m0,680 m0,275 m272,-172 a13 13 180 0 1 26,0 a13 13 180 0 1 -26,0"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,680 m0,275 m254,-203 m22,112 l34,-44 a9 9 180 0 1 13,-1 l15,16 38,-48 a5 5 180 0 1 8.4,0 l60,77"
                        fill="none"
                    />
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,680 m0,275 m254,-67 l212,0 m-212,10 l54,0 m25,0 l54,0 m25,0 l54,0 m-212,10 l54,0 m25,0 l54,0 m25,0 l54,0"
                        fill="none"
                    />
                    <!-- button section two -->
                    <path
                        class="stroke stroke-width linecap"
                        d="m0,680 m350,250 a10 10 180 0 1 20,0 a10 10 180 0 1 -20,0 m6.8,-1.7 l3.2,3.2 3.2,-3.2"
                        fill="none"
                    />
                </g>
                <g class="ani-move-menu is-animated">
                    <g>
                        <path
                            class="stroke stroke-width linecap"
                            d="m254,306 l54,0 m-54,10 l54,0 m-54,10 l54,0 m-54,10 l54,0"
                            fill="none"
                        />
                    </g>
                </g>
            </g>
            <!-- fade button -->
            <g
                class="ani-fade-button is-animated"
                opacity="0"
            >
                <path
                    class="stroke-background stroke-overlay linecap"
                    d="m350,250 a10 10 180 0 1 20,0 a10 10 180 0 1 -20,0 m6.8,-1.7 l3.2,3.2 3.2,-3.2"
                    fill="none"
                />
                <path
                    class="stroke-alt stroke-width linecap"
                    d="m350,250 a10 10 180 0 1 20,0 a10 10 180 0 1 -20,0 m6.8,-1.7 l3.2,3.2 3.2,-3.2"
                    fill="none"
                />
            </g>
            <!-- baseline -->
            <path
                class="stroke stroke-width linecap"
                d="m0,275 l240,0 0,-230 a5 5 90 0 1 5,-5 l230,0 a5 5 90 0 1 5,5 l0,230 240,0"
                fill="none"
            />
            <path
                class="stroke stroke-width linecap"
                d="m0,275 m240,-217 l240,0"
                fill="none"
            />
            <path
                class="stroke stroke-width linecap"
                d="m0,275 m240,-226 m10,0 a4 4 180 0 1 8,0 a4 4 180 0 1 -8,0 m14,0 a4 4 180 0 1 8,0 a4 4 180 0 1 -8,0 m14,0 a4 4 180 0 1 8,0 a4 4 180 0 1 -8,0"
                fill="none"
            />
            <defs>
                <style>
                    .svg-line-drawing {
                        width: 100%;
                    }

                    .svg-line-drawing .stroke-background {
                        stroke: #eddd3e;
                    }

                    .svg-line-drawing .stroke {
                        stroke: #12353C;
                    }

                    .svg-line-drawing .stroke-alt {
                        stroke: #ffffff;
                    }

                    .svg-line-drawing .stroke-width {
                        stroke-width: 2;
                    }

                    .svg-line-drawing .stroke-overlay {
                        stroke-width: 3;
                    }

                    .svg-line-drawing .linecap {
                        stroke-linecap: round;
                        stroke-linejoin: round;
                    }

                    .rtl-magazine-animation .ani-fade-button,
                    .rtl-magazine-animation .ani-move-page,
                    .rtl-magazine-animation .ani-move-menu {
                        -webkit-animation-duration: 2500ms;
                        animation-duration: 2500ms;
                        -webkit-animation-timing-function: ease;
                        animation-timing-function: ease;
                        -webkit-animation-delay: 100ms;
                        animation-delay: 100ms;
                        -webkit-animation-iteration-count: infinite;
                        animation-iteration-count: infinite;
                    }

                    .rtl-magazine-animation .ani-fade-button {
                        -webkit-animation-name: fade-button;
                        animation-name: fade-button;
                    }

                    .rtl-magazine-animation .ani-move-page {
                        -webkit-animation-name: move-page;
                        animation-name: move-page;
                    }

                    .rtl-magazine-animation .ani-move-menu {
                        -webkit-animation-name: move-menu;
                        animation-name: move-menu;
                    }

                    @-webkit-keyframes fade-button {

                        0%,
                        12%,
                        100% {
                            opacity: 0;
                        }

                        9%,
                        11% {
                            opacity: 1;
                        }
                    }

                    @keyframes fade-button {

                        0%,
                        12%,
                        100% {
                            opacity: 0;
                        }

                        9%,
                        11% {
                            opacity: 1;
                        }
                    }

                    @-webkit-keyframes move-page {

                        0%,
                        14%,
                        100% {
                            -webkit-transform: translateY(0px);
                            -webkit-animation-timing-function: ease-in;
                        }

                        28% {
                            -webkit-transform: translateY(-220px);
                            -webkit-animation-timing-function: linear;
                        }

                        80%,
                        99.9999% {
                            -webkit-transform: translateY(-680px);
                            -webkit-animation-timing-function: linear;
                        }
                    }

                    @keyframes move-page {

                        0%,
                        14%,
                        100% {
                            transform: translateY(0px);
                            animation-timing-function: ease-in;
                        }

                        28% {
                            transform: translateY(-220px);
                            animation-timing-function: linear;
                        }

                        80%,
                        99.9999% {
                            transform: translateY(-680px);
                            animation-timing-function: linear;
                        }
                    }

                    @-webkit-keyframes move-menu {

                        0%,
                        14%,
                        100% {
                            -webkit-transform: translateY(0px);
                            -webkit-animation-timing-function: ease-in;
                        }

                        28%,
                        68.6957% {
                            -webkit-transform: translateY(-220px);
                            -webkit-animation-timing-function: linear;
                        }

                        80% {
                            -webkit-transform: translateY(-320px);
                            -webkit-animation-timing-function: linear;
                        }

                        99.9999% {
                            -webkit-transform: translateY(-680px);
                            -webkit-animation-timing-function: linear;
                        }
                    }

                    @keyframes move-menu {

                        0%,
                        14%,
                        100% {
                            transform: translateY(0px);
                            animation-timing-function: ease-in;
                        }

                        28%,
                        68.6957% {
                            transform: translateY(-220px);
                            animation-timing-function: linear;
                        }

                        80% {
                            transform: translateY(-320px);
                            animation-timing-function: linear;
                        }

                        99.9999% {
                            transform: translateY(-680px);
                            animation-timing-function: linear;
                        }
                    }
                </style>
            </defs>
        </svg>
    </div>
    @endif

    <div class="flex md:space-x-4 h-3/4">
        <div class="flex-1 w-2/3 h-screen hidden md:inline-block">
            <iframe
                class="w-full h-5/6"
                src="{{ $fileNameToDisplay }}"
            ></iframe>
        </div>
        @if($xmlPath != '')
        <div class="flex-1 h-screen">
            <div class="content-extraction-header flex justify-between items-center bg-gray-300 p-3 rounded-t">
                <div class="font-semibold text-lg">Content Of The File</div>
                <div class="space-x-2 flex">
                    <a
                        href="{{ $xmlPath }}"
                        class="text-sm bg-gray-600 px-2 py-1 rounded font-semibold hover:text-white hover:bg-gray-800 text-gray-100"
                    >XML</a>
                    <a
                        href="{{ $jsonPath }}"
                        class="text-sm bg-gray-600 px-2 py-1 rounded font-semibold hover:text-white hover:bg-gray-800 text-gray-100"
                    >JSON</a>
                    <a
                        href="{{ $textPath }}"
                        class="text-sm bg-gray-600 px-2 py-1 rounded font-semibold hover:text-white hover:bg-gray-800 text-gray-100"
                    >TEXT</a>
                </div>
            </div>
            <div class="overflow-scroll h-5/6 p-4 bg-white">
                {!! $pdfText !!}
            </div>
        </div>
    </div>
    @endif
    </form>
</div>
<script>
    var svg = document.getElementById('svg-animation-example');
    var changeSvgStyleButton = window.document.getElementById('change-svg-style-button');

    var changeSvgStyle = function () {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        var anotherRandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        var randomStrokeWidth = Math.floor(Math.random() * 8) + 1;
        [].forEach.call(svg.querySelectorAll('.svg-line-drawing .stroke'), function (element) {
            element.setAttribute('style', 'stroke:' + randomColor + ';stroke-width: ' + randomStrokeWidth + ';');
        });
        [].forEach.call(svg.querySelectorAll('.svg-line-drawing .stroke-alt'), function (element) {
            element.setAttribute('style', 'stroke:' + anotherRandomColor + ';stroke-width: ' + randomStrokeWidth + ';');
        })
    };


    let input = document.querySelector('input[type="file"]');
    input.addEventListener('livewire-upload-start', () => {

    });
    input.addEventListener('livewire-upload-finish', () => {
        // document.getElementById('showProgressContentContainer').classList.add('hidden');
        // document.getElementById('showProgressContentContainer').classList.remove('flex');

        // document.getElementById('fileUploadContainer').classList.add('flex');
        // document.getElementById('fileUploadContainer').classList.remove('hidden');
    });
    input.addEventListener('livewire-upload-error', () => console.log('livewire-upload-error'));
    input.addEventListener('livewire-upload-progress', (event) => {
        document.getElementById('fileUploadContainer').classList.remove('flex');
        document.getElementById('fileUploadContainer').classList.add('hidden');
        document.getElementById('showProgressContentContainer').classList.remove('hidden');
        document.getElementById('showProgressContentContainer').classList.add('flex');
        document.getElementById('showUploadProgress').style.width = event.detail.progress + '%';
    });

</script>