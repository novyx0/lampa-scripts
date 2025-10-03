"use strict";
(function() { // IIFE
    var r = { type: "other", version: "1.1.4", author: "https://github.com/kvart714", name: "Torrent Downloader", description: "Transmission RPC client", component: "t-downloader" };
    var O = r.component + ".torrents.data";

    // ES5 Class: d (TorrentStore)
    var TorrentStore = function() {}; // Constructor (empty as it's all static)
    TorrentStore.torrents = Lampa.Storage.get(O, []); // Static initialization

    TorrentStore.getMovies = function() {
        return this.torrents;
    };

    TorrentStore.getMovie = function(e) {
        var t = this.torrents.filter(function(o) { return o.id === e; });
        return t.length > 0 ? t.reduce(function(o, n) { return o.percentDone < n.percentDone ? o : n; }) : null;
    };

    TorrentStore.ensureMovie = function(e) {
        var t = this.torrents.filter(function(o) { return o.externalId === e.externalId; });
        return t.length > 0 ? t.reduce(function(o, n) { return o.percentDone < n.percentDone ? o : n; }) : e;
    };

    TorrentStore.setMovies = function(e) {
        this.torrents = e;
        Lampa.Storage.set(O, this.torrents);
    };
    var d = TorrentStore;

    var z = '<div class="downloads-tab__item selector {status}" data-id="{id}">\n' +
        '  <div class="downloads-tab__icon">{icon}</div>\n' +
        '  <div class="downloads-tab__main">\n' +
        '    <div class="downloads-tab__header">\n' +
        '      <div class="downloads-tab__title"><span>{fileName}</span></div>\n' +
        '      <div class="downloads-tab__speed"><span>{speed}</span></div>\n' +
        '    </div>\n' +
        '    <div class="downloads-tab__meta">\n' +
        '      <span class="downloads-tab__meta-size">\n' +
        '        <span class="downloads-tab__meta-percent">{percent}</span>\n' +
        '        <span class="downloads-tab__meta-sep">\u2002\u2022\u2002</span>\n' +
        '        <span class="downloads-tab__meta-downloaded">{downloadedSize}</span>\n' +
        '        <span class="downloads-tab__meta-slash"> / </span>\n' +
        '        <span class="downloads-tab__meta-total">{totalSize}</span>\n' +
        '      </span>\n' +
        '      <span class="downloads-tab__meta-eta"><span>{eta}</span></span>\n' +
        '    </div>\n' +
        '    <div class="downloads-tab__progress-wrapper">\n' +
        '      <div class="downloads-tab__progress-fill" style="width: {percent};"></div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n';

    var M = '<li class="menu__item selector">\r\n' +
        '    <div class="menu__ico">{icon}</div>\r\n' +
        '    <div class="menu__text">{text}</div>\r\n' +
        '</li>\r\n';

    var G = '@keyframes pulseColor {\n' +
        '  0% {\n' +
        '    clip-path: inset(0 0 100% 0);\n' +
        '  }\n' +
        '  30% {\n' +
        '    clip-path: inset(0 0 0 0);\n' +
        '  }\n' +
        '  70% {\n' +
        '    clip-path: inset(0 0 0 0);\n' +
        '  }\n' +
        '  100% {\n' +
        '    clip-path: inset(100% 0 0 0);\n' +
        '  }\n' +
        '}\n' +
        '.downloads-tab__list {\n' +
        '  display: flex;\n' +
        '  flex-direction: column;\n' +
        '  row-gap: 16px;\n' +
        '  padding: 16px 24px;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__item {\n' +
        '  display: flex;\n' +
        '  align-items: center;\n' +
        '  column-gap: 24px;\n' +
        '  padding: 16px 24px;\n' +
        '  background: rgba(47, 47, 47, 0.6);\n' +
        '  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);\n' +
        '  border-radius: 8px;\n' +
        '  transition: background 0.2s ease, box-shadow 0.2s ease;\n' +
        '}\n' +
        '.downloads-tab__item:hover, .downloads-tab__item.focus {\n' +
        '  background: rgba(255, 255, 255, 0.15);\n' +
        '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n' +
        '}\n' +
        '.downloads-tab__item.downloading .downloads-tab__icon {\n' +
        '  visibility: visible;\n' +
        '  background: none;\n' +
        '  color: #fff;\n' +
        '}\n' +
        '.downloads-tab__item.downloading .downloads-tab__icon svg {\n' +
        '  clip-path: inset(0 0 100% 0);\n' +
        '  animation: pulseColor 2s infinite ease-in-out;\n' +
        '}\n' +
        '.downloads-tab__item.paused .downloads-tab__icon {\n' +
        '  visibility: visible;\n' +
        '  background: none;\n' +
        '  color: rgba(255, 255, 255, 0.4431372549);\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__icon {\n' +
        '  visibility: visible;\n' +
        '  background: #fff;\n' +
        '  color: rgb(66, 66, 66);\n' +
        '  border-radius: 50%;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__icon svg {\n' +
        '  mix-blend-mode: destination-out;\n' +
        '  isolation: isolate;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__meta-percent {\n' +
        '  display: none !important;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__meta-sep {\n' +
        '  display: none !important;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__meta-downloaded {\n' +
        '  display: none !important;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__meta-total {\n' +
        '  display: inline !important;\n' +
        '  font-weight: 500;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__meta-size > .slash {\n' +
        '  display: none !important;\n' +
        '}\n' +
        '.downloads-tab__item.completed .downloads-tab__meta-slash {\n' +
        '  display: none !important;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__icon {\n' +
        '  width: 32px;\n' +
        '  height: 32px;\n' +
        '  flex-shrink: 0;\n' +
        '  display: flex;\n' +
        '  align-items: center;\n' +
        '  justify-content: center;\n' +
        '}\n' +
        '.downloads-tab__icon svg {\n' +
        '  width: 24px;\n' +
        '  height: 24px;\n' +
        '  display: block;\n' +
        '  fill: currentColor;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__main {\n' +
        '  flex: 1;\n' +
        '  display: flex;\n' +
        '  flex-direction: column;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__header {\n' +
        '  display: flex;\n' +
        '  justify-content: space-between;\n' +
        '  align-items: center;\n' +
        '  margin-bottom: 8px;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__title {\n' +
        '  font-size: 1.2em;\n' +
        '  font-weight: 500;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__speed {\n' +
        '  font-size: 0.9em;\n' +
        '  color: #aaa;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__meta {\n' +
        '  display: flex;\n' +
        '  justify-content: space-between;\n' +
        '  margin-bottom: 12px;\n' +
        '}\n' +
        '.downloads-tab__meta-size, .downloads-tab__meta-eta {\n' +
        '  font-size: 0.9em;\n' +
        '  color: #aaa;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__progress-wrapper {\n' +
        '  width: 100%;\n' +
        '  height: 6px;\n' +
        '  background: rgba(255, 255, 255, 0.1);\n' +
        '  border-radius: 3px;\n' +
        '  overflow: hidden;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__progress-fill {\n' +
        '  height: 100%;\n' +
        '  background: linear-gradient(90deg, #4a90e2, #357ab8);\n' +
        '  transition: width 0.3s ease;\n' +
        '}\n' +
        '\n' +
        '.downloads-tab__meta-percent {\n' +
        '  display: inline;\n' +
        '}';

    var u = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\r\n' +
        '    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\r\n' +
        '</svg>';

    var s = { STOPPED: 0, CHECK_PENDING: 1, CHECKING: 2, DOWNLOAD_PENDING: 3, DOWNLOADING: 4, SEED_PENDING: 5, SEEDING: 6, ISOLATED: 7, STALLED: 8, ERROR: 9, ALLOCATING: 10, MOVING: 11, UNKNOWN: 12, INITIALIZATION: 13 };

    function U(a) {
        switch (a) {
            case 0: return s.STOPPED;
            case 1: return s.CHECK_PENDING;
            case 2: return s.CHECKING;
            case 3: return s.DOWNLOAD_PENDING;
            case 4: return s.DOWNLOADING;
            case 5: return s.SEED_PENDING;
            case 6: return s.SEEDING;
            default: return s.UNKNOWN;
        }
    }

    function F(a) {
        switch (a) {
            case "allocating": return s.ALLOCATING;
            case "checkingDL": case "checkingUP": case "checkingResumeData": return s.CHECKING;
            case "queuedDL": return s.DOWNLOAD_PENDING;
            case "queuedUP": return s.SEED_PENDING;
            case "downloading": case "forcedMetaDL": return s.DOWNLOADING;
            case "uploading": case "forcedUP": return s.SEEDING;
            case "pausedDL": case "pausedUP": case "stoppedDL": case "stoppedUP": return s.STOPPED;
            case "stalledDL": case "stalledUP": return s.STALLED;
            case "missingFiles": return s.ISOLATED;
            case "moving": return s.MOVING;
            case "error": return s.ERROR;
            case "metaDL": case "forcedDL": return s.INITIALIZATION;
            default: return s.UNKNOWN;
        }
    }

    function I(a, e) {
        e = (typeof e === 'undefined') ? 2 : e;
        if (a === 0) return "0";
        var t = 1000;
        var o = e < 0 ? 0 : e;
        var n = Math.floor(Math.log(a) / Math.log(t));
        return parseFloat((a / Math.pow(t, n)).toFixed(o)) + " " + Lampa.Lang.translate('download-card.size.' + n);
    }

    function me(a) {
        var e = Lampa.Lang.translate("download-card.time.3");
        return I(a) + '/' + e;
    }

    function ue(a) {
        var e = Math.floor(a / 86400);
        var t = Math.floor(a % 86400 / 3600);
        var o = Math.floor(a % 3600 / 60);
        var n = Math.floor(a % 60);
        return [e, t, o, n].map(function(c, m) {
            return c ? c + Lampa.Lang.translate('download-card.time.' + m) : null;
        }).filter(Boolean).slice(0, 2).join(" ");
    }

    function f(a) {
        return {
            id: a.id + "_" + a.externalId,
            fileName: a.status === s.INITIALIZATION ? "Initialization" : a.name, // "Initialization" should also be localized
            percent: (100 * a.percentDone).toFixed(2) + "%",
            speed: a.speed > 0 ? me(a.speed) : "",
            downloadedSize: I(a.percentDone * a.totalSize),
            totalSize: I(a.totalSize),
            eta: a.status === s.DOWNLOADING ? ue(a.eta) : (a.status === s.STALLED && a.percentDone === 1 ? Lampa.Lang.translate("download-card.status.14") : Lampa.Lang.translate('download-card.status.' + a.status)),
            status: a.status === s.DOWNLOADING ? "downloading" : (a.percentDone === 1 ? "completed" : "paused")
        };
    }

    function h() {
        var args = Array.prototype.slice.call(arguments);
        console.log.apply(console, [r.name].concat(args));
    }

    var q = '<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\r\n' +
        '  <div class="download-card__file-info">\r\n' +
        '    <span class="file-name">\r\n' +
        '      <span data-key="fileName">{fileName}</span>\r\n' +
        '    </span>\r\n' +
        '    <span class="speed">\r\n' +
        '      <span data-key="speed">{speed}</span>\r\n' +
        '    </span>\r\n' +
        '  </div>\r\n' +
        '  <div class="download-card__progress-bar">\r\n' +
        '    <div class="download-card__progress-bar-progress" style="width: {percent}"></div>\r\n' +
        '  </div>\r\n' +
        '  <div class="download-card__stats">\r\n' +
        '    <span class="downloaded">\r\n' +
        '      <span data-key="downloadedSize">{downloadedSize}</span> / \r\n' +
        '      <span data-key="totalSize">{totalSize}</span>\r\n' +
        '    </span>\r\n' +
        '    <span class="percent">\r\n' +
        '      <span data-key="percent">{percent}</span>\r\n' +
        '    </span>\r\n' +
        '    <span class="eta">\r\n' +
        '      <span data-key="eta">{eta}</span>\r\n' +
        '    </span>\r\n' +
        '  </div>\r\n' +
        '</div>\r\n';

    var W = '.download-card {\n' +
        '  all: unset;\n' +
        '  display: block;\n' +
        '  width: 80%;\n' +
        '  height: auto;\n' +
        '  margin: 0;\n' +
        '  margin-top: 0.75em;\n' +
        '  padding: 0.75em;\n' +
        '  background-color: rgba(0, 0, 0, 0.3);\n' +
        '  color: white;\n' +
        '  transition: background-color 0.3s;\n' +
        '  border-radius: 1em;\n' +
        '}\n' +
        '.download-card__file-info {\n' +
        '  display: flex;\n' +
        '  justify-content: space-between;\n' +
        '  margin-bottom: 0.5em;\n' +
        '}\n' +
        '.download-card__file-info .file-name, .download-card__file-info .speed {\n' +
        '  font-size: 1.5em;\n' +
        '}\n' +
        '.download-card__progress-bar {\n' +
        '  height: 6px;\n' +
        '  background: #ddd;\n' +
        '  border-radius: 6px;\n' +
        '  overflow: hidden;\n' +
        '  margin-top: 0.7em;\n' +
        '  margin-bottom: 0.5em;\n' +
        '}\n' +
        '.download-card__progress-bar-progress {\n' +
        '  height: 100%;\n' +
        '  background: linear-gradient(90deg, #4a90e2, #357ab8);\n' +
        '  transition: width 0.5s ease;\n' +
        '}\n' +
        '.download-card__stats {\n' +
        '  position: relative;\n' +
        '  display: flex;\n' +
        '  flex-direction: column;\n' +
        '  gap: 0.5em;\n' +
        '  font-size: 1.1em;\n' +
        '}\n' +
        '.download-card__stats .speed {\n' +
        '  position: absolute;\n' +
        '  top: 0;\n' +
        '  right: 0;\n' +
        '  font-size: inherit;\n' +
        '}\n' +
        '.download-card__stats .percent {\n' +
        '  position: absolute;\n' +
        '  bottom: 0;\n' +
        '  left: 50%;\n' +
        '  transform: translateX(-50%);\n' +
        '  font-size: inherit;\n' +
        '}\n' +
        '.download-card__stats .downloaded {\n' +
        '  text-align: left;\n' +
        '  font-size: inherit;\n' +
        '}\n' +
        '.download-card__stats .eta {\n' +
        '  position: absolute;\n' +
        '  bottom: 0;\n' +
        '  right: 0;\n' +
        '  font-size: inherit;\n' +
        '}';

    function D(a, e) {
        var t = $(Lampa.Template.get("download-card", f(a)));
        $(".full-start-new__right").append(t);
        t.on("hover:enter", function() { T("full_start", a, (e && e.title) || (e && e.original_title)); });
        t.on("hover:long", function() { _("full_start", a, (e && e.title) || (e && e.original_title)); });
    }

    function K(a) {
        var e = f(a);
        var t = document.getElementById('download-card-' + e.id);
        if (t) {
            for (var o in e) {
                if (Object.prototype.hasOwnProperty.call(e, o)) {
                    var n = t.querySelector('[data-key="' + o + '"]');
                    if (n) {
                        n.textContent = e[o];
                    }
                }
            }
            t.querySelector(".download-card__progress-bar-progress").setAttribute("style", 'width: ' + e.percent + ';');
        }
    }

    function B() {
        Lampa.Template.add("download-card", q);
        $("body").append('<style>' + W + '</style>');
        Lampa.Listener.follow("full", function(a) {
            if (a.type === "complite") {
                var e = d.getMovie(a.data.movie.id);
                if (e) {
                    D(e, a.data.movie);
                }
            }
        });
    }

    var Y = '<div class="download-circle d-updatable download-circle-{status}-{id}">\r\n' +
        '    <div class="download-circle__circle">\r\n' +
        '        <svg class="download-circle__circle-svg" xmlns="http://www.w3.org/2000/svg">\r\n' +
        '            <circle\r\n' +
        '                fill="rgba(0, 0, 0, 0.60)"\r\n' +
        '                r="17px"\r\n' +
        '                cx="20"\r\n' +
        '                cy="20"\r\n' +
        '            ></circle>\r\n' +
        '            <circle\r\n' +
        '                class="download-circle__full_{status}"\r\n' +
        '                stroke-width="2px"\r\n' +
        '                r="12px"\r\n' +
        '                cx="20"\r\n' +
        '                cy="20"\r\n' +
        '            ></circle>\r\n' +
        '            <circle\r\n' +
        '                class="download-circle__partial_{status}"\r\n' +
        '                fill="none"\r\n' +
        '                stroke="#fff"\r\n' +
        '                stroke-width="2px"\r\n' +
        '                stroke-dasharray="100"\r\n' +
        '                stroke-dashoffset="{progress}"\r\n' +
        '                transition="stroke-dasharray 0.7s linear 0s"\r\n' +
        '                r="12px"\r\n' +
        '                cx="20"\r\n' +
        '                cy="20"\r\n' +
        '                pathlength="100"\r\n' +
        '            ></circle>\r\n' +
        '        </svg>\r\n' +
        '    </div>\r\n' +
        '    <div class="download-circle__down-arrow">\r\n' +
        '        <svg\r\n' +
        '            class="download-circle__down-arrow-svg_{status}"\r\n' +
        '            xmlns="http://www.w3.org/2000/svg"\r\n' +
        '        >\r\n' +
        '            <path\r\n' +
        '                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"\r\n' +
        '            />\r\n' +
        '        </svg>\r\n' +
        '        <svg\r\n' +
        '            class="download-circle__down-arrow-svg-animated_{status}"\r\n' +
        '            fill="white"\r\n' +
        '            xmlns="http://www.w3.org/2000/svg"\r\n' +
        '        >\r\n' +
        '            <path\r\n' +
        '                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"\r\n' +
        '            />\r\n' +
        '        </svg>\r\n' +
        '    </div>\r\n' +
        '</div>\r\n';

    var V = '.download-complete,\n' +
        '.download-circle {\n' +
        '  display: flex;\n' +
        '  justify-content: center;\n' +
        '  align-items: center;\n' +
        '  width: 40px;\n' +
        '  height: 40px;\n' +
        '  position: absolute;\n' +
        '  top: 50%;\n' +
        '  left: 50%;\n' +
        '  transform: translate(-50%, -50%) scale(2);\n' +
        '}\n' +
        '.download-complete__circle,\n' +
        '.download-circle__circle {\n' +
        '  display: flex;\n' +
        '  justify-content: center;\n' +
        '  align-items: center;\n' +
        '  width: 40px;\n' +
        '  height: 40px;\n' +
        '  cursor: pointer;\n' +
        '  position: relative;\n' +
        '}\n' +
        '.download-complete__circle-svg,\n' +
        '.download-circle__circle-svg {\n' +
        '  transform: rotate(-90deg);\n' +
        '  display: flex;\n' +
        '  justify-content: center;\n' +
        '  align-items: center;\n' +
        '}\n' +
        '.download-complete__full_in-progress,\n' +
        '.download-circle__full_in-progress {\n' +
        '  fill: none;\n' +
        '  stroke: rgba(255, 255, 255, 0.5);\n' +
        '}\n' +
        '.download-complete__full_complete,\n' +
        '.download-circle__full_complete {\n' +
        '  fill: white;\n' +
        '  stroke: none;\n' +
        '}\n' +
        '.download-complete__partial_complete,\n' +
        '.download-circle__partial_complete {\n' +
        '  display: none;\n' +
        '}\n' +
        '.download-complete__partial_in-progress,\n' +
        '.download-circle__partial_in-progress {\n' +
        '  transition: stroke-dashoffset 0.5s ease;\n' +
        '}\n' +
        '.download-complete__down-arrow,\n' +
        '.download-circle__down-arrow {\n' +
        '  position: absolute;\n' +
        '  display: flex;\n' +
        '  justify-content: center;\n' +
        '  align-items: center;\n' +
        '  top: 50%;\n' +
        '  left: 50%;\n' +
        '  transform: translate(-50%, -50%);\n' +
        '  overflow: hidden;\n' +
        '}\n' +
        '.download-complete__down-arrow svg,\n' +
        '.download-circle__down-arrow svg {\n' +
        '  width: 24px;\n' +
        '  height: 24px;\n' +
        '}\n' +
        '.download-complete__down-arrow-svg_in-progress,\n' +
        '.download-circle__down-arrow-svg_in-progress {\n' +
        '  fill: rgba(255, 255, 255, 0.5);\n' +
        '}\n' +
        '.download-complete__down-arrow-svg_complete,\n' +
        '.download-circle__down-arrow-svg_complete {\n' +
        '  fill: white;\n' +
        '}\n' +
        '.download-complete__down-arrow-svg-animated_in-progress,\n' +
        '.download-circle__down-arrow-svg-animated_in-progress {\n' +
        '  position: absolute;\n' +
        '  clip-path: inset(0 0 100% 0);\n' +
        '  animation: pulseColor 2s ease-out infinite;\n' +
        '}\n' +
        '.download-complete__down-arrow-svg-animated_complete,\n' +
        '.download-circle__down-arrow-svg-animated_complete {\n' +
        '  display: none;\n' +
        '}\n' +
        '\n' +
        '@keyframes pulseColor {\n' +
        '  0% {\n' +
        '    clip-path: inset(0 0 100% 0);\n' +
        '  }\n' +
        '  30% {\n' +
        '    clip-path: inset(0 0 0 0);\n' +
        '  }\n' +
        '  70% {\n' +
        '    clip-path: inset(0 0 0 0);\n' +
        '  }\n' +
        '  100% {\n' +
        '    clip-path: inset(100% 0 0 0);\n' +
        '  }\n' +
        '}';

    function j(a, e) {
        var t = $(e);
        if (!t.find(".download-circle").length) {
            var o = Lampa.Template.get("download-circle", { id: a.id, status: a.percentDone === 1 ? "complete" : "in-progress", progress: 100 * (1 - a.percentDone) });
            t.find(".card__vote").after(o);
        }
    }

    function we(a, e) {
        var t = d.getMovie(a);
        if (t) {
            j(t, e);
        }
    }

    function H(a) {
        var e = document.querySelectorAll('.download-circle-in-progress-' + a.id);
        if (e.length) {
            e.forEach(function(t) {
                if (a.percentDone === 1) {
                    var o = t.parentElement;
                    t.remove();
                    j(a, o);
                } else {
                    var progressElement = t.querySelector(".download-circle__partial_in-progress");
                    if (progressElement) {
                       progressElement.setAttribute("stroke-dashoffset", String(100 * (1 - a.percentDone)));
                    }
                }
            });
        }
    }

    function Z() {
        Lampa.Template.add("download-circle", Y);
        $("body").append('<style>' + V + '</style>');
        Lampa.Listener.follow("line", function(a) {
            if (a.type === "append") {
                for (var i = 0; i < a.items.length; i++) {
                    var e = a.items[i];
                    if (e && e.data && e.data.id) {
                        we(e.data.id, e.card);
                    }
                }
            }
        });
    }

    var BackgroundWorker = function() {};
    BackgroundWorker.errorCount = 0;
    BackgroundWorker.notified = false;
    BackgroundWorker.subscription = null;

    BackgroundWorker.start = function(e) {
        if (BackgroundWorker.subscription) {
            clearInterval(BackgroundWorker.subscription);
        }
        BackgroundWorker.errorCount = 0;
        BackgroundWorker.notified = false;
        BackgroundWorker.subscription = setInterval(BackgroundWorker.tick, e * 1000);
    };

    BackgroundWorker.tick = function() {
        TorrentClientFactory.getClient().getTorrents()
            .then(function(torrents) {
                d.setMovies(torrents);
                if ($(".d-updatable").length) {
                    for (var i = 0; i < torrents.length; i++) {
                        var t = torrents[i];
                        K(t);
                        H(t);
                        Q(t);
                    }
                }
                BackgroundWorker.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success"));
            })
            .catch(function(err) {
                h("Error:", err);
                BackgroundWorker.errorCount++;
                if (BackgroundWorker.errorCount > 10) {
                    clearInterval(BackgroundWorker.subscription);
                    h("Stopping background worker due to too many errors");
                    BackgroundWorker.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected"));
                }
            });
    };

    BackgroundWorker.notifyFirstTime = function(e) {
        if (!BackgroundWorker.notified) {
            Lampa.Noty.show(e);
            BackgroundWorker.notified = true;
        }
    };
    var g = BackgroundWorker;


    var C = r.component + ".interval";
    var A = r.component + ".default-action";
    var b = r.component + ".server.url";
    var E = r.component + ".server.login";
    var P = r.component + ".server.password";
    var k = r.component + ".server.type";
    var N = [2, 5, 10, 30, 60, 5 * 60, 15 * 60];

    function J() {
        Lampa.SettingsApi.addComponent({
            component: r.component,
            name: Lampa.Lang.translate('settings.component_name'),
            icon: u
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: C, type: "select", placeholder: "2s", values: ["2s", "5s", "10s", "30s", "1m", "5m", "15m"], default: 0 },
            field: {
                name: Lampa.Lang.translate('settings.update_interval_name')
            },
            onChange: function(a) { Lampa.Settings.update(); g.start(N[a]); }
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: A, type: "select", placeholder: "", values: [Lampa.Lang.translate('settings.default_action_option_menu'),
                    Lampa.Lang.translate('settings.default_action_option_play'),
                    Lampa.Lang.translate('settings.default_action_option_resume_pause')], default: 0 }, // Values here might need localization too
            field: {
                name: Lampa.Lang.translate('settings.default_action_name'),
                description: Lampa.Lang.translate('settings.default_action_descr')
            },
            onChange: function(a) { Lampa.Settings.update(); }
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: "transmission-title", type: "title", default: "" },
            field: {
                name: Lampa.Lang.translate('settings.server_settings_title')
            }
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: k, type: "select", placeholder: "", values: ["Transmission", "qBitTorrent"], default: "0" }, // Values here might need localization
            field: {
                name: Lampa.Lang.translate('settings.torrent_client_type_name')
            },
            onChange: function(a) { Lampa.Settings.update(); TorrentClientFactory.reset(); }
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: b, type: "input", placeholder: "", values: "", default: "" },
            field: {
                name: Lampa.Lang.translate('settings.server_url_name')
            },
            onChange: function(a) { Lampa.Settings.update(); TorrentClientFactory.reset(); }
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: E, type: "input", placeholder: "", values: "", default: "" },
            field: {
                name: Lampa.Lang.translate('settings.server_login_name')
            },
            onChange: function(a) { Lampa.Settings.update(); TorrentClientFactory.reset(); }
        });
        Lampa.SettingsApi.addParam({
            component: r.component,
            param: { name: P, type: "input", placeholder: "", values: "", default: "" },
            field: {
                name: Lampa.Lang.translate('settings.server_password_name')
            },
            onChange: function(a) { Lampa.Settings.update(); TorrentClientFactory.reset(); }
        });
    }

    var X = "lampa:";

    function y(a) {
        var e = a.find(function(t) { return t.startsWith(X); });
        e = e ? e.split(":")[1] || "" : "";
        return parseInt(e);
    }

    function w(a) {
        return X + a;
    }

    // function QBittorrentClient(e, t, o, n) {
    //     this.url = e;
    //     this.login = t;
    //     this.password = o;
    //     this.cookie = n;
    // }

    // QBittorrentClient.prototype.fetchWithAuth = function(e, t) {
    //     var self = this;
    //     t = (typeof t !== 'undefined') ? t : {};
    //     var fetchOptions = Object.assign({}, t, { credentials: "include" });

    //     return fetch(this.url + e, fetchOptions)
    //         .then(function(o) {
    //             if (!o.ok && o.status === 403) {
    //                 return self.authorize()
    //                     .then(function() {
    //                         return fetch(self.url + e, fetchOptions);
    //                     });
    //             }
    //             return o;
    //         });
    // };

    // QBittorrentClient.prototype.authorize = function() {
    //     var self = this;
    //     var params = new URLSearchParams();
    //     params.append("username", this.login);
    //     params.append("password", this.password);
    //     return fetch(this.url + "/api/v2/auth/login", { method: "POST", body: params, credentials: "include" })
    //         .then(function(t) {
    //             if (!t.ok) {
    //                 throw new Error("qBittorrent login failed");
    //             }
    //             self.cookie = t.headers.get("set-cookie") || undefined;
    //         });
    // };

    // ES5 Class: L (QBittorrentClient)
    function QBittorrentClient(url, login, password, cookie) { // e, t, o, n
        this.url = url;
        this.login = login;
        this.password = password;
        this.cookie = cookie; // Note: cookie handling is mostly via withCredentials
        this.network = new Lampa.Reguest(); // <<<< 实例化 Lampa.Request
    }

    QBittorrentClient.prototype.authorize = function () {
        var self = this;
        var formBody = new URLSearchParams();
        formBody.append("username", this.login);
        formBody.append("password", this.password);

        return new Promise(function (resolve, reject) {
            self.network.native( // <<<< 使用 this.network
                self.url + "/api/v2/auth/login",
                function (data) {
                    resolve();
                },
                function (jqXHR_error, exception) {
                    var errorMsg = self.network.errorDecode(jqXHR_error, exception);
                    reject(new Error("qBittorrent login failed: " + errorMsg));
                },
                formBody.toString(),
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    type: 'POST',
                    dataType: 'text'
                }
            );
        });
    };

    QBittorrentClient.prototype.fetchWithAuth = function (path, fetchOptions) {
        var self = this;
        fetchOptions = fetchOptions || {};

        return new Promise(function (resolve, reject) {
            // ... (lampaParams and postData setup as before) ...
            var lampaParams = {
                headers: fetchOptions.headers || {},
                withCredentials: true,
                dataType: fetchOptions.lampaDataType || 'json',
                type: fetchOptions.method || 'GET'
            };
            if (fetchOptions.lampaTimeout) {
                lampaParams.timeout = fetchOptions.lampaTimeout;
            }

            var postData = fetchOptions.body || false;

            if (postData instanceof FormData) {
                lampaParams.processData = false;
                lampaParams.contentType = false;
                if (!fetchOptions.lampaDataType) {
                    lampaParams.dataType = 'text';
                }
            } else if (postData instanceof URLSearchParams) {
                if (!lampaParams.headers['Content-Type']) {
                    lampaParams.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
                postData = postData.toString();
                if (!fetchOptions.lampaDataType) {
                    lampaParams.dataType = 'text';
                }
            } else if (typeof postData === 'object' && postData !== null) {
                if (!lampaParams.headers['Content-Type']) {
                    lampaParams.headers['Content-Type'] = 'application/json';
                }
                postData = JSON.stringify(postData);
            }


            function makeRequest() {
                self.network.native( // <<<< 使用 this.network
                    self.url + path,
                    function (data) {
                        resolve(data);
                    },
                    function (jqXHR_error, exception) {
                        if (jqXHR_error && jqXHR_error.status === 403) {
                            self.authorize()
                                .then(function () {
                                    makeRequest();
                                })
                                .catch(function (authError) {
                                    reject(authError);
                                });
                        } else {
                            var errorMsg = self.network.errorDecode(jqXHR_error, exception);
                            var statusMsg = (jqXHR_error && jqXHR_error.status) ? ' (Status: ' + jqXHR_error.status + ')' : '';
                            reject(new Error('qBittorrent API request to "' + path + '" failed: ' + errorMsg + statusMsg));
                        }
                    },
                    postData,
                    lampaParams
                );
            }
            makeRequest();
        });
    };


    QBittorrentClient.prototype.getTorrents = function() {
        return this.fetchWithAuth("/api/v2/torrents/info")
            .then(function(e) {
                if (!e.ok) {
                    throw new Error("Failed to get torrents");
                }
                return e.json();
            })
            .then(function(jsonResponse) {
                return jsonResponse.sort(function(o, n) { return n.added_on - o.added_on; })
                    .filter(function(o) { return !o.tags.includes("hide"); })
                    .map(function(o) {
                        return {
                            id: y(o.tags.split(",")),
                            externalId: o.hash,
                            name: o.name,
                            status: F(o.state),
                            percentDone: o.progress,
                            totalSize: o.size,
                            eta: o.eta,
                            speed: o.dlspeed,
                            files: []
                        };
                    });
            });
    };

    QBittorrentClient.prototype.addTorrent = function(e, t) {
        var formData = new FormData();
        var torrentUrl = new URL(t.MagnetUri || t.Link);
        torrentUrl.searchParams.delete("dn");
        formData.append("urls", torrentUrl.toString());
        formData.append("tags", w(e.id));
        formData.append("sequentialDownload", "true");
        return this.fetchWithAuth("/api/v2/torrents/add", { method: "POST", body: formData })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to add torrent");
                }
            });
    };

    QBittorrentClient.prototype.startTorrent = function(e) {
        var params = new URLSearchParams();
        params.append("hashes", String(e.externalId));
        return this.fetchWithAuth("/api/v2/torrents/start", { method: "POST", body: params })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to start torrents");
                }
            });
    };

    QBittorrentClient.prototype.stopTorrent = function(e) {
        var params = new URLSearchParams();
        params.append("hashes", String(e.externalId));
        return this.fetchWithAuth("/api/v2/torrents/stop", { method: "POST", body: params })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to stop torrents");
                }
            });
    };

    QBittorrentClient.prototype.hideTorrent = function(e) {
        var params = new URLSearchParams();
        params.append("hashes", String(e.externalId));
        params.append("tags", "hide");
        return this.fetchWithAuth("/api/v2/torrents/addTags", { method: "POST", body: params })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to hide torrent");
                }
            });
    };

    QBittorrentClient.prototype.removeTorrent = function(e, t) {
        t = (typeof t === 'undefined') ? false : t;
        var params = new URLSearchParams();
        params.append("hashes", String(e.externalId));
        params.append("deleteFiles", t ? "true" : "false");
        return this.fetchWithAuth("/api/v2/torrents/delete", { method: "POST", body: params })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to remove torrents");
                }
            });
    };

    QBittorrentClient.prototype.getFiles = function(e) {
        var params = new URLSearchParams();
        params.append("hash", String(e.externalId));
        return this.fetchWithAuth('/api/v2/torrents/files?' + params.toString())
            .then(function(o) {
                if (!o.ok) {
                    throw new Error('Failed to get files for torrent ' + e.externalId);
                }
                return o.json();
            })
            .then(function(jsonResponse) {
                return jsonResponse.map(function(l) {
                    var piece_range = l.piece_range || [undefined, undefined];
                    return {
                        bytesCompleted: Math.floor(l.progress * l.size),
                        length: l.size,
                        name: l.name,
                        begin_piece: piece_range[0],
                        end_piece: piece_range[1]
                    };
                });
            });
    };
    var L = QBittorrentClient;


    // function TransmissionRpc(e, t, o, n) {
    //     this.url = e;
    //     this.login = t;
    //     this.password = o;
    //     this.sessionId = n;
    // }

    // TransmissionRpc.prototype.POST = function(e) {
    //     var self = this;
    //     return fetch(this.url, {
    //         method: "POST",
    //         headers: {
    //             Authorization: 'Basic ' + btoa(this.login + ":" + this.password),
    //             "Content-Type": "application/json",
    //             "X-Transmission-Session-Id": this.sessionId || ""
    //         },
    //         body: JSON.stringify(e)
    //     })
    //     .then(function(t) {
    //         if (t.status === 409) {
    //             self.sessionId = t.headers.get("X-Transmission-Session-Id");
    //             if (self.sessionId == null) {
    //                 return Promise.reject(new Error("Can`t authorize to Transmission RPC"));
    //             }
    //             return self.POST(e);
    //         }
    //         if (!t.ok) {
    //             return Promise.reject({ message: 'Transmission RPC error: ' + t.statusText, status: t.status });
    //         }
    //         return t.json();
    //     });
    // };

    // ES5 Class: x (TransmissionRpc)
    function TransmissionRpc(url, login, password, sessionId) { // url, t, o, n
        this.url = url;
        this.login = login;
        this.password = password;
        this.sessionId = sessionId;
        this.network = new Lampa.Reguest(); // <<<< 实例化 Lampa.Request
    }

    TransmissionRpc.prototype.POST = function (requestBodyJson) {
        var self = this;
        // self.network.timeout(15000); // Example: set a specific timeout for this request if needed
        return new Promise(function (resolve, reject) {
            var lampaParams = {
                headers: {
                    'Authorization': 'Basic ' + btoa(self.login + ":" + self.password),
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                type: 'POST'
            };
            if (self.sessionId) {
                lampaParams.headers['X-Transmission-Session-Id'] = self.sessionId;
            }

            self.network.native( // <<<< 使用 this.network
                self.url,
                function (data) {
                    resolve(data);
                },
                function (jqXHR_error, exception) {
                    if (jqXHR_error && jqXHR_error.status === 409) {
                        var newSessionId = jqXHR_error.getResponseHeader('X-Transmission-Session-Id');
                        if (newSessionId) {
                            self.sessionId = newSessionId;
                            self.POST(requestBodyJson).then(resolve).catch(reject);
                        } else {
                            reject(new Error("Transmission Error: No session ID in 409 response."));
                        }
                    } else {
                        // 使用实例上的 errorDecode，如果 Lampa.Request 的 errorDecode 也是实例方法
                        // 从源码看，errorDecode 是一个内部函数，但暴露为 this.errorDecode
                        var errorMsg = self.network.errorDecode(jqXHR_error, exception);
                        var statusMsg = (jqXHR_error && jqXHR_error.status) ? ' (Status: ' + jqXHR_error.status + ')' : '';
                        reject(new Error('Transmission RPC Error: ' + errorMsg + statusMsg));
                    }
                },
                JSON.stringify(requestBodyJson),
                lampaParams
            );
        });
    };

    TransmissionRpc.prototype.getSession = function() { return this.POST({ method: "session-get" }); };
    TransmissionRpc.prototype.addTorrent = function(e) { return this.POST({ method: "torrent-add", arguments: e }); };
    TransmissionRpc.prototype.getTorrents = function(e) { return this.POST({ method: "torrent-get", arguments: e }); };
    TransmissionRpc.prototype.setTorrent = function(e) { return this.POST({ method: "torrent-set", arguments: e }); };
    TransmissionRpc.prototype.startTorrent = function(e) { return this.POST({ method: "torrent-start", arguments: e }); };
    TransmissionRpc.prototype.stopTorrent = function(e) { return this.POST({ method: "torrent-stop", arguments: e }); };
    TransmissionRpc.prototype.removeTorrent = function(e) { return this.POST({ method: "torrent-remove", arguments: e }); };
    var x = TransmissionRpc;


    function TransmissionClient(e, t, o) {
        this.url = e;
        this.login = t;
        this.password = o;
        this.client = new TransmissionRpc(e + "/transmission/rpc", t, o);
    }

    TransmissionClient.prototype.getTorrents = function() {
        return this.client.getTorrents({ fields: ["id", "name", "status", "percentDone", "sizeWhenDone", "rateDownload", "eta", "labels", "files"] })
            .then(function(response) {
                var torrents = (response.arguments && response.arguments.torrents) ? response.arguments.torrents : [];
                return torrents
                    .filter(function(t) { return !Array.isArray(t.labels) || t.labels.indexOf("hide") === -1; })
                    .map(function(t) {
                        return {
                            id: y(t.labels || []),
                            externalId: t.id,
                            name: t.name,
                            status: U(t.status),
                            percentDone: t.percentDone,
                            totalSize: t.sizeWhenDone,
                            eta: t.eta,
                            speed: t.rateDownload,
                            files: t.files
                        };
                    })
                    .filter(function(t) { return typeof t.id !== 'undefined' && !isNaN(t.id); });
            });
    };

    TransmissionClient.prototype.addTorrent = function(e, t) {
        var self = this;
        return this.client.addTorrent({ paused: false, sequential_download: true, filename: t.MagnetUri || t.Link, labels: [w(e.id)] })
            .then(function(o) {
                if (o.arguments && o.arguments["torrent-added"]) {
                    return self.client.setTorrent({ ids: [o.arguments["torrent-added"].id], labels: [w(e.id)] });
                }
            });
    };
    TransmissionClient.prototype.startTorrent = function(e) { return this.client.startTorrent({ ids: [e.externalId] }); };
    TransmissionClient.prototype.stopTorrent = function(e) { return this.client.stopTorrent({ ids: [e.externalId] }); };
    TransmissionClient.prototype.hideTorrent = function(e) { return this.client.setTorrent({ ids: [e.externalId], labels: [w(e.id), "hide"] }); };
    TransmissionClient.prototype.removeTorrent = function(e, t) {
        t = (typeof t === 'undefined') ? false : t;
        return this.client.removeTorrent({ ids: [e.externalId], "delete-local-data": t });
    };
    TransmissionClient.prototype.getFiles = function(e) { return Promise.resolve(e.files); };
    var S = TransmissionClient;


    var TorrentClientFactory = function() {};
    TorrentClientFactory.client = undefined;

    TorrentClientFactory.getClient = function() {
        if (!this.client) {
            var e = Lampa.Storage.field(b);
            var t = e.split(";");
            if (t.length === 1) {
                this.buildClient(e);
            } else if (t.length > 1) {
                this.selectUrl(t);
            }
        }
        return this.client;
    };

    TorrentClientFactory.reset = function () {
        if (this.client && this.client.network && typeof this.client.network.clear === 'function') {
            this.client.network.clear();
        }

        this.client = undefined;
    };

    TorrentClientFactory.buildClient = function(e) {
        var isQbittorrent = Lampa.Storage.field(k) === "1" || Lampa.Storage.field(k) === 1;
        var login = Lampa.Storage.field(E);
        var password = Lampa.Storage.field(P);
        this.client = isQbittorrent ? new QBittorrentClient(e, login, password) : new TransmissionClient(e, login, password);
    };

    TorrentClientFactory.selectUrl = function(e) {
        var self = this;
        var promises = e.map(function(url) {
            return fetch(url + "/ping", { cache: "no-cache" })
                .then(function(response) {
                    return response.ok ? url : Promise.reject();
                });
        });

        return new Promise(function(resolveOuter) {
            var attempts = 0;
            var connected = false;
            promises.forEach(function(promise) {
                promise.then(function(workingUrl) {
                    if (!connected) {
                        connected = true;
                        self.buildClient(workingUrl);
                        h("Connected to " + workingUrl);
                        Lampa.Noty.show(Lampa.Lang.translate("background-worker.connection-success") + ": " + workingUrl);
                        resolveOuter();
                    }
                }).catch(function() {
                    attempts++;
                    if (attempts === promises.length && !connected) {
                        self.buildClient(e[0]);
                        h("Failed to connect to any URL, falling back to " + e[0]);
                        resolveOuter();
                    }
                });
            });
        });
    };
    var i = TorrentClientFactory;


    var ee = r.component + ".torrents.data.views.";

    var ViewStore = function() {};
    ViewStore.getViews = function(e) {
        return Lampa.Storage.get(ee + e.externalId);
    };
    ViewStore.rememberView = function(e, t) {
        var o = ViewStore.getViews(e) || {};
        o.last = t;
        o[t] = true;
        Lampa.Storage.set(ee + e.externalId, o);
    };
    var v = ViewStore;


    function te(a, e, t) {
        var client = TorrentClientFactory.getClient();
        return client.getFiles(e)
            .then(function(files) {
                var baseUrl = client.url + "/downloads/";
                if (files.length < 1) {
                    throw new Error("No files found in torrent");
                }
                if (files.length === 1) {
                    Lampa.Player.play({ title: t || e.name, url: baseUrl + files[0].name });
                } else if (files.length > 1) {
                    var views = ViewStore.getViews(e);
                    var items = files.map(function(fileData) {
                        return {
                            title: fileData.name.split(/[\\/]/).pop() || fileData.name,
                            name: fileData.name,
                            url: baseUrl + fileData.name,
                            picked: views ? views[fileData.name] : false,
                            selected: views ? views.last === fileData.name : false
                        };
                    });
                    Lampa.Select.show({
                        title: Lampa.Lang.translate("actions.select-file"),
                        items: items,
                        onSelect: function(selectedItem) {
                            ViewStore.rememberView(e, selectedItem.name);
                            Lampa.Player.play({ playlist: items, title: t || e.name, url: selectedItem.url });
                            Lampa.Player.playlist(items);
                            Lampa.Controller.toggle(a);
                        },
                        onBack: function() {
                            Lampa.Controller.toggle(a);
                        }
                    });
                }
            });
    }

    function ae(a) {
        if (a.status === s.DOWNLOADING) {
            TorrentClientFactory.getClient().stopTorrent(a);
        } else {
            TorrentClientFactory.getClient().startTorrent(a);
        }
    }

    function _(a, e, t) {
        e = d.ensureMovie(e);
        var items = [
            {
                title: Lampa.Lang.translate("actions.open"),
                onSelect: function() { return te(a, e, t); }
            }
        ];

        if (a === "downloads-tab" && e.id) {
            items.push({
                title: Lampa.Lang.translate("actions.open-card"),
                onSelect: function() { Lampa.Activity.push({ component: "full", id: e.id, method: "movie", card: e }); }
            });
        }

        items.push(
            {
                title: e.status === s.DOWNLOADING ? Lampa.Lang.translate("actions.pause") : Lampa.Lang.translate("actions.resume"),
                onSelect: function() {
                    ae(e);
                    Lampa.Controller.toggle(a);
                }
            },
            {
                title: Lampa.Lang.translate("actions.hide"),
                onSelect: function() {
                    TorrentClientFactory.getClient().hideTorrent(e);
                    $('.downloads-tab__item[data-id="' + e.id + '_' + e.externalId + '"]').remove();
                    Lampa.Controller.toggle(a);
                }
            },
            {
                title: Lampa.Lang.translate("actions.delete"),
                subtitle: Lampa.Lang.translate("actions.delete-with-file"),
                onSelect: function() {
                    TorrentClientFactory.getClient().removeTorrent(e, true);
                    $('.downloads-tab__item[data-id="' + e.id + '_' + e.externalId + '"]').remove();
                    Lampa.Controller.toggle(a);
                }
            },
            {
                title: Lampa.Lang.translate("actions.delete-torrent"),
                subtitle: Lampa.Lang.translate("actions.delete-torrent-keep-file"),
                onSelect: function() {
                    TorrentClientFactory.getClient().removeTorrent(e, false);
                    $('.downloads-tab__item[data-id="' + e.id + '_' + e.externalId + '"]').remove();
                    Lampa.Controller.toggle(a);
                }
            }
        );

        Lampa.Select.show({
            title: Lampa.Lang.translate("actions.title"),
            items: items,
            onBack: function() { Lampa.Controller.toggle(a); }
        });
    }

    function T(a, e, t) {
        var defaultAction = Lampa.Storage.field(A);
        if (defaultAction == 1) {
            te(a, e, t);
        } else if (defaultAction == 2) {
            ae(e);
        } else {
            _(a, e, t);
        }
    }


    function DownloadsTabComponent() {
        this.html = $("<div></div>");
        this.lastFocusedElement = null;
        this.scroll = null;
    }

    DownloadsTabComponent.prototype.create = function() {
        var self = this;
        this.scroll = new Lampa.Scroll({ mask: true, over: true, step: 200 });
        var listElement = $('<div class="downloads-tab__list d-updatable"></div>');

        d.getMovies().forEach(function(movieData) {
            var templateData = f(movieData);
            var rowElement = $(Lampa.Template.get("downloads-row", Object.assign({}, templateData, { icon: u })));

            rowElement.on("hover:focus", function(event) {
                self.scroll.update(event.currentTarget, true);
            }).on("hover:enter", function() {
                T("downloads-tab", movieData);
            }).on("hover:long", function() {
                _("downloads-tab", movieData);
            });
            listElement.append(rowElement);
        });

        if (listElement.children().length === 0) {
            var empty = new Lampa.Empty();
            listElement.append(empty.render());
            this.html.append(listElement);
        } else {
            this.scroll.minus();
            this.scroll.append(listElement.get(0));
            this.html.append(this.scroll.render());
        }
    };

    DownloadsTabComponent.prototype.render = function(e) {
        e = (typeof e === 'undefined') ? false : e;
        return this.html;
    };

    DownloadsTabComponent.prototype.start = function() {
        var self = this;
        Lampa.Controller.add("downloads-tab", {
            toggle: function() {
                Lampa.Controller.collectionSet(self.scroll.render());
                Lampa.Controller.collectionFocus(self.lastFocusedElement !== null ? self.lastFocusedElement : false, self.scroll.render());
            },
            left: function() {
                if (Navigator.canmove("left")) {
                    Navigator.move("left");
                } else {
                    Lampa.Controller.toggle("menu");
                }
            },
            right: function() { Navigator.move("right"); },
            up: function() {
                if (Navigator.canmove("up")) {
                    Navigator.move("up");
                } else {
                    Lampa.Controller.toggle("head");
                }
                self.lastFocusedElement = Navigator.getFocusedElement();
            },
            down: function() {
                if (Navigator.canmove("down")) {
                    Navigator.move("down");
                }
                self.lastFocusedElement = Navigator.getFocusedElement();
            },
            back: function() { Lampa.Activity.backward(); }
        });
        Lampa.Controller.toggle("downloads-tab");
    };

    DownloadsTabComponent.prototype.build = function(e) {};
    DownloadsTabComponent.prototype.bind = function(e) {};
    DownloadsTabComponent.prototype.empty = function() {};
    DownloadsTabComponent.prototype.next = function() {};
    DownloadsTabComponent.prototype.append = function(e, t) {};
    DownloadsTabComponent.prototype.limit = function() {};
    DownloadsTabComponent.prototype.refresh = function() {};
    DownloadsTabComponent.prototype.pause = function() {};
    DownloadsTabComponent.prototype.stop = function() {};
    DownloadsTabComponent.prototype.destroy = function() {
        if (this.scroll) {
            this.scroll.destroy();
        }
        this.html.remove();
    };
    var R = DownloadsTabComponent;


    function Q(a) {
        var e = f(a);
        var t = $(document).find('.downloads-tab__item[data-id="' + e.id + '"]');
        if (t.length) {
            t.removeClass("downloading completed paused").addClass(e.status);
            t.find(".downloads-tab__title span").text(e.fileName);
            t.find(".downloads-tab__speed span").text(e.speed);
            t.find(".downloads-tab__meta-eta span").text(e.eta);
            t.find(".downloads-tab__progress-fill").css("width", e.percent);
            t.find(".downloads-tab__meta-percent").text(e.percent);
            t.find(".downloads-tab__meta-downloaded").text(e.downloadedSize);
            t.find(".downloads-tab__meta-total").text(e.totalSize);
        }
    }

    function oe() {
        Lampa.Template.add("menu-button", M);
        Lampa.Template.add("downloads-row", z);
        $("body").append('<style>' + G + '</style>');
        Lampa.Component.add("downloads-tab", R);

        var translatedDownloads = Lampa.Lang.translate("downloads");
        var menuButtonElement = $(Lampa.Template.get("menu-button", { icon: u, text: translatedDownloads }));

        menuButtonElement.on("hover:enter", function() {
            Lampa.Activity.push({ url: "", title: translatedDownloads, component: "downloads-tab", page: 1 });
        });
        $(".menu .menu__list").eq(0).append(menuButtonElement);
    }

    var se = '<div class="full-start__button selector button--download">\r\n' +
        '    {icon}\r\n' +
        '    <span>{text}</span>\r\n' +
        '</div>';

    function be(a) {
        var e = $(Lampa.Template.get("download-button", { icon: u, text: Lampa.Lang.translate("download") }));
        e.on("hover:enter", function(t) {
            Lampa.Activity.push({
                url: "",
                title: Lampa.Lang.translate("download"),
                component: "torrents-download",
                search_one: a.movie.title,
                search_two: a.movie.original_title,
                movie: a.movie,
                page: 1
            });
        });
        $(".full-start-new__buttons").children().first().after(e);
    }

    function re() {
        Lampa.Template.add("download-button", se);
        Lampa.Component.add("torrents-download", Lampa.Component.get("torrents"));
        Lampa.Listener.follow("full", function(a) {
            if (a.type === "complite") {
                var e = a.data;
                be(e);
            }
        });
        Lampa.Listener.follow("torrent", function(a) {
            var activeActivity = Lampa.Activity.active();
            if (a.type === "render" && activeActivity.component === "torrents-download") {
                $(a.item).off("hover:enter");
                $(a.item).on("hover:enter", function() {
                    return TorrentClientFactory.getClient().addTorrent(activeActivity.movie, a.element)
                        .then(function() {
                            Lampa.Activity.back();
                            return TorrentClientFactory.getClient().getTorrents();
                        })
                        .then(function(torrents) {
                            var foundTorrent = torrents.find(function(n) { return n.id === activeActivity.movie.id; });
                            if (foundTorrent) {
                                D(foundTorrent, activeActivity.movie);
                            }
                        });
                });
            }
        });
    }

    function ie() {
        window.plugin_transmission_ready = true;
        Lampa.Manifest.plugins = r;

        var allTranslations = {
            downloads: {
                ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",
                en: "Downloads",
                zh: "BT下载"
            },
            download: {
                ru: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C",
                en: "Download",
                zh: "BT下载"
            },
            "download-card.time.0": { en: "d", ru: "\u0434", zh: "天" },
            "download-card.time.1": { en: "h", ru: "\u0447", zh: "小时" },
            "download-card.time.2": { en: "min", ru: "\u043C\u0438\u043D", zh: "分钟" },
            "download-card.time.3": { en: "s", ru: "\u0441\u0435\u043A", zh: "秒" },
            "download-card.status.0": { en: "stopped", ru: "\u043F\u0430\u0443\u0437\u0430", zh: "已暂停" },
            "download-card.status.1": { en: "queued to verify local data", ru: "\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438", zh: "排队等待校验" },
            "download-card.status.2": { en: "verifying local data", ru: "\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445", zh: "正在校验数据" },
            "download-card.status.3": { en: "queued to download", ru: "\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438", zh: "排队等待下载" },
            "download-card.status.4": { en: "downloading", ru: "\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430", zh: "下载中" },
            "download-card.status.5": { en: "queued to seed", ru: "\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438", zh: "排队等待做种" },
            "download-card.status.6": { en: "seeding", ru: "\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F", zh: "做种中" },
            "download-card.status.7": { en: "isolated", ru: "\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432", zh: "无连接" },
            "download-card.status.8": { en: "stalled", ru: "\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442", zh: "已停滞" },
            "download-card.status.9": { en: "error", ru: "\u043E\u0448\u0438\u0431\u043A\u0430", zh: "错误" },
            "download-card.status.10": { en: "allocating", ru: "\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430", zh: "分配空间中" },
            "download-card.status.11": { en: "moving", ru: "\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435", zh: "移动中" },
            "download-card.status.12": { en: "unknown", ru: "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E", zh: "未知" },
            "download-card.status.13": { en: "initializing", ru: "\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F", zh: "初始化中" }, // fileName "Initialization" should also be translated using this
            "download-card.status.14": { en: "completed", ru: "\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E", zh: "已完成" },
            "download-card.size.0": { en: "B", ru: "\u0411", zh: "B" },
            "download-card.size.1": { en: "KB", ru: "\u041A\u0411", zh: "KB" },
            "download-card.size.2": { en: "MB", ru: "\u041C\u0411", zh: "MB" },
            "download-card.size.3": { en: "GB", ru: "\u0413\u0411", zh: "GB" },
            "download-card.size.4": { en: "TB", ru: "\u0422\u0411", zh: "TB" },
            "actions.title": { ru: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F", en: "Actions", zh: "操作" },
            "actions.open": { ru: "\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438", en: "Play", zh: "播放" },
            "actions.open-card": { ru: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430", en: "Open movie card", zh: "打开影片详情" },
            "actions.select-file": { ru: "\u0424\u0430\u0439\u043B\u044B:", en: "Files:", zh: "选择文件:" },
            "actions.pause": { ru: "\u041F\u0430\u0443\u0437\u0430", en: "Pause", zh: "暂停" },
            "actions.resume": { ru: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", en: "Resume", zh: "继续" },
            "actions.hide": { ru: "\u0421\u043A\u0440\u044B\u0442\u044C", en: "Hide", zh: "隐藏" },
            "actions.delete": { ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", en: "Delete", zh: "删除" },
            "actions.delete-with-file": { ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B", en: "Delete torrent and file", zh: "删除任务和文件" },
            "actions.delete-torrent": { ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442", en: "Delete torrent", zh: "删除任务" },
            "actions.delete-torrent-keep-file": { ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B", en: "Delete torrent but keep file", zh: "删除任务但保留文件" },
            "background-worker.connection-success": { ru: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u041A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E", en: "Connection to server successfully established", zh: "服务器连接成功" },
            "background-worker.error-detected": { ru: "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438", en: "An error has been detected. See console for details", zh: "检测到错误，详情请查看控制台" },
            // Settings related strings
            "settings.component_name": {
                ru: r.name,
                en: r.name,
                zh: "种子下载器"
            },
            "settings.update_interval_name": {
                ru: "Интервал обновления",
                en: "Update interval",
                zh: "更新间隔"
            },
            "settings.default_action_name": {
                ru: "Действие по умолчанию при нажатии",
                en: "Default press action",
                zh: "默认点击操作"
            },
            "settings.default_action_descr": {
                ru: "Длительное нажатие всегда открывает меню действий.",
                en: "Long press always opens the actions menu.",
                zh: "长按总是打开操作菜单。"
            },
            "settings.server_settings_title": {
                ru: "Настройки сервера:",
                en: "Server settings:",
                zh: "服务器设置:"
            },
            "settings.torrent_client_type_name": {
                ru: "Торрент-клиент",
                en: "Torrent Client",
                zh: "种子客户端类型"
            },
            "settings.server_url_name": {
                ru: "URL-адрес",
                en: "Url",
                zh: "服务器地址"
            },
            "settings.server_login_name": {
                ru: "Логин",
                en: "Login",
                zh: "登录名"
            },
            "settings.server_password_name": {
                ru: "Пароль",
                en: "Password",
                zh: "密码"
            },
            "settings.default_action_option_menu": {
                ru: "Открыть меню действий",
                en: "Open actions menu",
                zh: "打开操作菜单"
            },
            "settings.default_action_option_play": {
                ru: "Воспроизвести",
                en: "Play",
                zh: "播放"
            },
            "settings.default_action_option_resume_pause": {
                ru: "Продолжить / Пауза загрузки",
                en: "Resume / Pause download",
                zh: "继续 / 暂停下载"
            },
        };
        if (window.Lampa && Lampa.Lang) {
            Lampa.Lang.add(allTranslations);
        }


        J();
        re();
        B();
        oe();
        Z();
        if (Lampa.Storage.field(b)) {
            var intervalIndex = Lampa.Storage.field(C);
            var intervalValue = N[intervalIndex] || N[0];
            g.start(intervalValue);
        }
    }

    if (!window.plugin_transmission_ready) {
        if (window.appready) {
            ie();
        } else {
            Lampa.Listener.follow("app", function(a) {
                if (a.type === "ready") {
                    ie();
                }
            });
        }
    }
})();