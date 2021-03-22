export const prepare = () => {

}


export const prepareData = (inboundOperators, outboundOperators) => {
    let internalData = prepareOperatorsData(inboundOperators);
    let externalData = prepareOperatorsData(outboundOperators);

    let names = getAllNames(internalData, externalData);
    return dataToChart(names, internalData, externalData);
}

const dataToChart = (names: string[], internalData: {}, externalData: {}) => {
    let operatorNames: string[] = [];
    let data1: number[] = [];
    let data2: number[] = [];

    let data3: number[] = [];
    let data4: number[] = [];
    for (const name of names) {
        // let allCallOperatorCount = (typeof internalData[name] !== 'undefined') ? internalData[name].allCallOperatorCount : 0;
        let inboundInternalCount = (typeof internalData[name] !== 'undefined') ? internalData[name].internalCount : 0;
        let inboundExternalCount = (typeof internalData[name] !== 'undefined') ? internalData[name].externalCount : 0;

        let outboundInternalCount = (typeof externalData[name] !== 'undefined') ? externalData[name].internalCount : 0;
        let outboundExternalCount = (typeof externalData[name] !== 'undefined') ? externalData[name].externalCount : 0;

        // let sumAllExternalCallsOperatorDurationToString = (typeof internalData[name] !== 'undefined')
        //     ? internalData[name].sumAllExternalCallsOperatorDurationToString : '';
        // let sumAllInternalCallsOperatorDurationToString = (typeof internalData[name] !== 'undefined')
        //     ? internalData[name].sumAllInternalCallsOperatorDurationToString : '';
        // let sumAllOperatorCallsDurationToString = (typeof internalData[name] !== 'undefined')
        //     ? internalData[name].sumAllOperatorCallsDurationToString : '';


        data1.push(inboundInternalCount);
        data2.push(inboundExternalCount);
        data3.push(outboundInternalCount);
        data4.push(outboundExternalCount);

        let opName = (typeof internalData[name] !== 'undefined') ? internalData[name].name : externalData[name].name;
        operatorNames.push(opName);

    }
    return { operatorNames, data1, data2, data3, data4 };
}

const getAllNames = (internalData: {}, externalData: {}) => {
    let temp = { ...internalData, ...externalData };
    return Object.keys(temp);
}

export const prepareOperatorsData = (operators: any[]) => {
    const names: {} = {};
    for (const operator of operators) {
        let name = `${operator.name} (${operator.extension})`;
        let ext = operator.extension;

        // let allCallOperatorCount = operator.allCallOperatorCount;
        let externalCount = operator.externalCount;
        let internalCount = operator.internalCount;
        // let sumAllExternalCallsOperatorDurationToString = operator.sumAllExternalCallsOperatorDurationToString;
        // let sumAllInternalCallsOperatorDurationToString = operator.sumAllInternalCallsOperatorDurationToString;
        // let sumAllOperatorCallsDurationToString = operator.sumAllOperatorCallsDurationToString;
        names[ext] = {
            name,
            // allCallOperatorCount,
            externalCount,
            internalCount,
            // sumAllExternalCallsOperatorDurationToString,
            // sumAllInternalCallsOperatorDurationToString,
            // sumAllOperatorCallsDurationToString
        }
    }

    return names;
}

export const numberToStringTime = (sec_num: number) => {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    let hoursString = hours ? hours + 'ч.' : '';
    let minutesString = minutes ? minutes + 'мин.' : '';
    let secondsString = seconds ? seconds + 'c.' : '';

    return hoursString + minutesString + secondsString;
}