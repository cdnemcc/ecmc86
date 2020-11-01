;
var loadedCount = 0;
function handleScreenshotLoad(el) {
    var imgCount = $(el).parent().siblings().length+1;
    getImgNaturalDimensions(el,function(w,h){
        if (w > h) {
            $(el).parent().css('cssText','width: 5.7rem !important;height: 3.2rem !important;');
        }
        resizeImage(el);
        loadedCount++;
        if (loadedCount === imgCount) {
            InitTool.initFreeModeSwiper('.m-screenshot-box.swiper-container','auto',0.14);
        }
    });
}

$(function() {
	if($('.m-screenshot-box').length>0) {
	    if ($('.m-screenshot-box.swiper-container .swiper-slide img').eq(0).attr('onload').indexOf('resizeImage')>-1) {
	        InitTool.initFreeModeSwiper('.m-screenshot-box.swiper-container','auto',0.14);
	    }
	}
    InitTool.initFreeModeSwiper('.m-block-week-nice .swiper-container',3.35,0.4);
    InitTool.initFreeModeSwiper('.m-game-block-subject .swiper-container',1.3,0.2);
    InitTool.initFreeModeSwiper('.m-game-block-game-like .swiper-container',1.8,0.14);
    InitTool.initTextBroadcast();
    //初始化下载
    downloadTip.init();
    // 监听下载图标
    (function(){
        $('body').on('click','.u-btn-download,.icon-download',function(e){
            e.preventDefault();
            downloadTip.downloadPreHandle(this,$(this).parents('a').attr('href'));
            var isSelfClick = false;
            if ($(e.target).attr('class').indexOf('u-download-fill') > -1 || $(e.target).parent().attr('class').indexOf('u-download-fill') > -1 || $(e.target).parent().attr('class')=="m-td m-right") {
                isSelfClick = true;
            }
            if ($('.u-imgjump-appstore').length>0 && isSelfClick) {
                $('.u-imgjump-appstore').show();
                setTimeout(function(){
                    $('.u-imgjump-appstore').fadeOut();
                },2000);
            }
        });
    })();

    //大图浏览
    (function() {
        var clickHandle = function(e) {
            var offsetX = e.offsetX;
            if (offsetX <= $(e.target).width() / 2) {
                $('.m-scale-img-box').viewer('prev');
            } else {
                $('.m-scale-img-box').viewer('next');
            }
            return false;
        }

        // $('.viewer-container .viewer-canvas img').on('click', clickHandle);
        $('.m-scale-img-box').viewer({
            url: 'data-original-src',
            movable: true,
            shown: function() {},
            viewed: function() {},
        });

        $('.m-screenshot-box .swiper-wrapper img').click(function() {
            $('.m-scale-img-box img').eq($('.m-screenshot-box .swiper-wrapper img').index(this)).click()
        });
    })();

    (function(){
        var wrapperSelector = '.m-content-list-box .m-checker-wrapper .m-checker-item';
        var buttonSelector = '.m-content-list-box .m-titler .u-check-button';
        InitTool.checkListen(wrapperSelector,buttonSelector,function(idx) {
            $('.m-content-list-box .m-checker-item').eq(idx).find('.img-box-wrapper img').each(function() {
                resizeImage(this)
            });
            $('.m-content-list-box .m-titler .u-href').attr('href',$('.m-content-list-box .m-titler .u-check-button').eq(idx).attr('data-href'));
        });
    })();

    $('.u-btn-expand').click(function() {
        $('.m-game-intro .m-content').toggleClass('u-line-3');
        if ($.trim($(this).text()) == '全部') {
            $(this).text('收起');
        }else{
            $(this).text('全部');
        }
    });

    $('.u-other-version-tip').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.m-version-list').toggle();
    });

    InitTool.initShare({top: '1rem',left: 0});
    $('.m-hover-game-box .u-share-box').click(function(e) {
        e.preventDefault();
        $('.m-share-list-box').fadeToggle();
    });

    // 王者荣耀，阴阳师，射雕英雄传。玩家福利群处理
    (function(){
        // 经测试安卓浏览器可以直接打开QQ；苹果Safari和Chrome可以
        var _ua = navigator.userAgent.toLowerCase();
        var isSafari = _ua.indexOf('safari') > -1&&_ua.indexOf('mqqbrowser')==-1&&_ua.indexOf('ucbrowser')==-1;
        var isChrome = _ua.indexOf('chrome') > -1;
         // 修复Safari无法唤醒QQ聊天问题
        $('.m-game-service a').click(function(e){
            if (getClientType() === 'ipa' && (isSafari || isChrome)) {
                e.preventDefault();
                window.open('mqqwpa://im/chat?chat_type=wpa&uin=246957856&version=1&src_type=web&web_src=oicqzone.com');
            }
        });

        if (getClientType === 'apk' || isSafari || isChrome) {
            return false;
        }

        var fuliShareHTML = '<div class="m-share-wechat-box" id="m-share-fuli" style="visibility: hidden;"><div class="m-title-box"><span class="u-title">玩家福利群</span><button class="icon icon-close"></button></div><div class="u-method">方式1：复制QQ号加群</div><textarea class="u-url-box">{{url}}</textarea><div class="u-method">方式2：二维码加群</div><div class="u-method-tip">长按二维码保存，在“QQ扫一扫-相册”中选择二维码加群。</div><div class="m-qrcode-box"><img src="{{img-url}}" alt="链接二维码"></div></div>';
        var qq = '',imgUrl = '';
        switch($.trim($('.u-game-title').text())){
            case '王者荣耀':
                qq = '627411726';
                imgUrl = 'img-code-wangzhe.png';
                break;
            case '阴阳师':
                qq = '116227937';
                imgUrl = 'img-code-yys.png';
                break;
            case '射雕英雄传':
                qq = '634727';
                imgUrl = 'img-code-shediao.png';
                break;
        }
        fuliShareHTML = fuliShareHTML.replace(/{{url}}/g,qq).replace(/{{img-url}}/g,prefix+'images/v2/'+imgUrl);
        $('body').append(fuliShareHTML);

        $('#m-share-fuli.m-share-wechat-box').on('load','.m-qrcode-box img',function() {
            $('#m-share-fuli.m-share-wechat-box').css('top',$('#m-share-fuli.m-share-wechat-box').outerHeight()*1.5+'px')
        }).on('click','.m-title-box .icon-close',function(){
            var weChatBoxH = $('#m-share-fuli.m-share-wechat-box').outerHeight()*1.5;
            $('#m-share-fuli.m-share-wechat-box').animate({
                top: - weChatBoxH +'px'
            },'fast');
        });

        $('#fuli a').click(function(e){
            e.preventDefault();
            var h = $('#m-share-fuli.m-share-wechat-box').height();
            $('#m-share-fuli.m-share-wechat-box').css('visibility','visible').animate({
                top: ($(window).height() - h) / 2
            },'fast');
        });
    })();

    if($('.u-download-fill').length>0){
    	 $(window).scroll(function(){
    	        var sT = $(window).scrollTop();
    	        if (sT > $('.u-download-fill').position().top + $('.u-download-fill').height()) {
    	            $('.m-hover-game-box').show();
    	        }else{
    	            $('.m-hover-game-box').hide();
    	            $('.m-share-list-box').hide();
    	        }
    	    });
    }

    //移除没有内容的项目
    (function(){
        if($('.m-content-list-box .m-checker-wrapper').children().length<1){
            $('.m-content-list-box').remove();
        }

        if($('.m-version-list').children().length < 1){
            $('.m-version-list,.u-other-version-tip').remove();
        }

        if ($('.m-noline-recgame .m-app-list').children().length < 1) {
            $('.m-noline-recgame').remove();
        }
    })();

    var generateStar = function(num){
        num = parseInt(num);
        var html = '',gNum = 5 - num;
        for (var i = 0; i < num; i++) {
            html += '<i class="icon icon-star-y"></i>';
        }
        for (i = 0; i < gNum; i++) {
            html += '<i class="icon icon-star-g"></i>';
        }
        return html;
    };
    (function(){
        $('.m-stars').each(function() {
            if($(this).attr('data-star')){
                $(this).html(generateStar($(this).attr('data-star')));
            }
        })
    })();

    // 视频
    (function(){
        var oVideo = document.getElementById('m-video');
        if (oVideo) {
            var poster = oVideo.poster;
            var _image = new window.Image();
            _image.onload = function() {
                var pW = _image.width;
                var pH = _image.height;
                var videoBoxWidth = $('.m-video-box').width();
                var vH = pH / pW  * videoBoxWidth;
                oVideo.style.height = vH + 'px';
            };
            _image.src = poster;
            
            enableInlineVideo(oVideo);
            oVideo.addEventListener('play',function(){
                this.style.height = 'auto';
                $('.u-video-tip').hide();
            },false);

            $(window).scroll(function(){
                var stop = $(window).scrollTop();
                if (stop > $(oVideo).offset().top + $(oVideo).height()) {
                    oVideo.pause();
                }
            });
        }
    })();

    // 获取相似最新游戏
    var createGameItem = function(data){
        var template = '<div class="swiper-slide m-game-item-l">\
        					<a href="{{game-href}}">\
					        <div class="m-up">\
					            <img class="u-logo" src="{{game-logo}}" alt="" onerror="loadIconError(this)">\
					            <div class="m-right">\
					                <div class="u-title">{{game-name}}</div>\
						                <div class="u-type">{{game-category}}</div>\
					                	<div class="m-star-box">\
					                    <div class="m-stars">\
        									{{game-star}}\
					                    </div>\
					                    <span class="u-star-num">{{game-score}}</span>\
					                </div>\
					            </div>\
					         </div>\
					         <div class="m-bottom">\
        						{{game-instruction}}\
					         </div>\
					         </a>\
					     </div>';
        return template.replace(/{{game-href}}/g,data.link)
                    .replace(/{{game-logo}}/g,prefix+addSizeSuffix(data.logofile,120,120))
                    .replace(/{{game-name}}/g,data.name)
                    .replace(/{{game-category}}/g,data.categoryidname || '--')
                    .replace(/{{game-star}}/g,generateStar(data.score))
                    .replace(/{{game-score}}/g,data.score.toFixed(1))
                    .replace(/{{game-instruction}}/g,data.instruction);
    };
    //推荐相似游戏
    (function(gameid) {
        $.ajax({
            url: prefix+"api/game/recommend",
            type: "POST",
            data: {clienttype: getClientType(),gameid:gameid,publishtarget:'Html5',pageindex:0,pagesize:8,columns:'name,link,score,categoryidname,logofile,instruction'},
            dataType: "json",
            success: function(data){
                if (data._Status == 1) {
                    var result = data._RESULT;
                    var _html1 = '';
                    for(var i=0;i<8&&i<result.length;i++){
                        _html1 += createGameItem(result[i]);
                    }
                    $('.m-game-block-game-like .swiper-wrapper').html(_html1);
                    InitTool.initFreeModeSwiper('.m-game-block-game-like .swiper-container',1.8,0.14);
                }
            }
        });
    })($('#u-gameid').val());
    
    //安装必读
    setTimeout(function(){
        (function(){
            var isBp = $('.u-download-fill').attr('data-isbp') === '1';
            if (getClientType() === 'ipa' && isBp) {
                var html = '<div class="m-install-warning-box">\
                                <div class="m-close-box">\
                                    <button class="u-btn-close">X</button>\
                                </div>\
                                <div class="m-content-wrapper">\
                                    <div class="ut-fill-top"></div>\
                                    <h1 class="panel-title"><span class="hidden">安装教程说明</span></h1>\
                                    <div class="panel-content">\
                                        <h3><i class="icon"></i>打开游戏时，请记住划线部分的内容</h3>\
                                        <p><img src="../css/main/images/tip_ios_1.jpg" class="img"></p>\
                                        <p style="margin-top:10px;"><i class="icon"></i>打开设置 -&gt; 通用 -&gt; 描述文件</p>\
                                        <p><img src="../css/main/images/tip_ios_2.jpg" class="img"></p>\
                                        <p style="margin-top:10px;"><i class="icon"></i>找到对应描述文件 -&gt; 点击信任</p>\
                                        <p><img src="../css/main/images/tip_ios_3.jpg" class="img"></p>\
                                        <div class="div-notice">\
                                            <p>注：</p>\
                                            <p>1. 如果出现在通用中找不到描述文件的情况</p>\
                                            <p class="text-bold">解决方案为：多次尝试关闭设置，并重新进入通用。或者重启手机</p>\
                                            <p>2. 当点击验证，有时会出现无法验证通过的情况</p>\
                                            <p class="text-bold">解决方案为：切换手机网络，这种情况通常是网络原因造成的</p>\
                                        </div>\
                                    </div>\
                                    <div class="panel-footer table">\
                                        <div class="tr">\
                                            <div class="td td1">\
                                                <div class="panel-btn btnCancel">下次提醒</div>\
                                            </div>\
                                            <div class="td td2">\
                                                <div class="panel-btn btnOK">不再提示</div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="ut-fill-bottom"></div>\
                                </div>\
                                <div class="m-buttons-wrapper">\
                                    <a href="http://m.119you.com/hynews/747448.shtml" class="u-btn-check-full">查看完整版图文教程</a>\
                                    <a href="javascript:;" class="u-btn-closethis">关闭</a>\
                                </div>\
                        </div>';
                $('body').append(html);
                $('body').on('click','.m-install-warning-box .u-btn-close,.m-install-warning-box .u-btn-closethis',function(){
                    $('.m-install-warning-box').hide();
                });
                $('.u-install-tip').click(function(e){
                    e.preventDefault();
                    $('.m-install-warning-box').show();
                });
            }else if(getClientType() === 'ipa' && !isBp) {
            	$('.u-download-fill').prepend('苹果商店');
            	$('.m-install-warning-box,.u-install-tip').hide();
                // UC中添加跳转官方应用商店提示
                if(navigator.userAgent.toLowerCase().indexOf('ucbrowser') > -1){
                    var _html = '<img src="../images/v2/ic-jump-appstore.png" class="u-imgjump-appstore" alt="跳转官方应用商店提示">';
                    $('body').append(_html);
                }
            }else{
                $('.m-install-warning-box,.u-install-tip').hide();
            }
        })();    	
    },0);
});