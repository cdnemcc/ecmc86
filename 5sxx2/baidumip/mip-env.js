(window.MIP=window.MIP||[]).push({name:"mip-env",func:function(){var e=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="https://c.mipcdn.com/static/v2/",n(n.s=302)}({0:function(e,t){e.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/classCallCheck"]},1:function(e,t){e.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/createClass"]},10:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-length"]},11:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_fails"]},12:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_object-dp"]},13:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-integer"]},14:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_export"]},15:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_redefine"]},16:function(e,t,n){var r=n(38),o=n(7);e.exports=function(e){return r(o(e))}},17:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_hide"]},18:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_has"]},19:function(e,t,n){"use strict";var r=n(21),o=RegExp.prototype.exec,i=String.prototype.replace,s=o,u=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=void 0!==/()??/.exec("")[1];(u||c)&&(s=function(e){var t,n,s,p,l=this;return c&&(n=new RegExp("^"+l.source+"$(?!\\s)",r.call(l))),u&&(t=l.lastIndex),s=o.call(l,e),u&&s&&(l.lastIndex=l.global?s.index+s[0].length:t),c&&s&&s.length>1&&i.call(s[0],n,function(){for(p=1;p<arguments.length-2;p++)void 0===arguments[p]&&(s[p]=void 0)}),s}),e.exports=s},2:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_wks"]},20:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_is-object"]},21:function(e,t,n){"use strict";var r=n(3);e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},22:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_global"]},23:function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},24:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_shared-key"]},25:function(e,t,n){"use strict";n(36);var r=n(15),o=n(17),i=n(11),s=n(7),u=n(2),c=n(19),p=u("species"),l=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),a=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var f=u(e),m=!i(function(){var t={};return t[f]=function(){return 7},7!=""[e](t)}),_=m?!i(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[p]=function(){return n}),n[f](""),!t}):void 0;if(!m||!_||"replace"===e&&!l||"split"===e&&!a){var d=/./[f],v=n(s,f,""[e],function(e,t,n,r,o){return t.exec===c?m&&!o?{done:!0,value:d.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),h=v[0],g=v[1];r(String.prototype,e,h),o(RegExp.prototype,f,2==t?function(e,t){return g.call(e,this,t)}:function(e){return g.call(e,this)})}}},26:function(e,t,n){"use strict";var r=n(35),o=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"==typeof n){var i=n.call(e,t);if("object"!=typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(e,t)}},27:function(e,t,n){"use strict";var r=n(34)(!0);e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},28:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/web.dom.iterable"]},29:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_to-object"]},3:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_an-object"]},302:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return O});n(73);var r=n(0),o=n.n(r),i=n(1),s=n.n(i),u=n(6),c=n.n(u),p=n(4),l=n.n(p),a=n(5),f=n.n(a),m=(n(53),n(28),n(69),n(84),MIP),_=m.CustomElement,d=m.util,v=d.platform,h=d.log("mip-env"),g={sm:[".sm-tc.cn",".transcode.cn"],baidu:[".bdstatic.com",".mipcdn.com"]};function x(e){var t=new Set(e.split(",")),n=Array.from(t),r=[];return 0===n.length?r:(r[0]=n.filter(function(e){return"!"!==e[0]}),r[1]=n.filter(function(e){return"!"===e[0]}),r)}function b(e){return e[0]&&e[0].length>0?e[0].some(function(e){return(g[e]||[]).some(function(e){return-1!==location.hostname.lastIndexOf(e)})}):e[1].every(function(e){return(g[e.substr(1)]||[]).every(function(e){return-1===location.hostname.lastIndexOf(e)})})}function y(e){return e[0]&&e[0].length>0?e[0].some(function(e){return(g[e]||[]).some(function(e){return-1!==location.hostname.lastIndexOf(e)})}):e[1].every(function(e){return(g[e.substr(1)]||[]).every(function(e){return-1===location.hostname.lastIndexOf(e)})})}function j(e){var t={baidu:v.isBaiduApp,baidubrowser:v.isBaidu,uc:v.isUc,chrome:v.isChrome,safari:v.isSafari,qq:v.isQQ,firefox:v.isFireFox,wechat:v.isWechatApp};return e&&e[0].length>0?e[0].some(function(e){return t[e]&&t[e]()}):e[1].every(function(e){return!t[e.substr(1)]||!t[e.substr(1)]()})}function k(e){var t={ios:v.isIOS,android:v.isAndroid};return e&&e[0].length>0?e[0].some(function(e){return t[e]&&t[e]()}):e[1].every(function(e){return!t[e.substr(1)]||!t[e.substr(1)]()})}var O=function(e){function t(){return o()(this,t),c()(this,l()(t).apply(this,arguments))}return f()(t,e),s()(t,[{key:"scopeOk",value:function(e){var t=this.element,n={cache:b,dp:y,ua:j,os:k};if(!e)return h.warn(t,"请提供 scope 参数"),!1;var r=d.jsonParse(e),o=Object.keys(r);if(!d.fn.isPlainObject(r)||0===o.length)return h.warn(t,"scope 参数不是正确的 JSON！"),!1;for(var i=0,s=o;i<s.length;i++){var u=s[i],c=x(r[u].toString().toLowerCase());if(!n[u]||!n[u](c))return!1}return!0}},{key:"connectedCallback",value:function(){var e=this.element,t=e.getAttribute("scope"),n=this.scopeOk(t),r=e.getAttribute("targetId"),o=""!==r?document.documentElement.querySelector("#"+r):null;n||(null!==o&&o.remove(),e.innerHTML="")}}]),t}(_)},32:function(e,t,n){var r=n(18),o=n(16),i=n(40)(!1),s=n(24)("IE_PROTO");e.exports=function(e,t){var n,u=o(e),c=0,p=[];for(n in u)n!=s&&r(u,n)&&p.push(n);for(;t.length>c;)r(u,n=t[c++])&&(~i(p,n)||p.push(n));return p}},33:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_property-desc"]},34:function(e,t,n){var r=n(13),o=n(7);e.exports=function(e){return function(t,n){var i,s,u=String(o(t)),c=r(n),p=u.length;return c<0||c>=p?e?"":void 0:(i=u.charCodeAt(c))<55296||i>56319||c+1===p||(s=u.charCodeAt(c+1))<56320||s>57343?e?u.charAt(c):i:e?u.slice(c,c+2):s-56320+(i-55296<<10)+65536}}},35:function(e,t,n){var r=n(9),o=n(2)("toStringTag"),i="Arguments"==r(function(){return arguments}());e.exports=function(e){var t,n,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),o))?n:i?r(t):"Object"==(s=r(t))&&"function"==typeof t.callee?"Arguments":s}},36:function(e,t,n){"use strict";var r=n(19);n(14)({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},38:function(e,t,n){var r=n(9);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},39:function(e,t,n){var r=n(13),o=Math.max,i=Math.min;e.exports=function(e,t){return(e=r(e))<0?o(e+t,0):i(e,t)}},4:function(e,t){e.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/getPrototypeOf"]},40:function(e,t,n){var r=n(16),o=n(10),i=n(39);e.exports=function(e){return function(t,n,s){var u,c=r(t),p=o(c.length),l=i(s,p);if(e&&n!=n){for(;p>l;)if((u=c[l++])!=u)return!0}else for(;p>l;l++)if((e||l in c)&&c[l]===n)return e||l||0;return!e&&-1}}},42:function(e,t,n){var r=n(20),o=n(9),i=n(2)("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==o(e))}},44:function(e,t){e.exports={}},45:function(e,t,n){var r=n(3),o=n(52),i=n(23),s=n(24)("IE_PROTO"),u=function(){},c=function(){var e,t=n(50)("iframe"),r=i.length;for(t.style.display="none",n(51).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),c=e.F;r--;)delete c.prototype[i[r]];return c()};e.exports=Object.create||function(e,t){var n;return null!==e?(u.prototype=r(e),n=new u,u.prototype=null,n[s]=e):n=c(),void 0===t?n:o(n,t)}},47:function(e,t,n){var r=n(12).f,o=n(18),i=n(2)("toStringTag");e.exports=function(e,t,n){e&&!o(e=n?e:e.prototype,i)&&r(e,i,{configurable:!0,value:t})}},48:function(e,t,n){var r=n(32),o=n(23);e.exports=Object.keys||function(e){return r(e,o)}},5:function(e,t){e.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/inherits"]},50:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_dom-create"]},51:function(e,t,n){var r=n(22).document;e.exports=r&&r.documentElement},52:function(e,t,n){var r=n(12),o=n(3),i=n(48);e.exports=n(8)?Object.defineProperties:function(e,t){o(e);for(var n,s=i(t),u=s.length,c=0;u>c;)r.f(e,n=s[c++],t[n]);return e}},53:function(e,t,n){"use strict";var r=n(42),o=n(3),i=n(61),s=n(27),u=n(10),c=n(26),p=n(19),l=n(11),a=Math.min,f=[].push,m=!l(function(){RegExp(4294967295,"y")});n(25)("split",2,function(e,t,n,l){var _;return _="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,t){var o=String(this);if(void 0===e&&0===t)return[];if(!r(e))return n.call(o,e,t);for(var i,s,u,c=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),a=0,m=void 0===t?4294967295:t>>>0,_=new RegExp(e.source,l+"g");(i=p.call(_,o))&&!((s=_.lastIndex)>a&&(c.push(o.slice(a,i.index)),i.length>1&&i.index<o.length&&f.apply(c,i.slice(1)),u=i[0].length,a=s,c.length>=m));)_.lastIndex===i.index&&_.lastIndex++;return a===o.length?!u&&_.test("")||c.push(""):c.push(o.slice(a)),c.length>m?c.slice(0,m):c}:"0".split(void 0,0).length?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,r){var o=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,o,r):_.call(String(o),n,r)},function(e,t){var r=l(_,e,this,t,_!==n);if(r.done)return r.value;var p=o(e),f=String(this),d=i(p,RegExp),v=p.unicode,h=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.unicode?"u":"")+(m?"y":"g"),g=new d(m?p:"^(?:"+p.source+")",h),x=void 0===t?4294967295:t>>>0;if(0===x)return[];if(0===f.length)return null===c(g,f)?[f]:[];for(var b=0,y=0,j=[];y<f.length;){g.lastIndex=m?y:0;var k,O=c(g,m?f:f.slice(y));if(null===O||(k=a(u(g.lastIndex+(m?0:y)),f.length))===b)y=s(f,y,v);else{if(j.push(f.slice(b,y)),j.length===x)return j;for(var C=1;C<=O.length-1;C++)if(j.push(O[C]),j.length===x)return j;y=b=k}}return j.push(f.slice(b)),j}]})},56:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_library"]},57:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_a-function"]},6:function(e,t){e.exports=__mipComponentsWebpackHelpers__["@babel/runtime/helpers/esm/possibleConstructorReturn"]},60:function(e,t,n){var r=n(2)("unscopables"),o=Array.prototype;void 0==o[r]&&n(17)(o,r,{}),e.exports=function(e){o[r][e]=!0}},61:function(e,t,n){var r=n(3),o=n(57),i=n(2)("species");e.exports=function(e,t){var n,s=r(e).constructor;return void 0===s||void 0==(n=r(s)[i])?t:o(n)}},63:function(e,t,n){"use strict";var r=n(56),o=n(14),i=n(15),s=n(17),u=n(44),c=n(71),p=n(47),l=n(70),a=n(2)("iterator"),f=!([].keys&&"next"in[].keys()),m=function(){return this};e.exports=function(e,t,n,_,d,v,h){c(n,t,_);var g,x,b,y=function(e){if(!f&&e in C)return C[e];switch(e){case"keys":case"values":return function(){return new n(this,e)}}return function(){return new n(this,e)}},j=t+" Iterator",k="values"==d,O=!1,C=e.prototype,S=C[a]||C["@@iterator"]||d&&C[d],w=S||y(d),W=d?k?y("entries"):w:void 0,H="Array"==t&&C.entries||S;if(H&&(b=l(H.call(new e)))!==Object.prototype&&b.next&&(p(b,j,!0),r||"function"==typeof b[a]||s(b,a,m)),k&&S&&"values"!==S.name&&(O=!0,w=function(){return S.call(this)}),r&&!h||!f&&!O&&C[a]||s(C,a,w),u[t]=w,u[j]=m,d)if(g={values:k?w:y("values"),keys:v?w:y("keys"),entries:W},h)for(x in g)x in C||i(C,x,g[x]);else o(o.P+o.F*(f||O),t,g);return g}},69:function(e,t,n){"use strict";var r=n(60),o=n(72),i=n(44),s=n(16);e.exports=n(63)(Array,"Array",function(e,t){this._t=s(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,o(1)):o(0,"keys"==t?n:"values"==t?e[n]:[n,e[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},7:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_defined"]},70:function(e,t,n){var r=n(18),o=n(29),i=n(24)("IE_PROTO"),s=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=o(e),r(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?s:null}},71:function(e,t,n){"use strict";var r=n(45),o=n(33),i=n(47),s={};n(17)(s,n(2)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(s,{next:o(1,n)}),i(e,t+" Iterator")}},72:function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},73:function(e,t,n){"use strict";n(76);var r=n(3),o=n(21),i=n(8),s=/./.toString,u=function(e){n(15)(RegExp.prototype,"toString",e,!0)};n(11)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var e=r(this);return"/".concat(e.source,"/","flags"in e?e.flags:!i&&e instanceof RegExp?o.call(e):void 0)}):"toString"!=s.name&&u(function(){return s.call(this)})},76:function(e,t,n){n(8)&&"g"!=/./g.flags&&n(12).f(RegExp.prototype,"flags",{configurable:!0,get:n(21)})},8:function(e,t){e.exports=__mipComponentsWebpackHelpers__["core-js/modules/_descriptors"]},84:function(e,t,n){"use strict";var r=n(34)(!0);n(63)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},9:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}}});e.__esModule&&(e=e.default),e&&MIP.registerElement("mip-env",e)}});