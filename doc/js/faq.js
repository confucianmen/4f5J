/**
 * Created by qhao on 2016/8/22.
 */
$(function(){

    checkUserInfoDoc();//检查用户是否登录

    getFaqDetail();// 获取常见问题

});


/**
 * getFaqDetail() 获取常见问题
 * 参数说明：
 */

function getFaqDetail(){
    var adPath = '../data/faq';
    //解析广告文件
    var request = $.ajax({
        url: adPath ,
        type: "GET",
        dataType: 'json' //类型
    });

    request.success(function(data) {//加载广告成功
        console.log(data);
        var faqMenu = '';
        var faqSecMenu = '';

        $.each(data, function(index0,result){
            if(index0 == 0){
                $("#currentType").text(result.type);
            }

            faqMenu += '<li><a onclick=javascript:changeType(this,"' + result.typeId + '") title="' + result.type + '">' + result.type + '</a></li>';;

            faqSecMenu += '<div class="faq-doc-text-box tab-pane ' + (index0 == 0 ? 'active':'') + '" id="' + result.typeId + '"> ' +
            '<div class="box-title"> ' +
            '<h1><span class="box-title-span">' + result.type + '</span>常见问题</h1> ' +
            '</div> ' +
            '<div class="tags-box"> ' +
            '</div> ' +
            '<div class="toc-box J-tocBox"> ' +
            '<ul class="toc-list J-residentTocList">';

            var faqData = '';

            $.each(result.content, function(index,values){
                faqSecMenu += '<li> ' +
                '<a href="#' + values.id + '" title="' + (index +1 ) + '、' + values.title + '">' + (index +1 ) + '、' +  values.title + '</a> ' +
                '</li>';


                faqData += '<div class="docArticleContent"> ' +
                '<h2 id="' + values.id + '">' + (index +1 ) + '、' + values.title + '</h2>';

                $.each(values.content, function(index1,content){
                    faqData += '<div> ';
                    $.each(content.detail, function(idx,detail){
                        faqData += '<p>' + detail + '</p> ';
                    });
                    if(content.img){
                        $.each(content.img, function(idx,img){
                            faqData += '<img src="' + img.src + '"> ';
                        });
                    }

                    faqData += '</div>';
                });

                faqData += '</div>';
            });

            faqSecMenu += '</ul> </div>';
            faqSecMenu += faqData;
            faqSecMenu += '</div>';
        });

        $("#deviceAccessTab").append(faqMenu);
        $(".faq-doc-text-box-wrap").append(faqSecMenu);
        $(".faq-menu-wrap").height($(".faq-content-wrap ").height());

        $('#deviceAccessTab a:first').tab('show');//初始化显示哪个tab
        $('#deviceAccessTab a').click(function(e){
            e.preventDefault();//阻止a链接的跳转行为
            //console.log($(this).text());
            $(this).tab('show');//显示当前选中的链接及关联的content
            $("#accessTitle").text($(this).text());
        })
    });

    request.error(function(){
        //console.log("无法加载资源");
    });
}

function changeType(that,type){
    console.log(that);
    $(".faq-doc-text-box-wrap .active").removeClass("active");
    $("#" + type).addClass("active");
    $(".faq-side-nav-inner-list .active").removeClass("active");
    $(that).addClass("active");
    $("#currentType").text($(that).text());
}