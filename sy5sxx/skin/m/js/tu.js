history.back = function(){
    if (typeof document.referrer == "string") {
        if (document.referrer === "" || document.referrer.indexOf(window.location.protocol + "//" + window.location.host) !== 0) {
            window.location.href = window.location.protocol + "//" + window.location.host;
        } else {
            window.history.go(-1);
        }
    } else {
        window.history.go(-1);
    }
};

function getImgNaturalDimensions(img, fn, fnErr){
    if (img.naturalWidth) {//现代浏览器
        var nWidth = img.naturalWidth;
        var nHeight = img.naturalHeight;
        fn(nWidth, nHeight);
    } else {//IE6/7/8
        var _image = new window.Image();
        _image.src = img.src;
        _image.onload = function(){
            if (typeof fn == "function") {
                fn(_image.width, _image.height);
            }
        };
        _image.onerror = function(){
            if (typeof fnErr == "function") {
                fnErr();
            }
        };
    }
}

function resizeImage(el){
    $(function(){
        var cssw = $(el).parent().width();
        var cssh = $(el).parent().height();
        (function(img, cssw, cssh){
            getImgNaturalDimensions(img, function(rw, rh){
                var ratio_w = cssw / rw;
                var ratio_h = cssh / rh;
                var ratio = 0, aw = 0, ah = 0;
                ratio = Math.max(ratio_w, ratio_h);
                aw = rw * ratio;
                ah = rh * ratio;
                var max_w = $(img).css("max-width");
                if (max_w != "none") {
                    max_w = parseFloat(max_w);
                    if (aw > max_w) {
                        aw = max_w;
                    }
                }
                var max_h = $(img).css("max-height");
                if (max_h != "none") {
                    max_h = parseFloat(max_h);
                    if (ah > max_h) {
                        ah = max_h;
                    }
                }
                
                var left = (aw - cssw) / 2;
                var top = (ah - cssh) / 2;
                var marginTop = -top + "px";
                var cssDisplay = "block";
                if ($(img).hasClass("imgfixhidden")) {
                    cssDisplay = "hidden";
                }
                $(img).css({
                    width: aw + "px",
                    height: ah + "px",
                    position: "absolute",
                    marginLeft: -left + "px",
                    marginTop: marginTop,
                    display: cssDisplay
                });
            });
        })(el, cssw, cssh);
    });
}

function loadIconError(el){
    var src = $(el).attr("data-original-src");
    var src404 = $(el).attr("data-404-src");
    if (!src404) {
        src404 = prefix + "css/main/images/404-ic.png";
    }
    if (src) {
        var _image = new window.Image();
        _image.src = src;
        _image.onload = function(){
            $(el).attr("src", src);
        };
        _image.onerror = function(){
            $(el).removeAttr("onerror").attr("src", src404);
        };
    }
}


$(function(){
    function addSizeSuffix(url, w, h){
        if (!url) {
            return "";
        }
        if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
            return url;
        }
        var suffix = "";
        if (url.indexOf("?") > 0) {
            suffix = url.substring(url.indexOf("?"));
            url = url.substring(0, url.indexOf("?"));
        }
        if (url.indexOf("#") > 0) {
            url = url.substring(0, url.indexOf("#"));
        }
        var i1 = url.lastIndexOf("_");
        var i2 = url.lastIndexOf("x", url.lastIndexOf("."));
        var ext = url.substring(url.lastIndexOf("."));
        if (i2 > 0 && i1 > 0 && i2 > i1) {
            return url.substring(0, i1) + "_" + w + "x" + h + ext + suffix;
        } else {
            return url.substring(0, url.lastIndexOf(".")) + "_" + w + "x" + h + ext + suffix;
        }
    }
    window.addSizeSuffix = addSizeSuffix;
    
    function getClientType(){
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            return "ipa";
        } else if (browser.versions.android) {
            return "apk";
        } else {//FIXME downloadAllObj["exe"]
            return "apk";
        }
    }
    window.getClientType = getClientType;
    
    LocationSearch = (function(){
        var s = window.location.search.substring(1);
        var a = s.split("&");
        var kv = {};
        for (var i in a) {
            var str = a[i].split("=");
            var k = str[0];
            var v = str[1];
            kv[k] = decodeURIComponent(v);
        }
        //console.log(kv);
        
        function attrFunc(k, v){
            if (typeof v == "undefined") {
                return kv[k];
            }
            kv[k] = v;
        }
        
        function refreshFunc(){
            a = [];
            for (var i in kv) {
                a.push(i + "=" + encodeURIComponent(kv[i]));
            }
            s = a.join("&");
            window.location.search = "?" + s;
        }
        
        return {
            attr: attrFunc,
            refresh: refreshFunc
        };
    })();
    
    var navBarInitTop = -1;
    if ($("#navBar").length > 0) {
        navBarInitTop = $("#navBar").offset().top;
        //菜单栏随屏滚动
        $("#navBar").css({
            position: "fixed",
            top: navBarInitTop + "px",
            zIndex: 50
        });
    }
    var tabBarInitTop = -1;
    if ($("#tabBar").length > 0) {
        tabBarInitTop = $("#tabBar").offset().top;
        $("#tabBar").css({
            position: "fixed",
            top: tabBarInitTop + "px",
            zIndex: 50,
            width: $(window).width() + "px"
        });
    }
    var navBarTimerId = null;
    function resizeTop(top){
        if (navBarInitTop > -1) {
            var diffY1 = navBarInitTop - top;
            $("#navBar").css({
                position: "fixed",
                top: ((diffY1 > 0) ? diffY1 : 0) + "px",
                zIndex: 50
            });
            if (navBarTimerId !== null) {
                window.clearTimeout(navBarTimerId);
            }
            (function(diffY1){//避免部分浏览器下，滑动结束了navBar定位不正确的问题
                navBarTimerId = setTimeout(function(){
                    $("#navBar").css({
                        position: "fixed",
                        top: ((diffY1 > 0) ? diffY1 : 0) + "px",
                        zIndex: 50
                    });
                }, 50);
                navBarTimerId = null;
            })(diffY1);
        }
        if (tabBarInitTop > -1) {
            var diffY2 = tabBarInitTop - top;
            $("#tabBar").css({
                position: "fixed",
                top: ((diffY2 > 39) ? diffY2 : 39) + "px",
                zIndex: 50,
                width: $(window).width() + "px"
            });
        }
    }
    
    $(window).bind("resize", function(){
        var top = $(window).scrollTop();
        resizeTop(top);
    });
    $(window).bind("load", function(){
        var top = $(window).scrollTop();
        resizeTop(top);
    });
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        resizeTop(top);
    });
    
    //底部游戏下载随屏滚动
    var bottomTop = -1;
    var bottomHeight = 0, bottomAdHeight = 0;
    if ($("#gamePanelBottom").length > 0) {
        bottomTop = $("#gamePanelBottom").offset().top;
        bottomHeight = $("#gamePanelBottom").height();
        bottomAdHeight = $("#gamePanelBottomAd").height();
    }
    var isFirstStart = true;
    function resizeBottom(top){
        if (bottomTop == -1) {
            return;
        }
        if (top !== 0 && $(".game-panel-bottom-container").css("position") == "absolute") {
            $(".game-panel-bottom-container").removeAttr("style");
            bottomTop = $("#gamePanelBottom").offset().top;
        }
        if ($(window).height() + top - bottomHeight + 39 < bottomTop) {
            if (isFirstStart && top >= 130) {//默认刚开始不显示#gamePanelBottom
                isFirstStart = false;
            }
            if (isFirstStart === false) {
                /*$("#gamePanelBottom").css({
                    position: "fixed",
                    bottom: 0,
                    zIndex: 50
                });*/
            }
            $("#gamePanelBottomAd").css({
                position: "fixed",
                bottom: 0,
                zIndex: 50
            });
        } else {
            $("#gamePanelBottom").removeAttr("style");
            $("#gamePanelBottomAd").removeAttr("style");
        }
    }
    
    if ($("#gamePanelBottom").length > 0) {
        resizeBottom(0);
        
        $(window).bind("resize", function(){
            $("#gamePanelBottom").removeAttr("style");
            bottomTop = $("#gamePanelBottom").offset().top;
            var top = $(window).scrollTop();
            resizeBottom(top);
        });
        $(window).scroll(function(){
            var top = $(window).scrollTop();
            resizeBottom(top);
        });
    }
});

$(function(){
    //不满一屏的都要拉长列表留一屏内容
    var headerH = $(".page-header").height();
    var contentH = $(".page-content").height();
    var footerH = $(".page-footer").height();
    var h = $(window).height() - headerH - footerH;
    if (contentH < h) {
        $(".page-content").css({
            "min-height": h + "px"
        });
        $(".game-panel-bottom-container").css({
            "position": "absolute",
            "width": "100%",
            "top": (headerH + h - 50) + "px"
        });
    }
});

$(function(){
    //scrollable-container 左右滑动翻页的bug修复
    function getTouch(e){
        if (e.targetTouches) {
            return e.targetTouches[0];
        } else {
            // Maybe IE pointer
            return e;
        }
    }
    function shouldPreventDefault(element, i, deltaX, deltaY){
        //console.log("shouldPreventDefault", element.scrollTop, element.scrollLeft, i.width(), i.parent().width());
        var scrollTop = element.scrollTop;
        var scrollLeft = element.scrollLeft;
        var magnitudeX = Math.abs(deltaX);
        var magnitudeY = Math.abs(deltaY);
        //console.log("magnitudeX=" + magnitudeX, "magnitudeY=" + magnitudeY, "deltaX=" + deltaX, "deltaY=" + deltaY, "scrollLeft=" + scrollLeft, "scrollTop=" + scrollTop, i.width(), i.parent().width(), i.height(), i.parent().height());
        
        //if (magnitudeY > magnitudeX) {
        //    // user is perhaps trying to swipe up/down the page
        //    if (((deltaY < 0) && (scrollTop === i.height() - i.parent().height())) ||
        //    ((deltaY > 0) && (scrollTop === 0))) {
        //        return !i.settings.swipePropagation;
        //    }
        //}
        //else if (magnitudeX > magnitudeY) {
        //    // user is perhaps trying to swipe left/right across the page
        //    if (((deltaX < 0) && (scrollLeft === i.width() - i.parent().width())) ||
        //    ((deltaX > 0) && (scrollLeft === 0))) {
        //        return !i.settings.swipePropagation;
        //    }
        //}
        if (magnitudeY > magnitudeX) {
            return false;
        } else if (magnitudeX > magnitudeY) {
            if (((deltaX < 0) && (scrollLeft === i.width() - i.parent().width())) || ((deltaX > 0) && (scrollLeft === 0))) {
                return false;
            }
        }
        return true;
    }
    
    var startOffset = {
        pageX: 0,
        pageY: 0
    };
    var startTime = 0;
    $("#scrollable-container, #scrollable-container2, #scrollable-container3").bind("touchstart", function(e){
        var touch = getTouch(e.originalEvent);
        startOffset.pageX = touch.pageX;
        startOffset.pageY = touch.pageY;
        startTime = (new Date()).getTime();
        //console.log("startOffset, ", startOffset.pageX, startOffset.pageY);
    });
    $("#scrollable-container, #scrollable-container2, #scrollable-container3").bind("touchmove", function(e){
        var touch = getTouch(e.originalEvent);
        var currentOffset = {
            pageX: touch.pageX,
            pageY: touch.pageY
        };
        //console.log("currentOffset, ", currentOffset.pageX, currentOffset.pageY);
        var differenceX = currentOffset.pageX - startOffset.pageX;
        var differenceY = currentOffset.pageY - startOffset.pageY;
        var currentTime = (new Date()).getTime();
        var timeGap = currentTime - startTime;
        if (shouldPreventDefault(this, $(this).find(".scrollable"), differenceX, differenceY)) {
            //console.log("shouldPreventDefault");
            e.stopPropagation();
            e.preventDefault();
        }
    });
});
$(function(){
    //btn-clickme按钮事件
    if ($(".btn-clickme").length === 0) {
        return;
    }
    
    var dataArr = [];
    
    function httpGetWechatGroup(){
        if (typeof prefix == "undefined" || $("#gameIdField").length <= 0) {
            return;
        }
        var gameId = $("#gameIdField").val();
        $.ajax({
            url: prefix + "api/game/wxgqrcode",
            type: "POST",
            data: {
                gameid: gameId,
                // type: 1
            },
            dataType: "json",
            success: function(json){
                if (typeof json._RESULT != "undefined" &&
                json._RESULT.length > 0) {
                    dataArr = json._RESULT;
                    appendPopup();
                }
            }
        });
    }
        
    function appendPopup(){
        var html = '';
        html += '<div id="clickmePopup" class="popup-clickme" style="display:none; margin-top:-' + (67 + 193 * dataArr.length) + 'px;">';
        html += '  <div class="title">美女主播邀你进群</div>';
        for (var i = 0; i < dataArr.length; i++) {
            html += '  <div class="div-img"><img src="' + prefix + dataArr[i].QrCode + '" class="img" /></div>';
            html += '  <div class="text">' + dataArr[i].Name + '</div>';
            if (i === 0) {
                if(dataArr[i].Type == 1) {
                    $(".div-wechat-text").html("微信群");
                    html = html.replace("{{TypeName}}", "微信");
                } else {
                    $(".div-wechat-text").html("QQ群");
                    html = html.replace("{{TypeName}}", "QQ");
                }
                $("#wechatQRCodeImg").attr("src", prefix + dataArr[i].QrCode);
                $("#wechatQRCodeName").html(dataArr[i].Name + "<br/>" + dataArr[i].Description.replace(/\n/g, "<br/>"));
            }
        }
        html += '  <div class="popup-anchor"></div>';
        html += '</div>';
        $(".btn-clickme").parent().append(html);
    }

    httpGetWechatGroup();
    $(".btn-clickme").click(function(){//弹出添加微信的提示框
        $("#clickmePopup").fadeToggle();
        return false;
    });
    $("body").click(function(){
        $("#clickmePopup").fadeOut();
    });
    $(window).bind("scroll", function(){
        $("#clickmePopup").fadeOut();
    });
});

$(function(){
    //搜索弹出页面
    $(".bar-search").click(function(){
        window.location.href = prefix + "search/result?Query=";
    });
    if ($("#searchRecommend").length === 0) {
        return;
    }
    var arr = [];
    function updateSearchHtml(){
        var txtIdx = 0;
        var imgIdx = 0;
        for (var i = 0; i < arr.length; i++) {
            var searchLink = "/search/result?Query=" + encodeURIComponent(arr[i].word);
            if (imgIdx < 2 && arr[i].logofile) {
                $("#searchRecommend .link-img").eq(imgIdx).attr("href", searchLink).html('<img src="' + prefix + addSizeSuffix(arr[i].logofile, 120, 120) + '" data-original-src="' + prefix + arr[i].logofile + '" onerror="loadIconError(this);" class="img" />' + arr[i].word);
                imgIdx++;
            } else {
                if (txtIdx >= 8) {
                    $("#searchRecommend .link-img").eq(imgIdx).attr("href", searchLink).html('<img src="' + prefix + 'css/main/images/404-ic.png" class="img" />' + arr[i].word);
                    imgIdx++;
                } else {
                    $("#searchRecommend .link-word").eq(txtIdx).attr("href", searchLink).html(arr[i].word);
                    txtIdx++;
                }
            }
        }
    }
    
    function ajaxGetSearchWord(){
        $.ajax({
            url: prefix + "api/game/searchword",
            type: "POST",
            data: {
                siteid: siteid
            },
            dataType: "json",
            success: function(data){
                arr = data._RESULT;
                updateSearchHtml();
            }
        });
    }
    
    function main(){
        ajaxGetSearchWord();
    }
    
    main();
});
$(function(){
    //页面百度分享
    if ($(".btn-share").length === 0) {
        return;
    }
    
    var qApiSrc = {
        lower: "https://3gimg.qq.com/html5/js/qb.js",
        higher: "https://jsapi.qq.com/get?api=app.share"
    };
    var bLevel = {
        qq: {
            forbid: 0,
            lower: 1,
            higher: 2
        },
        uc: {
            forbid: 0,
            allow: 1
        }
    };
    var UA = navigator.appVersion;
    var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
    var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
    var version = {
        uc: "",
        qq: ""
    };
    var isWeixin = false;
    
    function initBDShare(){
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdText": "",
                "bdMini": "2",
                "bdMiniList": false,
                "bdPic": "",
                "bdStyle": "1",
                "bdSize": "32"
            },
            "share": {}
        };
        (document.getElementsByTagName('head')[0] || document.body).appendChild(document.createElement('script')).src = '/static/api/js/share.js?v=89860593.js?cdnversion=' + ~ (-new Date() / 36e5);
    }
    
    function showSharePopview(el){
        var title = $(el).attr("data-title") || document.title;
        var desc = $(el).attr("data-desc") || title;
        var url = window.location.href;
        var img = "";
        var img_title = "";
        var to_app = "";
        var from = "119手游网";
        
        if (isucBrowser) {//UC浏览器
            if (typeof(ucweb) != "undefined") {
                ucweb.startRequest("shell.page_share", [title, desc, url, to_app, "", "@" + from, ""]);
                httpMissionComplete();
            } else {
                if (typeof(ucbrowser) != "undefined") {
                    ucbrowser.web_share(title, desc, url, to_app, "", "@" + from, '');
                    httpMissionComplete();
                } else {
                    $("#bdsharebuttonbox").show();
                }
            }
        } else if (isqqBrowser && !isWeixin) {//QQ浏览器
            var ah = {
                url: url,
                title: title,
                description: desc,
                img_url: img,
                img_title: img_title,
                to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                cus_txt: "请输入此时此刻想要分享的内容"
            };
            if (typeof(browser) != "undefined") {
                if (typeof(browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
                    browser.app.share(ah);
                    httpMissionComplete();
                }
            } else {
                if (typeof(window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
                    window.qb.share(ah);
                    httpMissionComplete();
                } else {
                    $("#bdsharebuttonbox").fadeToggle();
                }
            }
        } else {//默认情况
            $("#bdsharebuttonbox").fadeToggle();
        }
    }
    
    function hideSharePopview(){
        $("#bdsharebuttonbox").fadeOut();
    }
    
    function getPlantform(){
        UA = navigator.userAgent;
        if ((UA.indexOf("iPhone") > -1 || UA.indexOf("iPod") > -1)) {
            return "iPhone";
        }
        return "Android";
    }
    function is_weixin(){
        var a = UA.toLowerCase();
        if (a.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    
    function getVersion(c){
        var a = c.split("."), b = parseFloat(a[0] + "." + a[1]);
        return b;
    }
    
    function isloadqqApi(){
        if (isqqBrowser) {
            var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
            var d = document.createElement("script");
            var a = document.getElementsByTagName("body")[0];
            d.setAttribute("src", b);
            a.appendChild(d);
        }
    }
    
    function httpMissionComplete(){
        $.getJSON(prefix + "api/member/mission_complete", {
            type: "ShareToSocial",
            relaid: $("#gameIdField").val()
        }, function(res){//显示是否+积分/经验
            if (res._Status == 1) {
                if (typeof res.score.Default != "undefined" && typeof res.score.Experience != "undefined") {
                    if (typeof mui != "undefined") {
                        var text = "积分+" + res.score.Default + " 经验+" + res.score.Experience;
                        mui.toast(text);
                    }
                }
            }
        });
    }
    
    function main(){
        var html = '<div id="bdsharebuttonbox" class="bdsharebuttonbox"><div class="bdsharebuttonbox-inner">';
        html += '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">微博</a>';
        html += '<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a>';
        html += '<a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ好友</a>';
        html += '<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a>';
        html += '</div></div>';
        $("#gamePanelBottom .td1").append(html);
        $("#bdsharebuttonbox").on('click', 'a', function(){
            httpMissionComplete();
        });
        
        var platform_os = getPlantform();
        version.qq = isqqBrowser ? getVersion(UA.split("MQQBrowser/")[1]) : 0;
        version.uc = isucBrowser ? getVersion(UA.split("UCBrowser/")[1]) : 0;
        isWeixin = is_weixin();
        if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 5.3 && platform_os == "Android")) {
            isqqBrowser = bLevel.qq.forbid;
        } else {
            if (isqqBrowser && version.qq < 5.4 && platform_os == "Android") {
                isqqBrowser = bLevel.qq.lower;
            } else {
                if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
                    isucBrowser = bLevel.uc.forbid;
                }
            }
        }
        isloadqqApi();
        if (isucBrowser) {//UC浏览器
            if (typeof(ucweb) == "undefined" && typeof(ucbrowser) == "undefined") {
                initBDShare();
            }
        } else if (isqqBrowser && !isWeixin) {//QQ浏览器
            if (typeof(browser) == "undefined" && typeof(window.qb) == "undefined") {
                initBDShare();
            }
        } else {//默认情况
            initBDShare();
        }
        
        $(".btn-share").click(function(){
            showSharePopview(this);
            return false;
        });
        $("body").click(function(){
            hideSharePopview();
        });
        $(window).bind("scroll", function(){
            hideSharePopview();
        });
    }
    main();
});
$(function(){
    //下载按钮微信弹出框
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    window.isWeiXin = isWeiXin;
    
    var browser = {
        versions: function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    window.browser = browser;
    
    var scrollAutoloadCount = 3;
    function scrollAutoload(){
        //FIXME 要考虑页面上有多个Tab的情况，页面中特殊处理
        if ($(".block-link-more .link").eq(0).is(":hidden") === false) {//当前不在加载中
            var top = $(".block-link-more .link").offset().top;
            if ($(window).scrollTop() + $(window).height() * 1.5 > top) {
                $(".block-link-more .link").trigger("click");
                scrollAutoloadCount--;
                if (scrollAutoloadCount === 0) {
                    $(window).unbind("scroll.autoload");
                }
            }
        } else {
            if ($(".block-link-more .link").eq(1).is(":hidden")) {//已经加载完毕了
                $(window).unbind("scroll.autoload");
            }
        }
    }
    
    var store = {
        get: function(){
        },
        set: function(){
        }
    };
    if (typeof StickyStore != "undefined") {
        store = new StickyStore();
    }
    
    function updateLinkDownloadStatus(){
        $(".link-download").each(function(){
            var key = $(this).attr("href");
            if (!!key && key != "#") {
                (function(el, key){
                    store.get(key, function(result){
                        if (result) {
                            $(el).addClass("visited");
                        }
                    });
                })(this, key);
            }
        });
    }
    window.updateLinkDownloadStatus = updateLinkDownloadStatus;
    
    function setStoreKey(key){
        if (!!key && key != "#") {//记录下载过的游戏
            store.set(key, 1);
        }
    }
    
    // iOS弹出安装提示说明；Android弹出相关推荐
    var DownloadPopup = {
        _url: "",
        _dataStat: "",
        _sec: 10,
        _timer: null,
        startTimer: function(sec){
            DownloadPopup.stopTimer();
            DownloadPopup._sec = 10;
            if (typeof sec == "number") {
                DownloadPopup._sec = sec;
            }
            $(".download-iostip-popup .text-timer .text").html(DownloadPopup._sec);
            $("#downloadIOSTipPanel3 .u-download-timer").text(DownloadPopup._sec+'s');
            $(".download-iostip-popup .text-timer").show();
            $("#downloadIOSTipPanel3 .u-download-timer").show();
            DownloadPopup._timer = window.setInterval(function(){
                DownloadPopup._sec--;
                if (DownloadPopup._sec > 0) {
                    $(".download-iostip-popup .text-timer .text").html(DownloadPopup._sec);
                    $("#downloadIOSTipPanel3 .u-download-timer").text(DownloadPopup._sec+'s');
                } else {
                    $(".download-iostip-popup .text-timer .text").html("0");
                    $("#downloadIOSTipPanel3 .u-download-timer").text('0s');
                    DownloadPopup.stopTimer();
                    setStoreKey(DownloadPopup._url);
                    if (DownloadPopup._dataStat) {
                        $.get(DownloadPopup._dataStat, function(data){
                            window.location.href = DownloadPopup._url;
                        });
                    } else {
                        window.location.href = DownloadPopup._url;
                    }
                }
            }, 1000);
        },
        stopTimer: function(){
            if (DownloadPopup._timer !== null) {
                window.clearInterval(DownloadPopup._timer);
                DownloadPopup._timer = null;
            }
        },
        _showIOSDetailPanel: function(result){
            var buttons = [{
                text: "立即下载",
                click: function(){
                    $(this).dialog("close");
                    if (DownloadPopup._url) {
                        setStoreKey(DownloadPopup._url);
                        if (DownloadPopup._dataStat) {
                            $.get(DownloadPopup._dataStat, function(data){
                                window.location.href = DownloadPopup._url;
                            });
                        } else {
                            window.location.href = DownloadPopup._url;
                        }
                    }
                }
            }, {
                text: "关闭",
                click: function(){
                    //$.cookie("dtip", "1", {
                    //    path: "/",
                    //    expires: 90
                    //});
                    $(this).dialog("close");
                }
            }];
            if (result) {//已下载过
                buttons = [{
                    text: "查看完整版图文教程",
                    click: function(){
                        $(this).dialog("close");
                        window.open("/hynews/747448.shtml");
                    }
                }, {
                    text: "关闭",
                    click: function(){
                        //$.cookie("dtip", "1", {
                        //    path: "/",
                        //    expires: 90
                        //});
                        $(this).dialog("close");
                    }
                }];
            }
            $("#downloadIOSTipPanel2").dialog({
                dialogClass: "download-iostip-popup",
                modal: false,
                draggable: false,
                resizable: false,
                width: "90%",
                height: $(window).height() - 40,
                closeText: "X",
                close: function(event, ui){
                    DownloadPopup.stopTimer();
                },
                buttons: buttons
            });
            if (result) {//已下载过
                $(".download-iostip-popup .ui-dialog-buttonpane .text-timer").hide();
            } else {
                if ($("#downloadIOSTipPanel2").next(".ui-dialog-buttonpane").find(".text-timer").length === 0) {
                    $("#downloadIOSTipPanel2").next(".ui-dialog-buttonpane").append('<p class="text-timer" style="display:none;"><span class="text">10</span>秒后自动开始下载...</p>');
                }
                DownloadPopup.startTimer();
            }
        },
        showIOSDetailPanel: function(){
            DownloadPopup._url = $("#downloadLink3").attr("href");
            DownloadPopup._dataStat = $("#downloadLink3").attr("data-stat");
            var key = DownloadPopup._url;
            if (!!key && key != "#") {
                (function(el, key){
                    store.get(key, function(result){
                        DownloadPopup._showIOSDetailPanel(result);
                    });
                })(this, key);
            }
        },
        showIOSPanel: function(url, dataStat){
            DownloadPopup._url = url;
            DownloadPopup._dataStat = dataStat;
            var isBaiduBrowser = false, isQQBrowser = false;
            if (navigator.userAgent.indexOf("baiduboxapp") > -1 || navigator.userAgent.indexOf("baidubrowser") > -1) {
                isBaiduBrowser = true;
            } else if (navigator.userAgent.indexOf("MQQBrowser") > -1) {
                isQQBrowser = true;
            }
            $("#downloadIOSTipPanel").dialog({
                dialogClass: "download-iostip-popup",
                modal: false,
                draggable: false,
                resizable: false,
                width: "85%",
                height: 320,
                closeText: "X",
                close: function(event, ui){
                    DownloadPopup.stopTimer();
                },
                buttons: [{
                    text: (isBaiduBrowser || isQQBrowser) ? "立即下载" : "查看完整版图文教程",
                    click: function(){
                        $(this).dialog("close");
                        if (isBaiduBrowser || isQQBrowser) {
                            setStoreKey(DownloadPopup._url);
                            if (DownloadPopup._dataStat) {
                                $.get(DownloadPopup._dataStat, function(data){
                                    window.location.href = DownloadPopup._url;
                                });
                            } else {
                                window.location.href = DownloadPopup._url;
                            }
                        } else {
                            window.open("/hynews/747448.shtml");
                        }
                    }
                }, {
                    text: "关闭",
                    click: function(){
                        //$.cookie("dtip", "1", {
                        //    path: "/",
                        //    expires: 90
                        //});
                        $(this).dialog("close");
                    }
                }]
            });
            //【手机百度倒计时3秒，手机qq浏览器倒计时8秒】后自动下载
            if (isBaiduBrowser || isQQBrowser) {
                var sec = 8;
                if (isBaiduBrowser) {
                    sec = 3;
                }
                if ($("#downloadIOSTipPanel").next(".ui-dialog-buttonpane").find(".text-timer").length === 0) {
                    $("#downloadIOSTipPanel").next(".ui-dialog-buttonpane").append('<p class="text-timer" style="display:none;"><span class="text">' + sec + '</span>秒后自动开始下载...</p>');
                }
                DownloadPopup.startTimer(sec);
                return false;
            }
            if (dataStat) {
                $.get(dataStat);
            }
            return true;
        },
        showIOSPanel3: function(url, dataStat){
            DownloadPopup._url = url;
            DownloadPopup._dataStat = dataStat;
            var isBaiduBrowser = false, isQQBrowser = false;
            if (navigator.userAgent.indexOf("baiduboxapp") > -1 || navigator.userAgent.indexOf("baidubrowser") > -1) {
                isBaiduBrowser = true;
            } else if (navigator.userAgent.indexOf("MQQBrowser") > -1) {
                isQQBrowser = true;
            }
            $('#downloadIOSTipPanel3').dialog({
                width: '85%',
                resizable: false,
                draggable: false,
                dialogClass: 'no-titlebar'
            })
            //【手机qq浏览器倒计时5秒】后自动下载
            if (isQQBrowser) {
                var sec = 5;
                DownloadPopup._dataStat = null;
                DownloadPopup.startTimer(sec);
                return false;
            }else{
                window.location.href = DownloadPopup._url;
            }
            if (dataStat) {
                $.get(dataStat);
            }
            return true;
        },
        showAndroidPanel: function(){
            var textTitle = $("#downloadAndroidTipPanel").attr("data-title");
            if (!textTitle) {
                textTitle = "大家还在玩";
            }
            $("#downloadAndroidTipPanel").dialog({
                dialogClass: "download-androidtip-popup",
                title: textTitle,
                modal: true,
                draggable: false,
                resizable: false,
                width: "90%",
                closeText: "X",
                close: function(event, ui){
                }
            });
            return true;
        }
    };
    window.DownloadPopup = DownloadPopup;
    
    function main(){
    
        var html = '';
        html += '<div class="mod-popup mod-popup-prompt" id="popupWechat" style="display:none" onclick="$(this).fadeOut();">';
        html += '  <div class="mod-popup-bg popup_close"></div>';
        html += '  <section class="popup-wechat">';
        html += '    <div class="content">';
        html += '      <p class="label">下载不了？试试这样</p>';
        html += '      <p class="line"><span class="num">1</span>点击<span class="em">右上角<i class="o-wechat-ico-1"></i></span></p>';
        html += '      <p class="line"><span class="num">2</span>点击<span class="em"><i class="o-wechat-ico-2"></i></span></p>';
        html += '      <p class="line"><span class="num">3</span>点击<span class="em">下载</span></p>';
        html += '    </div>';
        html += '  <span class="wechat-arr"></span>';
        html += '  </section>';
        html += '</div>';
        $("body").append(html);
        
        //$(document).on("click", ".link-download", function(){alert("here");return false;});
        $(document).on("click", ".link-download", function(){
            if (isWeiXin()) {//判断是否微信浏览器
                $("#popupWechat").fadeIn();
                return false;
            }
            var key = $(this).attr("href");
            if (!!key && key != "#") {//记录下载过的游戏
                store.set(key, 1);
                $(this).addClass("visited");
            }
            var dataGameId = $(this).attr("data-gameid");
            if (dataGameId) {
                $.getJSON(prefix + "api/member/mission_complete", {
                    type: "DownloadGame",
                    relaid: dataGameId
                }, function(res){//显示是否+积分/经验
                    if (res._Status == 1) {
                        if (typeof res.score.Default != "undefined" && typeof res.score.Experience != "undefined") {
                            if (typeof mui != "undefined") {
                                var text = "积分+" + res.score.Default + " 经验+" + res.score.Experience;
                                mui.toast(text);
                            }
                        }
                    }
                });
            }
        });
        $(window).bind("load", function(){//避免后设置的downloadLink导致状态未改变
            updateLinkDownloadStatus();
        });
        
        if ($(".block-link-more .link").length > 0) {
            $(window).bind("scroll.autoload", scrollAutoload);
        }
    }
    main();
});
$(function(){
    //扩大菜单的点击区域
    //#navBar .bar-item
    //.footer-nav .link
    $("#navBar .bar-item, .footer-nav .link").each(function(){
        var href = $(this).attr("href");
        if (!!href && href != "#") {
            $(this).parent().click(function(){
                window.location.href = href;
            });
        }
    });
});
$(function(){
    $("#icon-btn-scroll-top").click(function(){
        $("body").animate({
            scrollTop: 0
        }, 300);
    });
    function toggleBtnScrollTop(){
        var h = $(window).height();
        var t = $(window).scrollTop();
        if (t >= h / 2) {
            $("#icon-btn-scroll-top").fadeIn();
        } else {
            $("#icon-btn-scroll-top").fadeOut();
        }
    }
    $(window).bind("scroll", toggleBtnScrollTop);
    $(window).bind("load", toggleBtnScrollTop);
});

function kDownloadIOSGame(el,fromOtherGame,prevEle){
    var isInit = false;
    var initSlide = function() {
        if (isInit) {
            return false
        }
        isInit = true;
        var touchSlider = function(selector, fnSlideLeft, fnSlideRight) {
            var touchX = 0;
            var oSelector = document.querySelector(selector);
            var touchStartHandle = function(e) {
                touchX = e.touches[0].clientX;
            }

            var touchEndHandle = function(e) {
                var endX = e.changedTouches[0].clientX;
                var offset = endX - touchX;
                if (Math.abs(offset) < 20) {
                    return false;
                }
                if (offset < 0) {
                    fnSlideRight();
                } else {
                    fnSlideLeft();
                }
            }

            oSelector.addEventListener('touchstart', touchStartHandle)
            oSelector.addEventListener('touchmove', function(e) {
                e.preventDefault();
                return false;
            })
            oSelector.addEventListener('touchend', touchEndHandle)
        };
        var _ua = navigator.userAgent.toLocaleLowerCase()
        var isSafari = _ua.indexOf('safari') > -1&&_ua.indexOf('mqqbrowser')==-1&&_ua.indexOf('ucbrowser')==-1;
        var isSliding = false,
            curIndex = 1;
        var $slider = $('.m-ios-downloadtip .m-slider')
        var slideWidth = $slider.width();
        var slideHandle = function(dir) {
            if (isSliding || (dir == 'left' && curIndex == 1) || (dir == 'right' && curIndex == 3)) {
                return false;
            }
            isSliding = true;
            if (dir == 'left') {
                curIndex--;
            } else {
                curIndex++;
            }
            sliding();
        }

        var sliding = function() {
            var animateLeft = -(curIndex - 1) * slideWidth;
            $slider.animate({
                left: animateLeft
            }, 'fast', function() {
                isSliding = false;
            });
            $('.m-ios-downloadtip .m-index-tip .u-tip-item').eq(curIndex - 1).addClass('is-active').siblings().removeClass('is-active');
        }

        touchSlider('.m-ios-downloadtip', function() {
            slideHandle('left');
        }, function() {
            slideHandle('right');
        });

        $('.m-ios-downloadtip .m-index-tip .u-tip-item').click(function() {
            curIndex = parseInt($.trim($(this).text()));
            sliding();
        })

        if (!isSafari) {
            $('.m-ios-downloadtip .u-button-trust').text('查看详细教程');
        }

        $('.m-ios-downloadtip .u-button-trust').click(function() {
            if (isSafari) {
                window.location.href = 'http://www.xxzhushou.cn/embedded.mobileprovision';
            } else {
                window.location.href = 'https://m.119you.com/hynews/747448.shtml';
            }
        });

        $('.u-btn-close').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            DownloadPopup.stopTimer();
            $('.m-box').dialog('close');
            return false;
        })
    };

    var initBaiduDownload = {
        show: function() {
            $('.u-ios-baidu-wrapper').fadeIn();
        },
        hide: function() {
            $('.u-ios-baidu-wrapper').fadeOut();
        },
        init: function() {
            var self = this;
            $('.m-ios-baidu-box .g-box-bottom').click(function() {
                self.hide();
            });
            $('.m-ios-baidu-box .u-btn-copy').click(function() {
                getLink();
            });
            this.setCopyHref(window.location.href);
            function getLink() {
                var text = document.querySelector('.u-input'),
                    range,
                    selection;

                if (window.getSelection) { //FF CH SF
                    text.setAttribute("contenteditable", true);
                    selection = window.getSelection();
                    range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    //注意IE9-不支持textContent
                    makeSelection(0, text.firstChild.textContent.length, 0, text.firstChild);
                } else {
                    return alert("浏览器不支持长按复制功能");
                }
            };

            function makeSelection(start, end, child, parent) {
                var range = document.createRange();
                range.setStart(parent.childNodes[child] || parent, start);
                range.setEnd(parent.childNodes[child] || parent, end);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        },
        setCopyHref: function(url){
            if(url.indexOf("http") != 0) {
                url = window.location.href.substring(0, window.location.href.indexOf("/",9)) + url;
            }
            if (url.indexOf('dod=1') == -1) {
                if (url.indexOf('?')==-1) {
                    url += '?dod=1';
                }else{
                    url += '&dod=1';
                }
            }
            $('.m-ios-baidu-box .u-input').text(url);
        }
    }
    initBaiduDownload.init();

    var isBP = $(el).attr("data-isbp"); //是否苹果越狱，0=否，1=是
    var cplink = $(el).attr("data-cplink"); //是否苹果越狱，0=否，1=是
    var filepath = $(el).attr("data-filepath");
    var elHref = $(el).attr('href');
    var elGameId = $(el).attr('data-gameid');
    elHref = elHref.replace('type=apk','type=ipa');
    /*var dataIPath = $(el).attr('data-i');//ios下载链接
    if (dataIPath) {
        filepath = dataIPath;
    }*/
    // var _dlStat = '/fgame/dlstat?gid='+elGameId+'&type=ipa&cp=6&source=m_rank';
    var _dlStat = elHref;
    if ($(el).attr('data-stat')) {
        _dlStat = $(el).attr('data-stat');
    }
    if (isBP != '1') {
        window.location.href = elHref;
    }else{
        if (navigator.userAgent.indexOf("baiduboxapp") > -1) {
            _dlStat += '&bdboxapp=1';
            $.get(_dlStat);
            // if (filepath && filepath.indexOf("itunes.apple.com") != -1) {//官方
            //     if (dataIPath) {
            //         elHref = dataIPath;
            //     }
            //     window.location.href = elHref;
            // }else{
                if (fromOtherGame) {
                    var url2 = '';
                    if(prevEle){
                       url2 = $(prevEle).attr('href');
                    }else{
                       url2 = $(el).prev().attr('href');
                    }
                    initBaiduDownload.setCopyHref(url2);
                }
            // }
            initBaiduDownload.show();
        } else {
            // if (filepath && filepath.indexOf("itunes.apple.com") != -1) {//官方
            //     if ($(el).attr('data-stat')) {
            //         $.get(_dlStat);
            //     }
            //     window.location.href = elHref;
            // }else{
                DownloadPopup.showIOSPanel3(elHref, _dlStat);
                initSlide();
            // }
        }
    }
    return true;
}


$(function(){
    $('.bds_weixin').click(function(){
        if ($('#bdshare_weixin_qrcode_dialog_qr img').length==0) {
            setTimeout(function(){
                var html = '<img src="http://qr.topscan.com/api.php?w=190&m=0&text='+encodeURIComponent(window.location.href)+'" style="width:185px;display:block;margin:0 auto;">'
                $('#bdshare_weixin_qrcode_dialog #bdshare_weixin_qrcode_dialog_qr').html(html);
            },500);
        }
    });
});