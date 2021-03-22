import React from 'react';
import classes from './graphdashboard.module.css';

import CallInfos from '../CallInfos/CallInfos';
import InOutChart from '../Charts/inOutChart/inOutChart';
import PieChart from '../Charts/pieChart/PieChart';
import AvgPerCall from '../Charts/avgPerCall/avgPerCall';
import InternalExternalChart from '../Charts/InternalExternalChart/InternalExternalChart';
import AvgOpinion from '../Charts/avgOpinionChart/AvgOpinion';
import TransfferedChart from '../Charts/TransfferedChart/TransfferedChart';

const GraphDashboard = ({ inbound, outbound, downloadHandler, allowDownload }) => {

    return <>
        <div className="col-sm-12">
            <div className="row">
                <div className="col-sm-12">
                    <InOutChart inboundCalls={inbound.allCalls} outboundCalls={outbound.allCalls} />
                    <AvgPerCall inboundOperators={inbound.operators} outboundOperators={outbound.operators} />
                    <InternalExternalChart inboundOperators={inbound.operators} outboundOperators={outbound.operators} />
                    <div className="container">
                        <PieChart inboundCalls={inbound} outboundCalls={outbound} />
                        <AvgOpinion operators={inbound.operators} />
                        <TransfferedChart operators={inbound.operators} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col-sm-6 mt-3">
                        <h3 className={classes.title}>ВХОДЯЩИЕ</h3>
                        <CallInfos type={'INBOUND'} data={inbound} downloadHandler={downloadHandler} allowDownload={allowDownload} />
                    </div>
                    <div className="col-sm-6 mt-3">
                        <h3 className={classes.title}>ИСХОДЯЩИЕ</h3>
                        <CallInfos type={'OUTBOUND'} data={outbound} downloadHandler={downloadHandler} allowDownload={allowDownload} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default GraphDashboard;