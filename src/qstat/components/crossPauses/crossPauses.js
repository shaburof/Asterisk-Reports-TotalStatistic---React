import React, { useEffect, useState } from 'react';
import { preparedCrossPauses, dateIntervalToString } from '../../services/helpers';
import { getCross } from '../../services/crossHelper';
const Highcharts = window.Highcharts;

const CrossPauses = ({ data }) => {
    let style = {
        height: '300px',
        borderRadius: '5px',
        boxShadow: '0 1px 2px rgba(0,0,0,.1)'
    };

    const [dataLargeThenZero, setDataLargeThenZero] = useState(false);
    // const [beforeCrossPrepare, setBeforeCrossPrepare] = useState(preparedCrossPauses(data))
    const [beforeCrossPrepare, setBeforeCrossPrepare] = useState()

    useEffect(() => {
        setBeforeCrossPrepare(getCross(data))
        // setBeforeCrossPrepare(preparedCrossPauses(data))
    }, [])

    useEffect(() => {
        (beforeCrossPrepare && beforeCrossPrepare.length !== 0) && setDataLargeThenZero(true)
        if (dataLargeThenZero) {
            const crossPrepare = prepadeData(beforeCrossPrepare, data);
            chart1(crossPrepare);
        }
    }, [dataLargeThenZero, beforeCrossPrepare])

    const prepadeData = (data, originalData) => {
        // console.log('originalData: ', originalData);
        const temp = [];
        let startDay = '';
        let endDay = '';
        let totalPausedStatus = true;
        let totalEnterInPauseTime;
        for (const item of data) {
            if (item.start) {
                startDay = new Date(item.start);
                //startDay = new Date('2020-04-03 10:11:15');
                let now = new Date();
                now.setHours(0, 0, 0);
                if (startDay < now) {
                    startDay.setHours(0, 0, 0);
                    endDay = new Date(item.start);
                    endDay.setHours(23, 59, 0);
                    totalPausedStatus = false;
                } else {
                    startDay = now;
                    endDay = new Date();
                    for (const originalItem in originalData.data) {
                        const operator = originalData.data[originalItem];
                        const currentPausedStatus = operator.currentStatus === 'PAUSE';
                        const lastEnterInPause = operator.lastEnterInPause;
                        (!totalEnterInPauseTime || (new Date(lastEnterInPause)) < (new Date(totalEnterInPauseTime))) && (totalEnterInPauseTime = lastEnterInPause);
                        if (currentPausedStatus === false) totalPausedStatus = false;
                    }
                }
                break;
            }
        }
        temp.push({ x: startDay, y: 1, interval: null });

        for (const item of data) {
            const interval = dateIntervalToString(item.start, item.finish);
            temp.push({ x: new Date(item.start).getTime(), y: 1, interval: interval });
            temp.push({ x: new Date(item.start).getTime(), y: -1, interval: interval });
            temp.push({ x: new Date(item.finish).getTime(), y: -1, interval: interval });
            temp.push({ x: new Date(item.finish).getTime(), y: 1, interval: interval });
        }
        if (totalPausedStatus) {
            console.log('totalPausedStatus: ', totalPausedStatus);
            temp.push({ x: (new Date(totalEnterInPauseTime).getTime()), y: 1, interval: 'pauseStart' })
            temp.push({ x: (new Date(totalEnterInPauseTime).getTime()), y: -1, interval: 'pauseStart' })
            temp.push({ x: endDay, y: -1, interval: 'pauseStart' })
        }
        else temp.push({ x: endDay, y: 1, interval: null });

        return temp;
    }

    return <>
        {dataLargeThenZero
            ? <div id="crosschart" style={style} className="crosspauses"></div>
            : <p style={{ color: 'gray', fontSize: '12px', textAlign: 'center' }}>пересечения пауз операторов отсутствуют</p>}
        {/* <div className="container">
            <div className="col-sm-12 centered mt-5">
                <section className="operator__pause_area">
                    {dataLargeThenZero
                        ? <div id="crosschart" style={style}></div>
                        : <p style={{ color: 'gray', fontSize: '12px' }}>пересечения пауз операторов отсутствуют</p>}
                </section>
            </div>
        </div> */}
    </>
}

export default CrossPauses;

const chart1 = (chartData) => {
    Highcharts.chart("crosschart", {
        time: {
            timezoneOffset: -5 * 60
        },
        chart: {
            type: 'area',
            zoomType: 'x',
        },
        credits: { enabled: false },
        exporting: {
            enabled: false
        },
        title: {
            text: '',
        },
        subtitle: {
            // text: `${operator.name} (${operator.ext})`,
            text: `Пересечение пауз операторов`,
            style: {
                color: '#d21244',
            }
        },
        yAxis: {
            title: {
                text: ' '
            },
            labels: {
                step: 3,
                formatter: function () {
                    let operatorStatus = this.axis.defaultLabelFormatter.call(this);
                    if (operatorStatus == 0) return '';
                    else if (operatorStatus > 0) return 'в очереди';
                    else if (operatorStatus < 0) return 'на паузе';
                }
            }
        },
        tooltip: {
            useHTML: true,
            formatter: function (tooltip) {
                const hour = new Date(this.x).getHours();
                const _minutes = new Date(this.x).getMinutes();
                const minutes = _minutes > 9 ? _minutes : '0' + _minutes;
                let interval = '';
                if (this.point.interval === 'pauseStart') interval = '';
                else interval = this.point.interval !== null ? ('пауза: ' + this.point.interval + '<br>') : '';
                return interval + '<b>' + hour + '</b>:<b>' + minutes + '</b>';
            }
        },
        xAxis: [
            {
                "type": "datetime",
                "labels": {
                    "format": "{value:%H:%M}",
                },
            },
        ],
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                lineWidth: 0,
                color: '#FF0000',
            },
        },
        legend: {
            symbolHeight: .001,
            symbolWidth: .001,
            symbolRadius: .001,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 35,
            floating: true,
            borderWidth: 0,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        series: [
            {
                name: '',
                color: {
                    linearGradient: [100, 0, 100, 500],
                    stops: [
                        [0, '#20d212'],
                        [1, '#d21244']
                    ]
                },
                negativeColor: {
                    linearGradient: [0, 0, 0, 150],
                    stops: [
                        [0, '#20d212'],
                        [1, '#d21244']
                    ]
                },
                data: chartData
            },
        ]
    });
}