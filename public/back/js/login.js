$(function () {
    //使用表单校验插件
    $('#form').bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    // callback 专门用于配置回调提示
                    callback: {
                        message: '用户名不存在'
                    },
                }
            },

            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '密码长度必须在6到20之间'
                    },
                    callback: {
                        message: '密码错误'
                    },
                }
            }
        }
    });


    $("#form").on('success.form.bv', function(e){
        e.preventDefault();

        $.ajax ({
            
                type: "post",
                url: "/employee/employeeLogin",
                data: $('#form').serialize(),
                datatype:'json',
                success: function(res){
                    console.log(res);
                    if(res.error ==1000){
                        // alert('用户名不存在')
                        // 调用插件实例方法, 刚更新username字段状态成失败状态
                        // updateStatus(field,status, validator);
                        // 参数1  需要更新的字段名称
                        // 参数2  需要更新的状态  VALID成功  INVALID 失败
                        // 参数3  配置校验的规则, 将来会用配置的规则 message 进行提示
                        $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                    }
                    if(res.error ==1001){
                        // alert('密码错误')
                        $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID','callback')
                    }
                    if(res.success){
                        location.href="index.html"
                    }
                }
            
        })

    })

    // 3. 表单重置功能
    // reset 按钮, 
    $('[type="reset"]').click(function(){
        // 重置状态即可
        $('#form').data('bootstrapValidator').resetForm();
    })
});