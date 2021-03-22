import React, { Suspense } from 'react';
import classes from './dashboard.module.css';
import Spinner from '../Interface/spinner/spinner';


const GraphDashboard = React.lazy(() => import('./GraphDashboard/GraphDashboard'));
const TableDashboard = React.lazy(() => import('./TableDashboard/TableDashboard'));

enum viewTypeEnum { 'GRAPH', 'TABLE' };


const Dashboard = ({ inbound, outbound, downloadHandler, viewType, allowDownload }) => {

    const display = (viewType === viewTypeEnum.GRAPH)
        ? <GraphDashboard inbound={inbound} outbound={outbound} downloadHandler={downloadHandler} allowDownload={allowDownload} />
        : <TableDashboard inbound={inbound} outbound={outbound} downloadHandler={downloadHandler} allowDownload={allowDownload} />

    return <Suspense fallback={<div className="col-sm-12 centered"><Spinner /></div>}>{display}</Suspense>
}

export default Dashboard;