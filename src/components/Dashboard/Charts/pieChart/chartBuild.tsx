declare const Highcharts: any;

export const chart = (place: 'inbound' | 'outbound', calls: any) => {
    if (calls.allCallCount === 0) return false;
    let type = place === 'inbound' ? 'ВХОДЯЩИЕ' : 'ИСХОДЯЩИЕ';
    Highcharts.chart(place, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            // height: 500,
        },
        title: {
            style: {
                color: 'gray',
                fontSize: '16px'
            },
            text: `${type}<br>внешние: <b>${calls.externalCount}</b><br>внутренние: <b>${calls.internalCount}</b>`,
            align: 'center',
            verticalAlign: 'middle',
            y: 80
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: '',
            innerSize: '50%',
            data: [
                {
                    name: 'внутренние',
                    y: calls.internalCount,
                    color: 'rgb(71, 190, 101)',
                    dataLabels: {
                        enabled: true
                    }
                },
                {
                    name: 'внешние',
                    y: calls.externalCount,
                    color: 'rgb(87, 143, 207)',
                    dataLabels: {
                        enabled: true
                    }
                }
            ]
        }]
    });
};