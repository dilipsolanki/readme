const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin')

module.exports = {
    darkMode: false,
    purge: {
        content: [
            './vendor/livewire-ui/modal/resources/views/*.blade.php',
            './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
            './vendor/laravel/jetstream/**/*.blade.php',
            './storage/framework/views/*.php',
            './resources/views/**/*.blade.php',
        ],
        options: {
            safelist: [
                'sm:max-w-2xl',
                'sm:max-w-4xl',
                'list-disc',
                'list-inside',
                'list-decimal'
            ]
        }
    },

    theme: {
        extend: {
            width: {
                '95': '95%',
            },
            boxShadow: {
                blue: '2px 1px 2px 2px rgba(19, 51, 81, 0.39)',
                'big-right': '0 12px 48px 0 rgb(96 101 123 / 24%)'
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'nav': '#0086E9',
                'spring-sun': {
                    '50': '#fefffd', 
                    '100': '#fefffc', 
                    '200': '#fcfff6', 
                    '300': '#fafff1', 
                    '400': '#f6fee7', 
                    '500': '#f2fedc', 
                    '600': '#dae5c6', 
                    '700': '#b6bfa5', 
                    '800': '#919884', 
                    '900': '#777c6c'
                },
                'monza': {
                    '50': '#fcf2f4',
                    '100': '#f9e6e9',
                    '200': '#f1bfc9',
                    '300': '#e999a8',
                    '400': '#d84d67',
                    '500': '#c70026',
                    '600': '#b30022',
                    '700': '#95001d',
                    '800': '#770017',
                    '900': '#620013'
                },
                'sweet-corn': {
                    '50': '#fffef9',
                    '100': '#fffdf3',
                    '200': '#fff9e2',
                    '300': '#fef5d0',
                    '400': '#feeead',
                    '500': '#fde68a',
                    '600': '#e4cf7c',
                    '700': '#bead68',
                    '800': '#988a53',
                    '900': '#7c7144'
                },
                'red-custom': {
                    "50": "#ffebee",
                    "100": "#ffcdd2",
                    "200": "#ef9a9a",
                    "300": "#e57373",
                    "400": "#ef5350",
                    "500": "#f44336",
                    "600": "#e53935",
                    "700": "#d32f2f",
                    "800": "#c62828",
                    "900": "#b71c1c",
                    "100-accent": "#ff8a80",
                    "200-accent": "#ff5252",
                    "400-accent": "#ff1744",
                    "700-accent": "#d50000",
                },
                'purple-custom': {
                    "50": "#f3e5f5",
                    "100": "#e1bee7",
                    "200": "#ce93d8",
                    "300": "#ba68c8",
                    "400": "#ab47bc",
                    "500": "#9c27b0",
                    "600": "#8e24aa",
                    "700": "#7b1fa2",
                    "800": "#6a1b9a",
                    "900": "#4a148c",
                    "100-accent": "#ea80fc",
                    "200-accent": "#e040fb",
                    "400-accent": "#d500f9",
                    "700-accent": "#aa00ff"
                },
                'deep-purple': {
                    "50": "#ede7f6",
                    "100": "#d1c4e9",
                    "200": "#b39ddb",
                    "300": "#9575cd",
                    "400": "#7e57c2",
                    "500": "#673ab7",
                    "600": "#5e35b1",
                    "700": "#512da8",
                    "800": "#4527a0",
                    "900": "#311b92",
                    "100-accent": "#b388ff",
                    "200-accent": "#7c4dff",
                    "400-accent": "#651fff",
                    "700-accent": "#6200ea",
                },
                'light-blue': {
                    "50": "#e1f5fe",
                    "100": "#b3e5fc",
                    "200": "#81d4fa",
                    "300": "#4fc3f7",
                    "400": "#29b6f6",
                    "500": "#03a9f4",
                    "600": "#039be5",
                    "700": "#0288d1",
                    "800": "#0277bd",
                    "900": "#01579b",
                    "100-accent": "#80d8ff",
                    "200-accent": "#40c4ff",
                    "400-accent": "#00b0ff",
                    "700-accent": "#0091ea",
                },
                'light-green': {
                    "50": "#f1f8e9",
                    "100": "#dcedc8",
                    "200": "#c5e1a5",
                    "300": "#aed581",
                    "400": "#9ccc65",
                    "500": "#8bc34a",
                    "600": "#7cb342",
                    "700": "#689f38",
                    "800": "#558b2f",
                    "900": "#33691e",
                    "100-accent": "#ccff90",
                    "200-accent": "#b2ff59",
                    "400-accent": "#76ff03",
                    "700-accent": "#64dd17"
                },
                'lime': {
                    "50": "#f9fbe7",
                    "100": "#f0f4c3",
                    "200": "#e6ee9c",
                    "300": "#dce775",
                    "400": "#d4e157",
                    "500": "#cddc39",
                    "600": "#c0ca33",
                    "700": "#afb42b",
                    "800": "#9e9d24",
                    "900": "#827717",
                    "100-accent": "#f4ff81",
                    "200-accent": "#eeff41",
                    "400-accent": "#c6ff00",
                    "700-accent": "#aeea00",
                }
            }
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            padding: ['hover', 'focus'],
            width: ['hover', 'focus'],
            display: ['group-hover']
        },
    },

    plugins: [require('@tailwindcss/forms')(), require('@tailwindcss/typography')],

};
