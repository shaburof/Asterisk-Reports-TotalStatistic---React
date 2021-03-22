import React, { useEffect } from 'react';
import { chart } from './chartBuild';
import { chart2 } from './chartBuild2';
import { prepareData } from './helper';
import classes from './avgPerCall.module.css';
declare const Highcharts: any;

const AvgPerCall = ({ inboundOperators, outboundOperators }) => {

    useEffect(() => {
        let operatorData = prepareData(inboundOperators, outboundOperators);
        chart2(operatorData);
    }, [])

    return <section className={classes.chartPlace + ' row mt-4'}>
        <div className="col-sm-12">
            <div id="chart3" className={classes.chart}></div>
        </div>
    </section>
}

export default AvgPerCall;

// const chart = () => {
//     Highcharts.chart('chart3', {
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Browser market shares. January, 2018'
//         },
//         subtitle: {
//             text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
//         },
//         accessibility: {
//             announceNewData: {
//                 enabled: true
//             }
//         },
//         xAxis: {
//             type: 'category'
//         },
//         yAxis: {
//             title: {
//                 text: 'Total percent market share'
//             }

//         },
//         legend: {
//             enabled: false
//         },
//         plotOptions: {
//             series: {
//                 borderWidth: 0,
//                 dataLabels: {
//                     enabled: true,
//                     format: '{point.y}'
//                     // format: '{point.y:.1f}%'
//                 }
//             }
//         },

//         tooltip: {
//             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
//             // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
//         },

//         series: [
//             {
//                 name: "Всего вызовов",
//                 colorByPoint: true,
//                 data: [
//                     {
//                         name: "Иванова О.И.",
//                         y: 10,
//                     },
//                     {
//                         name: "Петрова Н.А.",
//                         y: 7,
//                     },
//                     {
//                         name: "Silver Nara",
//                         y: 3,
//                     }
//                 ]
//             }
//         ],
//     });
// }