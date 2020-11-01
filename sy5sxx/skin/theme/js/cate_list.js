$(function(){
    $('.m-backbar .icon-nav-back').unbind();
    $('.m-backbar .icon-nav-back').click(function(){
        window.location.href = '/search/catagory/';
        return false;
    });

    //最新最熱切換
	(function(){
        var buttonSelector = '.m-rank-item-container .m-titler .u-check-button';
        var wrapperSelector = '.m-rank-item-container .m-checker-wrapper .m-checker-item';
        InitTool.checkListen(wrapperSelector,buttonSelector);
    })();

    var $swiper = $('.m-rank-nav .swiper-container').swiper({
        slidesPerView: 'auto',
        freeMode: true
    });

    InitTool.initDropdownNav();

    //初始化下载
    downloadTip.init();
    // 监听下载图标
    (function(){
        $('body').on('click','.icon-download',function(e){
            e.preventDefault();
            downloadTip.downloadPreHandle(this,$(this).parents('a').attr('href'));
        });
    })();

    // 自动加载
    (function(){
        var gameSource;
        var template = '<div class="m-app-item-4">\
                            <a href="{{app-link}}">\
                                <span class="u-rank">0</span>\
                                <img src="{{app-image}}" onerror="loadIconError(this)">\
                                <div class="m-center">\
                                    <span class="u-name">{{app-name}}</span>\
                                    <span class="u-type">{{app-type}}&nbsp;|&nbsp;{{app-filesize}}&nbsp;</span>\
                                    <span class="u-desc">{{app-desc}}</span>\
                                </div>\
                                <div class="m-right">\
                                    <i class="{{app-icondownload}}" data-href="{{app-datahref}}" data-gameid="{{app-id}}" data-filepath="{{app-filepath}}" data-isbp="{{app-isbp}}" data-cplink="{{app-cplink}}"></i>\
                                </div>\
                            </a>\
                        </div>';

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
            var result =  {
                'app-link': detaillink,
                'app-image': prefix + addSizeSuffix(o.logofile, 120, 120),
                'app-name': o.name,
                'app-type': o.categoryidname || '未知',
                'app-filesize': (o.filesize || '--'),
                'app-desc': (o.instruction || ''),
            }
            var resA = null;
            if (downloadObj) {
                resA = {
                    'app-datahref': prefix + downloadObj.link + gameSource,
                    'app-id': o.id,
                    'app-filepath': downloadObj.filepath,
                    'app-isbp': isBP,
                    'app-cplink': downloadObj.cplink,
                    'app-icondownload': downloadObj ? 'icon icon-download' : 'icon icon-download disabled'
                }
            }else{
                resA = {
                    'app-datahref': '',
                    'app-id': '',
                    'app-filepath': '',
                    'app-isbp': '',
                    'app-cplink': '',
                    'app-icondownload': 'icon icon-download disabled'  
                }
            }
            return $.extend(result,resA)
        }

        var getRequestParams = function(moreEl) {
            gameSource = $(moreEl).attr("data-ordertype") == 1 ? '&source=m_cate_hotlist' : "&source=m_cate_newlist";
            var type = $(moreEl).attr("data-type");
            var siteid = $(moreEl).attr("data-siteid");
	        var ordertype = $(moreEl).attr("data-ordertype");
	        var tags = $(moreEl).attr("data-tags");
	        var pageIndex = parseFloat($(moreEl).attr("data-pageindex"));
	        var pageSize = parseFloat($(moreEl).attr("data-pagesize"));

            return {
            	sid: siteid,
                sorttype: ordertype,
                tagid: tags,
                pageindex: pageIndex,
                pagesize: pageSize,
                publishtargetid:"Html5"
                // columns: "id,catalogid,logofile,url,link,downloadlink,categoryidname,attribute,newflag,name,filesize,downloadnum,instruction,version,score"
            }
        }

        var fullFunc = function(containerEl) {
        	$(containerEl).children().each(function(idx,el){
        		$(el).find('.u-rank').text(idx+1)
        	});
        }

        var props = {
            url: 'api/game/databytag',
            containerEl: '.m-rank-item-wrapper',
            loadMoreEl: '.u-btn-load-more',
            template: template,
            handleDataFunc: handleDataFunc,
            autoLoadNum: 0,
            getRequestParams: getRequestParams,
            parentFind: true,
            fullFunc: fullFunc
        }

        var requestData = new RequestData(props);
    })();
});