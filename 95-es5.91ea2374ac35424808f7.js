function _defineProperty(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{pcpd:function(t,e,o){"use strict";o.r(e),o.d(e,"iosTransitionAnimation",(function(){return d})),o.d(e,"shadow",(function(){return c})),o("xLjI"),o("AfW+"),o("aiEM");var a=o("BS79"),n=(o("kBU6"),o("7vAB")),r=function(t){return document.querySelector("".concat(t,".ion-cloned-element"))},c=function(t){return t.shadowRoot||t},l=function(t){return t.querySelector("ion-header:not(.header-collapse-condense-inactive) ion-title[size=large]")},s=function(t,e){var o=t.querySelectorAll("ion-buttons"),a=!0,n=!1,r=void 0;try{for(var c,l=o[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var s=c.value,i=s.closest("ion-header"),f=i&&!i.classList.contains("header-collapse-condense-inactive"),d=s.querySelector("ion-back-button"),m=s.classList.contains("buttons-collapse"),p="start"===s.slot||""===s.slot;if(null!==d&&p&&(m&&f&&e||!m))return d}}catch(y){n=!0,r=y}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return null},i=function(t,e,o,n,l,s){var i=e?"calc(100% - ".concat(s.right+4,"px)"):"".concat(s.left-4,"px"),f=e?"7px":"-7px",d=e?"-4px":"4px",m=e?"-4px":"4px",p=e?"right":"left",y=e?"left":"right",u=[{offset:0,opacity:0,transform:"translate3d(".concat(f,", ").concat(l.top-40,"px, 0) scale(2.1)")},{offset:1,opacity:1,transform:"translate3d(".concat(d,", ").concat(s.top-46,"px, 0) scale(1)")}],b=[{offset:0,opacity:1,transform:"translate3d(".concat(d,", ").concat(s.top-46,"px, 0) scale(1)")},{offset:.6,opacity:0},{offset:1,opacity:0,transform:"translate3d(".concat(f,", ").concat(l.top-40,"px, 0) scale(2.1)")}],S=o?b:u,v=[{offset:0,opacity:0,transform:"translate3d(".concat(m,", ").concat(s.top-41,"px, 0) scale(0.6)")},{offset:1,opacity:1,transform:"translate3d(".concat(m,", ").concat(s.top-46,"px, 0) scale(1)")}],x=[{offset:0,opacity:1,transform:"translate3d(".concat(m,", ").concat(s.top-46,"px, 0) scale(1)")},{offset:.2,opacity:0,transform:"translate3d(".concat(m,", ").concat(s.top-41,"px, 0) scale(0.6)")},{offset:1,opacity:0,transform:"translate3d(".concat(m,", ").concat(s.top-41,"px, 0) scale(0.6)")}],T=o?x:v,g=Object(a.a)(),h=Object(a.a)(),E=r("ion-back-button"),A=c(E).querySelector(".button-text"),q=c(E).querySelector("ion-icon");E.text=n.text,E.mode=n.mode,E.icon=n.icon,E.color=n.color,E.disabled=n.disabled,E.style.setProperty("display","block"),E.style.setProperty("position","fixed"),h.addElement(q),g.addElement(A),g.beforeStyles({"transform-origin":"".concat(p," center")}).beforeAddWrite((function(){n.style.setProperty("display","none"),E.style.setProperty(p,i)})).afterAddWrite((function(){n.style.setProperty("display",""),E.style.setProperty("display","none"),E.style.removeProperty(p)})).keyframes(S),h.beforeStyles({"transform-origin":"".concat(y," center")}).keyframes(T),t.addAnimation([g,h])},f=function(t,e,o,n,c,l){var s=e?"calc(100% - ".concat(n.right,"px)"):"".concat(n.left,"px"),i=e?"-18px":"18px",f=e?"right":"left",d=[{offset:0,opacity:0,transform:"translate3d(".concat(i,", ").concat(l.top-4,"px, 0) scale(0.49)")},{offset:.1,opacity:0},{offset:1,opacity:1,transform:"translate3d(0, ".concat(c.top-2,"px, 0) scale(1)")}],m=[{offset:0,opacity:.99,transform:"translate3d(0, ".concat(c.top-2,"px, 0) scale(1)")},{offset:.6,opacity:0},{offset:1,opacity:0,transform:"translate3d(".concat(i,", ").concat(l.top-4,"px, 0) scale(0.5)")}],p=o?d:m,y=r("ion-title"),u=Object(a.a)();y.innerText=n.innerText,y.size=n.size,y.color=n.color,u.addElement(y),u.beforeStyles(_defineProperty({"transform-origin":"".concat(f," center"),height:"46px",display:"",position:"relative"},f,s)).beforeAddWrite((function(){n.style.setProperty("display","none")})).afterAddWrite((function(){n.style.setProperty("display",""),y.style.setProperty("display","none")})).keyframes(p),t.addAnimation(u)},d=function(t,e){try{var o="opacity",r="rtl"===t.ownerDocument.dir,d=r?"-99.5%":"99.5%",m=r?"33%":"-33%",p=e.enteringEl,y=e.leavingEl,u="back"===e.direction,b=p.querySelector(":scope > ion-content"),S=p.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),v=p.querySelectorAll(":scope > ion-header > ion-toolbar"),x=Object(a.a)(),T=Object(a.a)();if(x.addElement(p).duration(e.duration||540).easing(e.easing||"cubic-bezier(0.32,0.72,0,1)").fill("both").beforeRemoveClass("ion-page-invisible"),y&&t){var g=Object(a.a)();g.addElement(t),x.addAnimation(g)}if(b||0!==v.length||0!==S.length?(T.addElement(b),T.addElement(S)):T.addElement(p.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),x.addAnimation(T),u?T.beforeClearStyles([o]).fromTo("transform","translateX(".concat(m,")"),"translateX(".concat("0%",")")).fromTo(o,.8,1):T.beforeClearStyles([o]).fromTo("transform","translateX(".concat(d,")"),"translateX(".concat("0%",")")),b){var h=c(b).querySelector(".transition-effect");if(h){var E=h.querySelector(".transition-cover"),A=h.querySelector(".transition-shadow"),q=Object(a.a)(),X=Object(a.a)(),j=Object(a.a)();q.addElement(h).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),X.addElement(E).beforeClearStyles([o]).fromTo(o,0,.1),j.addElement(A).beforeClearStyles([o]).fromTo(o,.03,.7),q.addAnimation([X,j]),T.addAnimation([q])}}var O=p.querySelector("ion-header.header-collapse-condense"),C=function(t,e,o,a,n){var r=s(a,o),c=l(n),d=l(a),m=s(n,o),p=null!==r&&null!==c&&!o,y=null!==d&&null!==m&&o;if(p){var u=c.getBoundingClientRect(),b=r.getBoundingClientRect();f(t,e,o,c,u,b),i(t,e,o,r,u,b)}else if(y){var S=d.getBoundingClientRect(),v=m.getBoundingClientRect();f(t,e,o,d,S,v),i(t,e,o,m,S,v)}return{forward:p,backward:y}}(x,r,u,p,y),k=C.forward,w=C.backward;if(v.forEach((function(t){var e=Object(a.a)();e.addElement(t),x.addAnimation(e);var n=Object(a.a)();n.addElement(t.querySelector("ion-title"));var l,s=Object(a.a)(),i=Array.from(t.querySelectorAll("ion-buttons,[menuToggle]")),f=t.closest("ion-header"),p=f&&f.classList.contains("header-collapse-condense-inactive");l=u?i.filter((function(t){var e=t.classList.contains("buttons-collapse");return e&&!p||!e})):i.filter((function(t){return!t.classList.contains("buttons-collapse")})),s.addElement(l);var y=Object(a.a)();y.addElement(t.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));var b=Object(a.a)();b.addElement(c(t).querySelector(".toolbar-background"));var S=Object(a.a)(),v=t.querySelector("ion-back-button");if(v&&S.addElement(v),e.addAnimation([n,s,y,b,S]),s.fromTo(o,.01,1),y.fromTo(o,.01,1),u)p||n.fromTo("transform","translateX(".concat(m,")"),"translateX(".concat("0%",")")).fromTo(o,.01,1),y.fromTo("transform","translateX(".concat(m,")"),"translateX(".concat("0%",")")),S.fromTo(o,.01,1);else if(O||n.fromTo("transform","translateX(".concat(d,")"),"translateX(".concat("0%",")")).fromTo(o,.01,1),y.fromTo("transform","translateX(".concat(d,")"),"translateX(".concat("0%",")")),b.beforeClearStyles([o]).fromTo(o,.01,1),k||S.fromTo(o,.01,1),v&&!k){var T=Object(a.a)();T.addElement(c(v).querySelector(".button-text")).fromTo("transform",r?"translateX(-100px)":"translateX(100px)","translateX(0px)"),e.addAnimation(T)}})),y){var P=Object(a.a)(),L=y.querySelector(":scope > ion-content");if(P.addElement(L),P.addElement(y.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),x.addAnimation(P),u){P.beforeClearStyles([o]).fromTo("transform","translateX(".concat("0%",")"),r?"translateX(-100%)":"translateX(100%)");var B=Object(n.b)(y);x.afterAddWrite((function(){"normal"===x.getDirection()&&B.style.setProperty("display","none")}))}else P.fromTo("transform","translateX(".concat("0%",")"),"translateX(".concat(m,")")).fromTo(o,1,.8);if(L){var R=c(L).querySelector(".transition-effect");if(R){var W=R.querySelector(".transition-cover"),z=R.querySelector(".transition-shadow"),D=Object(a.a)(),J=Object(a.a)(),_=Object(a.a)();D.addElement(R).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),J.addElement(W).beforeClearStyles([o]).fromTo(o,.1,0),_.addElement(z).beforeClearStyles([o]).fromTo(o,.7,.03),D.addAnimation([J,_]),P.addAnimation([D])}}y.querySelectorAll(":scope > ion-header > ion-toolbar").forEach((function(t){var e=Object(a.a)();e.addElement(t);var n=Object(a.a)();n.addElement(t.querySelector("ion-title"));var l=Object(a.a)(),s=t.querySelectorAll("ion-buttons,[menuToggle]"),i=t.closest("ion-header"),f=i&&i.classList.contains("header-collapse-condense-inactive"),d=Array.from(s).filter((function(t){var e=t.classList.contains("buttons-collapse");return e&&!f||!e}));l.addElement(d);var p=Object(a.a)(),y=t.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");y.length>0&&p.addElement(y);var b=Object(a.a)();b.addElement(c(t).querySelector(".toolbar-background"));var S=Object(a.a)(),v=t.querySelector("ion-back-button");if(v&&S.addElement(v),e.addAnimation([n,l,p,S,b]),x.addAnimation(e),S.fromTo(o,.99,0),l.fromTo(o,.99,0),p.fromTo(o,.99,0),u){if(f||n.fromTo("transform","translateX(".concat("0%",")"),r?"translateX(-100%)":"translateX(100%)").fromTo(o,.99,0),p.fromTo("transform","translateX(".concat("0%",")"),r?"translateX(-100%)":"translateX(100%)"),b.beforeClearStyles([o]).fromTo(o,1,.01),v&&!w){var T=Object(a.a)();T.addElement(c(v).querySelector(".button-text")).fromTo("transform","translateX(".concat("0%",")"),"translateX(".concat((r?-124:124)+"px",")")),e.addAnimation(T)}}else f||n.fromTo("transform","translateX(".concat("0%",")"),"translateX(".concat(m,")")).fromTo(o,.99,0).afterClearStyles(["transform",o]),p.fromTo("transform","translateX(".concat("0%",")"),"translateX(".concat(m,")")).afterClearStyles(["transform",o]),S.afterClearStyles([o]),n.afterClearStyles([o]),l.afterClearStyles([o])}))}return x}catch(I){throw I}}}}]);