(window.MIP=window.MIP||[]).push({name:"mip-showmore",func:function(){var t=function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="https://c.mipcdn.com/static/v2/",i(i.s=217)}([function(t,e){t.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/classCallCheck"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/createClass"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_wks"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_an-object"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/getPrototypeOf"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/inherits"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/possibleConstructorReturn"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_defined"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_descriptors"]},function(t,e){var i={}.toString;t.exports=function(t){return i.call(t).slice(8,-1)}},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-length"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_fails"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_object-dp"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-integer"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_export"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_redefine"]},function(t,e,i){var o=i(38),n=i(7);t.exports=function(t){return o(n(t))}},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_hide"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_has"]},function(t,e,i){"use strict";var o=i(21),n=RegExp.prototype.exec,s=String.prototype.replace,r=n,a=function(){var t=/a/,e=/b*/g;return n.call(t,"a"),n.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=void 0!==/()??/.exec("")[1];(a||l)&&(r=function(t){var e,i,r,c,h=this;return l&&(i=new RegExp("^"+h.source+"$(?!\\s)",o.call(h))),a&&(e=h.lastIndex),r=n.call(h,t),a&&r&&(h.lastIndex=h.global?r.index+r[0].length:e),l&&r&&r.length>1&&s.call(r[0],i,function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(r[c]=void 0)}),r}),t.exports=r},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_is-object"]},function(t,e,i){"use strict";var o=i(3);t.exports=function(){var t=o(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_global"]},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_shared-key"]},function(t,e,i){"use strict";i(36);var o=i(15),n=i(17),s=i(11),r=i(7),a=i(2),l=i(19),c=a("species"),h=!s(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),u=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var i="ab".split(t);return 2===i.length&&"a"===i[0]&&"b"===i[1]}();t.exports=function(t,e,i){var p=a(t),d=!s(function(){var e={};return e[p]=function(){return 7},7!=""[t](e)}),m=d?!s(function(){var e=!1,i=/a/;return i.exec=function(){return e=!0,null},"split"===t&&(i.constructor={},i.constructor[c]=function(){return i}),i[p](""),!e}):void 0;if(!d||!m||"replace"===t&&!h||"split"===t&&!u){var f=/./[p],g=i(r,p,""[t],function(t,e,i,o,n){return e.exec===l?d&&!n?{done:!0,value:f.call(e,i,o)}:{done:!0,value:t.call(i,e,o)}:{done:!1}}),A=g[0],w=g[1];o(String.prototype,t,A),n(RegExp.prototype,p,2==e?function(t,e){return w.call(t,this,e)}:function(t){return w.call(t,this)})}}},function(t,e,i){"use strict";var o=i(35),n=RegExp.prototype.exec;t.exports=function(t,e){var i=t.exec;if("function"==typeof i){var s=i.call(t,e);if("object"!=typeof s)throw new TypeError("RegExp exec method returned something other than an Object or null");return s}if("RegExp"!==o(t))throw new TypeError("RegExp#exec called on incompatible receiver");return n.call(t,e)}},function(t,e,i){"use strict";var o=i(34)(!0);t.exports=function(t,e,i){return e+(i?o(t,e).length:1)}},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/web.dom.iterable"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-object"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["vue-style-loader/lib/addStylesClient"]},function(t,e){t.exports=__mipComponentsWebpackHelpers__["css-loader/lib/css-base"]},function(t,e,i){var o=i(18),n=i(16),s=i(40)(!1),r=i(24)("IE_PROTO");t.exports=function(t,e){var i,a=n(t),l=0,c=[];for(i in a)i!=r&&o(a,i)&&c.push(i);for(;e.length>l;)o(a,i=e[l++])&&(~s(c,i)||c.push(i));return c}},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_property-desc"]},function(t,e,i){var o=i(13),n=i(7);t.exports=function(t){return function(e,i){var s,r,a=String(n(e)),l=o(i),c=a.length;return l<0||l>=c?t?"":void 0:(s=a.charCodeAt(l))<55296||s>56319||l+1===c||(r=a.charCodeAt(l+1))<56320||r>57343?t?a.charAt(l):s:t?a.slice(l,l+2):r-56320+(s-55296<<10)+65536}}},function(t,e,i){var o=i(9),n=i(2)("toStringTag"),s="Arguments"==o(function(){return arguments}());t.exports=function(t){var e,i,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(i=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),n))?i:s?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,i){"use strict";var o=i(19);i(14)({target:"RegExp",proto:!0,forced:o!==/./.exec},{exec:o})},,function(t,e,i){var o=i(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,e,i){var o=i(13),n=Math.max,s=Math.min;t.exports=function(t,e){return(t=o(t))<0?n(t+e,0):s(t,e)}},function(t,e,i){var o=i(16),n=i(10),s=i(39);t.exports=function(t){return function(e,i,r){var a,l=o(e),c=n(l.length),h=s(r,c);if(t&&i!=i){for(;c>h;)if((a=l[h++])!=a)return!0}else for(;c>h;h++)if((t||h in l)&&l[h]===i)return t||h||0;return!t&&-1}}},,function(t,e,i){var o=i(20),n=i(9),s=i(2)("match");t.exports=function(t){var e;return o(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==n(t))}},function(t,e,i){var o=i(58),n=i(33),s=i(16),r=i(46),a=i(18),l=i(59),c=Object.getOwnPropertyDescriptor;e.f=i(8)?c:function(t,e){if(t=s(t),e=r(e,!0),l)try{return c(t,e)}catch(t){}if(a(t,e))return n(!o.f.call(t,e),t[e])}},,,function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-primitive"]},,,function(t,e,i){"use strict";var o=i(3),n=i(29),s=i(10),r=i(13),a=i(27),l=i(26),c=Math.max,h=Math.min,u=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,m=function(t){return void 0===t?t:String(t)};i(25)("replace",2,function(t,e,i,f){return[function(o,n){var s=t(this),r=void 0==o?void 0:o[e];return void 0!==r?r.call(o,s,n):i.call(String(s),o,n)},function(t,e){var n=f(i,t,this,e);if(n.done)return n.value;var u=o(t),p=String(this),d="function"==typeof e;d||(e=String(e));var A=u.global;if(A){var w=u.unicode;u.lastIndex=0}for(var b=[];;){var v=l(u,p);if(null===v)break;if(b.push(v),!A)break;""===String(v[0])&&(u.lastIndex=a(p,s(u.lastIndex),w))}for(var x="",y=0,C=0;C<b.length;C++){v=b[C];for(var B=String(v[0]),k=c(h(r(v.index),p.length),0),H=[],E=1;E<v.length;E++)H.push(m(v[E]));var S=v.groups;if(d){var I=[B].concat(H,k,p);void 0!==S&&I.push(S);var T=String(e.apply(void 0,I))}else T=g(B,p,k,H,S,e);k>=y&&(x+=p.slice(y,k)+T,y=k+B.length)}return x+p.slice(y)}];function g(t,e,o,s,r,a){var l=o+t.length,c=s.length,h=d;return void 0!==r&&(r=n(r),h=p),i.call(a,h,function(i,n){var a;switch(n.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,o);case"'":return e.slice(l);case"<":a=r[n.slice(1,-1)];break;default:var h=+n;if(0===h)return i;if(h>c){var p=u(h/10);return 0===p?i:p<=c?void 0===s[p-1]?n.charAt(1):s[p-1]+n.charAt(1):i}a=s[h-1]}return void 0===a?"":a})}})},,,,function(t,e,i){"use strict";var o=i(42),n=i(3),s=i(61),r=i(27),a=i(10),l=i(26),c=i(19),h=i(11),u=Math.min,p=[].push,d=!h(function(){RegExp(4294967295,"y")});i(25)("split",2,function(t,e,i,h){var m;return m="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var n=String(this);if(void 0===t&&0===e)return[];if(!o(t))return i.call(n,t,e);for(var s,r,a,l=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),u=0,d=void 0===e?4294967295:e>>>0,m=new RegExp(t.source,h+"g");(s=c.call(m,n))&&!((r=m.lastIndex)>u&&(l.push(n.slice(u,s.index)),s.length>1&&s.index<n.length&&p.apply(l,s.slice(1)),a=s[0].length,u=r,l.length>=d));)m.lastIndex===s.index&&m.lastIndex++;return u===n.length?!a&&m.test("")||l.push(""):l.push(n.slice(u)),l.length>d?l.slice(0,d):l}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)}:i,[function(i,o){var n=t(this),s=void 0==i?void 0:i[e];return void 0!==s?s.call(i,n,o):m.call(String(n),i,o)},function(t,e){var o=h(m,t,this,e,m!==i);if(o.done)return o.value;var c=n(t),p=String(this),f=s(c,RegExp),g=c.unicode,A=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(d?"y":"g"),w=new f(d?c:"^(?:"+c.source+")",A),b=void 0===e?4294967295:e>>>0;if(0===b)return[];if(0===p.length)return null===l(w,p)?[p]:[];for(var v=0,x=0,y=[];x<p.length;){w.lastIndex=d?x:0;var C,B=l(w,d?p:p.slice(x));if(null===B||(C=u(a(w.lastIndex+(d?0:x)),p.length))===v)x=r(p,x,g);else{if(y.push(p.slice(v,x)),y.length===b)return y;for(var k=1;k<=B.length-1;k++)if(y.push(B[k]),y.length===b)return y;x=v=C}}return y.push(p.slice(v)),y}]})},function(t,e,i){var o=i(32),n=i(23).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return o(t,n)}},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_ctx"]},,function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_a-function"]},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=__mipComponentsWebpackHelpers__["core-js/modules/_ie8-dom-define"]},,function(t,e,i){var o=i(3),n=i(57),s=i(2)("species");t.exports=function(t,e){var i,r=o(t).constructor;return void 0===r||void 0==(i=o(r)[s])?e:n(i)}},,,,function(t,e,i){var o=i(20),n=i(68).set;t.exports=function(t,e,i){var s,r=e.constructor;return r!==i&&"function"==typeof r&&(s=r.prototype)!==i.prototype&&o(s)&&n&&n(t,s),t}},function(t,e,i){"use strict";var o=i(3),n=i(10),s=i(27),r=i(26);i(25)("match",1,function(t,e,i,a){return[function(i){var o=t(this),n=void 0==i?void 0:i[e];return void 0!==n?n.call(i,o):new RegExp(i)[e](String(o))},function(t){var e=a(i,t,this);if(e.done)return e.value;var l=o(t),c=String(this);if(!l.global)return r(l,c);var h=l.unicode;l.lastIndex=0;for(var u,p=[],d=0;null!==(u=r(l,c));){var m=String(u[0]);p[d]=m,""===m&&(l.lastIndex=s(c,n(l.lastIndex),h)),d++}return 0===d?null:p}]})},,function(t,e,i){var o=i(20),n=i(3),s=function(t,e){if(n(t),!o(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,o){try{(o=i(55)(Function.call,i(43).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,i){return s(t,i),e?t.__proto__=i:o(t,i),t}}({},!1):void 0),check:s}},,,,,,,,,function(t,e,i){"use strict";var o=i(22),n=i(12),s=i(8),r=i(2)("species");t.exports=function(t){var e=o[t];s&&e&&!e[r]&&n.f(e,r,{configurable:!0,get:function(){return this}})}},,function(t,e,i){var o=i(22),n=i(65),s=i(12).f,r=i(54).f,a=i(42),l=i(21),c=o.RegExp,h=c,u=c.prototype,p=/a/g,d=/a/g,m=new c(p)!==p;if(i(8)&&(!m||i(11)(function(){return d[i(2)("match")]=!1,c(p)!=p||c(d)==d||"/a/i"!=c(p,"i")}))){c=function(t,e){var i=this instanceof c,o=a(t),s=void 0===e;return!i&&o&&t.constructor===c&&s?t:n(m?new h(o&&!s?t.source:t,e):h((o=t instanceof c)?t.source:t,o&&s?l.call(t):e),i?this:u,c)};for(var f=function(t){t in c||s(c,t,{configurable:!0,get:function(){return h[t]},set:function(e){h[t]=e}})},g=r(h),A=0;g.length>A;)f(g[A++]);u.constructor=c,c.prototype=u,i(15)(o,"RegExp",c)}i(77)("RegExp")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){(t.exports=i(31)(!1)).push(["48827455e3c5df57",'mip-showmore{visibility:hidden;overflow:hidden}mip-showmore .mip-showmore-btnhide,mip-showmore .mip-showmore-btnshow,mip-showmore .mip-showmore-originalhtml{display:none}mip-showmore.sidsB:after{height:0!important}mip-showmore.linear-gradient:after{content:"";position:absolute;bottom:0;display:block;width:100%;height:90px;background:-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,0)),to(#fff));background:linear-gradient(180deg,hsla(0,0%,100%,0),#fff)}mip-showmore [showmorebox]{overflow:hidden}mip-showmore .mip-showmore-originText{width:100%;-webkit-transform:translateZ(0);transform:translateZ(0);word-wrap:break-word;word-break:break-all}.mip-showmore-btn{display:none;padding:15px;border:1px solid #ddd;background:#fafafa}.mip-showmore-btn:active,.mip-showmore-btn:hover{background:#f0f0f0}.mip-showmore-btn:after{display:none!important;background:none!important}.mip-showmore-btn-sidsA{color:#54becf!important;font-size:14px!important;line-height:56px!important;height:56px!important;padding:0!important;font-weight:500!important}.mip-showmore-btn-sidsA .down-icon{display:inline-block;width:14px;height:14px;margin-left:6px;background-size:100% 100%;position:relative;top:1px;background-image:url("data:image/png;base64,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")}.mip-showmore-btn-sidsA:after{content:"";position:absolute;bottom:0;display:block;width:100%;height:90px;background:-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,0)),to(#fff));background:linear-gradient(180deg,hsla(0,0%,100%,0),#fff)}.mip-showmore-btn-sidsB{color:#333!important;font-size:14px!important;background:#f8f8f8!important;position:relative!important;left:-12px!important;height:48px!important;-webkit-box-sizing:border-box!important;box-sizing:border-box!important;line-height:48px!important;padding:0!important;border-top:1px solid #eee!important;border-bottom:1px solid #e2e2e2!important}.mip-showmore-btn-sidsB .down-icon{display:inline-block;width:14px;height:14px;margin-left:6px;position:relative;top:1px;background-size:100% 100%;background-image:url("data:image/png;base64,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")}.mip-showmore-nodisplay{display:none}',""])},function(t,e,i){var o=i(215);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,i(30).default)("3a779a69",o,!0,{})},function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return E});i(79),i(28),i(49),i(66);var o,n=i(0),s=i.n(n),r=i(1),a=i.n(r),l=i(6),c=i.n(l),h=i(4),u=i.n(h),p=i(5),d=i.n(p),m=(i(53),i(216),MIP),f=m.CustomElement,g=m.viewport,A=m.util,w=m.hash,b=A.log("mip-showmore"),v="https://www.mipengine.org/v2/components/dynamic-content/mip-showmore.html",x=0,y={};if(w.hashTree.sids){if(o=w.hashTree.sids.value.split("_"),I("126449")){var C=document.querySelector(".mip-showmore-btn");C.innerHTML="展开全部",C.classList.add("mip-showmore-btn-sidsA");var B=document.createElement("span");B.classList.add("down-icon"),C.appendChild(B),document.querySelector("mip-showmore").getAttribute("bottomshadow")||document.querySelector("mip-showmore").setAttribute("bottomshadow",1)}if(I("126450")){var k=document.querySelector(".mip-showmore-btn");k.innerHTML="展开全部",k.classList.add("mip-showmore-btn-sidsB"),document.querySelector(".mip-showmore-btn").style.cssText="width:"+document.documentElement.clientWidth+"px;display: inline-block; cursor: pointer;background: #f8f8f8!important",document.querySelector("mip-showmore").classList.add("sidsB");var H=document.createElement("span");H.classList.add("down-icon"),k.appendChild(H)}}var E=function(t){function e(){var t,i;s()(this,e);for(var o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(i=c()(this,(t=u()(e)).call.apply(t,[this].concat(n)))).inited=!1,i.timeoutArray=[],i}return d()(e,t),a()(e,[{key:"connectedCallback",value:function(){if(!this.inited){var t=this.element;this.clickBtn=t.querySelector("[showmorebtn]"),this.clickBtn&&b.warn(this.element,"[Deprecated] showmorebtn 属性已经废弃, ".concat(v)),this.clickBtnSpan=this.clickBtn&&this.clickBtn.querySelector(".mip-showmore-btnshow"),this.showBox=t.querySelector("[showmorebox]"),this.showBox&&b.warn(this.element,"[Deprecated] showmorebox 属性已经废弃, ".concat(v)),this.animateTime=t.getAttribute("animatetime"),(null===this.animateTime||isNaN(this.animateTime))&&(this.animateTime=.24),this.heightType=["HEIGHTSCREEN","HEIGHT","LENGTH"],this.btn=document.querySelector('div[on="tap:'.concat(t.id,'.toggle"]'))||document.querySelector('div[on="click:'.concat(t.id,'.toggle"]')),this.eleid=t.id,this.containSMChild=!1,this.initialized=!1,this.inited=!0,this.showBox||(this.showBox=this.element)}}},{key:"build",value:function(){var t=this;(w.hashTree.sids&&I("126490")&&this.element.setAttribute("maxheight","99999"),this.analysisDep(),this.containSMChild||this.firstInit(),this.bindClick(),this.addEventAction("toggle",function(e){t.toggle(e)}),window.addEventListener("orientationchange",function(){t.firstInit()}),w.hashTree.sids&&I("126490"))&&(document.querySelector(".wrap-showmore-btn").style.cssText="display: none!important")}},{key:"firstInit",value:function(){var t=this.element;if(this.maxHeight=t.getAttribute("maxheight"),this.maxLen=t.getAttribute("maxlen"),this.bottomShadow="1"===t.getAttribute("bottomshadow"),this.bufferHeight=t.getAttribute("bufferheight"),this.bufferHeight=+this.bufferHeight?+this.bufferHeight:0,this.bottomShadowClassName="linear-gradient",this.maxHeight&&isNaN(this.maxHeight)){var e,i,o=this.maxHeight.split(":");if(o.length>1)switch(e=o[0].trim(),i=o[1].trim(),e){case"screen":this.showType=this.heightType[0],this.maxHeight=g.getHeight()*i,this.initHeight();break;case"heightpx":this.showType=this.heightType[1],this.initHeight()}}else this.maxHeight&&!isNaN(this.maxHeight)?(this.showType=this.heightType[1],this.initHeight()):this.maxLen&&!isNaN(this.maxLen)?(this.showType=this.heightType[2],this.initTextLength()):(this.maxHeight=0,this.initHeight());A.css(t,{visibility:"visible"}),this.runInitShowMore(),this.initialized=!0;var n=this.clickBtnSpan&&getComputedStyle(this.clickBtnSpan).display,s=this.btn&&getComputedStyle(this.btn).display;this.btn&&this.btn.style&&(this.btn.style.cursor="pointer"),this.btnDisplay=s||n}},{key:"changeBtnStyle",value:function(t){var e=this.element.querySelector(".mip-showmore-btnshow"),i=this.element.querySelector(".mip-showmore-btnhide"),o=this.btn||e;"fold"===t?(A.css(o,"display","inline-block"),i&&A.css(i,"display","none"),this.bottomShadow&&this.showBox.classList.add(this.bottomShadowClassName)):"unfold"===t&&(A.css(o,"display","none"),this.bottomShadow&&this.showBox.classList.remove(this.bottomShadowClassName))}},{key:"initHeight",value:function(){var t;(t=this.showBox.style.height&&this.showBox.style.height.match("px")?S(this.showBox):A.rect.getElementOffset(this.showBox).height)>+this.maxHeight+this.bufferHeight?(A.css(this.showBox,{height:this.maxHeight+"px",overflow:"hidden"}),this.changeBtnStyle("fold")):(A.css(this.showBox,t,"auto"),this.changeBtnStyle("unfold"))}},{key:"initTextLength",value:function(){if(!this.oriDiv){var t=this.showBox.innerHTML,e=this.cutHtmlStr(this.maxLen);t.length!==e.length&&(this.changeBtnStyle("fold"),this.showBox.innerHTML="",this.oriDiv=document.createElement("div"),this.oriDiv.setAttribute("class","mip-showmore-originText mip-showmore-nodisplay"),this.oriDiv.innerHTML=t,this.showBox.appendChild(this.oriDiv),this.cutDiv=document.createElement("div"),this.cutDiv.setAttribute("class","mip-showmore-abstract"),this.cutDiv.innerHTML="<p>"+e+"...</p>",this.showBox.appendChild(this.cutDiv))}}},{key:"bindClick",value:function(){var t=this;this.clickBtn&&this.clickBtn.addEventListener("click",function(){t.toggle()})}},{key:"addClassWhenUnfold",value:function(){this.btn&&this.btn.classList.add("mip-showmore-btn-hide")}},{key:"toggle",value:function(t){var e=this,i=this.element.classList,o=t&&t.target?function(t,e){for(;e.parentNode;){var i=e.getAttribute("on");if(i&&new RegExp("^(tap|click):"+t).test(i))return e;e=e.parentNode}return e}(this.element.id.trim(),t.target):null,n={};if(n.aniTime=this.animateTime,this.showType===this.heightType[2]){n.oriHeight=A.rect.getElementOffset(this.showBox).height+"px";var s=this.oriDiv,r=this.cutDiv;i.contains("mip-showmore-boxshow")?(s.classList.add("mip-showmore-nodisplay"),r.classList.remove("mip-showmore-nodisplay"),n.tarHeight=A.rect.getElementOffset(this.showBox).height+"px",s.classList.remove("mip-showmore-nodisplay"),r.classList.add("mip-showmore-nodisplay"),this.bottomShadow&&this.showBox.classList.add(this.bottomShadowClassName),n.type="fold",n.cbFun=function(){e.toggleClickBtn(o,"showOpen"),i.remove("mip-showmore-boxshow"),s.classList.add("mip-showmore-nodisplay"),r.classList.remove("mip-showmore-nodisplay")}):(this.bottomShadow&&this.showBox.classList.remove(this.bottomShadowClassName),n.type="unfold",s.classList.remove("mip-showmore-nodisplay"),r.classList.add("mip-showmore-nodisplay"),n.tarHeight=S(this.showBox)+"px",this.showBox.style.height=this.maxHeight+"px",n.cbFun=function(){e.toggleClickBtn(o,"showClose"),i.add("mip-showmore-boxshow"),e.addClassWhenUnfold()})}else this.showType!==this.heightType[1]&&this.showType!==this.heightType[0]||(i.contains("mip-showmore-boxshow")?(this.bottomShadow&&this.showBox.classList.add(this.bottomShadowClassName),i.remove("mip-showmore-boxshow"),n.type="fold",n.tarHeight=this.maxHeight+"px",n.cbFun=function(){e.toggleClickBtn(o,"showOpen")}):(this.bottomShadow&&this.showBox.classList.remove(this.bottomShadowClassName),i.add("mip-showmore-boxshow"),n.type="unfold",n.cbFun=function(){e.toggleClickBtn(o,"showClose"),e.element.style.height="auto",e.addClassWhenUnfold()}));this.heightAni({ele:this.showBox,type:n.type,transitionTime:n.aniTime,tarHeight:n.tarHeight,oriHeight:n.oriHeight,cbFun:n.cbFun})}},{key:"toggleClickBtn",value:function(t,e){var i;if(e)if(t&&t.dataset&&t.dataset.closeclass&&(i=t.dataset.closeclass),"showOpen"===e){if(t)if(i)t.classList.remove(i);else{var o="";w.hashTree.sids&&(I("126449")||I("126450"))&&(o='<span class="down-icon"></span>'),t.innerHTML=t.dataset.opentext+o}this.changeBtnText({display:this.btnDisplay},{display:"none"})}else{if(t)if(i)t.classList.add(i);else{var n=t.innerText;t.dataset.opentext=n,t.innerHTML=t.dataset.closetext||"收起"}this.changeBtnText({display:"none"},{display:this.btnDisplay})}}},{key:"cutHtmlStr",value:function(t){for(var e=this.showBox.childNodes,i="",o=0,n=[],s=0;s<e.length;s++){var r=e[s].textContent.replace(/(^\s*)|(\s*$)/g,"");if(!(i.length+r.length<=t)){var a=t-o>0?t-o:o-t,l=r?r.slice(0,a):"";e[s].textContent=l,n.push(e[s]);break}o=(i+=r).length,n.push(e[s])}for(var c="",h=0;h<n.length;h++){var u=n[h].nodeType;1===u?c+=n[h].outerHTML:3===u&&(c+=n[h].textContent)}return c}},{key:"changeBtnText",value:function(t,e){var i=this.element.querySelector(".mip-showmore-btnshow"),o=this.element.querySelector(".mip-showmore-btnhide");this.changeBtnShow(i,t),this.changeBtnShow(o,e)}},{key:"changeBtnShow",value:function(t,e){A.css(t,e)}},{key:"getId",value:function(t){return(t=t||this.element).dataset.showmoreId||(t.dataset.showmoreId="__showmoreincreaseId__".concat(++x)),t.dataset.showmoreId}},{key:"analysisDep",value:function(){var t=this,e=this.element.querySelectorAll("mip-showmore");if(e.length){var i=this.getId(this.element);y[i]=y[i]||{deps:[]},y[i].instance=this;var o=e[0];Array.prototype.slice.call(e).forEach(function(e){if(o===e||!o.contains(e)){var n=t.getId(e),s=y[n]||{};s.deps=(s.deps||[]).concat([i]),y[n]=s,o=e}}),this.containSMChild=!0}}},{key:"runInitShowMore",value:function(){var t=y[this.getId(this.element)];t&&t.deps.forEach(function(t){var e=y[t];e&&e.instance&&!e.instance.initialized&&e.instance.firstInit()})}},{key:"heightAni",value:function(t){var e,i=t.ele,o=t.type,n=this.timeoutArray||[];if(o&&i){e=void 0===t.transitionTime||isNaN(t.transitionTime)?.24:Math.min(parseFloat(t.transitionTime),1);var s,r=void 0!==t.oriHeight?t.oriHeight:getComputedStyle(i).height,a=t.cbFun||function(){};if("unfold"===o){void 0!==t.tarHeight?s=t.tarHeight:(i.style.transition="height 0s",i.style.height="auto",s=getComputedStyle(i).height);var l=setTimeout(function(){i.style.transition="height 0s",i.style.height="auto"},1e3*e);n[0]=l}else"fold"===o&&(s=t.tarHeight||0);i.style.height=r,i.style.transition="height "+e+"s";var c=requestAnimationFrame?requestAnimationFrame(function(){i.style.height=s}):setTimeout(function(){i.style.height=s},10),h=setTimeout(function(){a()},1e3*e);n[i.id]=n[i.id]||[],n[i.id][1]=c,n[i.id][2]=h}}},{key:"disconnectedCallback",value:function(){for(var t=this.timeoutArray&&this.timeoutArray[this.element.id]||[],e=0;e<t.length;e++)window.clearTimeout(t[e])}}]),e}(f);function S(t){var e=document.createElement("div"),i=getComputedStyle(t);e.innerHTML=t.innerHTML,e.style.padding=i.padding,e.style.margin=i.margin,e.style.border=i.border,e.style.position="absolute",t.parentNode.insertBefore(e,t),e.style.height="auto",e.style.visibility="hidden";var o=A.rect.getElementOffset(e).height;return t.parentNode.removeChild(e),o}function I(t){for(var e=0,i=o.length;e<i;e++)if(o[e]===t)return!0;return!1}}]);t.__esModule&&(t=t.default),t&&MIP.registerElement("mip-showmore",t)}});