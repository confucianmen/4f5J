/**
 * Created by qhao on 2019/4/23.
 */
$(function(){

    //登录
    $("#submit").click(function () {
        var name = $("#userId").val();
        var pwd = $("#pwd").val();
        if (name == '') {
            $('.tip_block').parent().show();
            $("#tip_text").text("用户名不能为空");
            $(".login-form-wrapper").css('height','395px');
            return false;
        }
        if (pwd == '') {
            $('.tip_block').parent().show();
            $("#tip_text").text("密码不能为空");
            $(".login-form-wrapper").css('height','395px');
            return false;
        }
        console.log(name);
        $("#submit").attr('disabled', true);

        var flag = false;
        $.ajax({
            url: "./doc/data/userInfo",
            data: {},
            type: "get",
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                if (data==[]) {
                    $('.tip_block').parent().show();
                    $("#tip_text").text("没有用户");
                    $(".login-form-wrapper").css('height','395px');
                    return false;
                } else {
                    $.each(data, function(index,values){
                        if(name == values.username && pwd == values.password){
                            flag = true;
                        }
                        if(flag){
                            // var expiresDate	= new Date();
                            // expiresDate.setTime(expiresDate.getTime() + (1 * 60 * 1000));

                            $.cookie("_cookie_token","token" , {expires:0.1});
                            $.cookie("_cookie_username", name, {expires:0.1});
                            $.cookie("_cookie_password", pwd, {expires:0.1});

                            window.location.href = "./doc/web/index.html";
                            $('.tip_block').parent().hide();
                        }
                        else{
                            flag = false;
                            $(".tip_block").parent().show();
                            $("#tip_text").text("用户名或密码错误");
                            $("#submit").attr('disabled', false);
                        }
                    });
                }
            }
        });
    })

});