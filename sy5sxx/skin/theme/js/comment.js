var commentApp = {
    isSubmit: false,
    commentItemTemplate: '<div class="div-item">\
                                <div class="div-img"><img src="{{user-portrait-120}}" class="img" data-original-src="{{user-portrait-original}}" data-404-src="{{user-portrait-404}}" onload="resizeImage(this)" onerror="loadIconError(this);"></div>\
                                <div class="div-msg">\
                                    <div class="text-name">{{user-name}}</div>\
                                    <div class="text-content">{{user-comment}}</div>\
                                </div>\
                                <div class="div-praise" data-commentid="{{comment-id}}"><span class="text">{{comment-praise}}</span><i class="icon icon-ic-praise"></i></div>\
                            </div>\
                        ',

    /**
     * 初始化
     * @author KuangGuanghu
     * @date   2017-07-04
     */
    init: function() {
        this.initCommentList();
        this.initPublishComent();
        this.bindPraiseEvent();
    },

    initCommentList: function() {
        var self = this;
        $("#link-simplecomment .link").attr('data-loading','0').click(function() {
            self.requestCommentList(this);
            return false;
        }).trigger("click");
    },

    /**
     * 获取评论列表
     * @author KuangGuanghu
     * @date   2017-07-04
     */
    requestCommentList: function(moreEl) {
        if($(moreEl).attr('data-loading') === '1' || $(moreEl).attr('data-loadall') === '1'){
            return false;
        }
        $(moreEl).attr('data-loading','0');
        $(moreEl).show().text('加载中...');
        var self = this;
        var gameId = $("#gameIdField").val();
        var pageIndex = parseFloat($(moreEl).attr("data-pageindex"));
        var pageSize = parseFloat($(moreEl).attr("data-pagesize"));

        (function(moreEl, pageIndex, pageSize) {
            $.ajax({
                url: prefix + "api/simplecomment/data",
                type: "GET",
                cache: false,
                data: {
                    relaid: gameId,
                    relatype: "Game",
                    columns: "id,member,content,support",
                    pageindex: pageIndex,
                    pagesize: pageSize
                },
                dataType: "json",
                success: function(data) {
                    $(moreEl).attr("data-pageindex", pageIndex + 1);
                    var arr = data.data;
                    self.generateComments(arr, moreEl, pageIndex);
                    if (pageSize * (pageIndex + 1) < data.total) {
                        $(moreEl).text('加载更多').show();
                    }else{
                        $(moreEl).attr('data-loadall','1');
                        $(moreEl).text('已加载全部').hide();
                    }
                },
                error: function(xhr) {},
                complete: function() {
                    $(moreEl).attr('data-loading','0');
                }
            });
        })(moreEl, pageIndex, pageSize);
    },

    generateComments: function(arr, moreEl, pageIndex) {
        if (arr.length === 0) {
            if (pageIndex === 0) {
                $("#list-simplecomment").html('<span class="text text-zero">暂无评论</span>');
            }
            return;
        }
        var html = '',length = arr.length;
        for (var i = 0; i < length; i++) {
            var o = arr[i];
            var src = prefix + 'css/main/images-user/ic-user-default.png';
            var src120 = src;
            var src404 = prefix + 'css/main/images-user/ic-user-default.png';
            if (o.member.logofile) {
                if (o.member.logofile.indexOf('http') !== -1) {
                    src = o.member.logofile;
                    src120 = addSizeSuffix(o.member.logofile, 120, 120);
                }else{
                    src = prefix + o.member.logofile;
                    src120 = prefix + addSizeSuffix(o.member.logofile, 120, 120);
                }
            }
            html += this.commentItemTemplate.replace(/{{user-portrait-120}}/g,src120)
                                            .replace(/{{user-portrait-original}}/g,src)
                                            .replace(/{{user-portrait-404}}/g,src404)
                                            .replace(/{{user-name}}/g,(o.member.realname || o.member.username))
                                            .replace(/{{user-comment}}/g,o.content)
                                            .replace(/{{comment-id}}/g,o.id)
                                            .replace(/{{comment-praise}}/g,o.support);
        }
        $("#list-simplecomment").append(html);
    },

    initPublishComent: function() {
        this.httpGetUserInfo();
        this.bindPublishCommentEvent();
    },

    httpGetUserInfo: function() {
        $.ajax({
            url: prefix + "api/member/logindata",
            type: "GET",
            cache: false,
            data: {
                columns: "realname,username,logofile,signature,score,level,levelid"
            },
            dataType: "json",
            success: function(res) {
                if (res._Status == 1) {
                    var member = res.data;
                    if (member.logofile) {
                        var src,src120;
                        if (member.logofile.indexOf('http') === -1) {
                            src = prefix + member.logofile;
                            src120 = prefix + addSizeSuffix(member.logofile, 120, 120);
                        }else{
                            src = member.logofile;
                            src120 = addSizeSuffix(member.logofile, 120, 120);
                        }
                        $("#form-simplecomment .img").eq(0).attr("data-original-src", src).attr("src", src120);
                    }
                    $("#form-simplecomment .link-not-login").hide();
                    $("#form-simplecomment .textarea").attr("disabled", false);
                    $("#form-simplecomment .btn-submit").attr("disabled", false).show();
                } else { //未登录，用户点击评论后去登录页面
                    $("#form-simplecomment .textarea").attr("disabled", true);
                    $("#form-simplecomment .btn-submit").attr("disabled", true).hide();
                    var url = prefix + "member/login?url=" + encodeURIComponent(window.location.href);
                    $("#form-simplecomment .link-not-login").attr("href", url).show();
                }
            }
        });
    },

    bindPublishCommentEvent: function() {
        var self = this;
        $("#form-simplecomment").submit(function() {
            if (self.isSubmit) {return false;}
            self.isSubmit = true;
            var contentEl = $(this).find(".textarea");
            var content = $.trim(contentEl.val());
            if (content === "") {
                tipLayer.toast(contentEl.attr("placeholder"));
                self.isSubmit = false;
                return false;
            }
            $("#form-simplecomment .textarea").attr("disabled", true);
            var gameId = $("#gameIdField").val();
            $.ajax({
                url: prefix + 'api/simplecomment/submit',
                type: "POST",
                data: {
                    relaid: gameId,
                    acturalrelaid: gameId,
                    extendrelaid: gameId,
                    relatype: "Game",
                    content: content
                },
                dataType: "json",
                success: function(res) {
                    if (res._Status == 1) {
                        tipLayer.toast('评论成功！');
                        $("#form-simplecomment")[0].reset();
                        $("#list-simplecomment").html('');
                        $("#link-simplecomment .link").eq(0).attr('data-loadall',0).attr("data-pageindex", 0).click();
                    }
                },
                complete: function() {
                    self.isSubmit = false;
                    $("#form-simplecomment .textarea").attr("disabled", false);
                }
            });
            return false;
        });
    },

    bindPraiseEvent: function() {
        var ajaxId = null;
        var v = null;
        $("#list-simplecomment").on('click', '.div-praise', function() {
            if (ajaxId !== null) {
                ajaxId.abort();
            }
            var textEl = $(this).find(".text");
            var commentId = $(this).attr("data-commentid");
            if ($(this).hasClass("div-praise-active")) { //取消赞
                $(this).removeClass("div-praise-active");
                v = parseFloat(textEl.html()) - 1;
                textEl.html(v > 0 ? v : 0);
                ajaxId = $.post(prefix + 'api/simplecomment/cancelsupport', {
                    commentid: commentId
                });

            } else { //点赞
                $(this).addClass("div-praise-active");
                v = parseFloat(textEl.html()) + 1;
                textEl.html(v);
                ajaxId = $.post(prefix + 'api/simplecomment/support', {
                    commentid: commentId
                });
            }
        });
    }
};

$(function(){
    commentApp.init();
});