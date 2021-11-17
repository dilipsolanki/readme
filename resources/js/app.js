require('./bootstrap');

// require('alpinejs');

import Alpine from 'alpinejs'
import Quill from 'quill'
import persist from '@alpinejs/persist'
import hotkeys from 'hotkeys-js';

Alpine.directive('global', function (el, { expression }) {
    let f = new Function('_', '$data', '_.' + expression + ' = $data;return;');
    f(window, el._x_dataStack[0]);
});
window.Alpine = Alpine
window.Quill = Quill
Alpine.plugin(persist)
Alpine.start()
var k = hotkeys.noConflict();
if (typeof (LP_DATA) != "undefined") {
    var baseUrl = LP_DATA.appBaseUrl;
    baseUrl = baseUrl.replace(/&quot;/g, '');

    k('.+s,.+h,.+l,.+d,.+p,shift+/,esc,/', function (event, handler) {
        event.preventDefault();

        switch (handler.key) {
            case '/':
                document.getElementById('searchString').focus();
                break;
            case '.+h':
                window.location.replace(baseUrl + '/hubble');
                break;
            case '.+s':
                window.location.replace(baseUrl + '/spell-check');
                break;
            case '.+l':
                window.location.replace(baseUrl + '/lumiere');
                break;
            case '.+d':
                window.location.replace(baseUrl + '/');
                break;
            case '.+p':
                window.location.replace(baseUrl + '/pdf-extraction');
                break;
            case 'shift+/':
                LP_DATA.isShortCutsModalOpen = !LP_DATA.isShortCutsModalOpen;
                break;
            case 'esc':
                LP_DATA.isShortCutsModalOpen = false;
                break;


            default:
                window.location.replace(baseUrl + '/lumiere');

        }
    });
    // hotkeys('l+s', function (event, handler) {
    //     // Prevent the default refresh event under WINDOWS system
    //     event.preventDefault()
    //     window.location.replace('http://rnd-tools.test/hubble/');
    // });

}
