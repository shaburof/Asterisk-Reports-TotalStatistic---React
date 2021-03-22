import React from 'react';
import classes from './tableDashboard.module.css';
// import Table from './Table/Table';
// import Table2 from './Table2/Table2';
import TableInColumn from './TableInColumn/TableInColumn';
import TableInRow from './TableInRow/TableInRow';

const TableDashboard = ({ inbound, outbound, downloadHandler, allowDownload }) => {

    return <div className="col-sm-12 mt-5 mb-sm-5">
        <div className="row">
            <div className="col-sm-12">
                <h3 className={classes.title}>ВХОДЯЩИЕ</h3>
                <TableInRow data={inbound} downloadHandler={downloadHandler} allowDownload={allowDownload} />
            </div>
            <div className="col-sm-12 mt-4">
                <h3 className={classes.title}>ИСХОДЯЩИЕ</h3>
                <TableInRow data={outbound} downloadHandler={downloadHandler} allowDownload={allowDownload} />
                <hr />
            </div>
            {inbound.operators.length !== 0
                && <div className="col-sm-12 mt-4">
                    <h3 className={classes.title}>ИНФОРМАЦИЯ ПО ОПЕРАТОРАМ, ВХОДЯЩИЕ</h3>
                    <TableInColumn type={inbound.type} operators={inbound.operators} downloadHandler={downloadHandler} allowDownload={allowDownload} />
                </div>
            }
            {outbound.operators.length !== 0
                && <div className="col-sm-12 mt-4">
                    <h3 className={classes.title}>ИНФОРМАЦИЯ ПО ОПЕРАТОРАМ, ИСХОДЯЩИЕ</h3>
                    <TableInColumn type={outbound.type} operators={outbound.operators} downloadHandler={downloadHandler} allowDownload={allowDownload} />
                </div>
            }
        </div>
    </div>
}

export default TableDashboard;