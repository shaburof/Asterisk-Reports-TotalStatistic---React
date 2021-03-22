import React from 'react';
import CurrentStatus from '../currentStatus/currentStatus';
import AnswerChart from '../answerChart/answerChart';
import Chart from '../chart/Chart';
import TotalInfo from '../totalInfo/totalInfo';
import CrossPauses from '../crossPauses/crossPauses';
import TotalPauseChart from '../totalInfo/totalPauseChart/totalPauseChart';

const Dashboard = ({ data }) => {
    // console.log('data: ', data);

    return <>
        {/* <TotalPauseChart data={data} /> */}
        <TotalInfo data={data} />
        {/* crossPauses пока не работает */}
        <CrossPauses data={data} />
        <div className="dashinfo">
            <CurrentStatus data={data} />
            <AnswerChart data={data} />
        </div>
        <Chart data={data} />
    </>
}

export default Dashboard;