$(function(){
    $('.m-block-rank .m-checker-wrapper').show();
    InitTool.initSwiper();
    InitTool.initFreeModeSwiper('.m-block-rank .swiper-container',3.35,0.4);
    InitTool.initFreeModeSwiper('.m-block-subject .swiper-container',1.3,0.2);
    InitTool.initTextBroadcast();

    (function(){
        var buttonSelector = '.m-block-rank .u-check-button';
        var wrapperSelector = '.m-block-rank .m-checker-item';
        InitTool.checkListen(wrapperSelector,buttonSelector);
    })();

    (function(){
        var buttonSelector = '.m-contentlist-item-container .m-checker-button-item';
        var wrapperSelector = '.m-contentlist-item-container .m-checker-item';
        InitTool.checkListen(wrapperSelector,buttonSelector);
    })();

    //提示加入桌面
    InitTool.initAddPageBox();

    // 顶部导航栏
    window.onscroll = function() {
        var height = $('.m-column-box').offset().top + $('.m-column-box').height();
        if ($(window).scrollTop() > height) {
            $('.m-naver-top').show();
        }else{
            $('.m-naver-top').hide();
        }
    };

    //初始化下载
    downloadTip.init();
    // 监听下载图标
    (function(){
        $('body').on('click','.icon-download,.u-btn-download',function(e){
            e.preventDefault();
            downloadTip.downloadPreHandle(this,$(this).parents('a').attr('href'));
        });
    })();

    // 自动加载
    (function(){
        var template = '<div class="m-app-item-3"><a href="{{app-link}}"><img src="{{app-image}}"><div class="m-center"><span class="u-name">{{app-name}}</span><span class="u-type">{{app-type}}&nbsp;|&nbsp;{{app-filesize}}</span><div class="m-star-chain-box"><div class="m-star-chain" style="width:{{app-star}}"><span class="icon icon-star-chain"></span></div></div><span class="u-desc">{{app-desc}}</span> </div><div class="m-right"><i class="{{app-icondownload}}" data-href="{{app-datahref}}" data-gameid="{{app-id}}" data-filepath="{{app-filepath}}" data-isbp="{{app-isbp}}" data-cplink="{{app-cplink}}"></i></div></a></div>';
        var handleDataFunc = function(o) {
            var detaillink = o.link ? o.link.replace(resourceprefix, prefix) : "";
            var downloadAllObj = InitTool.getDownloadObj(o.downloadlink);
            //console.log("downloadlink=", o.downloadlink);
            var downloadObj = {};
            var isBP = 0;
            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                if (typeof downloadAllObj.ipa != "undefined") {
                    downloadObj = downloadAllObj.ipa;
                } else {
                    downloadObj = downloadAllObj["ipa-bp"];
                    isBP = 1;
                }
            } else if (browser.versions.android) {
                downloadObj = downloadAllObj.apk;
            } else {//FIXME downloadAllObj["exe"]
                downloadObj = downloadAllObj.apk;
            }

            return {
                'app-link': detaillink,
                'app-image': prefix + addSizeSuffix(o.logofile, 120, 120),
                'app-name': o.name,
                'app-type': o.categoryidname || '未知',
                'app-filesize': (downloadObj && downloadObj.filesize || '--'),
                'app-desc': (o.instruction || ''),
                'app-star': ((o.score || 0) * 20) + '%',
                'app-datahref': prefix + downloadObj.link + '&source=m_index_list',
                'app-id': o.id,
                'app-filepath': downloadObj.filepath,
                'app-isbp': isBP,
                'app-cplink': downloadObj.cplink,
                'app-icondownload': downloadObj ? 'icon icon-download' : 'icon icon-download disabled'
            }
        }

        var getRequestParams = function(moreEl) {
            var type = $(moreEl).attr("data-type");
            var pageIndex = parseFloat($(moreEl).attr("data-pageindex"));
            var pageSize = parseFloat($(moreEl).attr("data-pagesize"));
            return {
                type: type,
                clienttype: getClientType(),
                publishtarget: "Html5",
                pageindex: pageIndex,
                pagesize: pageSize,
                columns: "id,catalogid,logofile,url,link,downloadlink,categoryidname,attribute,newflag,name,filesize,downloadnum,instruction,version,score"
            }
        }

        var props = {
            url: 'api/game/ranking',
            containerEl: '.m-block-more .m-app-list',
            loadMoreEl: '.u-btn-load-more',
            template: template,
            handleDataFunc: handleDataFunc,
            autoLoadNum: 3,
            getRequestParams: getRequestParams,
            // loadFirst: true
        }

        var requestData = new RequestData(props);
    })();
});