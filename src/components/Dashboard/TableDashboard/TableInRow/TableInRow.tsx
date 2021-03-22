import React from 'react';
import classes from './TableInRow.module.css';
const TableInRow = ({ data, downloadHandler, allowDownload }) => {

    const ccl = (...cl: string[]) => {
        let combine = '';
        for (const item of cl) combine += (classes[item]) + ' ';
        return combine
    }

    const getMostField = (call: { name: string, calldate: string, operatorExtension: string, durationToString: string, recordingfile: string }) => {
        return call.name && <section className={classes.mostSection}>
            <p className={classes.mostParag}>{call.name}</p>
            <p className={classes.mostParag}>({call.operatorExtension})</p>
            <p className={classes.mostParag}>{call.durationToString}</p>
            {allowDownload && <img onClick={downloadHandler.bind(null, call.recordingfile, call.calldate, call.operatorExtension)} className={classes.mostImg} src="/opinion/images/download.png" />}
        </section>
    }

    return <table className={classes.table}>
        <tbody>
            <tr className={classes.titleRow}>
                <th>всего звонков</th>
                <th>среднее время на звонок</th>
                <th>среднее время на внешний звонок</th>
                <th>среднее время на внутренний звонок</th>
                <th>всего внешних вызовов</th>
                <th>всего внутренних вызовов</th>
                <th>самый длинный звонок</th>
                <th>самый короткий звонок</th>
                <th>общее время всех звонков</th>
                <th>время внешних вызовов</th>
                <th>время внутренних вызовов</th>
            </tr>
            <tr className={classes.dataRow}>
                <td>{data.allCallCount}</td>
                <td>{data.avgPerCallToString}</td>
                <td>{data.avgPerExternalCallToString}</td>
                <td>{data.avgPerInternalCallToString}</td>
                <td>{data.externalCount}</td>
                <td>{data.internalCount}</td>
                <td>{getMostField(data.mostLongCall)}</td>
                <td>{getMostField(data.mostShortCall)}</td>
                <td>{data.sumAllCallsDurationToString}</td>
                <td>{data.sumAllExternalCallsDurationToString}</td>
                <td>{data.sumAllInternalCallsDurationToString}</td>
            </tr>
        </tbody>
    </table>
}

export default TableInRow;