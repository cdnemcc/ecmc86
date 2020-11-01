function getAjaxZList(n){
	var page = $(".u-btn-load-more").attr("data-pageindex");
	$.ajax({
		type: "get",
		async:false,
		timeout : 1000,
		cache:false, 
		url: "/e/extend/ajaxlist/index1.php",
		data:{
			listid : n,
			page : page
		},
		dataType :'html',
		success : function (data){
			console.log(data);
			if(data*1==1){
				setTimeout(function(){
				$(".u-btn-load-more").text("已加载全部");
				},500);
			}else{
				$(".m-rank-item-wrapper").append(data);
				var p= page*1+1;
				$(".u-btn-load-more").attr("data-pageindex",p);
			}
		}
	})
}




$(function(){
    /*文字轮播*/
    InitTool.initTextBroadcast();
    InitTool.initDropdownNav();
    //初始化下载
    downloadTip.init();
    // 监听下载图标
    (function(){
        $('body').on('click','.icon-download,.u-btn-download',function (e){
            e.preventDefault();
            downloadTip.downloadPreHandle(this,$(this).parents('a').attr('href'));
        });
    })();
    
    if (parseInt($('.m-page-main').attr('data-total')) > 20) {
        // 自动加载
        (function(){
            var template = '<div class="m-app-item-4">\
                                <a href="{{app-link}}">\
                                    <span class="u-rank">0</span>\
                                    <img src="{{app-image}}">\
                                    <div class="m-center">\
                                        <span class="u-name">{{app-name}}</span>\
                                        <span class="u-type">{{app-type}}&nbsp;|&nbsp;{{app-filesize}}&nbsp;{{app-thumb}}</span>\
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
                var appThumb = '';
                return {
                    'app-link': detaillink,
                    'app-image': prefix + addSizeSuffix(o.logofile, 120, 120),
                    'app-name': o.name,
                    'app-type': o.categoryidname || '未知',
                    'app-filesize': (downloadObj && downloadObj.filesize || '--'),
                    'app-thumb': appThumb,
                    'app-desc': (o.instruction || ''),
                    'app-datahref': downloadObj ? (prefix + downloadObj.link + '&source=m_rank') : "",
                    'app-id': o.id,
                    'app-filepath': downloadObj ? downloadObj.filepath : "",
                    'app-isbp': isBP,
                    'app-cplink': downloadObj ? downloadObj.cplink : "",
                    'app-icondownload': downloadObj ? 'icon icon-download' : 'icon icon-download disabled'
                }
            }

            var getRequestParams = function(moreEl) {
                var type = $(moreEl).attr("data-type");
                var rankcode = $(moreEl).attr("data-rankcode");
    	        var pageIndex = parseFloat($(moreEl).attr("data-pageindex"));
    	        var pageSize = parseFloat($(moreEl).attr("data-pagesize"));
    	        var clientType = getClientType();
                return {
                    type: type,//类型（1=下载量，2=UC热度，3=周排行，4=评分, 7=自定义排行）
    	            rankcode: rankcode,
    	            clienttype: clientType,
    	            publishtarget: "Html5",
    	            pageindex: pageIndex,
    	            pagesize: pageSize,
    	            columns: "categoryidname,id,catalogid,logofile,url,link,downloadlink,attribute,newflag,name,filesize,downloadnum,instruction,version,score,description,operationtypename,version,releasedate,versiontime,providername,thumbnum"
                }
            }

            var fullFunc = function(containerEl) {
            	$(containerEl).children().each(function(idx,el){
            		$(el).find('.u-rank').text(idx+4)
            	});
            }

            var preContainer = '';
            if(browser.versions.ios||browser.versions.iPhone||browser.versions.iPad){
                preContainer = "#main_ipa ";
            }else{
                preContainer = "#main_apk ";
            }
            var props = {
                url: 'api/game/ranking',
                containerEl: preContainer+'.m-rank-item-container .m-rank-item-wrapper',
                loadMoreEl: '.u-btn-load-more',
                template: template,
                handleDataFunc: handleDataFunc,
                autoLoadNum: 0,
                getRequestParams: getRequestParams,
                // parentFind: true,
                fullFunc: fullFunc
            }

            var requestData = new RequestData(props);
        })();
    }else{
        $('.u-btn-load-more').hide();
    }

    $('.m-backbar .u-title').text('排行榜');
    $('.m-backbar .icon-nav-back').unbind();
    $('.m-backbar .icon-nav-back').click(function(){
        window.location.href = '/top';
        return false;
    });
});