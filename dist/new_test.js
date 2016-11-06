'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var adPlugin = function () {
    function adPlugin(skipoffset, plst, plr) {
        _classCallCheck(this, adPlugin);

        this.adButtonTimer(skipoffset);
        this.playlist = plst;
        this.player = plr;
        this.ab = document.getElementById('adButton');
    }

    _createClass(adPlugin, [{
        key: 'adButtonTimer',
        value: function adButtonTimer(s) {
            var self = this;
            var timerId = setInterval(function () {
                self.ab.textContent = 'You can skip this ad in ' + parseInt(s - plr.getCurrentTime() + 1);
                if (plr.getCurrentTime() > s) {
                    clearInterval(timerId);
                    self.adSkipButtonEvent();
                    self.ab.textContent = 'Skip Ad';
                    console.log('time to skip ad!');
                }
            }, 1000);
        }
    }, {
        key: 'adSkipButtonEvent',
        value: function adSkipButtonEvent() {
            var self = this;
            this.ab.onclick = function () {
                console.log('ab onclick');
                adPlugin.skipAd(self.player, self.playlist);
            };
        }
    }], [{
        key: 'skipAd',
        value: function skipAd(p, playlist) {
            var playlistItem = playlist.shift();
            adVideoPlayNow = playlistItem.ad;
            p.load(playlistItem.source, '', true);
            var ab = document.getElementById('adButton');
            ab.parentNode.removeChild(ab);
        }
    }]);

    return adPlugin;
}();

var adVideoPlayNow = '';
var adButton = Clappr.UIContainerPlugin.extend({
    name: 'ad_button',
    initialize: function initialize() {
        this.render();
    },

    bindEvents: function bindEvents() {
        // this.listenTo(this.container, Clappr.Events.CONTAINER_PAUSE, this.show);
        this.listenTo(this.container, Clappr.Events.CONTAINER_CLICK, this.clickToAdVideo);
        this.listenTo(this.container, Clappr.Events.CONTAINER_PLAY, this.destroyAdPlugin);
    },

    destroyAdPlugin: function destroyAdPlugin() {
        if (!adVideoPlayNow) {
            this.destroy();
        }
    },

    clickToAdVideo: function clickToAdVideo() {
        window.open('https://rick.amigocraft.net/', '_blank').focus();
    },

    show: function show() {
        this.$el.show();
    },

    render: function render() {
        this.$el.css('font-size', '20px');
        this.$el.css('position', 'absolute');
        this.$el.css('color', 'white');
        this.$el.css('top', '70%');
        this.$el.css('right', '0%');
        this.$el.css('background-color', 'black');
        this.$el.css('z-index', '100500');
        this.$el.css('border', 'solid 3px #333333');
        this.$el.css('padding', '5px');
        this.container.$el.append(this.$el);
        this.$el[0].id = 'adButton';
        this.show();
        return this;
    }
});