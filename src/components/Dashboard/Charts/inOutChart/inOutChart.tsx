import React, { useEffect } from 'react';
import moment from 'moment';
import { prepareCallsToChart, getMinMax, getDiffBetweenFinishAndStart } from './helper';
import { chart } from './chartBuild';
declare const Highcharts: any;

const InOutChart = ({ inboundCalls, outboundCalls }) => {
    useEffect(() => {
        let { callsArrayInbound, callsArrayOutbound, min, max } = prepareCallsToChart([...inboundCalls], [...outboundCalls]);
        chart(callsArrayInbound, callsArrayOutbound, min, max);

    }, []);

    return <section className="mt-5">
        <div id="chart1"></div>
    </section>
}

export default InOutChart;