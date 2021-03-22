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
    for (const name of names) {
        let interAvg = (typeof internalData[name] !== 'undefined') ? internalData[name].avgCall : 0;
        let exterAvg = (typeof externalData[name] !== 'undefined') ? externalData[name].avgCall : 0;

        data1.push(interAvg);
        data2.push(exterAvg);

        let opName = (typeof internalData[name] !== 'undefined') ? internalData[name].name : externalData[name].name;
        operatorNames.push(opName);

    }
    return { operatorNames, data1, data2 };
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

        let avgCall = operator.avgPerOperatorCall;
        let avgCallToString = operator.avgPerOperatorCallToString;
        names[ext] = {
            name,
            avgCall,
            avgCallToString
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