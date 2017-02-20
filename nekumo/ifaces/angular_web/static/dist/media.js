System.registerDynamic("github:balliegojr/angular-event-dispatcher@0.0.3/build/event-dispatcher.js",[],!1,function(e,t,r){var n=System.get("@@global-helpers").prepareGlobal(r.id,null,null);return function(e){!function(){"use strict";function e(e,t){this._eventSubscriptions=e.newRegistry(),this._strictMode=t}function t(e,t,r){return function(){e.off(t,r)}}e.prototype.register=function(e){var t=this._eventSubscriptions.getValue(e);"undefined"==typeof t&&(t=[],this._eventSubscriptions.register(e,t))},e.prototype._subscribe=function(e,t){var r=this._eventSubscriptions.getValue(e);if(console.error(this._strictMode),"undefined"==typeof r){if(this._strictMode===!0)throw"EventDispatcher: "+e+" not registered";this.register(e),r=this._eventSubscriptions.getValue(e)}r.push(t)},e.prototype._unsubscribe=function(e,t){var r,n=this._eventSubscriptions.getValue(e);if("undefined"==typeof n){if(!this._strictMode)return;throw"EventDispatcher: "+e+" not registered"}for(r=n.length-1;r>=0;r--)n[r]===t&&n.splice(r,1)},e.prototype.on=function(e,r){if(e instanceof Array)for(var n=0;n<e.length;n++)this._subscribe(e[n],r);else this._subscribe(e,r);return new t(this,e,r)},e.prototype.off=function(e,t){if(e instanceof Array)for(var r=0;r<e.length;r++)this._unsubscribe(e[r],t);else this._unsubscribe(e,t)},e.prototype.trigger=function(e,t,r){var n,a=this._eventSubscriptions.getValue(e);if("undefined"==typeof a){if(!this._strictMode)return;throw"EventDispatcher: "+e+" not registered"}for(t=t instanceof Array?t:[t],r=r||this.caller,n=a.length-1;n>=0;n--)try{a[n].apply(r,t)}catch(e){console.error(e)}},angular.module("eventDispatcherModule",["RegistryModule"]).provider("eventDispatcher",[function(){var t=!1;this.strictModeOn=function(){t=!0},this.$get=["RegistryFactory",function(r){return new e(r,t)}]}])}(),function(){"use strict";function e(e){var t=Object.create(null),r=e;this.register=function(e,r){t[e]=r},this.getValue=function(e){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:r},this.getValues=function(){var e=[];for(var r in t)e.push(t[r]);return e}}angular.module("RegistryModule",[]).factory("RegistryFactory",[function(){return{newRegistry:function(t){return new e(t)}}}])}()}(this),n()}),System.registerDynamic("github:erykpiast/angular-duration-format@1.0.1/dist/angular-duration-format.js",[],!1,function(e,t,r){var n=System.get("@@global-helpers").prepareGlobal(r.id,null,null);return function(e){angular.module("angular-duration-format.filter",[]).filter("duration",function(){function e(e){for(var t=[],r=e?e.toString():"";r;){var a=n.exec(r);a?(t=t.concat(a.slice(1)),r=t.pop()):(t.push(r),r=null)}return t}function t(e,t){var n="",i={};return t.filter(function(e){return a.hasOwnProperty(e)}).map(function(e){var t=a[e];return t.hasOwnProperty("pad")?t.value:e}).filter(function(e,t,r){return r.indexOf(e)===t}).map(function(e){return angular.extend({name:e},a[e])}).sort(function(e,t){return t.value-e.value}).forEach(function(t){var r=i[t.name]=Math.floor(e/t.value);e-=r*t.value}),t.forEach(function(e){var t=a[e];if(t){var o=i[t.value];n+=t.hasOwnProperty("pad")?r(o,Math.max(t.pad,o.toString().length)):i[e]}else n+=e.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),n}function r(e,t){return(new Array(t+1).join("0")+e).slice(-t)}var n=/((?:[^ydhms']+)|(?:'(?:[^']|'')*')|(?:y+|d+|h+|m+|s+))(.*)/,a={y:{value:31536e6},yy:{value:"y",pad:2},d:{value:864e5},dd:{value:"d",pad:2},h:{value:36e5},hh:{value:"h",pad:2},m:{value:6e4},mm:{value:"m",pad:2},s:{value:1e3},ss:{value:"s",pad:2},sss:{value:1},ssss:{value:"sss",pad:4}};return function(r,n){var a=parseFloat(r,10),i=e(n);return isNaN(a)||0===i.length?r:t(a,i)}}),angular.module("angular-duration-format",["angular-duration-format.filter"])}(this),n()}),System.registerDynamic("github:erykpiast/angular-duration-format@1.0.1.js",["github:erykpiast/angular-duration-format@1.0.1/dist/angular-duration-format.js"],!0,function(e,t,r){this||self;r.exports=e("github:erykpiast/angular-duration-format@1.0.1/dist/angular-duration-format.js")}),System.registerDynamic("src/shared/chromecast/chromecast.js",["angular","angular-material","balliegojr/angular-event-dispatcher/build/event-dispatcher.js","erykpiast/angular-duration-format"],!0,function(e,t,r){this||self;Promise.all([e("angular"),e("angular-material"),e("balliegojr/angular-event-dispatcher/build/event-dispatcher.js"),e("erykpiast/angular-duration-format")]).then(function(){function e(e){return e>0&&(volumeLevelName="low"),e>40&&(volumeLevelName="medium"),e>70&&(volumeLevelName="high"),e||(volumeLevelName="off"),volumeLevelName}var t=function(){},r={IDLE:"IDLE",LOADING:"LOADING",LOADED:"LOADED",PLAYING:"PLAYING",PAUSED:"PAUSED",STOPPED:"STOPPED",ERROR:"ERROR"},n=function(e){var t={force:!1,callback:null};this.src=null,this.chromecastOptions=angular.extend(t,e),this.castInstance=null,this.isInitialized=!1,this._el=document.createElement("div"),this.dispatch=this._el.dispatchEvent,this.listen=function(e,t){this._el.addEventListener(e,t)}};n.prototype.initializeCastPlayer=function(){var e={};e.receiverApplicationId=chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,e.autoJoinPolicy=chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,this.castInstance=cast.framework.CastContext.getInstance(),this.castInstance.setOptions(e),this.remotePlayer=new cast.framework.RemotePlayer,this.remotePlayerController=new cast.framework.RemotePlayerController(this.remotePlayer),this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,this.switchPlayer.bind(this)),this.enableListeners()},n.prototype.enableListeners=function(){this.chromecastOptions.callback&&this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.ANY_CHANGE,this.chromecastOptions.callback)},n.prototype.switchPlayer=function(){this.playerState=r.IDLE,cast&&cast.framework&&(this.remotePlayer.isConnected?(this.isInitialized=!0,this.load()):this.isInitialized=!1)},n.prototype.getCurrentSession=function(){if(this.castInstance)return this.castInstance.getCurrentSession()},n.prototype.getMediaSession=function(){var e=this.getCurrentSession();if(e)return e.getMediaSession()},n.prototype.getPlayerState=function(){return(this.getMediaSession()||{}).playerState||""},n.prototype.load=function(){var e=this.getCurrentSession();if(this.chromecastOptions.force||e&&!this.getPlayerState()){var t={mimeType:"video/mp4",title:null,thumbs:null},r=angular.extend(t,this.options),n=new chrome.cast.media.MediaInfo(this.src,r.mimeType);n.metadata=new chrome.cast.media.GenericMediaMetadata,n.metadata.metadataType=chrome.cast.media.MetadataType.GENERIC,r.title&&(n.metadata.title=r.title),r.thumbs&&(n.metadata.images=r.thumbs);var a=new chrome.cast.media.LoadRequest(n);e.loadMedia(a)}},n.prototype.setSrc=function(e,t){this.src=e,this.options=t,this.load()},n.prototype.start=function(){window.__onGCastApiAvailable=function(e){e&&this.initializeCastPlayer()}.bind(this)},n.prototype.getDuration=function(){return this.remotePlayer.duration},n.prototype.seekTo=function(e){this.remotePlayer&&(this.remotePlayer.currentTime=e,this.remotePlayerController.seek())},n.prototype.setVolumeLevel=function(e){this.remotePlayer.volumeLevel=e,this.remotePlayerController.setVolumeLevel()},n.prototype.play=function(){return(this.getMediaSession()||{play:t}).play()},n.prototype.pause=function(){return(this.getMediaSession()||{pause:t}).pause()},n.prototype.togglePause=function(){this.getPlayerState()==r.PAUSED?this.play():this.pause()};var a=angular.module("chromecast",["eventDispatcherModule","ngMaterial","angular-duration-format"]);a.factory("$chromecast",["eventDispatcher",function(e){var t=e,r=new n({callback:function(e){t.trigger(e.field,e),t.trigger("anyChange",e)}});return r.start(),r.events=t,t.on("anyChange",function(e){console.debug(e)}),r}]),a.factory("$chromecastPlayer",["$document","$templateRequest","$compile","$rootScope","$chromecast",function(t,r,n,a,i){return function(){r("/.nekumo/static/src/shared/chromecast/player.html").then(function(r){var o=t.find("body").eq(0),s=angular.element(r),l=a.$new();l=angular.extend(l,{$chromecast:i,playerState:"UNKNOWN",duration:null,currentTime:0,volumeSlider:!1,volumeLevel:0,volumeLevelName:"high"}),l.playerState=null,l.toggleVolumeSlider=function(){l.volumeSlider=!l.volumeSlider},l.setVolumeLevel=function(t){l.volumeLevelName=e(t),i.setVolumeLevel(t/100)},l.undo=function(){i.seekTo(Math.max(l.currentTime-30,0))},n(s)(l),o.append(s),c=i,i.events.on("playerState",function(e){l.$apply(function(){e.value&&null===l.playerState&&a.$broadcast("chromecastActivated"),l.playerState=e.value})}),i.events.on("duration",function(e){l.$apply(function(){l.duration=parseInt(e.value)})}),i.events.on("currentTime",function(e){l.$apply(function(){l.currentTime=parseInt(e.value)})}),i.events.on("volumeLevel",function(t){console.log(t),l.$apply(function(){l.volumeLevel=100*t.value,l.volumeLevelName=e(l.volumeLevel)})})})}}]),a.directive("includeReplace",function(){return{require:"ngInclude",link:function(e,t,r){t.replaceWith(t.children())}}})})}),System.registerDynamic("src/components/media/media.js",["angular","angular-animate","angular-aria","angular-material","sprintf-js","shared/nekumo/nekumo","shared/preview/preview","shared/chromecast/chromecast","shared/fileManagerApi/fileManagerApi","lodash"],!0,function(e,t,r){this||self;Promise.all([e("angular"),e("angular-animate"),e("angular-aria"),e("angular-material"),e("sprintf-js"),e("shared/nekumo/nekumo"),e("shared/preview/preview"),e("shared/chromecast/chromecast"),e("shared/fileManagerApi/fileManagerApi")]).then(function(){var t=e("lodash"),r=angular.module("mediaApp",["nekumo","preview","chromecast","fileManagerApi"]);r.directive("media",function(){return{scope:{selectedSrc:"="},templateUrl:"/.nekumo/static/src/components/media/media.html"}}),r.controller("mediaCtrl",["$rootScope","$scope","$previewGallery","$chromecastPlayer","$location","$filter","API",function(e,r,n,a,i,o,s){function l(e){r.isLoaded=!1,r.entries=[],r.videoEntries=[],r.audioEntries=[],r.imageEntries=[],r.otherEntries=[],s.list(e).then(function(e){r.isLoaded=!0,angular.forEach(e,function(e){var t=r[e.category+"Entries"];t=void 0!==t?t:r.otherEntries,t.push(e)}),r.otherEntries=o("orderBy")(r.otherEntries,["-isDir","name"])})}function u(e){e=t.trim(e,"/");var n=t.filter(e.split("/"),function(e){return e}),a=[];return angular.forEach(n,function(e,i){a.push(Entry({path:r.root+t.slice(n,0,i+1).join("/")+"/"}))}),a}a(),r.currentDirectory=null,r.category="all",e.$on("$locationChangeSuccess",function(){r.currentDirectory=i.path(),l(i.path()),r.breadcrumb=u(i.path())})}]),r.directive("grid",function(){return{scope:{entries:"=",title:"@",isSelected:"="},templateUrl:"/.nekumo/static/src/components/media/grid.html"}}),r.controller("gridCtrl",["$scope","$previewGallery",function(e,t){e.preview=function(r){t(r,e.entries)}}])})});