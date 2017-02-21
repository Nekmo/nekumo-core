"bundle";System.registerDynamic("src/components/fileManager/options/options.html!github:jamespamplin/plugin-ng-template@0.1.1.js",["angular"],!0,function(e,t,n){var i=(this||self,"src/components/fileManager/options/options.html");e("angular").module("ng").run(["$templateCache",function(e){e.put(i,'<div ng-controller="optionsCtrl">\n    <md-menu md-position-mode="target-right target">\n        <md-button aria-label="Open phone interactions menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)">\n            <md-icon md-menu-origin md-font-set="mdi" md-font-icon="mdi-dots-vertical"></md-icon>\n        </md-button>\n        <md-menu-content width="4" class="menu-options">\n            <md-menu-item>\n                <md-button ng-click="ctrl.redial($event)">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-launch" md-menu-align-target></md-icon>\n                    Open in new tab\n                </md-button>\n            </md-menu-item>\n            <md-menu-item>\n                <md-button ng-click="ctrl.checkVoicemail()">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-download" md-menu-align-target></md-icon>\n                    Download\n                </md-button>\n            </md-menu-item>\n            <md-menu-item  ng-click="openRename(entry, $event);">\n                <md-button>\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-pencil" md-menu-align-target></md-icon>\n                    Rename\n                </md-button>\n            </md-menu-item>\n            <md-menu-item ng-if="!$rootScope.pasteAction">\n                <md-button ng-click="openCopy(entry, $event);">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-content-copy" md-menu-align-target></md-icon>\n                    Copy\n                </md-button>\n            </md-menu-item>\n            <md-menu-item ng-if="!$rootScope.pasteAction">\n                <md-button ng-click="openMove(entry, $event);">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-content-cut" md-menu-align-target></md-icon>\n                    Cut\n                </md-button>\n            </md-menu-item>\n            <md-menu-item ng-if="$rootScope.pasteAction">\n                <md-button ng-click="openPaste(entry, $event);">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-content-paste" md-menu-align-target></md-icon>\n                    Paste\n                </md-button>\n            </md-menu-item>\n            <md-menu-item>\n                <md-button ng-click="openDelete(entry, $event);">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-delete" md-menu-align-target></md-icon>\n                    Delete\n                </md-button>\n            </md-menu-item>\n            <md-menu-divider></md-menu-divider>\n            <md-menu-item>\n                <md-button ng-click="ctrl.checkVoicemail()">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-information" md-menu-align-target></md-icon>\n                    Information\n                </md-button>\n            </md-menu-item>\n        </md-menu-content>\n    </md-menu>\n</div>\n')}]),n.exports={templateUrl:i}}),System.registerDynamic("src/components/fileManager/options/options.js",["src/components/fileManager/options/options.html!ng-template"],!0,function(e,t,n){function i(e,t,n,i){e.pasteEntries=n,e.pasteToast=t.show(t.simple().action("Cancel").textContent(sprintf("%s on the clipboard",i(n))).hideDelay(0)),e.pasteToast.then(function(t){"ok"==t&&(e.pasteAction="",e.pasteEntries=[])})}var n=(this||self,angular.module("fmOptions",["ngMaterial","fileManagerApi"]));n.factory("countEntries",function(){return function(e){var t={directory:["directory","directories"],file:["file","files"]},n=_.isArray(e)?e:[e];if(!n.length)return"nothing";for(var i=n[0].type,o=0;o<n.length;o++)if(n[o].type!=i)return sprintf("%d %s and %s",n.length,t.directory[1],t.file[1]);return sprintf("%d %s",n.length,t[i][n.length>1?1:0])}}),n.filter("countEntries",["countEntries",function(e){return function(t){return e(t)}}]),n.factory("DeleteDialog",["$mdDialog","API","countEntries",function(e,t,n){function i(i,a){var r=o;r=r.textContent("Delete "+n(i)),a&&(r=r.targetEvent(a)),this.constructor.prototype.show=function(){e.show(r).then(function(e){t.delete(i,e)})}}var o=e.confirm().title("Are you sure to delete?").ariaLabel("Confirm delete").ok("Delete").cancel("Cancel");return function(e,t){return new i(e,t)}}]),n.factory("RenameDialog",["$mdDialog","API",function(e,t){function n(n,o){var a=i,r=n.isDir?"directory":"file";a=a.title("Rename "+r).initialValue(n.name).textContent("Enter the new "+r+" name.").placeholder(r+" name"),o&&(a=a.targetEvent(o)),this.constructor.prototype.show=function(){e.show(a).then(function(e){t.rename(n,e)})}}var i=e.prompt().ariaLabel("Name").ok("Rename").cancel("Cancel");return function(e,t){return new n(e,t)}}]),n.factory("CopyDialog",["$rootScope","$mdToast","countEntries",function(e,t,n){function o(o){this.constructor.prototype.show=function(){e.pasteAction="copy",i(e,t,o,n)}}return function(e,t){return new o(e,t)}}]),n.factory("MoveDialog",["$rootScope","$mdToast","countEntries",function(e,t,n){function o(o){this.constructor.prototype.show=function(){e.pasteAction="move",i(e,t,o,n)}}return function(e,t){return new o(e,t)}}]),n.factory("PasteDialog",["$rootScope","$timeout","$mdToast","API","countEntries",function(e,t,n,i,o){function a(a){this.constructor.prototype.show=function(){i[e.pasteAction](e.pasteEntries,a),n.hide(e.pasteToast),t(function(){n.show(n.simple().action("Cancel").textContent(sprintf("%s pasted",o(e.pasteEntries))).hideDelay(1500)),e.pasteEntries=[],e.pasteAction=""},1e3)}}return function(e,t){return new a(e,t)}}]),n.directive("options",function(){return{scope:{entry:"=",entries:"="},templateUrl:e("src/components/fileManager/options/options.html!ng-template").templateUrl}}),n.controller("optionsCtrl",["$scope","$rootScope","RenameDialog","DeleteDialog","CopyDialog","MoveDialog","PasteDialog",function(e,t,n,i,o,a,r){function s(t){return _.union(e.entries,[t])}e.$rootScope=t,e.openMenu=function(t,n){console.log(e.entries),t(n)},e.openRename=function(e,t){n(e,t).show()},e.openDelete=function(e,t){i(s(e),t).show()},e.openCopy=function(e,t){o(s(e),t).show()},e.openMove=function(e,t){a(s(e),t).show()},e.openPaste=function(e,t){r(e,t).show()}}])}),System.registerDynamic("src/shared/theme/theme.js",[],!1,function(e,t,n){var i=System.get("@@global-helpers").prepareGlobal(n.id,null,null);return function(e){function t(){return{restrict:"A",require:"^mdSidenav",link:function(e,t,n,i){e.$watch(function(){return i.isOpen()&&!i.isLockedOpen()},function(e){angular.isUndefined(e)||(t.parent().toggleClass("full-height",e),angular.element(document.getElementsByTagName("html")[0]).toggleClass("sidenav-open",e))})}}}e.msSidenavHelperDirective=t,angular.module("app.core",[]),angular.module("app.core").directive("msSidenavHelper",t)}(this),i()}),function(){var e=System.amdDefine;!function(t,n,i){function o(e,t,n){return e.addEventListener?void e.addEventListener(t,n,!1):void e.attachEvent("on"+t,n)}function a(e){if("keypress"==e.type){var t=String.fromCharCode(e.which);return e.shiftKey||(t=t.toLowerCase()),t}return y[e.which]?y[e.which]:b[e.which]?b[e.which]:String.fromCharCode(e.which).toLowerCase()}function r(e,t){return e.sort().join(",")===t.sort().join(",")}function s(e){var t=[];return e.shiftKey&&t.push("shift"),e.altKey&&t.push("alt"),e.ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),t}function l(e){return e.preventDefault?void e.preventDefault():void(e.returnValue=!1)}function c(e){return e.stopPropagation?void e.stopPropagation():void(e.cancelBubble=!0)}function d(e){return"shift"==e||"ctrl"==e||"alt"==e||"meta"==e}function u(){if(!v){v={};for(var e in y)e>95&&e<112||y.hasOwnProperty(e)&&(v[y[e]]=e)}return v}function m(e,t,n){return n||(n=u()[e]?"keydown":"keypress"),"keypress"==n&&t.length&&(n="keydown"),n}function f(e){return"+"===e?["+"]:(e=e.replace(/\+{2}/g,"+plus"),e.split("+"))}function p(e,t){var n,i,o,a=[];for(n=f(e),o=0;o<n.length;++o)i=n[o],w[i]&&(i=w[i]),t&&"keypress"!=t&&k[i]&&(i=k[i],a.push("shift")),d(i)&&a.push(i);return t=m(i,a,t),{key:i,modifiers:a,action:t}}function h(e,t){return null!==e&&e!==n&&(e===t||h(e.parentNode,t))}function g(e){function t(e){e=e||{};var t,n=!1;for(t in k)e[t]?n=!0:k[t]=0;n||(D=!1)}function i(e,t,n,i,o,a){var s,l,c=[],u=n.type;if(!y._callbacks[e])return[];for("keyup"==u&&d(e)&&(t=[e]),s=0;s<y._callbacks[e].length;++s)if(l=y._callbacks[e][s],(i||!l.seq||k[l.seq]==l.level)&&u==l.action&&("keypress"==u&&!n.metaKey&&!n.ctrlKey||r(t,l.modifiers))){var m=!i&&l.combo==o,f=i&&l.seq==i&&l.level==a;(m||f)&&y._callbacks[e].splice(s,1),c.push(l)}return c}function u(e,t,n,i){y.stopCallback(t,t.target||t.srcElement,n,i)||e(t,n)===!1&&(l(t),c(t))}function m(e){"number"!=typeof e.which&&(e.which=e.keyCode);var t=a(e);if(t)return"keyup"==e.type&&w===t?void(w=!1):void y.handleKey(t,s(e),e)}function f(){clearTimeout(b),b=setTimeout(t,1e3)}function h(e,n,i,o){function r(t){return function(){D=t,++k[e],f()}}function s(n){u(i,n,e),"keyup"!==o&&(w=a(n)),setTimeout(t,10)}k[e]=0;for(var l=0;l<n.length;++l){var c=l+1===n.length,d=c?s:r(o||p(n[l+1]).action);v(n[l],d,o,e,l)}}function v(e,t,n,o,a){y._directMap[e+":"+n]=t,e=e.replace(/\s+/g," ");var r,s=e.split(" ");return s.length>1?void h(e,s,t,n):(r=p(e,n),y._callbacks[r.key]=y._callbacks[r.key]||[],i(r.key,r.modifiers,{type:r.action},o,e,a),void y._callbacks[r.key][o?"unshift":"push"]({callback:t,modifiers:r.modifiers,action:r.action,seq:o,level:a,combo:e}))}var y=this;if(e=e||n,!(y instanceof g))return new g(e);y.target=e,y._callbacks={},y._directMap={};var b,k={},w=!1,S=!1,D=!1;y._handleKey=function(e,n,o){var a,r=i(e,n,o),s={},l=0,c=!1;for(a=0;a<r.length;++a)r[a].seq&&(l=Math.max(l,r[a].level));for(a=0;a<r.length;++a)if(r[a].seq){if(r[a].level!=l)continue;c=!0,s[r[a].seq]=1,u(r[a].callback,o,r[a].combo,r[a].seq)}else c||u(r[a].callback,o,r[a].combo);var m="keypress"==o.type&&S;o.type!=D||d(e)||m||t(s),S=c&&"keydown"==o.type},y._bindMultiple=function(e,t,n){for(var i=0;i<e.length;++i)v(e[i],t,n)},o(e,"keypress",m),o(e,"keydown",m),o(e,"keyup",m)}if(t){for(var v,y={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},b={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},k={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},w={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},S=1;S<20;++S)y[111+S]="f"+S;for(S=0;S<=9;++S)y[S+96]=S;g.prototype.bind=function(e,t,n){var i=this;return e=e instanceof Array?e:[e],i._bindMultiple.call(i,e,t,n),i},g.prototype.unbind=function(e,t){var n=this;return n.bind.call(n,e,function(){},t)},g.prototype.trigger=function(e,t){var n=this;return n._directMap[e+":"+t]&&n._directMap[e+":"+t]({},e),n},g.prototype.reset=function(){var e=this;return e._callbacks={},e._directMap={},e},g.prototype.stopCallback=function(e,t){var n=this;return!((" "+t.className+" ").indexOf(" mousetrap ")>-1)&&(!h(t,n.target)&&("INPUT"==t.tagName||"SELECT"==t.tagName||"TEXTAREA"==t.tagName||t.isContentEditable))},g.prototype.handleKey=function(){var e=this;return e._handleKey.apply(e,arguments)},g.addKeycodes=function(e){for(var t in e)e.hasOwnProperty(t)&&(y[t]=e[t]);v=null},g.init=function(){var e=g(n);for(var t in e)"_"!==t.charAt(0)&&(g[t]=function(t){return function(){return e[t].apply(e,arguments)}}(t))},g.init(),t.Mousetrap=g,"undefined"!=typeof module&&module.exports&&(module.exports=g),"function"==typeof e&&e.amd&&e("github:ccampbell/mousetrap@1.6.0/mousetrap.js",[],function(){return g})}}("undefined"!=typeof window?window:null,"undefined"!=typeof window?document:null)}(),function(){var e=System.amdDefine;e("github:ccampbell/mousetrap@1.6.0.js",["github:ccampbell/mousetrap@1.6.0/mousetrap.js"],function(e){return e})}(),System.registerDynamic("github:chieffancypants/angular-hotkeys@1.7.0/src/hotkeys.js",[],!1,function(e,t,n){var i=System.get("@@global-helpers").prepareGlobal(n.id,null,null);return function(e){"format global";!function(){"use strict";angular.module("cfp.hotkeys",[]).provider("hotkeys",["$injector",function(e){this.includeCheatSheet=!0,this.useNgRoute=e.has("ngViewDirective"),this.templateTitle="Keyboard Shortcuts:",this.templateHeader=null,this.templateFooter=null,this.template='<div class="cfp-hotkeys-container fade" ng-class="{in: helpVisible}" style="display: none;"><div class="cfp-hotkeys"><h4 class="cfp-hotkeys-title" ng-if="!header">{{ title }}</h4><div ng-bind-html="header" ng-if="header"></div><table><tbody><tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }"><td class="cfp-hotkeys-keys"><span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span></td><td class="cfp-hotkeys-text">{{ hotkey.description }}</td></tr></tbody></table><div ng-bind-html="footer" ng-if="footer"></div><div class="cfp-hotkeys-close" ng-click="toggleCheatSheet()">&#215;</div></div></div>',this.cheatSheetHotkey="?",this.cheatSheetDescription="Show / hide this help menu",this.$get=["$rootElement","$rootScope","$compile","$window","$document",function(e,t,n,i,o){function a(){g=!1}function r(){g=!0}function s(e){var t={command:"⌘",shift:"⇧",left:"←",right:"→",up:"↑",down:"↓",return:"⏎",backspace:"⌫"};e=e.split("+");for(var n=0;n<e.length;n++)"mod"===e[n]&&(i.navigator&&i.navigator.platform.indexOf("Mac")>=0?e[n]="command":e[n]="ctrl"),e[n]=t[e[n]]||e[n];return e.join(" + ")}function l(e,t,n,i,o,a){this.combo=e instanceof Array?e:[e],this.description=t,this.callback=n,this.action=i,this.allowIn=o,this.persistent=a,this._formated=null}function c(){for(var e=v.hotkeys.length;e--;){var t=v.hotkeys[e];t&&!t.persistent&&m(t)}}function d(){v.helpVisible=!v.helpVisible,v.helpVisible?(S=f("esc"),m("esc"),u("esc",S.description,d,null,["INPUT","SELECT","TEXTAREA"])):(m("esc"),S!==!1&&u(S))}function u(e,t,n,i,o,a){var r,s=["INPUT","SELECT","TEXTAREA"],c=Object.prototype.toString.call(e);if("[object Object]"===c&&(t=e.description,n=e.callback,i=e.action,a=e.persistent,o=e.allowIn,e=e.combo),m(e),t instanceof Function?(i=n,n=t,t="$$undefined$$"):angular.isUndefined(t)&&(t="$$undefined$$"),void 0===a&&(a=!0),"function"==typeof n){r=n,o instanceof Array||(o=[]);for(var d,u=0;u<o.length;u++)o[u]=o[u].toUpperCase(),d=s.indexOf(o[u]),d!==-1&&s.splice(d,1);n=function(e){var t=!0;if(e){var n=e.target||e.srcElement,i=n.nodeName.toUpperCase();if((" "+n.className+" ").indexOf(" mousetrap ")>-1)t=!0;else for(var o=0;o<s.length;o++)if(s[o]===i){t=!1;break}}t&&h(r.apply(this,arguments))}}"string"==typeof i?Mousetrap.bind(e,h(n),i):Mousetrap.bind(e,h(n));var f=new l(e,t,n,i,o,a);return v.hotkeys.push(f),f}function m(e){var t=e instanceof l?e.combo:e;if(Mousetrap.unbind(t),angular.isArray(t)){for(var n=!0,i=t.length;i--;)n=m(t[i])&&n;return n}var o=v.hotkeys.indexOf(f(t));return o>-1&&(v.hotkeys[o].combo.length>1?v.hotkeys[o].combo.splice(v.hotkeys[o].combo.indexOf(t),1):(angular.forEach(y,function(e){var t=e.indexOf(v.hotkeys[o]);t!==-1&&e.splice(t,1)}),v.hotkeys.splice(o,1)),!0)}function f(e){if(!e)return v.hotkeys;for(var t,n=0;n<v.hotkeys.length;n++)if(t=v.hotkeys[n],t.combo.indexOf(e)>-1)return t;return!1}function p(e){return e.$id in y||(y[e.$id]=[],e.$on("$destroy",function(){for(var t=y[e.$id].length;t--;)m(y[e.$id].pop())})),{add:function(t){var n;return n=arguments.length>1?u.apply(this,arguments):u(t),y[e.$id].push(n),this}}}function h(e){return function(n,i){if(e instanceof Array){var o=e[0],a=e[1];e=function(e){a.scope.$eval(o)}}t.$apply(function(){e(n,f(i))})}}var g=!0;Mousetrap.prototype.stopCallback=function(e,t){return!g||!((" "+t.className+" ").indexOf(" mousetrap ")>-1)&&(t.contentEditable&&"true"==t.contentEditable)},l.prototype.format=function(){if(null===this._formated){for(var e=this.combo[0],t=e.split(/[\s]/),n=0;n<t.length;n++)t[n]=s(t[n]);this._formated=t}return this._formated};var v=t.$new();v.hotkeys=[],v.helpVisible=!1,v.title=this.templateTitle,v.header=this.templateHeader,v.footer=this.templateFooter,v.toggleCheatSheet=d;var y={};if(this.useNgRoute&&t.$on("$routeChangeSuccess",function(e,t){c(),t&&t.hotkeys&&angular.forEach(t.hotkeys,function(e){var n=e[2];("string"==typeof n||n instanceof String)&&(e[2]=[n,t]),e[5]=!1,u.apply(this,e)})}),this.includeCheatSheet){var b=o[0],k=e[0],w=angular.element(this.template);u(this.cheatSheetHotkey,this.cheatSheetDescription,d),k!==b&&k!==b.documentElement||(k=b.body),angular.element(k).append(n(w)(v))}var S=!1,D={add:u,del:m,get:f,bindTo:p,template:this.template,toggleCheatSheet:d,includeCheatSheet:this.includeCheatSheet,cheatSheetHotkey:this.cheatSheetHotkey,cheatSheetDescription:this.cheatSheetDescription,useNgRoute:this.useNgRoute,purgeHotkeys:c,templateTitle:this.templateTitle,pause:a,unpause:r};return D}]}]).directive("hotkey",["hotkeys",function(e){return{restrict:"A",link:function(t,n,i){var o,a=[];angular.forEach(t.$eval(i.hotkey),function(t,n){o="string"==typeof i.hotkeyAllowIn?i.hotkeyAllowIn.split(/[\s,]+/):[],a.push(n),e.add({combo:n,description:i.hotkeyDescription,callback:t,action:i.hotkeyAction,allowIn:o})}),n.bind("$destroy",function(){angular.forEach(a,e.del)})}}}]).run(["hotkeys",function(e){}])}()}(this),i()}),System.registerDynamic("src/components/fileManager/views/grid/grid-view.html!github:jamespamplin/plugin-ng-template@0.1.1.js",["angular"],!0,function(e,t,n){var i=(this||self,"src/components/fileManager/views/grid/grid-view.html");e("angular").module("ng").run(["$templateCache",function(e){e.put(i,'<!-- GRID VIEW -->\n<div class="grid-view" layout="column">\n    <div class="folders" layout="row" layout-wrap>\n        <div class="md-background-bg md-hue-2 md-whiteframe-1dp item folder" ng-click="select(folder, true)"\n             ng-repeat="folder in entries | filter:{\'isDir\': true} | filter:global.search"\n             layout="row" layout-align="space-between center">\n            <div layout="row" class="title" layout-align="start center">\n                <span class="file-icon">\n                    <i class="{{folder.icon_class}}"></i>\n                </span>\n                <span class="name" ng-click="navigateTo(folder.path)">{{folder.name}}</span>\n            </div>\n\n            <div class="show-details" hide-gt-md>\n                <md-button class="md-icon-button sidenav-toggle" aria-label="Details" translate translate-attr-aria-label="FM.DETAILS">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-information-outline" ng-click="toggleDetails\n                    (folder)"></md-icon>\n                </md-button>\n            </div>\n        </div>\n\n    </div>\n\n    <div class="files" layout="row" layout-wrap>\n        <div ng-click="select(file, true)" class="md-whiteframe-1dp item file"\n             ng-repeat="file in entries | filter:{\'isDir\': false} | filter:global.search" layout="column">\n            <div class="preview background-{{ file.colorClass }}"\n                 style="background-image: url(\'/.nekumo/thumb{{file.path}}\');">\n            </div>\n\n            <div class="bottom md-background-bg md-hue-2" layout="row" layout-align="space-between center">\n                <div layout="row" class="title" layout-align="start center" flex>\n                    <span class="file-icon">\n                        <i class="{{file.icon_class}}"></i>\n                    </span>\n                    <span class="name" ng-click="navigateTo(file.path)">{{file.name}}</span>\n                </div>\n\n                <div class="show-details" hide-gt-md>\n                    <md-button class="md-icon-button sidenav-toggle" aria-label="Details" translate translate-attr-aria-label="FM.DETAILS">\n                        <md-icon md-font-set="mdi" md-font-icon="mdi-information-outline" ng-click="toggleDetails\n                        (file)"></md-icon>\n                    </md-button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- / GRID VIEW -->')}]),n.exports={templateUrl:i}}),System.registerDynamic("src/components/fileManager/views/list/list-view.html!github:jamespamplin/plugin-ng-template@0.1.1.js",["angular"],!0,function(e,t,n){var i=(this||self,"src/components/fileManager/views/list/list-view.html");e("angular").module("ng").run(["$templateCache",function(e){e.put(i,'<!-- LIST VIEW -->\n<table class="simple list-view">\n    <thead>\n        <tr>\n            <th></th>\n            <th translate="FM.NAME" ng-click="sortBy(\'name\')">Name\n                <reverse-icon ng-if="sortColumn == \'name\'"></reverse-icon></th>\n            <th hide show-gt-md translate="FM.TYPE" ng-click="sortBy(\'type\')">Type\n                <reverse-icon ng-if="sortColumn == \'type\'"></reverse-icon></th>\n            <th hide-xs translate="FM.OWNER" ng-click="sortBy(\'owner\')">Owner\n                <reverse-icon ng-if="sortColumn == \'owner\'"></reverse-icon></th>\n            <th hide-xs translate="FM.SIZE" ng-click="sortBy(\'size\')">Size\n                <reverse-icon ng-if="sortColumn == \'size\'"></reverse-icon></th>\n            <th hide show-gt-md translate="FM.LAST_MODIFIED" ng-click="sortBy(\'modified\')">Last Modified\n                <reverse-icon ng-if="sortColumn == \'modified\'"></reverse-icon></th>\n            <th class="options"></th>\n        </tr>\n    </thead>\n\n    <tbody>\n        <tr ng-repeat="file in entries | filter:global.search | orderBy:[\'-isDir\', columnName]:scope.reverse"\n            ng-click="select(file, true)" ng-class="{\'selected\': file.selected}">\n            <td class="file-icon" ng-click="select(file, false, $event)">\n                <i class="{{ file.icon_class }}" ng-if="!file.selected"></i>\n                <md-checkbox ng-if="file.selected" ng-model="i" aria-label="checkbox"\n                             ng-init="i = true"></md-checkbox>\n            </td>\n            <td class="name"><a ng-click="navigateTo(file.path)" href="#">{{file.name}}</a></td>\n            <td class="type" hide show-gt-md>{{file.type}}</td>\n            <td class="owner" hide-xs>{{file.owner}}</td>\n            <td class="size" hide-xs>{{file.size === \'\' ? \'-\': file.size|humanReadableFileSize }}</td>\n            <td class="last-modified" hide show-gt-md>{{ file.modified|date }}</td>\n            <td class="show-details" hide-gt-md>\n                <md-button class="md-icon-button sidenav-toggle" ng-click="toggleDetails(file)"\n                           aria-label="Details"\n                           translate translate-attr-aria-label="FM.DETAILS">\n                    <md-icon md-font-set="mdi" md-font-icon="mdi-information-outline"></md-icon>\n                </md-button>\n            </td>\n            <td class="options">\n                <options entry="file" entries="entriesSelected"></options>\n            </td>\n        </tr>\n    </tbody>\n</table>\n<!-- / LIST VIEW -->')}]),n.exports={templateUrl:i}}),System.registerDynamic("src/components/fileManager/sidenavs/details/details-sidenav.html!github:jamespamplin/plugin-ng-template@0.1.1.js",["angular"],!0,function(e,t,n){var i=(this||self,"src/components/fileManager/sidenavs/details/details-sidenav.html");e("angular").module("ng").run(["$templateCache",function(e){e.put(i,'<!-- SIDENAV HEADER -->\n<div class="header md-accent-bg" layout="column" layout-align="space-between">\n    <div class="toolbar" layout="row" layout-align="end center">\n        <md-button class="md-icon-button" ng-click="delete()" aria-label="Delete" translate\n                   translate-attr-aria-label="FM.DELETE">\n            <md-icon md-font-set="mdi" md-font-icon="mdi-delete"></md-icon>\n            <md-tooltip><span translate="FM.DELETE">Delete</span></md-tooltip>\n        </md-button>\n\n        <md-button class="md-icon-button" aria-label="Download" translate translate-attr-aria-label="FM.DOWNLOAD">\n            <md-icon md-font-set="mdi" md-font-icon="mdi-download"></md-icon>\n            <md-tooltip><span translate="FM.DOWNLOAD">Download</span></md-tooltip>\n        </md-button>\n\n        <options></options>\n    </div>\n\n    <div>\n        <div class="title">\n            <span ng-if="selected">{{ selected.name }}</span>\n            <span ng-if="entriesSelected.length > 1">{{entriesSelected|countEntries }} selected</span>\n        </div>\n        <div class="subtitle secondary-text">\n            <span translate="FM.EDITED">Edited</span>: {{ selected.modified }}</div>\n    </div>\n</div>\n<!-- / SIDENAV HEADER -->\n\n<!-- SIDENAV CONTENT -->\n<md-content class="content" flex ms-scroll>\n\n    <div class="file-details">\n        <div class="preview file-icon" layout="row" layout-align="center center">\n            <i class="{{ selected.icon_class }} s128" ng-if="entriesSelected.length <= 1"></i>\n            <i class="mdi mdi-comment-processing icon-entries s128" ng-if="entriesSelected.length > 1"></i>\n            <div class="thumb" style="background-image: url(\'/.nekumo/thumb{{ selected.path }}\')"\n                 ng-if="entriesSelected.length <= 1"></div>\n        </div>\n\n        <!-- permisos, bookmark -->\n        <md-chips\n            ng-model="selected.tags"\n            md-removable="true"\n            placeholder="Enter a tag"\n            delete-button-label="Remove Tag"\n            delete-hint="Press delete to remove tag"\n            secondary-placeholder="+Tag"></md-chips>\n\n        <!--\n        <md-list class="offline-switch">\n            <md-list-item>\n                <p translate="FM.AVAILABLE_OFFLINE">Available Offline</p>\n                <md-switch class="md-secondary" ng-model="selected.offline" aria-label="Toggle offline" translate\n                           translate-attr-aria-label="FM.TOOGLE_OFFLINE"></md-switch>\n            </md-list-item>\n        </md-list>\n        -->\n\n        <div class="title" translate="FM.INFO">Info</div>\n\n        <table>\n            <tr class="type">\n                <th translate="FM.TYPE">Type</th>\n                <td>{{ selected.type || "—" }}</td>\n            </tr>\n\n            <tr class="size">\n                <th translate="FM.SIZE" ng-if="entriesSelected.length <= 1">Size</th>\n                <th translate="FM.SIZE" ng-if="entriesSelected.length > 1">Total size</th>\n                <td ng-if="selected">{{ selected.size|humanReadableFileSize }}</td>\n                <td ng-if="entriesSelected.length > 1">{{ totalSize()|humanReadableFileSize }}</td>\n            </tr>\n\n            <!--\n            <tr class="owner">\n                <th translate="FM.OWNER">Owner</th>\n                <td>{{selected.owner}}</td>\n            </tr>\n            -->\n\n            <tr class="modified">\n                <th translate="FM.MODIFIED">Modified</th>\n                <td>{{ (selected.modified|date) || "—" }}</td>\n            </tr>\n\n            <tr class="opened">\n                <th translate="FM.OPENED">Opened</th>\n                <td>{{ (selected.opened|date) || "—" }}</td>\n            </tr>\n\n        </table>\n    </div>\n\n</md-content>\n<!-- / SIDENAV CONTENT -->')}]),n.exports={templateUrl:i}}),System.registerDynamic("src/components/fileManager/file-manager.controller.js",["angular","angular-animate","angular-aria","angular-material","shared/preview/preview","shared/utils/utils","components/fileManager/options/options","shared/theme/theme","shared/fileManagerApi/fileManagerApi","ccampbell/mousetrap","chieffancypants/angular-hotkeys/src/hotkeys","lodash","src/components/fileManager/sidenavs/main/main-sidenav.html!ng-template","src/components/fileManager/views/grid/grid-view.html!ng-template","src/components/fileManager/views/list/list-view.html!ng-template","src/components/fileManager/sidenavs/details/details-sidenav.html!ng-template"],!0,function(e,t,n){this||self;Promise.all([e("angular"),e("angular-animate"),e("angular-aria"),e("angular-material"),e("shared/preview/preview"),e("shared/utils/utils"),e("components/fileManager/options/options"),e("shared/theme/theme"),e("shared/fileManagerApi/fileManagerApi"),e("ccampbell/mousetrap"),e("chieffancypants/angular-hotkeys/src/hotkeys")]).then(function(){var t=angular.module("app.file-manager",["ngMaterial","fileManagerApi","utils","fmOptions","app.core","cfp.hotkeys","preview"]),n=e("lodash");t.config(["$locationProvider",function(e){e.html5Mode(!0).hashPrefix("")}]),t.directive("reverseIcon",function(){return{template:"<span class=\"mdi\" ng-class=\"{'mdi-arrow-up': reverse, 'mdi-arrow-down': !reverse}\"></span>"}}),t.controller("FileManagerController",["$rootScope","$scope","$mdSidenav","$location","API","Entry","hotkeys","$q","$previewGallery",function(t,i,o,a,r,s,l,c,d){function u(){var e=c.defer();return r.details(i.currentDirectory).then(function(t){i.currentDirectoryData=t,e.resolve(t)}),e.promise}function m(e){i.isLoaded=!1,i.entries=[];var t=c.defer();return r.list(e).then(function(e){i.entries=e,i.isLoaded=!0,u().then(function(){i.cleanSelected()}),t.resolve()}),t.promise}function f(e){e=n.trim(e,"/");var t=n.filter(e.split("/"),function(e){return e}),o=[];return angular.forEach(t,function(e,a){o.push(s({path:i.root+n.slice(t,0,a+1).join("/")+"/"}))}),o}i.scope=i,i.fmTemplates={main_sidenav:e("src/components/fileManager/sidenavs/main/main-sidenav.html!ng-template"),grid_view:e("src/components/fileManager/views/grid/grid-view.html!ng-template"),list_view:e("src/components/fileManager/views/list/list-view.html!ng-template"),details_sidenav:e("src/components/fileManager/sidenavs/details/details-sidenav.html!ng-template")},i.root="/",i.breadcrumb=[],i.sortColumn="name",i.reverse=!1,i.accounts={creapond:"johndoe@creapond.com",withinpixels:"johndoe@withinpixels.com"},i.selectedAccount="creapond",i.currentView="list",i.showDetails=!0,i.isLoaded=!1,i.entries=[],i.entriesSelected=null,i.selected=null,i.ctrlPulsed=!1,i.shiftPulsed=!1,i.lastSelected=null,i.previewOptions=null,i.currentDirectory=null,i.currentDirectoryData=null,i.sortBy=function(e){i.reverse=i.sortColumn===e&&!i.reverse,i.sortColumn=e},i.navigateTo=function(e){n.startsWith(e,"/")||(e=i.currentDirectory+e),a.path(e)},i.select=function(e,t,o){function a(e,t){e.selected=!e.selected||t,e.selected?i.entriesSelected.push(e):n.pull(i.entriesSelected,e),i.selected=e}if(t=!i.ctrlPulsed&&!i.shiftPulsed&&t,o&&o.stopPropagation(),t&&i.cleanSelected(),i.shiftPulsed){var r=[i.indexOfEntry(i.lastSelected),i.indexOfEntry(e)].sort();angular.forEach(n.range(r[0],r[1]+1),function(e){a(i.entries[e],!0)})}else a(e);i.lastSelected=e},i.getItemByPath=function(e){return n.find(i.entries,{path:e})},i.indexOfEntry=function(e){return i.entries.indexOf(e)},i.toggleDetails=function(e){i.selected=e,i.toggleSidenav("details-sidenav")},i.toggleSidenav=function(e){o(e).toggle()},i.toggleView=function(){i.currentView="list"===i.currentView?"grid":"list"},i.cleanSelected=function(){angular.forEach(i.entriesSelected,function(e){e.selected=!1}),i.selected=null,i.entriesSelected=[]},i.totalSize=function(e){return e=void 0===e?i.entriesSelected:e,n.sumBy(e,"size")},t.$on("$locationChangeSuccess",function(){function e(){n.endsWith(t,"/")||(a.search("preview"),i.previewOptions=d(i.getItemByPath(t),i.entries),i.previewOptions.closeHandler=function(){i.navigateTo(o),i.previewOptions=null})}var t=a.path()||"/",o=t.slice(0,n.lastIndexOf(t,"/")+1);if(i.previewOptions&&i.previewOptions.close(),t!=o||o!=i.currentDirectory){var r=null;i.currentDirectory!=o&&(i.currentDirectory=o,r=m(o),i.breadcrumb=f(o)),
r?r.then(function(){e()}):e()}}),l.add({combo:"ctrl",description:"Select items off",action:"keyup",callback:function(){i.ctrlPulsed=!1}}),l.add({combo:"ctrl",description:"Select items on",action:"keydown",callback:function(){i.ctrlPulsed=!0}}),l.add({combo:"shift",description:"Select items off",action:"keyup",callback:function(){i.shiftPulsed=!1}}),l.add({combo:"shift",description:"Select items on",action:"keydown",callback:function(){i.shiftPulsed=!0}})}]),t.controller("DetailsSidenavCtrl",["$scope",function(e){e.$watch("entriesSelected",function(){null!=e.entriesSelected&&(e.selected=e.entriesSelected.length>1?null:e.entriesSelected[0]||e.currentDirectoryData)},!0)}])})}),System.registerDynamic("src/shared/utils/utils.js",[],!1,function(e,t,n){var i=System.get("@@global-helpers").prepareGlobal(n.id,null,null);return function(e){var t=e.module,t=angular.module("utils",[]);t.provider("utilsConfig",function(){var e={useDecimalByteSizePrefixes:!1};return{$get:function(){return e},set:function(t){angular.extend(e,t)}}}),t.filter("humanReadableFileSize",["$filter","utilsConfig",function(e,t){var n=[" kB"," MB"," GB"," TB","PB","EB","ZB","YB"],i=["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];return function(e){var o=-1,a=e;do a/=1024,o++;while(a>1024);var r=t.useDecimalByteSizePrefixes?n[o]:i[o];return Math.max(a,.1).toFixed(1)+" "+r}}]),e.module=t}(this),i()}),System.registerDynamic("src/components/fileManager/file-manager.css!github:systemjs/plugin-css@0.1.32.js",[],!1,function(e,t,n){var i=System.get("@@global-helpers").prepareGlobal(n.id,null,null);return function(e){}(this),i()}),System.registerDynamic("src/components/fileManager/options/options.css!github:systemjs/plugin-css@0.1.32.js",[],!1,function(e,t,n){var i=System.get("@@global-helpers").prepareGlobal(n.id,null,null);return function(e){}(this),i()}),System.registerDynamic("src/components/fileManager/manager.js",["angular","shared/nekumo/nekumo","components/fileManager/file-manager.controller","shared/utils/utils","src/shared/theme/theme.css!css","src/components/fileManager/file-manager.css!css","src/components/fileManager/options/options.css!css"],!0,function(e,t,n){this||self;Promise.all([e("angular"),e("shared/nekumo/nekumo"),e("components/fileManager/file-manager.controller"),e("shared/utils/utils"),e("src/shared/theme/theme.css!css"),e("src/components/fileManager/file-manager.css!css"),e("src/components/fileManager/options/options.css!css")]).then(function(){angular.module("fileManager",["nekumo","app.file-manager","utils"])})});