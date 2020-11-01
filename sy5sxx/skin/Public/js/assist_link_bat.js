/**
 * btn模拟事件 ---- 九游安卓门户
 * @author huanghm@ucweb.com
 * @version 1.0.0 ### 20140827
 * @update wuwl ### 20141009
 * @update yxf ### 20170522
 */

(function() {
  
  var a = {
    getdom: function() {
      var popWechat = document.getElementById("popWechat");
    },
    
    tap: function(f, d) {
      if ("ontouchstart" in window) {} else {
        // this.tap = this.clickFun;
        this.clickFun(f, d);
        return
      }
      var e = 0,
        c = 0;
      f.addEventListener("touchstart",function(g) {
        e = g.touches[0].clientX;
        c = g.touches[0].clientY
      });
      f.addEventListener("touchend",function(i) {
        var h = i.changedTouches[0].clientX;
        var g = i.changedTouches[0].clientY;
        if (Math.abs(h - e) < 5 && Math.abs(g - c) < 5) {
          d.call(f, i)
        }
      })
    },
    
    clickFun: function(d, c) {
      d.addEventListener("click",function(f) {
        c.call(d, f)
      })
    },
    
    isBtn: function(d) {
      var h = document.getElementsByTagName('html')[0];
      while (d != h && d) {
        if (d.getAttribute('type') === 'btn' || d.localName === 'a') {
          return d;
        }
        d = d.parentNode;
      }
      return false;
    },
    
    isAnchor: function (d) {
      var h = document.getElementsByTagName('html')[0];
      while (d != h && d) {
        if (d.localName === 'a') {
          return true;
        }
        d = d.parentNode;
      }
      return false;
    },
  
    isCountClick: function (d) {
      var h = document.getElementsByTagName('html')[0];
      while (d != h && d) {
        if (d.localName === 'a') {
          var className = d.className || '';
          if (className.indexOf('count-click') >= 0){
            return false
          }
          return true;
        }
        d = d.parentNode;
      }
      return false;
    },
    
    isHighSpeed: function(d) {
      var h = document.getElementsByTagName('html')[0];
      while (d != h && d) {
        if (d.getAttribute('type') === 'highSpeed') {
          return d;
        }
        d = d.parentNode;
      }
      return false;
    },
    
    sendStat: function(c, text, callback) {
      var statisU = "http://a.9game.cn/jumpurl.html?outurl=http://a.9game.cn/public/images/android_portal/link/logo.png";
      var statis = new Image(),
        n,
        sUrl = statisU + "&r=" + Math.random();
      if (typeof text !== "undefined") {
        sUrl += "&" + text.replace(":", "=")
      }
      window[n] = statis;
      statis.src = sUrl;
      statis.onload = statis.onerror = function() {
        window[n] = null;
        callback()
      }
    },
    
    touchHover: function(e, f) {
      var d = e.className;
      f = !f ? "press": f;
      e.className = d + " " + f;
      document.addEventListener("touchend", c, false);
      document.addEventListener("touchmove", c, false);
      function c() {
        e.className = d;
        document.removeEventListener("touchmove", c, false);
        document.removeEventListener("touchend", c, false)
      }
    },
    
    isDiffPage: function (accessPath, urlPath) {
      if (!accessPath){
        return true;
      }
      var firstAccessPath = accessPath[0];
      var lastPath = firstAccessPath.split('_')[0];
      return lastPath !== urlPath;
    },
    
    statClick: function (e) {
      var _this = this;
      var pathname = e.getAttribute('pathname');
      var href = e.getAttribute('href') || '';
      var urlPath = this.getUrlPath(e);
      var info = [urlPath, pathname].join('_');
      var accessPath = _this.getLocalInfo('accesspath') || '';
      var isDiffPath = _this.isDiffPage(accessPath, urlPath);
  
      if (isDiffPath){
        accessPath ? accessPath.unshift(info) : accessPath = [info];
        _this.setLocalInfo('accesspath', accessPath);
      }else{
        accessPath[0] = info;
        _this.setLocalInfo('accesspath', accessPath);
      }
      
      if ( href.indexOf("/game/downs_") >= 0 || e.getAttribute('type') === 'highSpeed'){
        var accesspath = this.getLocalInfo('accesspath');
        if (accesspath){
          var form = [{
            name: 'from1',
            value: accesspath[0]
          }, {
            name: 'from2',
            value: accesspath[1]
          }, {
            name: 'from3',
            value: accesspath[2]
          }];
          form.map(function (item) {
            _this.writeCookie(item.name, item.value);
          })
        }
        _this.setLocalInfo('accesspath', accesspath.slice(0,3));
      }
    },
    
    checkKey: function (key) {
      if( typeof key === 'string' && key !== '' && !!this.localStorage){
        return true;
      }else {
        return false;
      }
    },
    
    localStorage: function () {
      return !!window.localStorage ? window.localStorage : false;
    },
    
    setLocalInfo: function (key,data) {
      var setDate = JSON.stringify(data);
      
      if( this.checkKey(key) ){
        localStorage.setItem(key,setDate);
      }
    },
    
    getLocalInfo: function (key) {
      if( this.checkKey(key) ){
        var info = localStorage.getItem(key);
        return JSON.parse(info);
      }
    },
    
    writeCookie: function (key, data) {
      var cookie;
      if (this.checkKey(key)  && typeof data === "string"){
        cookie = [key,  data].join('=');
      }else {
        cookie = [key,  ''].join('=');
      }
      
      document.cookie = cookie + ";path=/";
    },
  
    getCookie: function () {
      var value = document.cookie.replace(/(?:(?:^|.*;\s*)realNameFromSearch\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      return value ? value : false;
    },

    setCookie: function(key, value, options) {
      this.setCookieRaw(key, encodeURIComponent(value), options);
    },

    setCookieRaw: function(key, value, options) {
      if (!this._isValidKey(key)) {
        return;
      }

      options = options || {};

      // 计算cookie过期时间
      var expires = options.expires;
      if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
      }

      document.cookie = key + "=" + value + (options.path ? "; path=" + options.path : "")
        + (expires ? "; expires=" + expires.toGMTString() : "")
        + (options.domain ? "; domain=" + options.domain : "") + (options.secure ? "; secure" : '');

    },

    _isValidKey: function(key) {
      return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24"))
        .test(key);
    },
    
    getUrlPath: function (e) {
      var href = e.getAttribute('href');
      var url = location.pathname;
      return this.urlMatchRule(url);
    },
  
    url: window.location.href,
  
    getQueryString: function (url, name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var str = url.split('?')[1];
      if (str) {
        var r = str.match(reg);
        if (r !== null) return decodeURI(r[2]);
      }
      return false;
    },
  
    getCookieKey: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    
    urlMatchRule: function (url) {
      var _this = this;
      var rule = {
        homepage: /^\/$/,
        fl: /^\/category\d*\/*$/,
        flxqzx: /^\/category\d*\/new\/*/,
        flxqzr: /^\/category\d*\/hot\/*/,
        xzb: /^\/rank\/*/,
        bzrb: /^\/hot\/2_0\/*/,
        djb: /^\/hot\/3_0\/*/,
        xyqdb: /^\/xyqdb\/*/,
        djpd: /^\/danji\d*\/*/,
        xyrb: /^\/xyrb\/*/,
        kc_all: /^\/kc|xyyikaice\/*/,
        kc_nc: /^\/neice|yineice\/*/,
        kc_gc: /^\/gongce|yigongce\/*/,
        xzzy: /^\/game\/downs\w+\.html/,
        special: /^\/special\/*/,
        ss: /^\/search\/*/,
        newgame: /^\/newgame\/*/,
        cwjhy: /^\/tails\/*/,
        yxzq: /^\/\w+\/*/
      };
      
      for (var i in rule){
        if (rule[i].test(url)){
          if (i === 'special'){
            return /^\/special\/(\w+)\//.exec(url)[1];
          }else if (i === 'djpd'){
            if (url.indexOf('/xpyl/gengxin') > -1){
              return 'dj_zx_cpgx';
            }else if (url.indexOf('/xpyl/xinpin') > -1){
              return 'dj_zx_xpsx';
            }else if (url.indexOf('/xpyl') > -1){
              return 'dj_zx_all';
            }else if (url.indexOf('/bq/') > -1 || url.indexOf('/zt/') > -1){
              return 'djpdgdlb';
            }else if (url.indexOf('/kbdj') > -1){
              return 'dj_kbdj';
            }else{
              return i;
            }
          }else if (i === 'yxzq'){
            if ( _this.getCookieKey('ch') === 'UC_106' || _this.getCookieKey('ch') === 'uc_93' || _this.getQueryString(_this.url, 'ch') === 'UC_106' || _this.getQueryString(_this.url, 'ch') === 'uc_93'){
              return 'yxzq_new';
            }
            return 'yxzq_old';
          }else{
            return i;
          }
        }
      }
    },
  
    adjustRealNameLevel: function () {
      var level = 0;
      if (document.querySelector('script[data-real-name]')){
        level =  +document.querySelector('script[data-real-name]').getAttribute('data-real-name');
      }
      if ( level === 2){
        return true;
      }
      return false;
    }
  };
  
  var b = document.getElementsByTagName("html")[0];
  
  // b.addEventListener("touchstart", function(d) {
  //       var c = d.target;
  //       a.touchHover(a.isBtn(c))
  // }, false);
  
  a.tap(b,function(d) {
    
    var c = d.target,
      ua = window.navigator.userAgent.toLowerCase();
    
    if (a.isBtn(c) ) {
      
      // 清洗 localStorage.count 中记录的 recDetailDown
      a.setLocalInfo('count', '');
      a.setLocalInfo('ad-count', '');
      
      var src = a.isBtn(c).getAttribute("href")? a.isBtn(c).getAttribute("href"):"",
        srcs = src.toString(),
        text = a.isBtn(c).dataset.statis,
        wxtips =a.isBtn(c).dataset.wxtips,
        n;
      if (a.isBtn(c) ) {
        var src = a.isBtn(c).getAttribute("href")? a.isBtn(c).getAttribute("href"):"",
          srcs = src.toString(),
          wxtips =a.isBtn(c).dataset.wxtips,
          n;
        
        if( ( +wxtips === 1 || srcs.indexOf("/game/downs_") >= 0) &&  ua.match(/MicroMessenger/i) == 'micromessenger' ){
          a.sendStat(c,text, function(){
            popWechat.style.display = "block";
          });
          return;
        }
        
        if(srcs.indexOf("/") === 0 || srcs.indexOf("http://"+window.location.host) === 0 || srcs.indexOf(window.location.host) === 0  ){
          if(srcs.length>0){
            a.statClick(a.isBtn(c));
            var us = a.getCookie() ? false : a.isBtn(c).getAttribute("data-us") !== '1';
            if (window.adjustRealName || !a.adjustRealNameLevel() || us || a.isBtn(c).getAttribute("data-gs") !== '1' || srcs.indexOf("/game/downs_") < 0){
              window.location = src;
            }
          }
        }else{
          a.sendStat(c, text,function(){
            if(srcs.length>0) {
              a.statClick(a.isBtn(c));
              var us = a.getCookie() ? false : a.isBtn(c).getAttribute("data-us") !== '1';
              if (window.adjustRealName || !a.adjustRealNameLevel() || us || a.isBtn(c).getAttribute("data-gs") !== '1' || srcs.indexOf("/game/downs_") < 0){
                window.location = src;
              }
            }
          });
        }
      };
      
      //微信提示
      if ( a.isBtn(c) && a.isBtn(c).id === "popWechat" ) {
        popWechat.style.display = "none";
      }
    }
    
    if (a.isCountClick(c)){
      if (!a.adjustRealNameLevel() || a.isBtn(c).getAttribute("data-us") !== '1' || a.isBtn(c).getAttribute("data-gs") !== '1' || srcs.indexOf("/game/downs_") < 0){
        if(a.isBtn(c).getAttribute("data-us") !== null && a.isBtn(c).getAttribute("data-gs") !== null ){
          d.preventDefault();
        }
        if(location.host.indexOf('sou.9game') >= 0 && location.host.indexOf('m.') < 0){
          d.preventDefault();
        }
      }
    }
    
    if (a.isHighSpeed(c)){
      a.statClick(a.isHighSpeed(c));
    }
  });

  // 退弹导app
  if (quit_down_timer) clearTimeout(quit_down_timer);

  var isNeedQuitDown = false;
  if (isNeedQuitDown) {
    var quit_down_timer = setTimeout(function () {
      var quit_down = document.getElementById('quit_down');
      var isNeedQuitDown = a.getCookieKey('quitDown');
      var quitDownCount = a.getCookieKey('quitDownCount');

      if (quit_down && isNeedQuitDown === null && +quitDownCount < 3) {
        var domain = ".9game.cn";
        // var domain = "100.84.226.177";

        a.setCookie('quitDownCount', +quitDownCount + 1, {
          path : "/",
          domain : domain,
          expires : 1000 * 60 * 60 * 24 * 365
        });
        a.setCookie('quitDown', true, {
          path : "/",
          domain : domain,
          expires : 1000 * 60 * 60 * 24
        });

        quit_down.style.display = '-webkit-box';

        quit_down.addEventListener('click', function () {
          quit_down.style.display = 'none';
        });
      }
    }, 5000);
  }
}());
