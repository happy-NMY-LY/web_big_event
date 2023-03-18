$(function () {
    // 点击到去注册的链接
    $(".login_box a").click(function (e) {
        e.preventDefault();

        $(".login_box").hide();
        $(".register_box").show()
        // $(".register_box").hide()

    });

    // 点击到去登录的链接
    $(".register_box a").click(function (e) {
        e.preventDefault();
        $(".login_box").show()
        $(".register_box").hide()

    });

  
    // 显示隐藏密码事件
    let em = document.querySelectorAll(".layui-form-item .pwd_show_or_hide")
    $(em).click(function (e) {
        e.preventDefault();

        if ($(this).siblings("input").attr("type") === "text") {
            $(this).siblings("input").attr("type", "password")
        }
        else {
            $(this).siblings("input").attr("type", "text")
        }

    });


    // 用于定义自定义表单匹配规则
    const form = layui.form
    form.verify(
        {
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

            // 通过函数的形式定义匹配规则
            repwd: function (value) {
                /* 
                    1. 通过形参拿到确认密码框的值
                    2. 获得密码框的值
                    3. 进行比较
                    4. 如果判断失败返回一个提示信息。
                */

                let pwd = $(".register_box [name=password]").val()



                if (pwd != value) {
                    return "两次输入密码不符"
                }
            }

        }
    )



    // 表单注册事件监听
    $("#register_form").submit(function (e) {
        e.preventDefault();


        $.post("/api/reguser", {
            username: $("#register_form [name=username]").val(),
            password: $("#register_form [name=password]").val(),
        },
            function (data) {
                // 使用layUI的一个方法设置拟态框
                let layer = layui.layer
                if (data.status != 0) {
                    return layer.msg(data.message)
                }
                else {
                    layer.msg("注册成功")
                    setTimeout(() => {
                        $("#click").click()

                    }, 3000);
                }
            },


        );

    });


    // 表单登录事件监听
    $("#login_form").submit(function (e) {
        e.preventDefault();


        $.ajax({
            type: "post",
            url: "/api/login",
            // 原生方法获取表单数据.
            // data: {
            //     username: $("#login_form [name=username]").val(),
            //     password: $("#login_form [name=password]").val(),
            // },

            data: $(this).serialize(),         // 快速获取表单中的数据
            // dataType: "dataType",
            success: function (response) {
                // 使用layUI的一个方法设置拟态框
                let layer = layui.layer
                if (response.status != 0) {
                    return layer.msg(response.message)
                }
                else {
                    layer.msg("登录成功")
                    localStorage.setItem("token", response.token)
                    window.open(" http://127.0.0.1:5500/index.html")
                    // console.log(response);

                }
            }
        });
    });

    
})


