$(function () {

    // 1. 一进入页面 发送ajax请求
    var currentPage = 1; //当前页
    var pageSize = 5;  // 每页条数
    render();  // 完成渲染

    function render(){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info){
                console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);

                // 实现分页插件的初始化
                $("#paginator").bootstrapPaginator({
                    //默认是2，如果是bootstrap3版本，这个参数必填
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                      render();
                      
                    }
                  });
            }
        })
    }

    // 2. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function(){
        // 显示模态框发送请求
        $('#addModal').modal('show');
        // 发送请求, 获取一级分类的全部数据, 将来用于渲染
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function(info){
                console.log(info);
                var htmlStr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlStr);
                
            }

            
        })
    })

    // 3. 给下拉菜单添加可选功能
    $('.dropdown-menu').on('click', 'a',function(){
        // 获取a的文本
        var txt = $(this).text();
        // 设置给按钮
        $('#dropdownText').text(txt);
        
    })

    // 4. 完成文件上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //文件上传时完成的回调函数
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var result = data.result;  // 后台返回的结果
          var picUrl = result.picAddr; //获取返回的图片路径

        //   设置给返回的img src
        $('#imgBox img').attr('src', picUrl);

        }
  });


})