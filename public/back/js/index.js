$(function(){
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        // 大标题
        title: {
            // 标题文本
            text: '2017年注册人数'
        },
        // 提示框组件
        tooltip: {},
        // 图例
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        // 数据项列表
        series: [{
            name: '人数',
            type: 'bar',  //柱状图  line折线图  pie饼图
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);


        // 基于准备好的dom，初始化echarts实例
        var echarts_right = echarts.init(document.querySelector('.echarts_right'));

        // 指定图表的配置项和数据
        var option2 =  {
            title : {
                text: '某热门品牌销售',
                subtext: '2017年6月',
                // 控制位置
                x:'center',
                // 控制主标题的样式
                textStyle: {
                   color: 'red',
                   fontSize: 20,
                }
            },
            // 提示框组件
            tooltip : {
                trigger: 'item',
                // 专门配置提示框组件的内容
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                // 配置对齐方式
                orient: 'vertical', //垂直对齐
                left: 'left',
                data: ['耐克','老北京','回力','百丽','Tata']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'耐克'},
                        {value:310, name:'老北京'},
                        {value:234, name:'回力'},
                        {value:135, name:'百丽'},
                        {value:1548, name:'Tata'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'yellow',
                        }
                    }
                }
            ]
        };
    
        // 使用刚指定的配置项和数据显示图表。
        echarts_right.setOption(option2);



})