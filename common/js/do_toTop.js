/**
 * Created by qhao on 2016/8/16.
 */

$(function(){

    //绑定滚动条事件
    //绑定滚动条事件
    $(window).bind("scroll", function () {
        var sTop = $(window).scrollTop();
        var sTop = parseInt(sTop);
        if (sTop >= 200) {
            if (!$(".sb-back2top").is(":visible")) {
                try {
                    $(".sb-back2top").slideDown();
                } catch (e) {
                    $(".sb-back2top").show();
                }
            }
        }
        else {
            if ($(".sb-back2top").is(":visible")) {
                try {
                    $(".sb-back2top").slideUp();
                } catch (e) {
                    $(".sb-back2top").hide();
                }
            }
        }
    });

    $(".sb-qrcode").hover(function(){
        //console.log("qrcode");
        if($("#sb-fadeback").hasClass("item-selected")){
            $("#sb-fadeback").removeClass("item-selected");
        }
        $(".sb-qrcode").addClass("item-selected");
    });

    $(".sb-qrcode").hover(null,function(){
        $(".sb-qrcode").removeClass("item-selected")
    });

    //$(".scroll-item").mouseover(function(){
    //    $(this).css('margin-left','-6px');
    //});
    //
    //$(".scroll-item").mouseout(function(){
    //    $(this).css('margin-left','');
    //});

    $("#model-bottom-tel").hover(function(){
        console.log("qrcode");
        $("#model-bottom-tel").addClass("item-selected");
    });

    $("#model-bottom-tel").hover(null,function(){
        $("#model-bottom-tel").removeClass("item-selected")
    });

    var Dragging=function(validateHandler){ //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
        var draggingObj=null; //dragging Dialog
        var diffX=0;
        var diffY=0;

        function mouseHandler(e){
            switch(e.type){
                case 'mousedown':
                    draggingObj=validateHandler(e);//验证是否为可点击移动区域
                    if(draggingObj!=null){
                        diffX=e.clientX-draggingObj.offsetLeft;
                        diffY=e.clientY-draggingObj.offsetTop;
                    }
                    break;

                case 'mousemove':
                    if(draggingObj){
                        draggingObj.style.left=(e.clientX-diffX)+'px';
                        draggingObj.style.top=(e.clientY-diffY)+'px';
                    }
                    break;

                case 'mouseup':
                    draggingObj =null;
                    diffX=0;
                    diffY=0;
                    break;
            }
        };

        return {
            enable:function(){

                try{
                    document.addEventListener('mousedown',mouseHandler);
                    document.addEventListener('mousemove',mouseHandler);
                    document.addEventListener('mouseup',mouseHandler);
                }
                catch (e) {
                    console.log(e.message);
                    document.attachEvent('mousedown',mouseHandler);
                    document.attachEvent('mousemove',mouseHandler);
                    document.attachEvent('mouseup',mouseHandler);
                }

            },
            disable:function(){

                try{
                    document.removeEventListener('mousedown',mouseHandler);
                    document.removeEventListener('mousemove',mouseHandler);
                    document.removeEventListener('mouseup',mouseHandler);
                }
                catch (e) {
                    console.log(e.message);
                    document.removeEvent('mousedown',mouseHandler);
                    document.removeEvent('mousemove',mouseHandler);
                    document.removeEvent('mouseup',mouseHandler);
                }
            }
        }
    }

    function getDraggingDialog(e){
        var target=e.target;
        while(target && target.className.indexOf('dialog-title')==-1){
            target=target.offsetParent;
        }
        if(target!=null){
            return target.offsetParent;
        }else{
            return null;
        }
    }

    Dragging(getDraggingDialog).enable();

    // $(".sec-home-icon").click(function(){
    //     window.location.href = "../../index.html";
    // });

    $(".header-login").click(function(){
        // window.location.href = "http://www.iotwedora.com/login/";
        window.location.href = "./login.html";
    });
});

//意见反馈
function fadeback(){
    $("#sb-faq .cloud-helper-box").css({
        top:'',
        left:''
    });
    //console.log('fadeback');
    if(!$("#sb-faq").hasClass("item-selected")){
        $("#sb-faq").addClass("item-selected");
    }
    else{
        $("#sb-faq").removeClass("item-selected");
    }
};


//返回顶部
function do_toTop(){
    document.documentElement.scrollTop = document.body.scrollTop =0;
};




function closeFadeback(){
    $("#sb-faq").removeClass("item-selected");
}


//截取 中英文字符串长度
var cutString = function(str, len, hasDot){
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex,"**").length;
    for(var i = 0;i < strLength;i++)
    {
        singleChar = str.charAt(i).toString();
        if(singleChar.match(chineseRegex) != null)
            newLength += 2;
        else
            newLength++;
        if(newLength > len)
            break;
        newStr += singleChar;
    }

    if(hasDot && strLength > len)
        newStr += "...";
    return newStr;
};

/**
 * Check email format
 */
function emailCheck(obj, labelName) {
    var objName = eval("document.all."+obj);
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(objName.value)) {
        //console.log("请输入正确的邮箱地址");
        $("#"+ labelName).show();
        $("#"+ labelName).text("请输入正确的邮箱地址");
        objName.focus();
        $('#' + obj).bind('input propertychange', function() {
            //console.log("test");
            $("#"+ labelName).hide();
            $("#"+ labelName).text("");
        });
        return false;
    }
    return true;
};

function emptyCheck(obj, labelName,text) {
    if ($('#' + obj).val() == '') {
        //console.log("不能为空");
        $("."+ labelName).show();
        $("."+ labelName).text(text);
        $('#' + obj).focus();
        $('#' + obj).bind('input propertychange', function() {
            //console.log("test");
            $("."+ labelName).hide();
            $("."+ labelName).text("");
        });
        return false;
    }
    return true;
};


/*
 * 添加事件处理程序
 * @param object object 要添加事件处理程序的元素
 * @param string type 事件名称，如click
 * @param function handler 事件处理程序，可以直接以匿名函数的形式给定，或者给一个已经定义的函数名。匿名函数方式给定的事件处理程序在IE6 IE7 IE8中可以移除，在标准浏览器中无法移除。
 * @param boolean remove 是否是移除的事件，本参数是为简化下面的removeEvent函数而写的，对添加事件处理程序不起任何作用
 */
function addEvent(object,type,handler,remove){
    if(typeof object!='object'||typeof handler!='function') return;
    try{
        object[remove?'removeEventListener':'addEventListener'](type,handler,false);
    }catch(e){
        var xc='_'+type;
        object[xc]=object[xc]||[];
        if(remove){
            var l=object[xc].length;
            for(var i=0;i<l;i++){
                if(object[xc][i].toString()===handler.toString()) object[xc].splice(i,1);
            }
        }else{
            var l=object[xc].length;
            var exists=false;
            for(var i=0;i<l;i++){
                if(object[xc][i].toString()===handler.toString()) exists=true;
            }
            if(!exists) object[xc].push(handler);
        }
        object['on'+type]=function(){
            var l=object[xc].length;
            for(var i=0;i<l;i++){
                object[xc][i].apply(object,arguments);
            }
        }
    }
}

