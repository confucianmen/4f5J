/**
 * Created by qhao on 2019/4/22.
 */

$(function(){

    $('#slides2').jslide();
    console.log($(".slide_wrap").width());

    $(".slide_wrap").css('height',560/1920*$(".slide_wrap").width());
    $(".slide_wrap .slide").css('height',560/1920*$(".slide_wrap").width());
    $(".slide_wrap .slide li").css({
        'height':560/1920*$(".slide_wrap").width()
    });
    $('.slide_wrap .paginationslide').css('top',560/1920*$(".slide_wrap").width()-28)

    checkUserInfo();//检查用户是否登录

    getHomeInfo();//生成菜单及获取公告

    getHomeNews();//获取新闻公告

    getTrainingNotice();

    var adPath = '../data/faq';
    getTopic(adPath);//获取热点问题
});


/**
 * getHelpMenu() 获取菜单
 * 参数说明：
 */

function getHomeInfo(){
    var adPath = '../data/home';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        //console.dir(data);

        var introduction = "";
        $.each(data.introduction.content, function(index,values){
            var introductionLink = '';
            if(index == data.introduction.content.length-1){
                // introductionLink = '<a class="platform-introduction-btn" href="./doc/web/platform-details.html">[平台详情]</a>';
            }
            introduction += '<p>' + values + introductionLink + '</p>';
        });

        $("#main-indroduction").append(introduction);


        // var functions = "";
        // $.each(data.functions.content, function(index,values){
        //     functions += '<li class="main-funtion-unit"> ' +
        //     '<div class="main-funtion-unit-icon  ' + values.iconCss + '"></div> ' +
        //     '<div class="main-funtion-unit-title">' + values.title + '</div> ' +
        //     '<div class="main-funtion-unit-detail">' + values.detail + '</div> ' +
        //     '</li>';
        // });
        // $("#main-functions").append(functions);

        var reasons = "";
        $.each(data.reasons.content, function(index,values){
            reasons += '<li class="choose-reason"> ' +
            '<div class="choose-reason-icon  ' + values.iconCss + '"></div> ' +
            '<div class="choose-reason-title">' + values.title + '</div> ' +
            '</li>';
        });
        $("#main-reasons").append(reasons);


        var application = '';
        $.each(data.scenarios.content, function(index,values){
            application += '<li> ' +
            '<a class="application-scenarios-item"> ' +
            '<div class="application-scenarios-item-detail-mask"> ' +
            '<div class="application-scenarios-item-detail-mask-cover"></div> ' +
            '<div class="application-scenarios-item-icon   ' + values.source + '"></div> ' +
            '<div class="application-scenarios-item-iconbg-wrap"> ' +
            '<div class="application-scenarios-item-iconbg   ' + values.iconCss + '"></div> ' +
            '</div> ' +
            '<div class="application-scenarios-item-detail"> ' +
            '<div class="application-scenarios-item-squre"></div> ' +
            '<div class="application-scenarios-item-text">' + values.title + '</div> ' +
            '<div class="application-scenarios-item-decription">' + values.detail + '</div> ' +
            '</div> ' +
            '</div> ' +
            '</a> ' +
            '</li>';
        });
        $("#application-scenarios").append(application);
        setSlider();


        var superiorityInfo = "";
        $.each(data.superiority, function(index,values){
            //console.log(values);
            //截取 中英文字符串长度
            var detailInfo = cutString(values.detail,40,1);
            superiorityInfo += '<li href="./doc/web/service-introduction.html#index=' + index + '" class="' + values.liclass + ' clearfix" title="' + values.detail + '"> ' +
            '<div class="superiority-left"> ' +
            '<div class="home-superiority-title">' + values.title + '</div> ' +
            //'<div class="home-superiority-description">' + detailInfo + '</div> ' +
            '</div> ' +
            '<div class="superiority-right ' + values.animation + '"></div> ' +
            '</li>';
        });
        $( ".home-superiority-wrap ul").append(superiorityInfo);

        // $( ".home-superiority-wrap ul li").each(function(i){
        //     $(this).click(function(){
        //         window.location.href =  $(this).attr('href');
        //     })
        // })

        $(".superiority-safe").mouseout(function(){
            $(".superiority-safe").addClass("superiority-safe-out");
            setTimeout(function(){
                $(".superiority-safe").removeClass("superiority-safe-out");
            },2000)
        })

        $(".superiority-performance").mouseout(function(){
            $(".superiority-performance").addClass("superiority-performance-out");
            setTimeout(function(){
                $(".superiority-performance").removeClass("superiority-performance-out");
            },4000)
        })

        $(".superiority-service").mouseout(function(){
            $(".superiority-service").addClass("superiority-service-out");
            setTimeout(function(){
                $(".superiority-service").removeClass("superiority-service-out");
            },4000)
        })

        $(".superiority-stable").mouseout(function(){
            $(".superiority-stable").addClass("superiority-stable-out");
            setTimeout(function(){
                $(".superiority-stable").removeClass("superiority-stable-out");
            },4000)
        })

        $(".superiority-custom").mouseout(function(){
            $(".superiority-custom").addClass("superiority-custom-out");
            setTimeout(function(){
                $(".superiority-custom").removeClass("superiority-custom-out");
            },4000)
        })

        var partners = '';
        $.each(data.partners.content, function(index,values){
            //console.log(values);
            if(index > 4){
                partners += '<li class="main-partner main-partner-nextrow"> ' +
                '<div class="main-partner-icon  ' + values.iconCss + '"></div> ' +
                '</li>';
            }
            else{
                partners += '<li class="main-partner"> ' +
                '<div class="main-partner-icon  ' + values.iconCss + '"></div> ' +
                '</li>';
            }
        });

        $("#main-partners").append(partners);
    });

    request.error(function(){
        //console.log("无法加载资源");
    });
};

//获取新闻公告
function getHomeNews(){
    var adPath = '../data/home-news';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        var news = "";
        $.each(data, function(index,values){
            //console.log(values);
            news += '<li class="element">' +
                '<a href="' + values.href+ '" target="_blank" title="' + values.title+ '">' + values.content+ '</a>' +
                '<span style="float:right;color:#676363;">' + values.time+ '</span></li>';
        });
        $( "#scheme_list").append(news);
    });
}

//获取培训通知
function getTrainingNotice() {
    var adPath = '../data/home-notices';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        var notices = "";
        $.each(data, function(index,values){
            //console.log(values);
            notices += '<li class="element">' +
                '<a href="' + values.href+ '" target="_blank" title="' + values.title+ '">' + values.content+ '</a>' +
                '<span style="float:right;color:#676363;">' + values.time+ '</span></li>';
        });
        $( "#cultivate_list").append(notices);
    });
}


/**
 * getAd() 获取广告
 * 参数说明：
 */

function getAd(){
    var adPath = '../../banner/data/home';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        //console.dir(data);
        var SlideDiv = "";
        var sliderNumberBox = "";
        $.each(data.img, function(index,values){
            //console.log(values);

            SlideDiv += '<li style="background-image: url(' + values.src + ') no-repeat center top;">' +
            '<a href="" target="_blank"></a> ' +
            '</li>';
        });
        $( "#slides2").append(SlideDiv);
        $('#slides2').jslide();
    });

    request.error(function(){
        //console.log("无法加载资源");
    });
};

function setSlider(){
    $('#application-scenarios').bxSlider({
        slideWidth: 260,
        minSlides: 2,
        maxSlides: 4,
        slideMargin: 0,
        pager:false
    });
}