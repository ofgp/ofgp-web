import {thousandBitSeparator} from "./common";

const MyChart = (function () {
    let _option = {
        tooltip: {
            formatter: function (params) {
                let htmlStr = '<span style="display: block; position: relative; border-radius: 3px;padding:3px 10px;background-color:#6995FE">';
                let result = '';
                let unit = '';
                for (let i = 0; i <= params.length; i++) {
                    if (params[i]) {
                        const value = params[i].data;
                        const category = params[i].seriesName;
                        if (value > 10000 && value <= 100000000) {
                            result = (value / 10000).toFixed(2) + '万';
                        } else if (value > 100000000 && value < 100000000000) {
                            result = (value / 100000000).toFixed(2) + '亿';
                        } else if (value > 100000000000) {
                            result = (value / 100000000000).toFixed(2) + '万亿';
                        } else {
                            result = (category === '交易金额' ? value.toFixed(2) : value);
                        }
                        unit = category === '交易金额' ? '￥' : '笔';
                        htmlStr += ('<span style="display: block;">' + category + ' : ' + (unit === '￥' ? unit : '') + thousandBitSeparator(result) + (unit === '笔' ? unit : '') + '</span>');
                    }
                }
                htmlStr += '</span>';
                return htmlStr;
            },
            backgroundColor: 'transparent',
            textStyle: {
                color: '#ffffff',
            },
            position: 'right',
            trigger: 'axis',
        },
        color: ['#e98259', '#6995fe'],
        backgroundColor: 'transparent',
        legend: {
            show: true,
            right: '10px',
            itemWidth: 50,
            itemHeight: 4,
            itemGap: 10,
            data: [{name: '交易金额', icon: 'rect'}, {name: '交易笔数', icon: 'rect'}],
            textStyle: {
                color: '#343434',
                padding: [0, 60, 0, 5]
            }
        },
        grid: {
            show: true,
            containLabel: true,
            left: '0%',
            right: '0%',
            bottom: '8%',
            borderWidth: '0px',
            backgroundColor: 'transparent'
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#383838',
                },
                axisTick: {
                    show: false
                },
            }
        ],
        yAxis: [{
            name: '(单位: ￥)',
            nameLocation: 'start',
            nameTextStyle: {
                padding: [10, 0, 5, 10]
            },
            splitLine: {show: false}, //去除网格线
            type: 'value',
            splitArea: {
                show: true,
                areaStyle: {
                    opacity: 1,
                    color: ['#F3F5FA', '#ffffff']
                }
            },
            offset: 0,
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                formatter: function (value) {
                    let result = '';
                    if (value > 10000 && value <= 100000000) {
                        result = (value / 10000).toFixed(2) + '万';
                    } else if (value > 100000000 && value < 100000000000) {
                        result = (value / 100000000).toFixed(2) + '亿';
                    } else if (value > 100000000000) {
                        result = (value / 100000000000).toFixed(2) + '万亿';
                    } else {
                        result = value;
                    }
                    return thousandBitSeparator(result)
                },
                color: '#383838',
                align: 'right',
                verticalAlign: 'bottom',
            }
        }, {
            name: '(单位: 笔)',
            nameLocation: 'start',
            nameTextStyle: {
                padding: [10, 10, 5, -10]
            },
            splitLine: {show: false}, //去除网格线
            type: 'value',
            splitArea: {
                show: true,
                areaStyle: {
                    opacity: 1,
                    color: ['#F3F5FA', '#ffffff']
                }
            },
            offset: 0,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                formatter: function (value) {
                    let result = '';
                    if (value > 10000 && value <= 100000000) {
                        result = (value / 10000).toFixed(2) + '万';
                    } else if (value > 100000000 && value < 100000000000) {
                        result = (value / 100000000).toFixed(2) + '亿';
                    } else if (value > 100000000000) {
                        result = (value / 100000000000).toFixed(2) + '万亿';
                    } else {
                        result = value;
                    }
                    return thousandBitSeparator(result)
                },
                color: '#383838',
                align: 'left',
                verticalAlign: 'middle',
            }
        }],
        series: [
            {
                name: '交易笔数',
                data: [],
                type: 'line',
                lineStyle: {
                    width: 4
                },
                symbolSize: 8,
                symbol: 'circle',
                yAxisIndex: 1,
                smooth: true,
            }, {
                name: '交易金额',
                data: [],
                type: 'line',
                lineStyle: {
                    width: 4
                },
                symbolSize: 8,
                symbol: 'circle',
                smooth: true
            }
        ]
    };
    let myChart;

    function initC(that, id) {
        myChart = that.$echarts.init(document.getElementById(id));
        myChart.showLoading();
    }

    function setOpt(option) {
        _option.xAxis[0].data = option.time;
        _option.series[0].data = option.count;
        _option.series[1].data = option.amount;
        myChart.hideLoading();
        myChart.setOption(_option);
        setTimeout(function () {
            window.onresize = function () {
                myChart.resize();
            }
        }, 200)

    }

    return {
        initChart: initC,
        initOption: setOpt
    }
})();
export default MyChart;