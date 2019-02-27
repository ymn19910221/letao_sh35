$(function () {

    // 1. 一进入页面 发送ajax请求
    var currentPage = 1; //当前页
    var pageSize = 5;  // 每页条数
    render();  // 完成渲染

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);

                // 实现分页插件的初始化
                $("#paginator").bootstrapPaginator({
                    //默认是2，如果是bootstrap3版本，这个参数必填
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();

                    }
                });
            }
        })
    }

    // 2. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function () {
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
            success: function (info) {
                // console.log(info);
                var htmlStr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlStr);

            }


        })
    })

    // 3. 给下拉菜单添加可选功能
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取a的文本
        var txt = $(this).text();
        // 设置给按钮
        $('#dropdownText').text(txt);

        // 获取id, 设置给隐藏域
        var id = $(this).data('id');
        // 设置给隐藏域
        $('[name="categoryId"]').val(id);

        // 只要给隐藏域赋值了, 此时应该更新成成功
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    });

    // 4. 完成文件上传初始化
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //文件上传时完成的回调函数
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            var result = data.result;  // 后台返回的结果
            var picUrl = result.picAddr; //获取返回的图片路径

            //   设置给返回的img src
            $('#imgBox img').attr('src', picUrl);

            // 把路径赋值给隐藏域
            $('[name="brandLogo"]').val(picUrl);

            // 只要隐藏域有值了, 隐藏域更新成功
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

        }
    });

    //   5. 直接进行校验
    $("#form").bootstrapValidator({
        // 配置 excluded排除项, 对隐藏完成校验
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 选择一级分类
            categoryId: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请选择一级分类名称"
                    }
                }
            },
            // 二级分类
            brandName: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                // 校验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        // 提示信息
                        message: "请选择图片"
                    }
                }
            }
        }
    });

    // 6. 注册表单校验事件, 组织表单默认提交, yongajax提交
    $('#form').on('success.form.bv', function(e){
        // console.log(1);
        
        e.preventDefault();

        $.ajax({
            type:'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function(info){
                // console.log(info);
            if(info.success){
                $('#addModal').modal('hide');
                currentPage = 1;
                render();

                // 将表单元素重置
                $('#form').data('bootstrapValidator').resetForm(true);

                //button 和img 不是表单元素, 手动设置
                $('#dropdownText').text('请选择一级分类');
                $('#imgBox img').attr('src', './images/none.png');
            }    
                
            }
        })
    })


});