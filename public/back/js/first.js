$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('firstTpl', info);
                $('tbody').html(htmlStr);

                //    完成分页初始化
                $("#paginator").bootstrapPaginator({
                    //默认是2，如果是bootstrap3版本，这个参数必填
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: info.page,
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //   更新当前页, 并且重新渲染
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

    //  2. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function () {
        // 显示添加模态框
        $('#addModal').modal('show');
    });

    // 3. 表单校验
    $('#form').bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置需要校验的字段
        fields: {
            categoryName: {
                // 配置校验规则
                validators: {
                    // 非空字段
                    notEmpty: {
                        message: "请输入一级字段"
                    }
                }
            }
        }
    })

    // 4. 注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交即可
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();  //阻止默认的提交

        // 通过ajax提交
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();

                    // 将表单内容和状态重置
                    $('#form').data('bootstrapValidator').resetForm(true);
                }

            }
        })
    })
})