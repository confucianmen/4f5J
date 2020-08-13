/**
 * Created by qhao on 2016/8/18.
 */
var fadebackInfo = {};
$(function(){
    fadebackInfo.title = "用户反馈";//页面title
    fadebackInfo.email = '';//邮箱
    fadebackInfo.description = '';//问题描述
    $(".loading").css("display","none");

    checkUserInfo();//检查用户是否登录

    //if(window.innerHeight > 688){
    //    $(".footer").addClass('fadeback-footer');
    //}
    //else{
    //    if($(".footer").hasClass('fadeback-footer')){
    //        $(".footer").removeClass('fadeback-footer');
    //    }
    //}
    //
    //$(window).bind('resize', function(e) {
    //    e.preventDefault();
    //    if(window.innerHeight > 688){
    //        $(".footer").addClass('fadeback-footer');
    //    }
    //    else{
    //        if($(".footer").hasClass('fadeback-footer')){
    //            $(".footer").removeClass('fadeback-footer');
    //        }
    //    }
    //});
    init();

    $(".fadeback-code-refresh").click(function(){
        $("#fadeback-code").click();
    });

    $(".fadeback-faq-code-input").focus(function(){
        $(".tip_block").hide();
        $("#tip_text").text("");
    })

})

function init(){
    $("#fadeback-code").empty();
    var codeContainer = document.getElementById("fadeback-code");
    window.codeModel = new vCode(codeContainer);
}

function fadeback_submit(){
    if ($('#suggestion-description').val() == '') {        
        $("#desc-error-tips").show();
        $("#desc-error-tips").text("问题描述不能为空");
        return false;
    }else{
		$("#desc-error-tips").hide();
        $(".loading").css("display","block");
	}
	
	var objName = eval("document.all.useremail");
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(objName.value)) {
        $("#email-error-tips").text("请输入正确的邮箱地址");
		$("#email-error-tips").show();        
        return false;
    }else{
		$("#email-error-tips").hide();
	}	
	
	if($.trim($(".fadeback-faq-code-input").val()) == ""){
        $("#code-error-tips").show();
        $("#code-error-tips").text("验证码不能为空！");
        return;
    }
    var verifyCheckCode = window.codeModel.verify($(".fadeback-faq-code-input").val());
    if(verifyCheckCode == false){
        $("#code-error-tips").show();
        $("#code-error-tips").text("验证码错误！");
        return;
    }	
	$("#code-error-tips").hide();
	
    fadebackInfo.title = "用户反馈";//页面title
    fadebackInfo.email = $.trim($("#useremail").val());//邮箱
    fadebackInfo.description = $.trim($("#suggestion-description").val());;//问题描述

    do_submit_user_feedback(fadebackInfo);
}