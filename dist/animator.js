function t(t,e){return t(e={exports:{}},e.exports),e.exports}var e=t(function(t){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)}),n=t(function(t){var e=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=e)}),r=function(t){return"object"==typeof t?null!==t:"function"==typeof t},o=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t},a=function(t){try{return!!t()}catch(t){return!0}},u=!a(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),i=e.document,s=r(i)&&r(i.createElement),c=!u&&!a(function(){return 7!=Object.defineProperty(s?i.createElement("div"):{},"a",{get:function(){return 7}}).a}),f=Object.defineProperty,l={f:u?Object.defineProperty:function(t,e,n){if(o(t),e=function(t,e){if(!r(t))return t;var n,o;if("function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}(e),o(n),c)try{return f(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},h=u?function(t,e,n){return l.f(t,e,function(t,e){return{enumerable:!1,configurable:!0,writable:!0,value:e}}(0,n))}:function(t,e,n){return t[e]=n,t},p={}.hasOwnProperty,d=function(t,e){return p.call(t,e)},v=0,y=Math.random(),g=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++v+y).toString(36))},M=t(function(t){var r=e["__core-js_shared__"]||(e["__core-js_shared__"]={});(t.exports=function(t,e){return r[t]||(r[t]=void 0!==e?e:{})})("versions",[]).push({version:n.version,mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),m=M("native-function-to-string",Function.toString),O=t(function(t){var r=g("src"),o=(""+m).split("toString");n.inspectSource=function(t){return m.call(t)},(t.exports=function(t,n,a,u){var i="function"==typeof a;i&&(d(a,"name")||h(a,"name",n)),t[n]!==a&&(i&&(d(a,r)||h(a,r,t[n]?""+t[n]:o.join(String(n)))),t===e?t[n]=a:u?t[n]?t[n]=a:h(t,n,a):(delete t[n],h(t,n,a)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[r]||m.call(this)})}),b=function(t,e,n){if(function(e){if("function"!=typeof t)throw TypeError(t+" is not a function!")}(),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}},w=function(t,r,o){var a,u,i,s,c=t&w.F,f=t&w.G,l=t&w.P,p=t&w.B,d=f?e:t&w.S?e[r]||(e[r]={}):(e[r]||{}).prototype,v=f?n:n[r]||(n[r]={}),y=v.prototype||(v.prototype={});for(a in f&&(o=r),o)i=((u=!c&&d&&void 0!==d[a])?d:o)[a],s=p&&u?b(i,e):l&&"function"==typeof i?b(Function.call,i):i,d&&O(d,a,i,t&w.U),v[a]!=i&&h(v,a,s),l&&y[a]!=i&&(y[a]=i)};e.core=n,w.F=1,w.G=2,w.S=4,w.P=8,w.B=16,w.W=32,w.U=64,w.R=128;var E=w,x={}.toString,I=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==function(t){return x.call(t).slice(8,-1)}(t)?t.split(""):Object(t)},_=Math.ceil,S=Math.floor,j=Math.min,A=(Array,t(function(t){var n=M("wks"),r=e.Symbol,o="function"==typeof r;(t.exports=function(t){return n[t]||(n[t]=o&&r[t]||(o?r:g)("Symbol."+t))}).store=n})),P=(A("species"),A("unscopables")),k=Array.prototype;null==k[P]&&h(k,P,{});var C=!0;function T(t){var e=t.getAttribute("data-guid");return e||(e=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15),t.setAttribute("data-guid",e)),e}"find"in[]&&Array(1).find(function(){C=!1}),E(E.P+E.F*C,"Array",{find:function(t){return function(t,e,n){for(var r,o=Object(function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}(t)),a=I(o),u=b(e,n,3),i=(c=a.length)>0?j(function(t){return isNaN(t=+t)?0:(t>0?S:_)(t)}(c),9007199254740991):0,s=0;i>s;s++)if(u(r=a[s],s,o))return r;var c}(this,t,arguments.length>1?arguments[1]:void 0)}}),k[P].find=!0;var F={easeInQuad:function(t,e,n,r){return n*(t/=r)*t+e},easeOutQuad:function(t,e,n,r){return-n*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,r){return n*(t/=r)*t*t+e},easeOutCubic:function(t,e,n,r){return n*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,r){return n*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,n,r){return-n*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,r){return n*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,n,r){return n*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t*t+e:n/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,r){return-n*Math.cos(t/r*(Math.PI/2))+n+e},easeOutSine:function(t,e,n,r){return n*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,n,r){return-n/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,n,r){return 0==t?e:n*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,n,r){return t==r?e+n:n*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,n,r){return 0==t?e:t==r?e+n:(t/=r/2)<1?n/2*Math.pow(2,10*(t-1))+e:n/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,n,r){return-n*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,n,r){return n*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,n,r){return(t/=r/2)<1?-n/2*(Math.sqrt(1-t*t)-1)+e:n/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,n,r){var o=1.70158,a=0,u=n;return 0==t?e:1==(t/=r)?e+n:(a||(a=.3*r),u<Math.abs(n)?(u=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/u),-u*Math.pow(2,10*(t-=1))*Math.sin((t*r-o)*(2*Math.PI)/a)+e)},easeOutElastic:function(t,e,n,r){var o=1.70158,a=0,u=n;return 0==t?e:1==(t/=r)?e+n:(a||(a=.3*r),u<Math.abs(n)?(u=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/u),u*Math.pow(2,-10*t)*Math.sin((t*r-o)*(2*Math.PI)/a)+n+e)},easeInOutElastic:function(t,e,n,r){var o=1.70158,a=0,u=n;return 0==t?e:2==(t/=r/2)?e+n:(a||(a=r*(.3*1.5)),u<Math.abs(n)?(u=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/u),t<1?u*Math.pow(2,10*(t-=1))*Math.sin((t*r-o)*(2*Math.PI)/a)*-.5+e:u*Math.pow(2,-10*(t-=1))*Math.sin((t*r-o)*(2*Math.PI)/a)*.5+n+e)},easeInBack:function(t,e,n,r,o){return null==o&&(o=1.70158),n*(t/=r)*t*((o+1)*t-o)+e},easeOutBack:function(t,e,n,r,o){return null==o&&(o=1.70158),n*((t=t/r-1)*t*((o+1)*t+o)+1)+e},easeInOutBack:function(t,e,n,r,o){return null==o&&(o=1.70158),(t/=r/2)<1?n/2*(t*t*((1+(o*=1.525))*t-o))+e:n/2*((t-=2)*t*((1+(o*=1.525))*t+o)+2)+e},easeInBounce:function(t,e,n,r){return n-jQuery.easing.easeOutBounce(r-t,0,n,r)+e},easeOutBounce:function(t,e,n,r){return(t/=r)<1/2.75?n*(7.5625*t*t)+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,n,r){return t<r/2?.5*jQuery.easing.easeInBounce(2*t,0,n,r)+e:.5*jQuery.easing.easeOutBounce(2*t-r,0,n,r)+.5*n+e}},B=/^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i,Q=function(t,e,n){var r="string"==typeof t?parseInt(t,10):t;return Math.min(Math.max(r,e),n)},N=function(t,e,n,r,o){return n===e?o:(t-e)*(o-r)/(n-e)+r},R="eb",V="et",L="ec",q="sb",z="st",H="sc",W=[];exports.ELEM_BOTTOM=R,exports.ELEM_TOP=V,exports.ELEM_CENTER=L,exports.SCREEN_BOTTOM=q,exports.SCREEN_TOP=z,exports.SCREEN_CENTER=H,exports.updateAll=function(){W.forEach(function(t){t.updateElements()})},exports.Animator=function(){var t=this,e=[],n=[],r=[],o={},a={},u={},i={},s={width:0,height:0};function c(t){var e=t;return"HTML"===t.tagName&&(e=document.scrollingElement||t),e.scrollTop}function f(t,e,n){if("number"==typeof e)return e;var r=e.match(/([-0-9.]+)(.+)/),o=parseFloat(r[1]);switch(r[2]){case"vh":return o/100*window.innerHeight;case"vw":return o/100*window.innerWidth;case"px":return o;case"%":default:return function(t,e,n){switch(t){case"y":return e/100*n.clientHeight;case"x":default:return e/100*n.clientWidth}}(t,o,n)}}function l(t,n,r,o,a,u){void 0===a&&(a=null),void 0===u&&(u=null);var l=e[o];return a?l=a:l&&!Array.isArray(l)&&(l=l.props),l?l.reduce(function(e,o){var a=Object.assign({},o);delete a.when,a=Object.keys(a).map(function(t){return[t,o[t]]});var l=function(t,e,n){var r=o.when.split("_");if(2!==r.length)throw new Error('Missing parameters in animation "when" (expects: ELEM_SCREEN)');var a,u,f=c(t),l=T(t);switch(r[0]){default:case V:a=e.top-f;break;case L:a=e.top+e.height/2-f;break;case R:a=e.top+e.height-f}switch(r[1]){default:case z:u=i[l]+f;break;case H:u=i[l]+s.height/2+f;break;case q:u=i[l]+s.height+f}return a-u}(t,r);return a.reduce(function(t,r){var o=r[0],a=r[1];return t[o]=e[o]||[],t[o].push([l,f(o,a,u||n)]),t},e)},{}):[]}function h(t,e){var n=Q(e.st,e.startOffset,e.endOffset),r=N(n,e.startOffset,e.endOffset,0,1);return t[e.key]=e.ease?F[e.ease](r,e.startValue,e.endValue-e.startValue,1):N(n,e.startOffset,e.endOffset,e.startValue,e.endValue),t}function p(t){t.style.transform="";var e=window.getComputedStyle(t).getPropertyValue("transform");return"none"!==e?function(t){var e=t.match(B);if(null===e||e.length<7)throw new Error("'"+t+"' is not a matrix");return{a:parseFloat(e[1]),b:parseFloat(e[2]),c:parseFloat(e[3]),d:parseFloat(e[4]),e:parseFloat(e[5]),f:parseFloat(e[6])}}(e):[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function d(t){return e[t]&&e[t].ease||null}function v(t,n){var o=function(t){for(var e=null,n=t;n.parentElement&&!e;)((n=n.parentElement).getAttribute("data-scrollbar")||""===n.getAttribute("data-scrollbar"))&&(e=n);if(!r.find(function(t){return e===t})){var o=T(e);i[o]=n.getBoundingClientRect().top-n.scrollTop,r.push(e)}return e}(n),a=n.getAttribute("data-animator-id"),u=function(t,e){var n=e.getBoundingClientRect(),r=n.top,o=n.height,a=c(t),u=T(t);return{top:r-i[u]+a,height:o}}(o,n);T(n);var s=l(o,n,u,a),f={node:n,context:o,ease:d(a),keyframes:s,keys:Object.keys(s),initialMatrix:p(n)};return t.push(f),t.concat(function(t,n,r,o){return Array.isArray(e[o])?[]:(e[o]&&e[o].children||[]).reduce(function(e,o){return Array.from(n.querySelectorAll(o.selector)).forEach(function(a){var u=l(t,n,r,null,o.props,a);e.push({node:a,context:t,ease:o.ease,keyframes:u,keys:Object.keys(u),initialMatrix:p(a)})}),e},[])}(o,n,u,a))}W.push(this);var y=function(t){var e=T(t),r="HTML"===t.tagName?window:t;o[e]?r.removeEventListener("scroll",o[e]):o[e]=function(){!function(t){var e=T(t),r=c(t);a[e]&&cancelAnimationFrame(a[e]),a[e]=requestAnimationFrame(function(){!function(t,e){n.forEach(function(n){if(n.context===t){var r=function(t,e){var n,r,o,a,u,i,s;return(e.rotation||e.scaleX||e.scaleY||e.x||e.y||e.z)&&(e.transform="matrix3d("+function(t){for(var e,n,r,o,a,u,i,s,c,f,l,h,p,d,v,y,g,M,m,O,b,w,E,x=t[0],I=1;I<t.length;I+=1)r=void 0,O=void 0,b=void 0,w=void 0,E=void 0,a=(e=x)[1],u=e[2],i=e[3],c=e[5],f=e[6],l=e[7],p=e[9],d=e[10],v=e[11],g=e[13],M=e[14],m=e[15],(r=[])[0]=(O=(n=t[I])[0])*(o=e[0])+(b=n[1])*(s=e[4])+(w=n[2])*(h=e[8])+(E=n[3])*(y=e[12]),r[1]=O*a+b*c+w*p+E*g,r[2]=O*u+b*f+w*d+E*M,r[3]=O*i+b*l+w*v+E*m,r[4]=(O=n[4])*o+(b=n[5])*s+(w=n[6])*h+(E=n[7])*y,r[5]=O*a+b*c+w*p+E*g,r[6]=O*u+b*f+w*d+E*M,r[7]=O*i+b*l+w*v+E*m,r[8]=(O=n[8])*o+(b=n[9])*s+(w=n[10])*h+(E=n[11])*y,r[9]=O*a+b*c+w*p+E*g,r[10]=O*u+b*f+w*d+E*M,r[11]=O*i+b*l+w*v+E*m,r[12]=(O=n[12])*o+(b=n[13])*s+(w=n[14])*h+(E=n[15])*y,r[13]=O*a+b*c+w*p+E*g,r[14]=O*u+b*f+w*d+E*M,r[15]=O*i+b*l+w*v+E*m,x=r;return x}([t,(u=e.x||0,i=e.y||0,s=e.z||0,[1,0,0,0,0,1,0,0,0,0,1,0,u,i,s,1]),(a=e.rotation||0,[Math.cos(a),-Math.sin(a),0,0,Math.sin(a),Math.cos(a),0,0,0,0,1,0,0,0,0,1]),(n=e.scaleX||1,r=e.scaleY||1,o=e.scaleZ||1,[n,0,0,0,0,r,0,0,0,0,o,0,0,0,0,1])]).join(",")+")"),delete e.rotation,delete e.scaleX,delete e.scaleY,delete e.x,delete e.y,delete e.z,e}(n.initialMatrix,function(t,e){return t.keys.map(function(n){return t.keyframes[n].reduce(function(r,o){var a=o[0],u=o[1];return(void 0===r.startOffset||e>=a)&&(r.startOffset=a,r.startValue=u,r.endOffset<=r.startOffset&&(r.endOffset=a,r.endValue=u)),(void 0===r.endOffset||e<=a)&&(r.endOffset=a,r.endValue=u),Object.assign({},{st:e,ease:t.ease,key:n},r)},{})}).reduce(h,{})}(n,e)),o=T(n.node);(function(t,e){return!u[t]||u[t]!==JSON.stringify(e)})(o,r)&&(Object.assign(n.node.style,r),u[o]=r)}})}(t,r)})}(t)},r.addEventListener("scroll",o[e]),o[e](t)};this.updateElements=function(){r=[],s.width=window.innerWidth,s.height=window.innerHeight;var t=document.querySelectorAll("[data-animator-id]");n=Array.from(t).reduce(v,[]),r.forEach(y)},this.setAnimations=function(n){e=n,t.updateElements()},this.debug=function(){console.log("animations",e),console.log("elements",n),console.log("contexts",r)}};
//# sourceMappingURL=animator.js.map
