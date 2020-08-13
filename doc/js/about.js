/**
 * Created by qhao on 2016/8/31.
 */
$(function(){

    // checkUserInfoDoc();//检查用户是否登录
    
    $(".about-banner").height($(".about-banner").width()*400/1920);
    $(".part1-logo").height($(".about-content-part1-right").width()*300/499);
    $(".part1-logo").css('background-size','100% ' +$(".about-content-part1-right").width()*300/499 + "px");

    $(".part3-logo").height($(".about-content-part3-right").width()*265/588);
    $(".part3-logo").css('background-size','100% ' +$(".about-content-part3-right").width()*265/588 + "px");

    $(".about-map").height($(".about-map").width()*529/1920);

    var adPath = '../data/faq';
    getTopic(adPath);

});
