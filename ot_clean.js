'use strict';

// Убираем пункт "Аниме" из меню
Lampa.Listener.follow('menu', function(e) {
    if (e.type === 'build') {
        e.body.find('[data-action="anime"]').remove();
    }
});

// Убираем раздел "Аниме" из полноэкранных вьюшек
Lampa.Listener.follow('full', function(e) {
    if (e.name === 'menu' && e.type === 'start') {
        e.body.find('.view--trailer[data-action="anime"]').remove();
    }
});

// Фильтруем выдачу — не показывать контент с type: anime
Lampa.Listener.follow('activity', function(e) {
    if (e.type === 'build' && e.data && e.data.results) {
        e.data.results = e.data.results.filter(item => item.type !== 'anime');
    }
});
