"use strict";
// (function() {
//     var reFz = function() {
//         document.querySelector('html').style.fontSize = (document.documentElement.clientWidth * 100) / 750 + 'px';
//     }
//     reFz();
//     window.onresize = reFz;
//     window.addEventListener('orientationchange',function() {
//         window.location.reload();
//     });
// })();

function endWith(str, caps) {
    var exp = new RegExp(caps + '$', 'i');
    return exp.test(str);
}

function parseSearch(search) {
    var str = search.substring(1);
    var query = str.split('&');
    var map = {};
    for (var i = 0; i < query.length; i++) {
        var params = query[i].split('=');
        if (params[0] && params[1]) {
            map[params[0]] = decodeURIComponent(params[1]);
        }
    }
    return map;
}

function getSearch() {
    return parseSearch(window.location.search);
}

function obtainSingleSearch(name) {
    var searchs = getSearch();
    return searchs[name];
}

function getImgNaturalDimensions(img, fn, fnErr) {
    if (img.naturalWidth !== undefined) { //现代浏览器
        var nWidth = img.naturalWidth;
        var nHeight = img.naturalHeight;
        fn(nWidth, nHeight);
    } else { //IE6/7/8，IE中需要就src放到onload后面
        var _image = new window.Image();
        _image.onload = function() {
            if (typeof fn == "function") {
                fn(_image.width, _image.height);
            }
        };
        _image.onerror = function() {
            if (typeof fnErr == "function") {
                fnErr();
            }
        };
        _image.src = img.src;
    }
}

function loadIconError(el) {
    var src = $(el).attr("data-original-src");
    if (!src) {
        src = $(el).attr("src").replace(/_(\d)\d0x(\1)\d0/i, "");
    }
    var src404 = $(el).attr("data-404-src");
    if (!src404) {
        src404 = prefix + "css/v2/404/404-pic.png";
    }
    if ($(el).width() === $(el).height()) {
        src404 = prefix + "css/v2/404/404-pic-logo.png";
    }
    if (src) {
        var _image = new window.Image();
        _image.src = src;
        _image.onload = function() {
            $(el).attr("src", src);
        };
        _image.onerror = function() {
            $(el).removeAttr("onerror").attr("src", src404);
        };
    } else {
        var _image = new window.Image();
        _image.src = src404;
        _image.onload = function() {
            $(el).attr("src", src404);
        };
        _image.onerror = function() {
            $(el).removeAttr("onerror").attr("src", src404);
        };
    }
}

function resizeImage(el) {
    // 延迟到DOMCONTENTLOADED后执行，修复无法获取到父元素宽高问题
    $(function() {
        var cssw = $(el).parent().width();
        var cssh = $(el).parent().height();
        (function(img, cssw, cssh) {
            getImgNaturalDimensions(img, function(rw, rh) {
                var ratio_w = cssw / rw;
                var ratio_h = cssh / rh;
                var ratio = 0,
                    aw = 0,
                    ah = 0;
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

function addSizeSuffix(url, w, h) {
    if (!url) {
        return "";
    }
    if (url.indexOf("http://") === 0) {
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

function getClientType() {
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        return "ipa";
    } else if (browser.versions.android) {
        return "apk";
    } else { //FIXME downloadAllObj["exe"]
        return "apk";
    }
}

/**
 * 格式化日期
 * yyyy MM dd hh mm ss
 * formatDate('yyyy-MM-dd hh:mm:ss')    ->  2017-07-04 12:13:20
 * @author KuangGuanghu
 * @date   2017-07-04
 * @param  {String}   format        格式化字符串
 * [@param  {Number}   dateTimestamp 需要格式化的时间戳(可选)] 
 * @return {String}                 格式化后的日期
 */
function formatDate(format, dateTimestamp){
    var date = dateTimestamp ? new Date(dateTimestamp) : new Date();
    var fillZero = function(num){if (num<10) {return '0'+num}return num;}
    return format.replace(/yyyy/,date.getFullYear())
                    .replace(/MM/,fillZero(date.getMonth()+1))
                    .replace(/dd/,fillZero(date.getDate()))
                    .replace(/hh/,fillZero(date.getHours()))
                    .replace(/mm/,fillZero(date.getMinutes()))
                    .replace(/ss/,fillZero(date.getSeconds()));
}

//-------------------Ajax加载类------------------------//
/**
 * @param {object}       //配置参数对象
 * {
 *  url,                 //请求地址
 *  containerEl,         //内容容器
 *  loadMoreEl,          //加载按钮
 *  template,            //数据处理模板
 *  handleDataFunc,      //处理数据并但会数据映射对象与模板中所需数据对应{}
 *  autoLoadNum,         //自动加载次数
 *  getRequestParams,    //获取请求参数的函数
 *  parentFind,          //是否采用父查询容器，默认false
 *  fullFunc             //添加完数据后执行的函数
 * }
 */
function RequestData(props) {
    this.props = props;
    this.init();
}
RequestData.prototype = {
    init: function() {
        var self = this;
        $(self.props.loadMoreEl).attr('data-loadall', 0).attr('data-isload', 0).attr('data-maxload', self.props.autoLoadNum);
        if (self.props.autoLoadNum > 0) {
            scrollToBottom.init(self.props.loadMoreEl, function() {
                console.log('load')
                self.httpGetMore();
            });
        }
        self.bindClickListener();
    },
    bindClickListener: function() {
        var self = this;
        $(self.props.loadMoreEl).click(function() {
            self.httpGetMore(this);
        });
        if (self.props.loadFirst) {
            self.httpGetMore(self.props.loadMoreEl);
        }
    },
    handleData: function(data) {
        var i, item, handledData, html = '',
            tempTemplate;
        for (i = 0; i < data.length; i++) {
            item = data[i];
            handledData = this.props.handleDataFunc(item);
            tempTemplate = this.props.template;
            for (var name in handledData) {
                var regExp = new RegExp('{{' + name + '}}', 'g');
                tempTemplate = tempTemplate.replace(regExp, handledData[name]);
            }
            html += tempTemplate;
        }
        return html;
    },
    httpGetMore: function(moreEl) {
        var self = this;
        if (!moreEl) {
            moreEl = self.props.loadMoreEl;
        }

        var laodTime = parseInt($(moreEl).attr('data-maxload'));
        if ($(moreEl).attr('data-loadall') == '1' || $(moreEl).attr('data-isload') == '1') {
            return false;
        }
        $(moreEl).attr('data-isload', 1);
        $(moreEl).text('加载中...');
        var requestParams = self.props.getRequestParams(moreEl);
        var pageIndex = requestParams.pageindex;
        (function(moreEl, pageIndex) {
            $.ajax({
                url: prefix + self.props.url,
                type: "POST",
                data: requestParams,
                dataType: "json",
                success: function(data) {
                    $(moreEl).attr("data-pageindex", pageIndex + 1);
                    var arr = data._RESULT;
                    var dataHTML = self.handleData(arr);
                    if (self.props.parentFind) {
                        $(moreEl).parent().find(self.props.containerEl).append(dataHTML);
                        if (dataHTML !== '' && self.props.fullFunc) {
                             self.props.fullFunc($(moreEl).parent().find(self.props.containerEl));
                        }
                    }else{
                        $(self.props.containerEl).append(dataHTML);
                        if (dataHTML !== '' && self.props.fullFunc) {
                             self.props.fullFunc($(self.props.containerEl));
                        }
                    }
                    if (data.pagesize * (data.pageindex + 1) < data.total) {
                        // $(moreEl).text();
                    } else {
                        $(moreEl).text('已加载全部').attr('data-loadall', 1);
                        scrollToBottom.unbindScroll();
                    }
                    if (typeof updateLinkDownloadStatus == "function") {
                        updateLinkDownloadStatus();
                    }
                },
                error: function(xhr) {},
                complete: function() {
                    $(moreEl).attr('data-isload', 0);
                    if (laodTime > 0) {
                        $(moreEl).attr('data-maxload', --laodTime);
                    } else {
                        scrollToBottom.unbindScroll();
                    }

                    if ($(moreEl).attr('data-loadall') == '0') {
                        $(moreEl).text('加载更多');
                    }
                }
            });
        })(moreEl, pageIndex);
    }
}
//-------------------Ajax加载类-结束----------------//


window.browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息 
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

var scrollToBottom = (function() {
    var scrollCB = function scrollCB() {
        var scrollTop = $(window).scrollTop();
        var objBottom = $(this.myScroller).height() + $(this.myScroller).offset().top; //控件的高+控件距离
        var winHeight = window.innerHeight ? window.innerHeight : $(window).height();
        var scrollHeight = scrollTop + winHeight; //卷去的高度+浏览器的可视高度
        if (objBottom < scrollHeight + 50) {
            this.myScrollCb();
        }
    }

    var bindScroll = function bindScroll() {
        var self = this;
        $(window).on('scroll', function() { self.scrollCB() });
    }

    var unbindScroll = function unbindScroll() {
        $(window).unbind('scroll');
    }

    return {
        myScroller: '',
        myScrollCb: null,
        scrollCB: scrollCB,
        bindScroll: bindScroll,
        unbindScroll: unbindScroll,
        init: function(scroller, cb) {
            this.myScroller = scroller;
            this.myScrollCb = cb;
            this.bindScroll();
        }
    }
})();

var InitTool = {
    init: function() {
        // this.initSeachField();
        // this.initScrollTopBtn();
        this.bindGlobalListender();
        this.fillPageHeight();
        this.handleOrientationChange();
    },
    handleOrientationChange: function(){
        window.addEventListener('orientationchange',function() {
            $('img').each(function(){
                var self = this;
                var attrOnload = $(this).attr('onload');
                if (attrOnload && attrOnload.indexOf('resizeImage') > -1) {
                    setTimeout(function(){
                        resizeImage(self);
                    },200);
                }
            });
        },false);
    },
    initSeachField: function() {
        var _search = function(_this) {
            var value = $(_this).val().trim();
            if (value === '') {
                alert('请输入搜索关键字');
                return false;
            }
        }
        $('.u-search-field').keydown(function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                _search(this);
            }
        });
        $('.u-btn-search').click(function(e) {
            _search($('.u-search-field'));
        });
    },
    checker: function(idx, wrapperSelector, buttonSelector) {
        var ws = wrapperSelector.split(' ');
        $(wrapperSelector).eq(idx).show().siblings(ws[ws.length - 1]).hide();
        $(buttonSelector).eq(idx).addClass('is-active').siblings().removeClass('is-active');
        this.fillPageHeight();
    },
    checkListen: function(wrapperSelector, buttonSelector, cb, cb1) {
        var self = this;
        self.checker(0, wrapperSelector, buttonSelector);
        $(buttonSelector).click(function() {
            self.checker($(buttonSelector).index(this), wrapperSelector, buttonSelector);
            cb && cb($(buttonSelector).index(this));
            cb1 && cb1($(buttonSelector).index(this));
        });
    },
    initFreeModeSwiper: function(selector,perView,gap) {
        $(selector).swiper({
            slidesPerView: perView,
            spaceBetween: gap * parseFloat($('html').css('font-size')),
            freeMode: true
        });
    },
    initShare: function(pos) {
        var url = window.location.href;
        var sharelistHTML = '<div class="m-share-list-box"><a href="#" class="m-share-item m-share-item-qq"><img src="/images/v2/icons/ic-qq-2.png" alt="分享qqicon"><span class="u-text">QQ好友</span></a><a href="#" class="m-share-item m-share-item-wechat"><img src="/images/v2/icons/ic-wechat.png" alt="分享qqicon"><span class="u-text">微信</span></a></div>';
        var wechatShareHTML = '<div class="m-share-wechat-box" id="m-share-wechat" style="visibility: hidden;"><div class="m-title-box"><span class="u-title">微信分享</span><button class="icon icon-close"></button></div><div class="u-method">方式1：复制链接发送</div><textarea class="u-url-box">{{url}}</textarea><div class="u-method">方式2：二维码方式</div><div class="u-method-tip">长按二维码保存，在微信分享给好友或朋友圈</div><div class="m-qrcode-box"><img src="{{img-url}}" alt="链接二维码"></div></div>';
        //插入微信分享
        var qrCodeApi = 'http://qr.topscan.com/api.php?w=200&m=0&text=';
        if (window.location.protocol === 'https:') {
            qrCodeApi = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=L|1&chl=';
        }
        wechatShareHTML = wechatShareHTML.replace(/{{url}}/g,url).replace(/{{img-url}}/g,qrCodeApi+encodeURIComponent(url));
        $('body').append(wechatShareHTML);
        //插入分享选项
        $('.m-hover-game-box').append(sharelistHTML);

        // 初始化
        $('.m-share-list-box').css(pos).on('click','.m-share-item-qq',function(e) {
            window.open('http://connect.qq.com/widget/shareqq/index.html?url='+url+'&showcount=0&desc='+document.title+'&summary='+document.title+'&title='+document.title+'&site=&pics=');
        }).on('click','.m-share-item-wechat',function(e) {
            e.preventDefault();
            $(this).parent().fadeOut();
            var h = $('#m-share-wechat.m-share-wechat-box').height();
            $('#m-share-wechat.m-share-wechat-box').css('visibility','visible').animate({
                top: ($(window).height() - h) / 2
            },'fast');
        });

        // 初始化微信分享
        $('#m-share-wechat.m-share-wechat-box').on('load','.m-qrcode-box img',function() {
            $('#m-share-wechat.m-share-wechat-box').css('top',$('#m-share-wechat.m-share-wechat-box').outerHeight()*1.3+'px')
        }).on('click','.m-title-box .icon-close',function(){
            var weChatBoxH = $('#m-share-wechat.m-share-wechat-box').outerHeight()*1.3;
            $('#m-share-wechat.m-share-wechat-box').animate({
                top: - weChatBoxH +'px'
            },'fast');
        });
    },
    initSwiper: function() {
        $('.m-swiper-box .swiper-wrapper').css('visibility','visible');
        $('.m-swiper-box.swiper-container').swiper({
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            autoplay: 5000
        });
    },
    initScrollTopBtn: function() {
        var $btn = $('<div class="u-btn-stop" style="display: none;"></div>');
        $('body').append($btn);
        $btn.click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, 'fast')
        });

        $(window).scroll(function() {
            var st = $(window).scrollTop();
            if (st > $(window).height() / 2) {
                $btn.show();
            } else {
                $btn.hide();
            }
        });
    },
    bindGlobalListender: function() {
        $('.m-backbar .icon-nav-back').click(function() {
            window.history.back();
        });
        $('.m-backbar .icon-nav-search').click(function() {
            window.location.href = '/search/';
        });
        $('.m-backbar .icon-nav-user').click(function() {
            window.location.href = '/e/member/register/';
        });
    },
    fillPageHeight: function() {
        var contentH = $('.m-page-main').height();
        var occupyH = 0;
        $('.m-page-main').each(function() {
            occupyH += $(this).height();
        });
        if (contentH < $(window).height() - occupyH) {
            $('.m-page-main').css({
                height: $(window).height() - occupyH + 'px'
            });
        }
    },

    initTextBroadcast: function() {
        var $items = $('.m-horizongtal-wrapper .u-text');
        var imagineWidth = 0;
        $items.each(function(){
            imagineWidth += $(this).width();
            $('.m-horizongtal-wrapper').append($(this).clone());
        });
        var run = function(){
            var leftVal  = parseInt($('.m-horizongtal-wrapper').css('left'));
            if (leftVal <= -imagineWidth) {
                $('.m-horizongtal-wrapper').css('left',0);
            }else{
                $('.m-horizongtal-wrapper').css('left',leftVal - 1 + 'px');
            }
        }
        setInterval(run,36);
    },

    initDropdownNav: function() {
        var sourceWidth = $('.m-default-nav-box .m-items-box').children().length;
        if($('.m-rank-nav .is-active').parents('.m-other-wrapper').length > 0){
            var $defaultItems = $('.m-rank-nav .m-default-nav-box');
            var $activeItems = $('.m-rank-nav .is-active').parent().parent();
            $defaultItems.after($activeItems.clone().addClass('m-default-nav-box'));
            $('.m-box-wrapper .m-other-wrapper').prepend($defaultItems.clone().removeClass('m-default-nav-box'));
            $defaultItems.remove();
            $activeItems.remove();
        }

        //补齐第一行
        var _fChildLen = $('.m-default-nav-box .m-items-box').children().length;
        var _fillLen = sourceWidth - _fChildLen;
        if (_fillLen > 0) {
            var $fillItems = $('.m-rank-nav .m-other-wrapper .m-nav-box').last().find('.m-items-box').children().slice(-_fillLen);
             $('.m-default-nav-box .m-items-box').prepend($fillItems);
        }

        $('.m-rank-nav .m-box-wrapper .btn-drop').click(function(){
            $(this).toggleClass('is-active');
            $('.m-backbar').slideToggle('slow');
            if ($(this).hasClass('is-active')) {
                $('body').css({
                    height: '100%',
                    overflow: 'hidden'
                })
            }else{
                $('body').css({
                    height: 'auto',
                    overflow: 'auto'
                })
            }
            $('.m-rank-nav .u-mask').toggle();
            $('.m-rank-nav .m-other-wrapper').toggle();
        });
    },

    getDownloadObj: function(downloadlink) {
        var downloadAllObj = {};
        for (var j = 0; j < downloadlink.length; j++) {
            var type = downloadlink[j].type;//exe, ipa, apk
            var jailbreak = downloadlink[j].jailbreak;//"Y","N"
            var defaultpackage = downloadlink[j].defaultpackage;
            if (defaultpackage == 'Y') {
                var k = type;
                if (jailbreak == "Y") {
                    k = k + "-bp";
                }
                downloadAllObj[k] = downloadlink[j];
            }
        }
        return downloadAllObj;
    },

    initAddPageBox: function() {
        var self = this;
        var bindS = function() {
            var st = $(window).scrollTop();
            if (st > 15) {
                $(window).unbind('scroll',bindS);
                self.addPageBox();
            }
        }
        $(window).on('scroll',bindS);
    },

    addPageBox: function() {
        var ua = navigator.userAgent.toLowerCase();
        var browsers = {
            baidu: ua.indexOf("baiduboxapp") > -1,
            qq: ua.indexOf('mqqbrowser') > -1,
            uc: ua.indexOf('ucbrowser') > -1,
            safari: ua.indexOf('safari') > -1 &&ua.indexOf('mqqbrowser')==-1&&ua.indexOf('ucbrowser')==-1 && ua.indexOf('crios') === -1,
            chrome: (ua.indexOf('chrome') > -1 || ua.indexOf('crios') > -1 ) &&ua.indexOf('mqqbrowser')==-1&&ua.indexOf('ucbrowser')==-1
        }
        var _ua = navigator.userAgent.toLowerCase();
        var isSafari = _ua.indexOf('safari') > -1&&_ua.indexOf('mqqbrowser')==-1&&_ua.indexOf('ucbrowser')==-1;
        var isChrome = _ua.indexOf('chrome') > -1;
        var htmlSafari = '<div class="m-add-app-box" style="display:block;"><i class="icon icon-btn-close2"></i></div>';//ios safari
        var htmlUCQQ = '<div class="m-add-app-box uc-qq" style="display:block;"><i class="icon icon-btn-close2"></i></div>';//qq,uc
        var htmlChromeBaidu = '<div class="m-add-app-box google-baidu" style="display:block;"></div>';//qq,uc
        if (browsers.chrome || browsers.baidu) {
            $('body').append(htmlChromeBaidu); 
            /*$(window).scroll(function(){
                var st = $(window).scrollTop();
                if (st > 20) {
                    $('.m-add-app-box').hide();
                }
            });*/
        }else if(browsers.qq || browsers.uc) {
            $('body').append(htmlUCQQ); 
        }else if(browsers.safari) {
            $('body').append(htmlSafari); 
        }
        setTimeout(function() {
            $('.m-add-app-box .icon-btn-close2').click(function() {
                $(this).parent().hide();
            });
            // alert($('.m-add-app-box').position().top+','+$('.m-add-app-box').position().left+',op:'+$('.m-add-app-box').css('opacity')+'dis:'+$('.m-add-app-box').css('display'));
        },0);

        setTimeout(function() {
            $('.m-add-app-box').fadeOut();
        },5000);
    }
}

$(function() {
    InitTool.init();
});


/********************下载提示*************************/
var downloadTip = {
    baiduBrowserHTML: '<div class="u-ios-baidu-wrapper"><div class="m-ios-baidu-box"><div class="g-box-up"><img src="/css/main/images/baidubox-tipimg.png" alt=""><div class="m-copy-wrapper"><span class="u-input"></span><button class="u-btn-copy">全选</button></div></div><div class="g-box-bottom">我知道了</div></div></div>',
    iosDownloadHTML: '<div class="m-box m-box-ios-tip" id="downloadIOSTipPanel3" style="display: none;"><div class="m-ios-downloadtip"><button class="u-btn-close">X</button><div class="m-slider"><img src="/css/main/images/img-ios-guide1.png" alt=""><img src="/css/main/images/img-ios-guide2.png" alt=""><img src="/css/main/images/img-ios-guide3.png" alt=""></div><div class="u-download-timer"></div><div class="m-bottom-wrapper"><div class="m-index-tip"><span class="u-tip-item is-active">1</span><span class="u-tip-item">2</span><span class="u-tip-item">3</span></div><div class="u-button-trust">点我去信任</div><a class="u-button-contact"  target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3308237330&site=qq&menu=yes"><img src="/css/main/images/img-qq.png" alt="">如有疑问请联系客服</a></div></div></div>',
    wechatDownHTML: '<div class="m-wechat-down-box"><div class="u-img"></div></div>',
    init: function() {
        this.addDownloadBox();
        this.iosSlideTip.init();
        this.baiduBrowserTip.init();
    },

    addDownloadBox: function() {
        $('body').append(this.baiduBrowserHTML);
        $('body').append(this.iosDownloadHTML);
        $('body').append(this.wechatDownHTML);
    },

    showWechatBox: function() {
        $('.m-wechat-down-box').fadeIn().unbind().click(function(e){
            e.stopPropagation();
            $(this).fadeOut();
            return false;
        });
    },

    iosSlideTip: {
        isSliding: false,
        isSafari: false,
        curIndex: 1,
        slideWidth: 0,
        $topSelector: null,
        $slider: null,
        $pageTipItem: null,
        $btnCloseThis: null,
        $btnTrust: null,
        init: function() {
            var self = this;
            this.initVariable();
            this.bindEvent();
            // this.$topSelector.show();
            this.resetPosition();
        },

        resetPosition: function() {
            this.$topSelector.css({
                top: ($(window).height() - this.$topSelector.height()) / 2
            });
        },

        initVariable: function() {
            this.$topSelector = $('#downloadIOSTipPanel3');
            this.$slider = this.$topSelector.find('.m-ios-downloadtip .m-slider');
            this.$pageTipItem = this.$topSelector.find('.m-ios-downloadtip .m-index-tip .u-tip-item');
            this.$btnCloseThis = this.$topSelector.find('.u-btn-close');
            this.$btnTrust = this.$topSelector.find('.m-ios-downloadtip .u-button-trust');

            this.slideWidth = this.$slider.width();
            var _ua = navigator.userAgent.toLocaleLowerCase()
            this.isSafari = _ua.indexOf('safari') > -1&&_ua.indexOf('mqqbrowser')==-1&&_ua.indexOf('ucbrowser')==-1;

            if (!this.isSafari) {
                this.$btnTrust.text('查看详细教程');
            }
        },

        /**
         * 监听元素手指拖动
         * @author KuangGuanghu
         * @date   2017-07-05
         * @param  {String}   selector
         * @param  {Function}   fnSlideLeft
         * @param  {Function}   fnSlideRight 
         */
        touchSlider: function(selector, fnSlideLeft, fnSlideRight) {
            var touchX = 0;
            var oSelector = $(selector)[0];
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
        },

        slideHandle: function(dir) {
            if (this.isSliding || (dir == 'left' && this.curIndex == 1) || (dir == 'right' && this.curIndex == 3)) {
                return false;
            }
            this.isSliding = true;
            if (dir == 'left') {
                this.curIndex--;
            } else {
                this.curIndex++;
            }
            this.sliding();
        },

        sliding: function() {
            var self = this;
            var animateLeft = -(this.curIndex - 1) * this.slideWidth;
            this.$slider.animate({
                left: animateLeft
            }, 'fast', function() {
                self.isSliding = false;
            });
            this.$pageTipItem.eq(this.curIndex - 1).addClass('is-active').siblings().removeClass('is-active');
        },

        bindEvent: function() {
            var self = this;
            self.$btnCloseThis.click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                DownloadPopup.stopTimer();
                self.$topSelector.hide();
                return false;
            });

            self.$btnTrust.click(function() {
                if (self.isSafari) {
                    window.location.href = 'http://www.xxzhushou.cn/embedded.mobileprovision';
                } else {
                    window.location.href = 'https://m.119you.com/hynews/747448.shtml';
                }
            });

            self.$pageTipItem.click(function() {
                self.curIndex = parseInt($.trim($(this).text()));
                self.sliding();
            });

            self.touchSlider(self.$topSelector.find('.m-ios-downloadtip'), function() {
                self.slideHandle('left');
            }, function() {
                self.slideHandle('right');
            });
        },

        show: function() {
            this.$topSelector.show();
            this.slideWidth = this.$slider.width();
        }
    },

    baiduBrowserTip: {
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
            }

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
            if(url.indexOf("http") !== 0) {
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
    },

    downloadPreHandle: function(el,elLink) {
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            this.showWechatBox();
            return false;
        }
        if ($(el).hasClass('disabled')) {return;}
        var dataStat = $(el).attr("data-stat");
        if (dataStat) {
            $.get(dataStat);
        }
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {

        }else{
            var _elHref = $(el).attr('href');
            if ($(el).attr('data-href')) {
                _elHref = $(el).attr('data-href');
            }
            window.location.href = _elHref;
            return;
        }
        
        var isBP = $(el).attr("data-isbp") == '1'; //是否苹果越狱，0=否，1=是
        var cpLink = $(el).attr("data-cplink");
        var filepath = $(el).attr("data-filepath");
        var elHref = $(el).attr('href');
        if ($(el).attr('data-href')) {
            elHref = $(el).attr('data-href');
        }
        var elGameId = $(el).attr('data-gameid');
        elHref = elHref.replace('type=apk','type=ipa');

        var _dlStat = elHref;
        if ($(el).attr('data-stat')) {
            _dlStat = $(el).attr('data-stat');
        }
        // filepath && (filepath.indexOf("itunes.apple.com") != -1 || filepath.indexOf("rh.paojiao.cn") != -1)
        if (!isBP) {//官方
            if ($(el).attr('data-stat')) {
                $.get(_dlStat);
            }
            window.location.href = elHref;
        }else{
            //百度手机浏览器
            if (navigator.userAgent.indexOf("baiduboxapp") > -1) {
                _dlStat += '&bdboxapp=1';
                $.get(_dlStat);//统计
                if (elLink) {
                    this.baiduBrowserTip.setCopyHref(elLink);
                }
                this.baiduBrowserTip.show();
            } else {
                // if (filepath && (filepath.indexOf("itunes.apple.com") != -1 || filepath.indexOf("rh.paojiao.cn") != -1)) {//官方
                //     if ($(el).attr('data-stat')) {
                //         $.get(_dlStat);
                //     }
                //     window.location.href = elHref;
                // }else{
                    //显示ios下载提示框
                    DownloadPopup.showIOSPanel3(elHref, _dlStat);
                    downloadTip.iosSlideTip.resetPosition();
                // }
            }
        }

    }
};
var DownloadPopup = {
    _url: "",
    _dataStat: "",
    _sec: 10,
    _timer: null,
    startTimer: function(sec,timerBoxSelector){
        var self = this;
        self.stopTimer();
        self._sec = sec ? sec : 10;
        $(timerBoxSelector).text(self._sec+'s');
        $(timerBoxSelector).show();

        self._timer = window.setInterval(function(){
            self._sec--;
            if (self._sec > 0) {
                $(timerBoxSelector).text(self._sec+'s');
            } else {
                $(timerBoxSelector).text('');
                self.stopTimer();
                window.location.href = self._url;
            }
        }, 1000);
    },
    stopTimer: function(){
        if (this._timer !== null) {
            window.clearInterval(this._timer);
            this._timer = null;
        }
    },
    showIOSPanel3: function(url, dataStat){
        this._url = url;
        this._dataStat = dataStat;
        var isBaiduBrowser = false, isQQBrowser = false;
        if (navigator.userAgent.indexOf("baiduboxapp") > -1 || navigator.userAgent.indexOf("baidubrowser") > -1) {
            isBaiduBrowser = true;
        } else if (navigator.userAgent.indexOf("MQQBrowser") > -1) {
            isQQBrowser = true;
        }
        downloadTip.iosSlideTip.show();
        //【手机qq浏览器倒计时5秒】后自动下载
        if (isQQBrowser) {
            var sec = 5;
            this._dataStat = null;
            this.startTimer(sec,"#downloadIOSTipPanel3 .u-download-timer");
            return false;
        }else{
            window.location.href = this._url;
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
/*********************End-下载提示********************/

/*********************提示****************************/
var tipLayer = {
    toast: function(str) {
        var toastEl= document.createElement('span');
        toastEl.className = "kglayer-toast kglayer-toast-anim";
        toastEl.innerText = str;
        var bodyEl = document.querySelector('body');
        bodyEl.appendChild(toastEl);
        toastEl.addEventListener('animationend',function() {
            setTimeout(function(){
                bodyEl.removeChild(toastEl)
            },500)
        });
    }
}
/*************************************************/