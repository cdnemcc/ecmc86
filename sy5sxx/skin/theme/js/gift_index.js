$(function(){
	InitTool.initShare({top: 'auto',bottom: '1rem',left: 0});
    $('.m-hover-game-box .u-share-box').click(function(e) {
        e.preventDefault();
        $('.m-share-list-box').fadeToggle();
    });

    //初始化下载
    downloadTip.init();
    // 监听下载图标
    (function(){
        $('.m-hover-game-box .u-btn-download').on('click',function(e){
            e.preventDefault();
            downloadTip.downloadPreHandle(this,$(this).parents('a').attr('href'));
        });
    })();

    //领取礼包
    var userReceiveGameGift = function(el, giftId){
        $.ajax({
            url: prefix + "api/gamegift/receive",
            type: "POST",
            data: {
                giftid: giftId
            },
            dataType: "json",
            success: function(res){
                if (res._Status == 1) {
                    tipLayer.toast("领取成功！快去个人中心看看吧~");
                    $(el).html("已领取").attr("disabled", true);
                } else if (res._Status == -1 && res._Message == "未登录") {//跳转到登录页面
                    window.location.href = prefix + "member/login?url=" + encodeURIComponent(window.location.href);
                } else {
                    tipLayer.toast(res._Message);
                }
            }
        });
        return false;
    }
   
    if (parseInt($('.m-gift-item-index .m-pregress .u-num').text().trim()) <= 0 || new Date().getTime() - new Date($('.m-gift-item-index .m-center-des .u-type').attr('data-endtime')).getTime() > 0) {
    	$('.m-gift-item-index .u-btn-download').addClass('disabled');
    }else{
	    $('.m-gift-item-index .u-btn-download').click(function(){
	    	if ($(this).hasClass('disabled')) {return false;}
	    	userReceiveGameGift(this,$("#gameGiftIdField").val());
	    });
    }
});