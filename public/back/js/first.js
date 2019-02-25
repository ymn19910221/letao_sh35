$(function(){

    var currentPage = 1;
    var pageSize = 2;

 render();

 function render(){
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
         dataType: 'json',
         success: function(info){
             console.log(info); 
             var htmlStr = template('firstTpl', info);
             $('tbody').html(htmlStr);
  
          //    完成分页初始化
          $("#paginator").bootstrapPaginator({
              //默认是2，如果是bootstrap3版本，这个参数必填
              bootstrapMajorVersion:3,
              //当前页
              currentPage: info.page,
              //总页数
              totalPages: Math.ceil(info.total/info.size),
              // size:"small",//设置控件的大小，mini, small, normal,large
              onPageClicked:function(a, b, c,page){
                //为按钮绑定点击事件 page:当前点击的按钮值
              //   更新当前页, 并且重新渲染
              currentPage = page;
              render();
              }
            });
         }
      })
 }
})