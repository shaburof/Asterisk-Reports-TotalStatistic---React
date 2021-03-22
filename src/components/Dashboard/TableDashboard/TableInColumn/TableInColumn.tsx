import React, { useEffect, useState } from 'react';
import { getName, buildMostRows, buildRow, operatorInformationCollect } from './helper';
// import classes from './TableInColumn.module.css';
import classes from './TableInColumn.module.css';

interface TableInterface {
    operators: {},
    downloadHandler: Function,
    type: 'INBOUND' | 'OUTBOUND',
    allowDownload: boolean
}

const TableInColumn = ({ operators, downloadHandler, type, allowDownload }: TableInterface) => {

    const [tableData, setTableData] = useState<any>(null);
    const showAverage = type === 'INBOUND' ? true : false;
    const showTransfferedCalls = type === 'INBOUND' ? true : false;

    useEffect(() => {
        setTableData(operatorInformationCollect(operators));
    }, []);


    const ccl = (...cl: string[]) => {
        let combine = '';
        for (const item of cl) combine += (classes[item]) + ' ';
        return combine
    }

    return <table className={classes.tableColumn}>
        {tableData !== null &&
            <tbody>
                <tr className={classes.operatorNameRow}>
                    {buildRow(null, tableData.labels)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('всего звонков', tableData.arr3)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('всего внешних вызовов', tableData.arr9)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('всего внутренних вызовов', tableData.arr10)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('время всех звонков', tableData.arr15)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('время всех внешних звонков', tableData.arr13)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('время всех внутренних звонков', tableData.arr14)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('среднее время звонка', tableData.arr7)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('среднее время внешнего звонка', tableData.arr5)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildRow('среднее время внутреннего звонка', tableData.arr6)}
                </tr>
                {showAverage && <>
                    <tr className={classes.tableRow2}>
                        {buildRow('средняя оценка', tableData.arr4)}
                    </tr>
                    <tr className={classes.tableRow2}>
                        {buildRow('звонков с оценкой', tableData.arr8)}
                    </tr>
                </>}
                {showTransfferedCalls
                    && <tr className={classes.tableRow2}>
                        {buildRow('переведенные звонки', tableData.arr16, true)}
                    </tr>}
                <tr className={classes.tableRow2}>
                    {buildMostRows('самый длинный звонок', tableData.arr11, downloadHandler, allowDownload)}
                </tr>
                <tr className={classes.tableRow2}>
                    {buildMostRows('самый короткий звонок', tableData.arr12, downloadHandler, allowDownload)}
                </tr>


            </tbody>
        }
    </table>
}

export default TableInColumn;