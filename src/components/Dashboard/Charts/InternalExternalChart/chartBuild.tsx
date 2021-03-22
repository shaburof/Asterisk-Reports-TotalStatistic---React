declare const Highcharts: any;

export const chart = (operatorData: {
    operatorNames: string[];
    data1: number[];
    data2: number[];
    data3: number[];
    data4: number[];
}) => {
    Highcharts.chart('internalexternalchart', {

        chart: {
            type: 'column'
        },

        title: {
            text: 'внутренние и внешние вызовы по операторам'
        },

        xAxis: {
            categories: operatorData.operatorNames
            // categories: ['Иванова О.И. (0312)','Петрова Н.А. (0323)','Silver Nata (0337)',]
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'колличество'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'gray'
                }
            }
        },
        tooltip: {
            formatter: function () {
                let _this = this as any;
                return '<b>' + _this.x + '</b><br/>' +
                    _this.series.name + ': ' + _this.y + '<br/>' +
                    'всего: ' + _this.point.stackTotal;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            },
            dataLabels: {
                enabled: true
            },
            series: {
                animation: {
                    duration: 1500
                },
            }
        },

        series: [{
            name: 'входящие внутренние',
            data: operatorData.data1,
            // color: '#7cb5ec',
            color: '#bd6665',
            // data: [5, 3, 4],
            stack: 'male'
        }, {
            name: 'входящие внешние',
            data: operatorData.data2,
            color: '#65a5bd',
            // data: [3, 4, 4],
            stack: 'male'
        }, {
            name: 'исходящие внутренние',
            data: operatorData.data3,
            // color: '#bd6665',
            color: '#7cb5ec',
            // data: [2, 5, 6],
            stack: 'female'
        }, {
            name: 'исходящие внешние',
            data: operatorData.data4,
            color: '#bd7d65',
            // data: [3, 2, 4],
            stack: 'female'
        }]
    });
}