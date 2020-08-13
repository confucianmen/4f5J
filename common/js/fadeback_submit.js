/**
 * Created by qhao on 2016/8/19.
 */
var fadebackInfo = {};
$(function(){
    fadeback_submit_init();

});


/**
 * getTopic() 热点问题
 * 参数说明：
 */

function getTopic(adPath){
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        console.dir(data);
        var topic = "";
        var tiopicIndex = 1;

        topic += '<div id="topic-1001-000"> ' +
        '<div class="cloud-helper-box-list-tit"> ' +
        '<a title="如何获取平台账号？" onclick=' + 'javascript:openDetail("topic-1001-000")>' +
        '如何获取平台账号？'  +
        '</a> <span class="label hot-label">hot</span> ' +
        '</div> ' +
        '<div class="cloud-helper-box-list-con" style="display: none;"> ' +
        '<p> <span style="font-size: 14.0px;"> <span style="font-family: microsoft yahei;">' +
        '平台的账号是后台注册管理的，请联系乡智网技术支持。' +
        '</span> </span> </p>' +
        '</div></div>';
        $.each(data, function(index0,value){
            $.each(value.content, function(index,content){
                //console.log(values);
                if(tiopicIndex < 6){
                    topic += '<div id="' + content.id + '"> ' +
                    '<div class="cloud-helper-box-list-tit"> ' +
                    '<a title="' + content.title + '" onclick=' + 'javascript:openDetail("' + content.id + '")>' +
                    content.title  +
                    '</a> ' +
                    '</div> ' +
                    '<div class="cloud-helper-box-list-con" style="display: none;"> ';
                    $.each(content.content, function(idx0,detailContent){
                        $.each(detailContent.detail, function(idx,detail){
                            topic += '<p> <span style="font-size: 14.0px;"> <span style="font-family: microsoft yahei;">' +
                            detail +
                            '</span> </span> </p> ';
                        });
                    });
                    topic += '</div></div>';
                    tiopicIndex++;
                }
            });

        });
        $( "#home-topic").append(topic);
    });

    request.error(function(){
        //console.log("无法加载资源");
    });
};


function openDetail(id){
    //console.log("点击" +id);
    if( $("#" + id + " .cloud-helper-box-list-con").css("display")=='none' ) {
        $(".cloud-helper-box-list-con").css("display",'none');
        $("#" + id + " .cloud-helper-box-list-con").css("display",'block');
        $(".cloud-helper-box-panel").height(235);
    }
    else{
        $("#" + id + " .cloud-helper-box-list-con").css("display",'none');
        $(".cloud-helper-box-panel").height('');
    }
}



function checkUserInfo(){
    var token =$.cookie('_cookie_token');
    var username = $.cookie("_cookie_username");
    var password = $.cookie("_cookie_password");
    console.log(token);
    console.log(username);
    console.log(password);
    if(username != null && username != 'null' && password != null && password != 'null' ){
        var username = unescape($.cookie("_cookie_username"));

        $(".header-no-login").css('display','none');
        $(".header-user").css('display','block');
        $(".header-userName").text(username);
        // $(".header-rolename").text(rolename);

        $(".user_name,.user_operate").hover(function(){
            $(".user_logout_container").removeClass("user_logout_container_default");
            $(".user_logout_container").addClass("user_logout_container_hover");
            $(".user_logout_option").hover(function(){
                $(this).find(".user_logout").removeClass("user_logout_default");
                $(this).find(".user_logout").addClass("user_logout_hover");
                $(this).find(".user_logout_clicktext").css("color","#00aaee");
            },function(){
                $(this).find(".user_logout").addClass("user_logout_default");
                $(this).find(".user_logout").removeClass("user_logout_hover");
                $(this).find(".user_logout_clicktext").css("color","#848383");
            });
        });
        $(".user_logout_container").hover(null,function(){
            $(".user_logout_container").removeClass("user_logout_container_hover");
            $(".user_logout_container").addClass("user_logout_container_default");
        });

        $(".header_logout_option").click(function(){
            // $.cookie("_cookie_token",'');
            $.cookie('_cookie_username', null);   //通过传递null作为cookie的值即可
            $.cookie('_cookie_password', null);   //通过传递null作为cookie的值即可
            // $.cookie('_cookie_rolename', '');
            // $.cookie('_cookie_appname', '');

            $(".header-no-login").css('display','block');
            $(".header-user").css('display','none');
            window.location.href = "../../login.html";
        })

        // $(".user_name").click(function(){
			// var token = $.cookie("_cookie_token");
			// var appname = $.cookie("_cookie_appname");
			//
        //     window.location.href = "http://www.iotwedora.com" + appname + "/index.hd?token=" + token;
        // })
    }
    else{
        $(".header-no-login").css('display','block');
        $(".header-user").css('display','none');
        window.location.href = "../../login.html";
    }

}

function checkUserInfoDoc() {
    var token =$.cookie('_cookie_token');
    var username = $.cookie("_cookie_username");
    var password = $.cookie("_cookie_password");
    console.log(token);
    console.log(username);
    console.log(password);
    if(username != null && username != 'null' && password != null && password != 'null' ){
        var username = unescape($.cookie("_cookie_username"));

        $(".header-no-login").css('display','none');
        $(".header-user").css('display','block');
        $(".header-userName").text(username);
        // $(".header-rolename").text(rolename);

        $(".user_name,.user_operate").hover(function(){
            $(".user_logout_container").removeClass("user_logout_container_default");
            $(".user_logout_container").addClass("user_logout_container_hover");
            $(".user_logout_option").hover(function(){
                $(this).find(".user_logout").removeClass("user_logout_default");
                $(this).find(".user_logout").addClass("user_logout_hover");
                $(this).find(".user_logout_clicktext").css("color","#00aaee");
            },function(){
                $(this).find(".user_logout").addClass("user_logout_default");
                $(this).find(".user_logout").removeClass("user_logout_hover");
                $(this).find(".user_logout_clicktext").css("color","#848383");
            });
        });
        $(".user_logout_container").hover(null,function(){
            $(".user_logout_container").removeClass("user_logout_container_hover");
            $(".user_logout_container").addClass("user_logout_container_default");
        });

        $(".header_logout_option").click(function(){
            // $.cookie("_cookie_token",'');
            $.cookie('_cookie_username', null);   //通过传递null作为cookie的值即可
            $.cookie('_cookie_password', null);   //通过传递null作为cookie的值即可
            // $.cookie('_cookie_rolename', '');
            // $.cookie('_cookie_appname', '');

            $(".header-no-login").css('display','block');
            $(".header-user").css('display','none');
            window.location.href = "../../login.html";
        })

        // $(".user_name").click(function(){
        // var token = $.cookie("_cookie_token");
        // var appname = $.cookie("_cookie_appname");
        //
        //     window.location.href = "http://www.iotwedora.com" + appname + "/index.hd?token=" + token;
        // })
    }
    else{
        $(".header-no-login").css('display','block');
        $(".header-user").css('display','none');
        window.location.href = "../../login.html";
    }
}

function fadeback_submit_init(){
    $(".loading").css("display","none");
    $("#show_question").html($("#feedback_form").html());
    $("#q2").attr("checked",false);
    $("#q1").prop("checked", true);
    $("#q1b").css("display","none");//是否满意选择select隐藏
    fadebackInfo.title = $("#accessTitle").text();//页面title
    fadebackInfo.val = 1;//是否满意，1满意，0不满意
    fadebackInfo.info = '';//不满意的理由

    $(":radio").click(function(){
        //console.log($(this).val());
        if($(this).val() == 0){
            $("#q1b").css("display",'');
            fadebackInfo.val = $(this).val();
            $("#q1b").change(function(){
                var checkText=$("#q1b").find("option:selected").text();
                //console.log(checkText);
                fadebackInfo.info = checkText;
            })
        }
        else{
            fadeback_submit_init();
        }
    });

    //$("#submit-page-fadeback").off().click(function(){
    //    do_submit();
    //})
    $("#submit-page-fadeback").bind("click",function(){
        do_submit();
        $(this).unbind("click");
        setTimeout('$(this).bind("click")',3000); //3秒还原按钮代码
    });
};

function do_submit(){
    console.log(fadebackInfo);
    $(".loading").css("display","block");
    do_submit_page_feedback(fadebackInfo);
};


/**
 * do_submit_page_feedback() 提交页面反馈
 * 参数说明：
 */
function do_submit_page_feedback(page){
    // var url = "http://www.iotwedora.com/api/doc/feedback/help/assess";
    // var postdata = {page:page.title,status:page.val,content:page.info};
    // $.ajax({type: "POST",url:url,data: postdata,dataType: 'jsonp',jsonp: 'callback',
    //     success: function(result){
    //         $(".loading").css("display","none");
    //         $("#show_question").html($("#feedback_result").html());
    //     }
    // });
}

/**
 * do_submit_usere_feedback() 提交用户反馈
 * 参数说明：
 */
function do_submit_user_feedback(page){
    // var url = "http://www.iotwedora.com/api/doc/feedback/sys/assess";
    // var postdata = {email:page.email,content:page.description};
    // $.ajax({type: "POST",url:url,data: postdata,dataType: 'jsonp',jsonp: 'callback',
    //     success: function(result){
    //         $(".loading").css("display","none");
    //         $("#show_question").html($("#feedback_result").html());
    //     }
    // });
}

function restart(tab){
    $('#'+tab +' a:first').tab('show');//初始化显示哪个tab
    fadeback_submit_init();
}



/**
 * getHotInfo() 获取菜单
 * 参数说明：
 */

function getHotfo(moreUrl){
    console.log(moreUrl);
    var adPath = 'http://www.iotwedora.com/api/doc/update/history/?size=6';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'jsonp' //类型
    });

    request.success(function(data) {//加载广告成功
        console.log(data);
        var announcement = "";
        var announcementmenu = "";

        announcementmenu += '<li class="sub-text sub-text-selected"> ' +
        '<a href="javascript:;">最新</a> ' +
        '</li>';

        announcement += '<div class="newsSubList"> ' +
        '<div class="unit-box"> <ul class="news-list">';

        var listIndex = 0;
        $.each(data.result, function(index,result){
            //var dataTime = result.data_time;
            //console.log(typeof(dataTime));
            //console.log(dataTime);
            $.each(result.content, function(index,values){

                if(listIndex <3){
                    announcement += '<li class="news"> ' +
                    '<a class="news-item" title="' + values.data  + '"> ' +
                    '<span class="date">' + result.data_time + '</span><span class="stick">|</span> ' +
                    '<span class="text">' + values.data  + '</span> ' +
                    (listIndex == 0 ? '<span class="label">hot</span> ' : '') +
                    '</a> ' +
                    '</li>';
                }
                else if(listIndex == 3){
                    announcement += '</ul><ul class="news-list">';
                    announcement += '<li class="news"> ' +
                    '<a class="news-item" title="' + values.data  + '"> ' +
                    '<span class="date">' + result.data_time + '</span><span class="stick">|</span> ' +
                    '<span class="text">' + values.data  + '</span> ' +
                    '</a> ' +
                    '</li>';
                }
                else if(listIndex >3 && listIndex < 6){
                    announcement += '<li class="news"> ' +
                    '<a class="news-item" title="' + values.data  + '"> ' +
                    '<span class="date">' + result.data_time + '</span><span class="stick">|</span> ' +
                    '<span class="text">' + values.data  + '</span> ' +
                    '</a> ' +
                    '</li>';
                }
                listIndex++;
            });
        });

        announcement += '</ul>' +
        '</div> ' +
        '<p class="text-line"><a href=" ' + moreUrl + '" class="links">查看全部</a></p> ' +
        '</div>';

        $( "#newsList").append(announcementmenu);
        $( ".newsSubList-wrap").append(announcement);

        $("#newsList li").each(function(index){
            //console.log("test mouseover");
            $(this).on('touchstart mousedown mouseover',function(e){
                e.preventDefault()
                $("#newsList .sub-text-selected").removeClass('sub-text-selected')
                $(this).addClass('sub-text-selected');
                $(".newsSubList").css("display",'none');
                var newsSubList = $(".hot-dynamics-content-left").find(".newsSubList").eq(index);
                newsSubList.css("display",'block');
            });
        });
    });

    request.error(function(){
        //console.log("无法加载资源");
    });
}







$(function(){
    var marqueeScroll = function(id1,id2,id3,timer){
        var $parent = $("#"+id1);
        var $goal = $("#"+id2);
        var $closegoal = $("#"+id3);
        $closegoal.html($goal.html());
        function Marquee (){
            if(parseInt($parent.scrollLeft())-$closegoal.width()>=0)
            {
                $parent.scrollLeft(parseInt($parent.scrollLeft())-$goal.width());
            }
            else
            {
                $parent.scrollLeft($parent.scrollLeft()+1);
            }
        }
        setInterval(Marquee,timer);
    }
    var marqueeScroll1 = new marqueeScroll("marquee-box","wave-list-box1","wave-list-box2",20);
    var marqueeScroll1 = new marqueeScroll("marquee-box2","wave-list-box3","wave-list-box4",30);
    var marqueeScroll2 = new marqueeScroll("marquee-box3","wave-list-box5","wave-list-box6",40);
})
