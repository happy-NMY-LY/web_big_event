
$(function () {

    /* 
        1. 每次通过jQuery发起请求时都会自动调用这个函数。
        2. 这个函数的回调函数中我们可以拿到发起请求的配置项。
        3. 在发起真正的请求时拼接URL根路径。
    
    */
    $.ajaxPrefilter(function (option) {
        option.url = " http://www.liulongbin.top:3007" + option.url
        // console.log(option.url);
    })


    /* 
        1. 为需要权限的请求配置默认请求头
    */
    $.ajaxPrefilter(function (option) {

        if (option.url.indexOf('/my/') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem("token") || ''
            }
        }
    })
    /* 
        1. 将用户权限控制配置到全局，便于每次发起请求不用在重复写这个函数
    */
    $.ajaxPrefilter(function (option) {

        option.complete = function (res) {
            console.log("执行了res回调");
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 1. 强制清空本地存储
                localStorage.removeItem("token")
                // 2. 强制跳转页面
                location.href = '../../login.html'
            }
        }
    })

})