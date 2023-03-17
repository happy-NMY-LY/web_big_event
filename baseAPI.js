

/* 
    1. 每次通过jQuery发起请求时都会自动调用这个函数。
    2. 这个函数的回调函数中我们可以拿到发起请求的配置项。
    3. 在发起真正的请求时拼接URL根路径。

*/
$.ajaxPrefilter(function (option) {
    option.url = " http://www.liulongbin.top:3007" + option.url
    // console.log(option.url);
})