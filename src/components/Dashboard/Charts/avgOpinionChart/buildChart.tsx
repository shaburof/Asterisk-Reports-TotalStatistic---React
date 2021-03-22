declare const Highcharts;

export const chart = (names, dataTochart) => {
    Highcharts.chart('avgopinionchart', {
        chart: {
            type: 'cylinder',
            marginTop: 30,
            marginBottom: 100,
            margin: 0,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: 'средняя оценка клиентов по операторам'
        },
        plotOptions: {
            series: {
                depth: 50,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
            }
        },
        xAxis: {
            categories: names,
            labels: {
                skew3d: !true,
                style: {
                    fontSize: '12px'
                }
            }
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            max: 10,
            title: {
                text: 'оценка баллов',
                skew3d: true,
                style: {
                    fontSize: '18px'
                }
            },

        },
        series:
            [{
                data: dataTochart,
                name: 'средняя оценка',
                showInLegend: false
            }]
    });

}