/**
 * 119you.com - 119手游网
 * @version v1.0
 * @link http://m.119you.com
 * @author MidFar(midfar@qq.com) http://midfar.com
 */
$(function(){var l=0;$("#scrollable-container2").length>0&&(l=$("#scrollable-container2 .scrollable li").length,$("#scrollable-container2 .scrollable").width(90*l),$("#scrollable-container2").perfectScrollbar(),$(window).bind("resize",function(){$("#scrollable-container2").perfectScrollbar("update")})),$("#scrollable-container3").length>0&&(l=$("#scrollable-container3 .scrollable li").length,$("#scrollable-container3 .scrollable").width(90*l),$("#scrollable-container3").perfectScrollbar(),$(window).bind("resize",function(){$("#scrollable-container3").perfectScrollbar("update")}))});