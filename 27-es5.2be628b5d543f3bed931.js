function _defineProperty(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,o){return e&&_defineProperties(t.prototype,e),o&&_defineProperties(t,o),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{fSmE:function(t,e,o){"use strict";o.r(e),o.d(e,"ion_backdrop",(function(){return r}));var n=o("54nT"),a=(o("AfW+"),o("aiEM")),i=o("AzGJ"),r=function(){function t(e){_classCallCheck(this,t),Object(n.k)(this,e),this.lastClick=-1e4,this.blocker=i.GESTURE_CONTROLLER.createBlocker({disableScroll:!0}),this.visible=!0,this.tappable=!0,this.stopPropagation=!0,this.ionBackdropTap=Object(n.e)(this,"ionBackdropTap",7)}return _createClass(t,[{key:"connectedCallback",value:function(){this.stopPropagation&&this.blocker.block()}},{key:"disconnectedCallback",value:function(){this.blocker.unblock()}},{key:"onTouchStart",value:function(t){this.lastClick=Object(a.i)(t),this.emitTap(t)}},{key:"onMouseDown",value:function(t){this.lastClick<Object(a.i)(t)-2500&&this.emitTap(t)}},{key:"emitTap",value:function(t){this.stopPropagation&&(t.preventDefault(),t.stopPropagation()),this.tappable&&this.ionBackdropTap.emit()}},{key:"render",value:function(){var t,e=Object(n.d)(this);return Object(n.i)(n.a,{tabindex:"-1",class:(t={},_defineProperty(t,e,!0),_defineProperty(t,"backdrop-hide",!this.visible),_defineProperty(t,"backdrop-no-tappable",!this.tappable),t)})}}],[{key:"style",get:function(){return":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color,#000)}"}}]),t}()}}]);