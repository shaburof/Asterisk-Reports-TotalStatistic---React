declare const Highcharts: any;

export const chart = (data1: {}, data2: {}, min: number, max: number) => {
    console.log('data1: ', data1);

    Highcharts.setOptions({
        lang: {
            weekdays: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
        }
    });

    Highcharts.chart('chart1', {
        time: {
            timezoneOffset: -5 * 60
        },
        chart: {
            type: 'areaspline',
            zoomType: 'x',
        },
        title: {
            text: 'исходящие и входящие вызовы'
        },
        subtitle: {
            // text: 'шаг выборки 30 минут'
            text: ''
        },
        xAxis: [
            {
                "type": "datetime",
                "labels": {
                    "format": "{value:%e %b<br>%H:%M}",
                },
                min: min !== 0 ? min : undefined,
                max: max !== 0 ? max : undefined,
                scrollbar: {
                    enabled: min !== 0 || max !== 0 ? true : false
                },
            }
        ],
        yAxis: {
            title: {
                text: 'колличество'
            }
        },
        tooltip: {
            shared: true,
            // valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.2,
                // dataLabels: {
                //     enabled: true,
                // },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const Y = (this as any).y;
                        return Y != 0 ? Y : "";
                    },
                },
                // enableMouseTracking: false
            }
        },
        series: [{
            name: 'входящие',
            data: data1
        }, {
            name: 'исходящие',
            data: data2
        }]
    });




    return false;
    Highcharts.chart('chart1', {
        time: {
            timezoneOffset: -5 * 60
        },
        chart: {
            type: 'spline',
            zoomType: 'x',
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Принято звонков за выбранный период'
        },
        subtitle: {
            text: 'шаг выборки 30 минут'
        },
        xAxis: [
            {
                "type": "datetime",
                "labels": {
                    "format": "{value:%e %b<br>%H:%M}",
                },
                scrollbar: {
                    enabled: !true
                },
            }
        ],
        yAxis: {
            title: {
                text: 'колличество',
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [
            {
                name: 'data1',
                color: '#3856eb',
                data: data1
            },
            {
                name: 'data2',
                color: 'green',
                data: data2
            }
        ]
    });
    return true;
    Highcharts.chart('chart1', {
        time: {
            timezoneOffset: -5 * 60
        },
        // scrollbar: {
        //     enabled: true
        // },
        chart: {
            type: 'area',
            zoomType: 'x',
            // animation: {
            //     duration: 1500,
            //     easing: 'easeOutBounce'
            // }
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Принято звонков за выбранный период'
        },
        subtitle: {
            text: 'шаг выборки 30 минут'
        },
        xAxis: [
            {
                // min: (new Date()).setMinutes(100),
                // max: (new Date()).setMinutes(200),
                "type": "datetime",
                "labels": {
                    "format": "{value:%H:%M}",
                },
                scrollbar: {
                    enabled: true
                },
            }
        ],
        yAxis: {
            title: {
                text: 'колличество',
            }
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const Y = (this as any).y;
                        return (Y != 0) ? Y : "";
                    }
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'data1',
            // color: '#3856eb',
            data: data1
        }, {
            name: 'data2',
            color: 'green',
            data: data2
        }]
    });
}