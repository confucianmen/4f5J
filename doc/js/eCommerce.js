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
    var adPath = '../data/eCommerce';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        var newcos = '';

        $.each(data, function(index,contents){
            newcos += '<div class="uc-recommend-list-row">' +
                '<div class="uc-recommend-list-row-tit">'+ contents.title + '</div>' +
                '<div class="uc-recommend-list-row-r f-fl">' +
                '<div class="uc-recommend-course-list">';
            $.each(contents.content, function(index,values){
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

            newcos += '</div></div></div>'
        });


        $(".ecommerce-wrapper").append(newcos);
    });

    request.error(function(){
        //console.log("无法加载资源");
    });
};