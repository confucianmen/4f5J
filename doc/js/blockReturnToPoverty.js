/**
 * Created by qhao on 2019/4/22.
 */
$(function(){

    checkUserInfoDoc();//检查用户是否登录

    getLeftMenu();
});


/**
 * getLeftMenu() 获取菜单
 * 参数说明：
 */

function getLeftMenu(){
    var adPath = '../data/home';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        var application = '';
        $.each(data.scenarios.content, function(index,values){
            application += '<li class="application-scenarios-li"> ' +
                '<a class="application-scenarios-item" href="'+values.href +'"> ' +
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

        // setSlider();

        var newcos = '';
        $.each(data.newCos, function(index,values){
            newcos += '<div class="uc-recomend-ykt uc-course-card-recomend"> ' +
                '<a target="_blank" class="j-href" href="' + values.href+ '"> ' +
                '<div class="uc-recomend-ykt-img uc-course-card-recomend-img"> ' +
                '<img src="' + values.img+ '"> ' +
                '</div> ' +
                '<div class="uc-recomend-ykt-mes uc-recomend-course-mes"> ' +
                '<div class="uc-recomend-ykt-title uc-course-card-recomend-title">' + values.title+ ' </div> ' +
                '</div> ' +
                '</a> ' +
                '</div>';
        });

        $(".uc-recommend-course-list").append(newcos);
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