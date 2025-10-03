(function () {
  'use strict';

  function translate() {
      Lampa.Lang.add({
          bat_parser: {
              ru: 'Каталог парсерів',
              en: 'Parsers catalog',
              uk: 'Каталог парсерів',
              zh: '解析器目录'
          },
          bat_parser_description: {
              ru: 'Натисніть для вибору парсера з ',
              en: 'Click to select a parser from the ',
              uk: 'Натисніть для вибору парсера з ',
              zh: '单击以从可用的 '
          },
      });
  }
  var Lang = {
      translate: translate
  };

  var parsersInfo = [{
      base: 'my_jacred_fdb',
      name: 'MY JacRed-FDB',
      settings: {
          url: '46.173.137.116:23741',
          key: '',
          parser_torrent_type: 'jackett'
      }
  }, {
      base: 'my_jackett',
      name: 'MY Jackett',
      settings: {
          url: '46.173.137.116:24856',
          key: 'kb79a6bfzhzt5pzibh523tosfx7gzu5c',
          parser_torrent_type: 'jackett'
      }
  }, {
      base: 'my_lampac',
      name: 'MY Lampac',
      settings: {
          url: '46.173.137.116:12127',
          key: '',
          parser_torrent_type: 'jackett'
      }
  }];

  var proto = location.protocol === "https:" ? 'https://' : 'http://';
  var cache = {};
  var checkInterval;

  function checkAlive(type) {
      if (type === 'parser') {
          var requests = parsersInfo.map(function (parser) {
              var protocol = proto;

              var endPoint;
              if (parser.base === 'my_jacred_fdb' || parser.base === 'my_lampac') {
                  endPoint = "/api/v2.0/indexers/status:healthy/results?apikey=" + parser.settings.key;
              } else if (parser.base === 'my_jackett') {
                  endPoint = "/api/v2.0/indexers/all/results/torznab/api?apikey=" + parser.settings.key;
              } else {
                  endPoint = "/api/v2.0/indexers/status:healthy/results?apikey=" + parser.settings.key;
              }

              var myLink = protocol + parser.settings.url + endPoint;

              var mySelector = $('div.selectbox-item__title').filter(function () {
                  return $(this).text().trim() === parser.name;
              });

              if (cache[myLink] && cache[myLink].timestamp > Date.now() - 30000) {
                  console.log('Using cached response for', myLink);
                  var color = cache[myLink].color;
                  $(mySelector).css('color', color);
                  return Promise.resolve();
              }

              return new Promise(function (resolve) {
                  $.ajax({
                      url: myLink,
                      method: 'GET',
                      timeout: 5000,
                      success: function success(response, textStatus, xhr) {
                          var color;
                          if (xhr.status === 200) {
                              color = '#1aff00';
                          } else if (xhr.status === 401) {
                              color = '#ff9800';
                          } else {
                              color = '#ff2e36';
                          }
                          $(mySelector).css('color', color);

                          cache[myLink] = {
                              color: color,
                              timestamp: Date.now()
                          };
                      },
                      error: function error(xhr) {
                          var color;
                          if (xhr.status === 401) {
                              color = '#ff9800';
                          } else {
                              color = '#ff2e36';
                          }
                          $(mySelector).css('color', color);
                      },
                      complete: function complete() {
                          return resolve();
                      }
                  });
              });
          });
          return Promise.all(requests).then(function () {
              console.log('All parsers checked');
          });
      }
  }

  function startPeriodicCheck() {
      checkAlive("parser");
      checkInterval = setInterval(function() {
          checkAlive("parser");
      }, 30000);
  }

  function stopPeriodicCheck() {
      if (checkInterval) {
          clearInterval(checkInterval);
      }
  }

  Lampa.Controller.listener.follow('toggle', function (e) {
      if (e.name === 'select') {
          checkAlive("parser");
      }
  });

  function changeParser() {
      var jackettUrlTwo = Lampa.Storage.get("bat_url_two");
      var selectedParser = parsersInfo.find(function (parser) {
          return parser.base === jackettUrlTwo;
      });
      if (selectedParser) {
          var settings = selectedParser.settings;
          Lampa.Storage.set("jackett_url", settings.url);
          Lampa.Storage.set("jackett_key", settings.key);
          Lampa.Storage.set("parser_torrent_type", settings.parser_torrent_type);
      } else {
          console.warn("Parser not found");
      }
  }

  var s_values = parsersInfo.reduce(function (prev, _ref) {
      var base = _ref.base,
          name = _ref.name;
      prev[base] = name;
      return prev;
  }, {
      no_parser: 'Вибрати парсер'
  });

  function parserSetting() {
      Lampa.SettingsApi.addParam({
          component: 'parser',
          param: {
              name: 'bat_url_two',
              type: 'select',
              values: s_values,
              "default": 'no_parser'
          },
          field: {
              name: "<div class=\"settings-folder\" style=\"padding:0!important\"><div style=\"font-size:1.0em\">".concat(Lampa.Lang.translate('bat_parser'), "</div></div>"),
              description: "".concat(Lampa.Lang.translate('bat_parser_description'), " ").concat(parsersInfo.length)
          },
          onChange: function onChange(value) {
              changeParser();
              Lampa.Settings.update();
          },
          onRender: function onRender(item) {
              $('.settings-param__value p.parserName').remove();
              changeParser();
              setTimeout(function () {
                  $('div[data-children="parser"]').on('hover:enter', function () {
                      Lampa.Settings.update();
                  });
                  if (Lampa.Storage.field('parser_use')) {
                      item.show();
                      $('.settings-param__name', item).css('color', '#f3d900');
                      $('div[data-name="bat_url_two"]').insertAfter('div[data-children="parser"]');
                  } else {
                      item.hide();
                  }
              });
          }
      });
  }

  var Parser = {
      parserSetting: parserSetting
  };

  Lampa.Platform.tv();

  function add() {
      Lang.translate();
      Parser.parserSetting();
      startPeriodicCheck();
  }

  function startPlugin() {
      window.plugin_my_parsers_ready = true;
      if (window.appready) add();
      else {
          Lampa.Listener.follow('app', function (e) {
              if (e.type === 'ready') add();
          });
      }
  }

  if (!window.plugin_my_parsers_ready) startPlugin();

  window.addEventListener('unload', function() {
      stopPeriodicCheck();
  });

})();
