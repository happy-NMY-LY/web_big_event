$(function () {

    // 获取用户的基本信息
    function get_usre_info() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",

            // headers: {
            //     Authorization: localStorage.getItem("token") || ''
            // },

            success: function (response) {
                rander(response.data)
            },
            

        });
    }
    get_usre_info()


    // 渲染函数
    function rander(user) {
        if (user) {

            let name = user.nickname || user.username
            $("#welcome").html("欢迎你 : " + name)

            if (user.user_pic !== null) {
                // 渲染图片头像
                $(".layui-nav-img").attr("scr", user.user_pic).show()
                $(".user_img").hide()
            }
            else {
                // 渲染文字头像
                $(".layui-nav-img").hide()
                let frist = name[0].toUpperCase()
                $(".user_img").html(frist).show()

            }
        }
    }


    // 点击按钮，实现退出功能
    $('#drop_out').click(function (e) {
        e.preventDefault();
        let layer = layui.layer
        layer.confirm('是否要退出账户?', { icon: 3, title: '提示' }, function (index) {

            // 1. 清除本地存储
            localStorage.removeItem("token")

            // 2. 页面跳转到登录界面
            location.href = "login.html"

            // 关闭弹出层，index：弹出层的索引。
            layer.close(index);
        });
    });




})