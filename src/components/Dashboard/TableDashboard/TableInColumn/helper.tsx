import React from 'react'
// import classes from '*.module.css';
import classes from './TableInColumn.module.css';
// import ReactDOM from 'react-dom'

export const getName = (name: string, extension: string) => {
    let surName = name.split(' ').sort((a, b) => {
        if (a.length > b.length) return 1;
        else if (a.length < b.length) return -1
        else return 0;
    }).pop();

    return `${surName} (${extension})`;
}

export const buildMostRows = (nameRow: string, _row, downloadHandler, allowDownload: boolean) => {
    let row = [..._row];

    return <>
        <td className={allowDownload ? classes.downloadRow : ''}>{nameRow}</td>
        {row.map((r, index) => {
            return allowDownload
                ? <td key={index} onClick={() => downloadHandler(r.recordingfile, r.calldate, r.operatorExtension)} className={classes.downloadTd}>{r.durationToString}</td>
                : <td key={index} className={classes.downloadTd}>{r.durationToString}</td>
        })}
    </>;
}

export const buildRow = (nameRow: string | null, _row: any, hideZero?: boolean) => {
    let row = [..._row];
    if (nameRow === null) return row.map((data, index) => <td key={index}>{data}</td>)
    else {
        return <>
            <td>{nameRow}</td>
            {row.map((data, index) => <td key={index}>{hideZero ? data === 0 ? '' : data : data}</td>)}
        </>;
    }
}

export const operatorInformationCollect = (operators: {}): {} => {
    let dataForBuildTable: any = {};

    dataForBuildTable.labels = [''];
    dataForBuildTable.arr3 = [];
    dataForBuildTable.arr4 = [];
    dataForBuildTable.arr5 = [];
    dataForBuildTable.arr6 = [];
    dataForBuildTable.arr7 = [];
    dataForBuildTable.arr8 = [];
    dataForBuildTable.arr9 = [];
    dataForBuildTable.arr10 = [];
    dataForBuildTable.arr11 = [];
    dataForBuildTable.arr12 = [];
    dataForBuildTable.arr13 = [];
    dataForBuildTable.arr14 = [];
    dataForBuildTable.arr15 = [];
    dataForBuildTable.arr16 = [];

    for (const _operator in operators) {
        let op = operators[_operator];
        dataForBuildTable.labels.push(getName(op.name, op.extension));
        dataForBuildTable.arr3.push(op.allCallOperatorCount);
        dataForBuildTable.arr4.push(op.avgOpinion);
        dataForBuildTable.arr5.push(op.avgPerExternalCallOperatorToString);
        dataForBuildTable.arr6.push(op.avgPerInternalCallOperatorToString);
        dataForBuildTable.arr7.push(op.avgPerOperatorCallToString);
        dataForBuildTable.arr8.push(op.countCallWithOpinion);
        dataForBuildTable.arr9.push(op.externalCount);
        dataForBuildTable.arr10.push(op.internalCount);
        dataForBuildTable.arr11.push(op.mostLongCall);
        dataForBuildTable.arr12.push(op.mostShortCall);
        dataForBuildTable.arr13.push(op.sumAllExternalCallsOperatorDurationToString);
        dataForBuildTable.arr14.push(op.sumAllInternalCallsOperatorDurationToString);
        dataForBuildTable.arr15.push(op.sumAllOperatorCallsDurationToString);
        dataForBuildTable.arr16.push(op.transfferedCalls);
    }

    return dataForBuildTable;
}