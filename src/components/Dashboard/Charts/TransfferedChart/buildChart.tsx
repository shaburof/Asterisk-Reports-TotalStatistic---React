declare const Highcharts: any;

interface ChartInterface {
    (names: string[], data: number[]): void
}

export const chart: ChartInterface = (names, data) => {
    Highcharts.chart('transferchart', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },

        title: {
            text: 'Колличество переведенных звонков'
        },

        xAxis: {
            categories: names,
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'колличество',
                skew3d: true
            }
        },

        // tooltip: {
        //     headerFormat: '<b>{point.key}</b><br>',
        //     pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        // },
        tooltip: {
            formatter: function () {
                return (this as any).x;
                // return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series ' + this.series.name;
            }
        },
        plotOptions: {
            column: {
                // stacking: 'normal',
                depth: 40,
                colorByPoint: true,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
        series: [{
            data: data,
            name: 'переводы',
            showInLegend: false
        }]
    });
}

