//测试进度条开始
// 开始
// NProgress.start();

// setTimeout(function(){
// // 结束
//     NProgress.done();

// },2000);

// 在发送ajax请求, 开启进度条
// 在sjax回来, 关闭进度条

// ajax全局事件
// .ajaxComplent(fn);   每个ajax完成时, 都会调用fn回调函数(完成不一定是成功)
// .ajaxSuccess(fn);    每个ajax只要成功了, 就会调用fn
// .ajaxError(fn);      每个ajax是要失败了, 就会调用fn
// .ajaxSend(fn);       每个ajax发送前, 都会调用fn

// .ajaxStart(fn);      在第一个ajax开始发送前, 调用fn
// .ajaxStop(fn);       在全部ajax完成时, 调用fn(不管成功还是失败) 

// 在第一个ajax请求发送前, 开启进度条
$(document).ajaxStart(function(){
    // 开启进度条
    NProgress.start();
})
// 在全部ajax完成时, 关闭进度条
$(document).ajaxStop(function(){
    // 模拟网络延迟
    setTimeout(function(){
        //关闭进度条
        NProgress.done();
    },500)
    
})