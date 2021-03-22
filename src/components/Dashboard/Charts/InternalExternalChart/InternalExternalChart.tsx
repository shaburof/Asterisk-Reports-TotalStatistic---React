import React, { useEffect } from 'react';
import { chart } from './chartBuild';
import { prepare, prepareData } from './helper';
import classes from './internalExternalChart.module.css';

import moment from 'moment';
declare const Highcharts: any;

const InternalExternalChart = ({ inboundOperators, outboundOperators }) => {
    // console.log('inboundOperators: ', inboundOperators);
    // console.log('outboundOperators: ', outboundOperators);

    useEffect(() => {
        const result = prepareData(inboundOperators, outboundOperators);
        chart(result);
    }, [])

    return <section className="mt-4">
        <div id="internalexternalchart"></div>
    </section>
}

export default InternalExternalChart;

// const chart_old = () => {
//     Highcharts.chart('chart4', {

//         chart: {
//             type: 'column'
//         },

//         title: {
//             text: 'Total fruit consumtion, grouped by gender'
//         },

//         xAxis: {
//             categories: [
//                 'Иванова О.И. (0312)',
//                 'Петрова Н.А. (0323)',
//                 'Silver Nata (0337)',
//             ]
//         },

//         yAxis: {
//             allowDecimals: false,
//             min: 0,
//             title: {
//                 text: 'Number of fruits'
//             }
//         },

//         tooltip: {
//             formatter: function () {
//                 let _this = this as any;
//                 return '<b>' + _this.x + '</b><br/>' +
//                     _this.series.name + ': ' + _this.y + '<br/>' +
//                     'всего: ' + _this.point.stackTotal;
//             }
//         },

//         plotOptions: {
//             column: {
//                 stacking: 'normal'
//             }
//         },

//         series: [{
//             name: 'входящие внутренние',
//             data: [5, 3, 4],
//             stack: 'male'
//         }, {
//             name: 'входящие внешние',
//             data: [3, 4, 4],
//             stack: 'male'
//         }, {
//             name: 'исходящие внутренние',
//             data: [2, 5, 6],
//             stack: 'female'
//         }, {
//             name: 'исходящие внешние',
//             data: [3, 2, 4],
//             stack: 'female'
//         }]
//     });
// }