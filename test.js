(function () {
    'use strict';

    console.log('UI Enhancer loaded!');

    const css = `
    .ui-enhancer-test {
        background: rgba(0,0,0,0.5) !important;
        border: 2px solid red !important;
    }
    `;
    $('body').append(`<style>${css}</style>`);

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite' && e.name === 'full') {
            $('.full-start__info').addClass('ui-enhancer-test');
            console.log('UI Enhancer applied');
        }
    });
})();
