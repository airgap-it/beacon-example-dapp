(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"/joy":function(n,t,i){"use strict";i.r(t),i.d(t,"ion_back_button",(function(){return r}));var o=i("xLjI"),a=i("AfW+"),e=i("Dl6n");const r=class{constructor(n){Object(o.k)(this,n),this.mode=Object(o.e)(this),this.disabled=!1,this.type="button",this.onClick=async n=>{const t=this.el.closest("ion-nav");return n.preventDefault(),t&&await t.canGoBack()?t.pop({skipIfBusy:!0}):Object(e.d)(this.defaultHref,n,"back")}}get backButtonIcon(){const n=this.icon;return null!=n?n:"ios"===this.mode?a.b.get("backButtonIcon","chevron-back"):a.b.get("backButtonIcon","arrow-back-sharp")}get backButtonText(){const n="ios"===this.mode?"Back":null;return null!=this.text?this.text:a.b.get("backButtonText",n)}get hasIconOnly(){return this.backButtonIcon&&!this.backButtonText}get rippleType(){return this.hasIconOnly?"unbounded":"bounded"}render(){const{color:n,defaultHref:t,disabled:i,type:a,mode:r,hasIconOnly:s,backButtonIcon:d,backButtonText:c}=this,g=void 0!==t;return Object(o.i)(o.a,{onClick:this.onClick,class:Object.assign(Object.assign({},Object(e.a)(n)),{[r]:!0,button:!0,"back-button-disabled":i,"back-button-has-icon-only":s,"ion-activatable":!0,"ion-focusable":!0,"show-back-button":g})},Object(o.i)("button",{type:a,disabled:i,class:"button-native",part:"button"},Object(o.i)("span",{class:"button-inner"},d&&Object(o.i)("ion-icon",{icon:d,lazy:!1,part:"icon"}),c&&Object(o.i)("span",{class:"button-text",part:"text"},c)),"md"===r&&Object(o.i)("ion-ripple-effect",{type:this.rippleType})))}get el(){return Object(o.f)(this)}static get style(){return":host{--background:transparent;--color-focused:var(--color);--color-hover:var(--color);--icon-margin-top:0;--icon-margin-bottom:0;--icon-padding-top:0;--icon-padding-end:0;--icon-padding-bottom:0;--icon-padding-start:0;--margin-top:0;--margin-end:0;--margin-bottom:0;--margin-start:0;--min-width:auto;--min-height:auto;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--opacity:1;--ripple-color:currentColor;--transition:background-color,opacity 100ms linear;display:none;min-width:var(--min-width);min-height:var(--min-height);color:var(--color);font-family:var(--ion-font-family,inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-font-kerning:none;font-kerning:none}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.show-back-button){display:block}:host(.back-button-disabled){cursor:default;opacity:.5;pointer-events:none}.button-native{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;min-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;opacity:var(--opacity);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}ion-icon{padding-left:var(--icon-padding-start);padding-right:var(--icon-padding-end);padding-top:var(--icon-padding-top);padding-bottom:var(--icon-padding-bottom);margin-left:var(--icon-margin-start);margin-right:var(--icon-margin-end);margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:inherit;font-size:var(--icon-font-size);font-weight:var(--icon-font-weight);pointer-events:none}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){ion-icon{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--icon-padding-start);padding-inline-start:var(--icon-padding-start);-webkit-padding-end:var(--icon-padding-end);padding-inline-end:var(--icon-padding-end);margin-left:unset;margin-right:unset;-webkit-margin-start:var(--icon-margin-start);margin-inline-start:var(--icon-margin-start);-webkit-margin-end:var(--icon-margin-end);margin-inline-end:var(--icon-margin-end)}}@media (any-hover:hover){:host(:hover) .button-native{background:var(--background-hover);color:var(--color-hover)}}:host(.ion-focused) .button-native{background:var(--background-focused);color:var(--color-focused)}@media (any-hover:hover){:host(.ion-color:hover) .button-native{color:var(--ion-color-base)}}:host(.ion-color.ion-focused) .button-native{color:var(--ion-color-base)}:host-context(ion-toolbar:not(.ion-color)):not(.ion-color){color:var(--ion-toolbar-color,var(--color))}:host{--border-radius:4px;--background-focused:rgba(66,66,66,0.24);--background-hover:rgba(66,66,66,0.08);--color:currentColor;--icon-margin-end:0;--icon-margin-start:0;--icon-font-size:24px;--icon-font-weight:normal;--min-height:32px;--min-width:44px;--padding-start:12px;--padding-end:12px;font-size:14px;font-weight:500;text-transform:uppercase}:host(.back-button-has-icon-only){--border-radius:50%;min-width:48px;height:48px}.button-native{-webkit-box-shadow:none;box-shadow:none}.button-text{padding-left:4px;padding-right:4px;padding-top:0;padding-bottom:0}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-text{padding-left:unset;padding-right:unset;-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px}}ion-icon{line-height:.67;text-align:start}@media (any-hover:hover){:host(.ion-color:hover) .button-native{background:rgba(var(--ion-color-base-rgb),.08)}}:host(.ion-color.ion-focused) .button-native{background:rgba(var(--ion-color-base-rgb),.24)}"}}}}]);