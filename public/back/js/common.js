
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
    
});

// 公用的功能:
// 1. 左侧二级菜单栏的切换
// 2. 左侧整体的切换
// 3. 公共的推出功能

// 等待dom加载完成后执行
$(function(){

    // 1. 左侧二级菜单的切换
    // console.log($('.lt_aside .category'));
    
    $('.lt_aside .category').click(function(){
        // 找下一个兄弟元素, 切换显示
        $(this).next().stop().slideToggle();
        console.log(1);
        

    });

    // 2. 控制整个左侧菜单的切换
    $('.lt_topbar .icon_menu').click(function(){
        // console.log(1);
        
        // 让左侧菜单栏 切换显示 , 改left
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })

    // 3. 推出功能
    // 点击按钮, 显示一个模态框
    $('.lt_topbar .icon_logout').click(function(){
        // 让模态框显示modal('show')
        $('#logoutModal').modal('show');
    });

    // 点击模态框的退出按钮, 退出
    // 发送ajax请求, 让服务器端销毁用户的登录状态
    $('#logoutBtn').click(function(){
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function(info){
                console.log(info);
                if(info.success){
                    location.href="login.html"
                }
                
            }

        })
    })
})