function t(t){var e=t.getAttribute("data-guid");return e||(e=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15),t.setAttribute("data-guid",e)),e}var e={easeInQuad:function(t,e,n,r){return n*(t/=r)*t+e},easeOutQuad:function(t,e,n,r){return-n*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,r){return n*(t/=r)*t*t+e},easeOutCubic:function(t,e,n,r){return n*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,r){return n*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,n,r){return-n*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,r){return n*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,n,r){return n*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t*t+e:n/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,r){return-n*Math.cos(t/r*(Math.PI/2))+n+e},easeOutSine:function(t,e,n,r){return n*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,n,r){return-n/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,n,r){return 0==t?e:n*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,n,r){return t==r?e+n:n*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,n,r){return 0==t?e:t==r?e+n:(t/=r/2)<1?n/2*Math.pow(2,10*(t-1))+e:n/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,n,r){return-n*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,n,r){return n*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,n,r){return(t/=r/2)<1?-n/2*(Math.sqrt(1-t*t)-1)+e:n/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,n,r){var a=1.70158,i=0,u=n;return 0==t?e:1==(t/=r)?e+n:(i||(i=.3*r),u<Math.abs(n)?(u=n,a=i/4):a=i/(2*Math.PI)*Math.asin(n/u),-u*Math.pow(2,10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/i)+e)},easeOutElastic:function(t,e,n,r){var a=1.70158,i=0,u=n;return 0==t?e:1==(t/=r)?e+n:(i||(i=.3*r),u<Math.abs(n)?(u=n,a=i/4):a=i/(2*Math.PI)*Math.asin(n/u),u*Math.pow(2,-10*t)*Math.sin((t*r-a)*(2*Math.PI)/i)+n+e)},easeInOutElastic:function(t,e,n,r){var a=1.70158,i=0,u=n;return 0==t?e:2==(t/=r/2)?e+n:(i||(i=r*(.3*1.5)),u<Math.abs(n)?(u=n,a=i/4):a=i/(2*Math.PI)*Math.asin(n/u),t<1?u*Math.pow(2,10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/i)*-.5+e:u*Math.pow(2,-10*(t-=1))*Math.sin((t*r-a)*(2*Math.PI)/i)*.5+n+e)},easeInBack:function(t,e,n,r,a){return null==a&&(a=1.70158),n*(t/=r)*t*((a+1)*t-a)+e},easeOutBack:function(t,e,n,r,a){return null==a&&(a=1.70158),n*((t=t/r-1)*t*((a+1)*t+a)+1)+e},easeInOutBack:function(t,e,n,r,a){return null==a&&(a=1.70158),(t/=r/2)<1?n/2*(t*t*((1+(a*=1.525))*t-a))+e:n/2*((t-=2)*t*((1+(a*=1.525))*t+a)+2)+e},easeInBounce:function(t,e,n,r){return n-jQuery.easing.easeOutBounce(r-t,0,n,r)+e},easeOutBounce:function(t,e,n,r){return(t/=r)<1/2.75?n*(7.5625*t*t)+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,n,r){return t<r/2?.5*jQuery.easing.easeInBounce(2*t,0,n,r)+e:.5*jQuery.easing.easeOutBounce(2*t-r,0,n,r)+.5*n+e}};function n(t,e,n){return[1,0,0,0,0,1,0,0,0,0,1,0,t,e,n,1]}function r(t,e,n){return[t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1]}function a(t){return[Math.cos(t),-Math.sin(t),0,0,Math.sin(t),Math.cos(t),0,0,0,0,1,0,0,0,0,1]}function i(t){for(var e,n,r,a,i,u,o,s,c,f,l,d,h,v,M,p,g,m,y,O,x,b,I,w=t[0],E=1;E<t.length;E+=1)r=void 0,O=void 0,x=void 0,b=void 0,I=void 0,i=(e=w)[1],u=e[2],o=e[3],c=e[5],f=e[6],l=e[7],h=e[9],v=e[10],M=e[11],g=e[13],m=e[14],y=e[15],(r=[])[0]=(O=(n=t[E])[0])*(a=e[0])+(x=n[1])*(s=e[4])+(b=n[2])*(d=e[8])+(I=n[3])*(p=e[12]),r[1]=O*i+x*c+b*h+I*g,r[2]=O*u+x*f+b*v+I*m,r[3]=O*o+x*l+b*M+I*y,r[4]=(O=n[4])*a+(x=n[5])*s+(b=n[6])*d+(I=n[7])*p,r[5]=O*i+x*c+b*h+I*g,r[6]=O*u+x*f+b*v+I*m,r[7]=O*o+x*l+b*M+I*y,r[8]=(O=n[8])*a+(x=n[9])*s+(b=n[10])*d+(I=n[11])*p,r[9]=O*i+x*c+b*h+I*g,r[10]=O*u+x*f+b*v+I*m,r[11]=O*o+x*l+b*M+I*y,r[12]=(O=n[12])*a+(x=n[13])*s+(b=n[14])*d+(I=n[15])*p,r[13]=O*i+x*c+b*h+I*g,r[14]=O*u+x*f+b*v+I*m,r[15]=O*o+x*l+b*M+I*y,w=r;return w}var u=function(t,e,n){var r="string"==typeof t?parseInt(t,10):t;return Math.min(Math.max(r,e),n)},o=function(t,e,n,r,a){return n===e?a:(t-e)*(a-r)/(n-e)+r},s="eb",c="et",f="ec",l="sb",d="st",h="sc",v=[];function M(){v.forEach(function(t){t.updateElements()})}var p,g=function(){(p={}).st=0,p.sc=window.innerHeight/2,p.sb=window.innerHeight};function m(t,e){return void 0===e&&(e=0),void 0!==t?t:e}function y(){var l=this,d=[],h=[],M=[],y={},O={},x={},b={};function I(t){var e=t;return"HTML"===t.tagName&&(e=document.scrollingElement||t),e.scrollTop}function w(t,e,n){if("number"==typeof e)return e;var r=e.match(/([-0-9.]+)(.+)/),a=parseFloat(r[1]);switch(r[2]){case"vh":return a/100*window.innerHeight;case"vw":return a/100*window.innerWidth;case"px":return a;case"%":default:return function(t,e,n){switch(t){case"y":return e/100*n.clientHeight;case"x":default:return e/100*n.clientWidth}}(t,a,n)}}function E(t,e,n,r,a,i){void 0===a&&(a=null),void 0===i&&(i=null);var u=d[r];return a?u=a:u&&!Array.isArray(u)&&(u=u.props),u?u.reduce(function(t,r){var a=Object.assign({},r);delete a.when,a=Object.keys(a).map(function(t){return[t,r[t]]});var u=function(t,e,n){var a,i=r.when.split("_");if(2!==i.length)throw new Error('Missing parameters in animation "when" (expects: ELEM_* | SCREEN_*)');switch(i[0]){default:case c:a=e.top;break;case f:a=e.top+e.height/2;break;case s:a=e.top+e.height}return a-p[i[1]]}(0,n);return a.reduce(function(n,r){var a=r[0],o=r[1];return n[a]=t[a]||[],n[a].push([u,w(a,o,i||e)]),n},t)},{}):{}}function k(t,n){var r=u(n.st,n.startOffset,n.endOffset),a=o(r,n.startOffset,n.endOffset,0,1);return t[n.key]=n.ease?e[n.ease](a,n.startValue,n.endValue-n.startValue,1):o(r,n.startOffset,n.endOffset,n.startValue,n.endValue),t}function A(t,e){return t.keys.map(function(n){return Object.assign({},{st:e,ease:t.ease,key:n},t.keyframes[n].reduce(function(t,e,n){var r=e[0],a=e[1];switch(n){case 0:t.startOffset=r,t.startValue=a;break;case 1:default:t.endOffset=r,t.endValue=a}return t},{}))}).reduce(k,{})}function Q(t){if(void 0!==t.rotation||void 0!==t.scaleX||void 0!==t.scaleY||void 0!==t.x||void 0!==t.y||void 0!==t.z){var e="translate("+m(t.x,0)+"px, "+m(t.y,0)+"px)",n="rotate("+m(t.rotation,0)+"deg)",r="scale("+m(t.scaleX,1)+", "+m(t.scaleY,1)+")";t.transform=e+" "+n+" "+r}return delete t.rotation,delete t.scaleX,delete t.scaleY,delete t.x,delete t.y,delete t.z,t}function j(t,e){void 0===e&&(e=!1);var u=t.style.transform;t.style.transform="";var o=window.getComputedStyle(t).getPropertyValue("transform");if(t.style.transform=u,"none"===o)return null;var s=o.replace(/matrix(?:3d)?\(/i,"").replace(")","").split(",").map(function(t){return parseFloat(t.trim())});return s.length<16&&e?function(t){return 16===t.length?t:i([[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],n(t[4],t[5],0),a(0),r(t[0],t[3],1)])}(s):s}function B(t){return d[t]&&d[t].ease||null}function P(t){return d[t]&&d[t].force3d||!1}function S(e,n){var r=function(e){for(var n=null,r=e;r.parentElement&&!n;)((r=r.parentElement).getAttribute("data-scrollbar")||""===r.getAttribute("data-scrollbar"))&&(n=r);if(!M.find(function(t){return n===t})){var a=t(n);b[a]=r.getBoundingClientRect().top+r.scrollTop,M.push(n)}return n}(n),a=n.getAttribute("data-animator-id"),i=function(e,n){var r=n.getAttribute("style");n.setAttribute("style","");var a=n.getBoundingClientRect(),i=a.top,u=a.height,o=I(e),s=t(e);return n.setAttribute("style",r),{top:i-b[s]+o,height:u}}(r,n);t(n);var u=E(0,n,i,a),o={node:n,context:r,is3DMatrix:P(a),ease:B(a),keyframes:u,keys:Object.keys(u),initialMatrix:j(n,P(a))};return e.push(o),e.concat(function(t,e,n,r){return Array.isArray(d[r])?[]:(d[r]&&d[r].children||[]).reduce(function(a,i){return Array.from(e.querySelectorAll(i.selector)).forEach(function(u){var o=E(0,e,n,null,i.props,u);a.push({node:u,parent:e,context:t,ease:i.ease,is3DMatrix:P(r),keyframes:o,keys:Object.keys(o),initialMatrix:j(u,P(r))})}),a},[])}(r,n,i,a))}v.push(this);var C=function(e){var u=t(e),o="HTML"===e.tagName?window:e;y[u]?o.removeEventListener("scroll",y[u]):y[u]=function(){!function(e){var u=t(e),o=I(e);O[u]&&cancelAnimationFrame(O[u]),O[u]=requestAnimationFrame(function(){!function(e,u){h.forEach(function(o){if(o.context===e&&0!==Object.keys(o.keyframes).length){var s=null;if(~o.node.namespaceURI.indexOf("svg"))s=Q(A(o,u));else if(o.is3DMatrix||o.initialMatrix&&16===o.initialMatrix.length)s=function(t,e){return void 0===e.rotation&&void 0===e.scaleX&&void 0===e.scaleY&&void 0===e.x&&void 0===e.y&&void 0===e.z||(e.transform="matrix3d("+i([t,n(m(e.x),m(e.y),m(e.z)),a(m(e.rotation)),r(m(e.scaleX,1),m(e.scaleY,1),m(e.scaleZ,1))]).join(",")+")"),delete e.rotation,delete e.scaleX,delete e.scaleY,delete e.x,delete e.y,delete e.z,e}(o.initialMatrix,A(o,u));else if((s=Q(A(o,u))).transform&&o.initialMatrix){var c=o.initialMatrix,f=c[0],l=c[1],d=c[2],h=c[3],v=c[4],M=c[5],p=Math.sign(f)*Math.sqrt(f*f+l*l),g=Math.sign(h)*Math.sqrt(d*d+h*h),y=Math.atan2(-l,f);s.transform+=" "+Q({scaleX:p,scaleY:g,rotation:y,x:v,y:M}).transform}var O=t(o.node);(function(t,e){return!x[t]||x[t]!==JSON.stringify(e)})(O,s)&&(Object.assign(o.node.style,s),x[O]=JSON.stringify(s))}})}(e,o)})}(e)},o.addEventListener("scroll",y[u]),y[u](e)};this.updateElements=function(){g(),M=[];var t=document.querySelectorAll("[data-animator-id]");h=Array.from(t).reduce(S,[]),M.forEach(C)},this.setAnimations=function(t){d=t,l.updateElements()},this.debug=function(){console.log("animations",d),console.log("elements",h),console.log("contexts",M)}}g(),window.__animators=v;export{s as ELEM_BOTTOM,c as ELEM_TOP,f as ELEM_CENTER,l as SCREEN_BOTTOM,d as SCREEN_TOP,h as SCREEN_CENTER,M as updateAll,y as Animator};
//# sourceMappingURL=animator.mjs.map
