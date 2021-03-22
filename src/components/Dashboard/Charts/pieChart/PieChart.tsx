import React, { useEffect } from 'react';
import { chart } from './chartBuild';
import classes from './pieChart.module.css';


const PieChart = ({ inboundCalls, outboundCalls }) => {

    // const data = {
    //     allCalls: 250,
    //     inside: 98,
    //     external: 152
    // }

    useEffect(() => {

        chart('inbound', inboundCalls);
        chart('outbound', outboundCalls);
    }, []);

    const prepareCallsToChart = (calls: {}) => {

    }

    return <section className={classes.pieChartSection + ' row mt-4'}>
        <div className="col-sm-6">
            <h1 className={classes.title}>соотношение внутренних и внешних звонков</h1>
            <div id="inbound" className={classes.pieChart}></div>
        </div>
        <div className="col-sm-6">
            <h1 className={classes.title}>соотношение внутренних и внешних звонков</h1>
            <div id="outbound" className={classes.pieChart}></div>
        </div>


    </section>
}

export default PieChart;