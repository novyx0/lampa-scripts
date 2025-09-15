(function () {
    'use strict';

    Lampa.Plugin.create({
        title: 'UI Enhancer',
        component: 'ui_enhancer',
        onStart: function () {
            console.log('UI Enhancer started');

            /**
             * Добавляем CSS стили
             */
            const css = `
            .ui-enhancer .full-start__background {
                filter: blur(20px) brightness(0.7);
            }
            .ui-enhancer .new-interface-info__title {
                font-size: 2.2em;
                font-weight: bold;
                margin-bottom: 0.3em;
            }
            .ui-enhancer .new-interface-info__details {
                font-size: 1.1em;
                opacity: 0.8;
                margin-bottom: 0.5em;
            }
            .ui-enhancer .new-interface-info__description {
                font-size: 1em;
                line-height: 1.4em;
                margin-bottom: 1em;
            }
            .ui-enhancer .new-interface-info__rating {
                font-size: 1.3em;
                font-weight: bold;
                color: #ffd700;
                margin-bottom: 0.5em;
            }
            `;
            Lampa.Template.add('ui_enhancer_style', `<style>${css}</style>`);
            $('body').append(Lampa.Template.get('ui_enhancer_style'));

            /**
             * Перехватываем активность и подгружаем детали TMDB
             */
            Lampa.Listener.follow('full', function (e) {
                if (e.type === 'complite' && e.name === 'full') {
                    const data = e.data;
                    if (!data || !data.id) return;

                    const id = data.id;
                    const media_type = data.name ? 'tv' : 'movie';
                    const url = `/${media_type}/${id}?api_key=${Lampa.Api.key('tmdb')}&language=${Lampa.Storage.field('tmdb_lang')}`;

                    Lampa.Api.get('tmdb', url, (json) => {
                        if (!json) return;

                        const container = $('.full-start__info');

                        const html = `
                        <div class="new-interface-info">
                            <div class="new-interface-info__title">${json.title || json.name}</div>
                            <div class="new-interface-info__rating">⭐ ${json.vote_average}</div>
                            <div class="new-interface-info__details">
                                ${json.release_date || json.first_air_date || ''} • 
                                ${json.genres && json.genres.map(g => g.name).join(', ')}
                            </div>
                            <div class="new-interface-info__description">${json.overview || ''}</div>
                        </div>
                        `;

                        container.empty().append(html);
                        container.addClass('ui-enhancer');
                    }, (err) => {
                        console.error('UI Enhancer TMDB error:', err);
                    });
                }
            });
        }
    });
})();
