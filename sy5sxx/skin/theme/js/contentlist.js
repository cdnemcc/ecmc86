$(function(){function i(i,t){for(var a="",e=0;e<i.length;e++){var l=i[e];l.link=l.link?l.link.replace(resourceprefix,prefix):"";var s=l.summary;"string"==typeof s&&l.summary.replace(/</g,"&lt;").replace(/>/g,"&gt;");var d=new Date(l.publishdate);if("Image"==$(t).attr("data-contenttype")){if(a+='<div class="tr">',a+='	<div class="td td1">',a+='<a href="'+l.link+'" class="tu-list-item">',a+='	<div class="img-div"><img src="'+prefix+addSizeSuffix(l.logofile,120,120)+'" data-original-src="'+prefix+l.logofile+'" data-404-src="'+prefix+'css/main/images/404-pic.png" onerror="loadIconError(this);" class="img" alt="'+l.title+'" /></div>',a+='	<div class="title text1">'+l.title+"</div>",a+="</a>",a+="</div>",e+1<i.length){var r=i[e+1];r.link=r.link?r.link.replace(resourceprefix,prefix):"",a+='<div class="td td2">',a+='<a href="'+r.link+'" class="tu-list-item">',a+='	<div class="img-div"><img src="'+prefix+addSizeSuffix(r.logofile,120,120)+'" data-original-src="'+prefix+r.logofile+'" data-404-src="'+prefix+'css/main/images/404-pic.png" onerror="loadIconError(this);" class="img" alt="'+r.title+'" /></div>',a+='	<div class="title text1">'+r.title+"</div>",a+="</a>",a+="</div>"}a+="</div>",e++}else if("TopicList"==$(t).attr("data-ui"))a+='<a href="'+l.link+'"><div class="list-item1">',a+='    <div class="list-title table">',a+='        <div class="tr">',a+='            <h3 class="td title">'+l.title+"</h3>",a+="        </div>",a+="    </div>",a+='    <div class="list-image">',a+='        <img src="'+prefix+addSizeSuffix(l.logofile,500,500)+'" class="img"  data-original-src="'+prefix+l.logofile+'" data-404-src="'+prefix+'css/main/images/404-pic.png" onload="resizeImage(this);" onerror="loadIconError(this);" />',a+="    </div>",a+='    <div class="list-intro">',a+='        <span class="text">'+s+"</span>",a+="    </div>",a+="</div></a>";else if("GameGiftList"==$(t).attr("data-ui"))a+='<div class="table">',a+='    <div class="tr">',a+='        <div class="td td1">',a+='            <a href="'+l.link+'" class="link"><div class="title">'+l.title+"</div>",a+='            <div class="intro">'+s+"</div></a>",a+="        </div>",a+='        <div class="td td2">',a+='            <a class="circle-button" href="'+l.link+'">领取</a>',a+="        </div>",a+="    </div>",a+="</div>";else if("4"==$(t).attr("data-articletype")){var c=Math.floor(41*Math.random()+60);a+='<a href="'+l.link+'" title="'+l.title+'" class="link"><div class="table">',a+='    <div class="tr">',a+='<div class="td td1">',a+='    <div class="div-img"><img src="'+prefix+addSizeSuffix(l.gamelogo,120,120)+'" class="img" /></div>',a+="</div>",a+='<div class="td td2">',a+='    <h3 class="title text1">'+l.title+"</h3>",a+='    <div class="gift-progress clearfix">',a+='        <div class="text">剩余：</div>',a+='        <div class="progress"><div class="value" style="width:'+c+'%;"></div></div>',a+='        <div class="text">'+c+"%</div>",a+="    </div>",a+='    <div class="intro text1">'+s+"</div>",a+="</div>",a+='<div class="td td3">',a+='    <input type="button" class="btn-get" value="领取" />',a+="</div>",a+="</div>",a+="</div></a>"}else a+='<a href="'+l.link+'" class="link"><div class="table">',a+='            <div class="tr">',a+='        <div class="td td2">',a+='            <div class="title text1">'+l.title+"</div>",a+='            <div class="intro text2">'+s+"</div>",a+='            <div class="intro date"><i class="ic-time"></i>'+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"</div>",a+="        </div>",a+='        <div class="td td1">',a+='            <div class="div-img"><img src="'+prefix+addSizeSuffix(l.logofile,120,120)+'" ',a+='                data-original-src="'+prefix+l.logofile+'" data-404-src="'+prefix+'css/main/images/404-pic.png" onload="resizeImage(this);" onerror="loadIconError(this);" class="img" /></div>',a+="        </div>",a+="    </div>",a+="</div></a>"}"Image"==$(t).attr("data-contenttype")?($(t).parent().prev().prev().find(".table").append(a),$(window).trigger("resize")):$(t).parent().prev().append(a)}function t(t){$(t).hide().next().show();var a=$(t).attr("data-contenttype"),e=$(t).attr("data-ordertype"),l=parseFloat($(t).attr("data-pageindex")),s=parseFloat($(t).attr("data-pagesize")),d=$(t).attr("data-level");$(t).attr("data-level")&&(d=$(t).attr("data-level"));var r={siteid:siteid,level:d,ordertype:e,contenttype:a,pageindex:l,pagesize:s,columns:"id,catalogid,cataloginnercode,logofile,title,summary,link,publishdate,gamelogo"};$(t).attr("data-articletype")&&(r.articletype=$(t).attr("data-articletype")),$(t).attr("data-catalogid")&&(r.catalogid=$(t).attr("data-catalogid")),$(t).attr("data-catalogalias")&&(r.catalogalias=$(t).attr("data-catalogalias")),function(t,a){$.ajax({url:prefix+"api/game/contentdata",type:"POST",data:r,dataType:"json",success:function(e){$(t).attr("data-pageindex",a+1);var l=e._RESULT;i(l,t),e.pagesize*(e.pageindex+1)<e.total&&$(t).show(),"function"==typeof updateLinkDownloadStatus&&updateLinkDownloadStatus()},error:function(){},complete:function(){$(t).next().hide()}})}(t,l)}function a(){$(".block-link-more .link").after('<div class="link loading" style="display:none;">加载中</div>').click(function(){return t(this),!1})}a()});