// 前端不知道当前的用户登录状态, 但是后台知道
// 前端一般可以发送ajax 请求, 去检测登录状态, 如未登录, 进行拦截
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function(info){
        console.log(info);
        if(info.error === 400){
            location.href = 'login.html';
        }
    }
})