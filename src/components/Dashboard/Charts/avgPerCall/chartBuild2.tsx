import { numberToStringTime } from './helper';
declare const Highcharts: any;

export const chart2 = (operatorData: {
    operatorNames: string[];
    data1: number[];
    data2: number[];
}) => {
    Highcharts.chart('chart3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'среднее время на один звонок'
        },
        xAxis: {
            // categories: ['Иванова О.А. (0312)', 'Петрова Н.А. (0315)', 'Ясная А.Е. (0325)']
            categories: operatorData.operatorNames
        },
        yAxis: {
            title: {
                text: 'секунд'
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    rotation: 270,
                    x: 2,
                    y: -10,
                    align: 'left',
                    formatter: function () {
                        let _this = this as any;
                        return _this.y !== 0 ? _this.y : '';
                    }
                }
            }
        }, tooltip: {
            formatter: function () {
                let _this = this as any;
                let seriesName = _this.series.name;
                let operator = _this.x;
                let value = numberToStringTime(_this.y);
                return `<span font-weight: bold">${operator}</span><br>${seriesName}: ${value}`
            }
        },
        series: [
            {
                name: 'среднее время входящего звонка',
                data: operatorData.data1,
                // color: 'rgb(71, 190, 101)'
            }, {
                name: 'среднее время исходящего звонка',
                data: operatorData.data2,
                // color: 'rgb(87, 143, 207)'
            }
        ]
    });
};