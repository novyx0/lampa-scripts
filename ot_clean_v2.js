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

// Фильтруем выдачу — не показывать аниме и мультфильмы
Lampa.Listener.follow('activity', function(e) {
    if (e.type === 'build' && e.data && e.data.results) {
        e.data.results = e.data.results.filter(item => {
            // 1) Убираем явный тип "anime"
            if (item.type === 'anime') return false;

            // 2) Убираем по жанрам (Animation, Мультфильм и т.п.)
            if (item.genres && item.genres.some(g =>
                typeof g === 'string' &&
                (g.toLowerCase().includes('animation') ||
                 g.toLowerCase().includes('мульт'))
            )) return false;

            return true;
        });
    }
});
