import moment from 'moment';
import { debug } from '../../../../App';

export const getMinMax = (calls: {}, $type: 'day' | 'twoDay' | 'threeDay' | 'fourDayReworked' | 'sevenDayReworked' | 'tenDayReworked') => {
    let finishDate = moment(calls[Object.keys(calls).length - 1].calldate);

    let min = moment(finishDate);
    let max = moment(finishDate);


    let now = moment(); now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    min.set('hour', 0); min.set('minute', 0);
    // max.set('hour', 23); max.set('minute', 59);

    if (finishDate.isAfter(now)) {
        // max = moment().add(3, 'hour');
        max = moment();
    } else {
        max.set('hour', 23); max.set('minute', 59);
    }

    // if (finishDate.isAfter(now)) {
    //     max = moment().add(3, 'hour');
    // } else {
    //     max.set('hour', 23); max.set('minute', 59);
    // }


    if ($type === 'day') {

    }
    else if ($type === 'twoDay') {
        min.subtract(1, 'days');
    }
    else if ($type === 'threeDay') {
        min.subtract(3, 'days');
    }
    else if ($type === 'fourDayReworked') {
        max.set('hour', 3); max.set('minute', 0);
        min.subtract(4, 'days');
    }
    else if ($type === 'sevenDayReworked') {
        max.set('hour', 3); max.set('minute', 0);
        min.subtract(7, 'days');
    }
    else if ($type === 'tenDayReworked') {
        max.set('hour', 3); max.set('minute', 0);
        min.subtract(10, 'days');
    }
    else {
        return [0, 0];
    }


    return [min.valueOf(), max.valueOf()];
}

export const getDiffBetweenFinishAndStart = (finishDate: moment.Moment, temp: moment.Moment) => {
    let result = finishDate.diff(temp);
    let diffHours = Math.floor(result / 1000 / 60 / 60);
    return diffHours;
}


export const prepareCallsToChart = (inboundCalls: any, outboundCalls: any) => {
    let tempInbound: moment.Moment;
    let finishDateInbound: moment.Moment;

    if (inboundCalls.length === 0) {
        tempInbound = moment();
        finishDateInbound = moment();
    } else {
        tempInbound = moment(inboundCalls[0].calldate);
        tempInbound.set("minute", 0);
        tempInbound.set("second", 0);
        finishDateInbound = moment(inboundCalls[Object.keys(inboundCalls).length - 1].calldate);
    }



    let tempOutbound: moment.Moment;
    let finishDateOutbound: moment.Moment;;
    if (outboundCalls.length === 0) {
        tempOutbound = moment();
        finishDateOutbound = moment();
    } else {
        tempOutbound = moment(outboundCalls[0].calldate);
        tempOutbound.set("minute", 0);
        tempOutbound.set("second", 0);

        finishDateOutbound = moment(outboundCalls[Object.keys(outboundCalls).length - 1].calldate);
    }

    let callsArrayInbound: [number, number][];
    let callsArrayOutbound: [number, number][];
    let min = 0;
    let max = 0;

    let diffFinishAndStart = getDiffBetweenFinishAndStart(finishDateInbound, tempInbound);
    debug && console.log('разница между началом и концом периода в часах: ', diffFinishAndStart);

    if (diffFinishAndStart > 400) {
        callsArrayInbound = period1dayReworked(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period1dayReworked(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);
        [min, max] = getMinMax(inboundCalls, 'tenDayReworked');
    }
    else if (diffFinishAndStart > 200) {
        callsArrayInbound = period1dayReworked(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period1dayReworked(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);
        [min, max] = getMinMax(inboundCalls, 'sevenDayReworked');
    }
    else if (diffFinishAndStart > 100) {
        callsArrayInbound = period1dayReworked(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period1dayReworked(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);
        [min, max] = getMinMax(inboundCalls, 'fourDayReworked');
    }
    else if (diffFinishAndStart > 50) {
        callsArrayInbound = period4hour(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period4hour(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);
        [min, max] = getMinMax(inboundCalls, 'twoDay');
    }
    else if (diffFinishAndStart > 40) {
        callsArrayInbound = period1hour(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period1hour(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);

    } else if (diffFinishAndStart > 20) {
        callsArrayInbound = period30min(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period30min(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);
    } else {
        callsArrayInbound = period15min(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
        callsArrayOutbound = period15min(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);
    }

    // callsArrayInbound = period15min(moment(tempInbound), moment(finishDateInbound), [...inboundCalls]);
    // callsArrayOutbound = period15min(moment(tempOutbound), moment(finishDateOutbound), [...outboundCalls]);


    // return callsArrayInbound;

    return { callsArrayInbound, callsArrayOutbound, min, max };
}


const period15min = (temp: moment.Moment, finishDate: moment.Moment, calls: {}) => {
    const callsArray = Array<[number, number]>();

    do {
        let dateInterval0 = moment(temp);
        let dateInterval1 = moment(temp.add(15, "m"));
        let dateCount1 = 0;
        let dateInterval2 = moment(temp.add(15, "m"));
        let dateCount2 = 0;
        let dateInterval3 = moment(temp.add(15, "m"));
        let dateCount3 = 0;
        let dateInterval4 = moment(temp.add(15, "m"));
        let dateCount4 = 0;

        for (const _call in calls) {
            let calldate = moment(calls[_call].calldate);
            if (calldate.isAfter(dateInterval0) && calldate.isBefore(dateInterval1)) {
                dateCount1++;
            } else if (calldate.isAfter(dateInterval1) && calldate.isBefore(dateInterval2)) {
                dateCount2++;
            } else if (calldate.isAfter(dateInterval2) && calldate.isBefore(dateInterval3)) {
                dateCount3++;
            } else if (calldate.isAfter(dateInterval3) && calldate.isBefore(dateInterval4)) {
                dateCount4++;
            }
        }
        callsArray.push([dateInterval1.valueOf(), dateCount1]);
        callsArray.push([dateInterval2.valueOf(), dateCount2]);
        callsArray.push([dateInterval3.valueOf(), dateCount3]);
        callsArray.push([dateInterval4.valueOf(), dateCount4]);

    } while (finishDate.isAfter(temp));

    return callsArray;
}

const period30min = (temp: moment.Moment, finishDate: moment.Moment, calls: {}) => {
    const callsArray = Array<[number, number]>();
    do {
        let dateInterval0 = moment(temp);
        let dateInterval1 = moment(temp.add(30, "m"));
        let dateCount1 = 0;
        let dateInterval2 = moment(temp.add(30, "m"));
        let dateCount2 = 0;

        for (const _call in calls) {
            let calldate = moment(calls[_call].calldate);
            if (calldate.isAfter(dateInterval0) && calldate.isBefore(dateInterval1)) {
                dateCount1++;
            } else if (calldate.isAfter(dateInterval1) && calldate.isBefore(dateInterval2)) {
                dateCount2++;
            }
        }
        callsArray.push([dateInterval1.valueOf(), dateCount1]);
        callsArray.push([dateInterval2.valueOf(), dateCount2]);

    } while (finishDate.isAfter(temp));

    return callsArray;
}

const period1hour = (temp: moment.Moment, finishDate: moment.Moment, calls: {}) => {
    const callsArray = Array<[number, number]>();
    do {
        let dateInterval0 = moment(temp);
        let dateInterval1 = moment(temp.add(60, "m"));
        let dateCount1 = 0;

        for (const _call in calls) {
            let calldate = moment(calls[_call].calldate);
            if (calldate.isAfter(dateInterval0) && calldate.isBefore(dateInterval1)) {
                dateCount1++;
            }
        }
        callsArray.push([dateInterval1.valueOf(), dateCount1]);

    } while (finishDate.isAfter(temp));

    return callsArray;
}

const period2hour = (temp: moment.Moment, finishDate: moment.Moment, calls: {}) => {
    const callsArray = Array<[number, number]>();
    do {
        let dateInterval0 = moment(temp);
        let dateInterval1 = moment(temp.add(120, "m"));
        let dateCount1 = 0;

        for (const _call in calls) {
            let calldate = moment(calls[_call].calldate);
            if (calldate.isAfter(dateInterval0) && calldate.isBefore(dateInterval1)) {
                dateCount1++;
            }
        }
        callsArray.push([dateInterval1.valueOf(), dateCount1]);

    } while (finishDate.isAfter(temp));

    return callsArray;
}

const period4hour = (temp: moment.Moment, finishDate: moment.Moment, calls: {}) => {
    const callsArray = Array<[number, number]>();
    do {
        let dateInterval0 = moment(temp);
        let dateInterval1 = moment(temp.add(240, "m"));
        let dateCount1 = 0;

        for (const _call in calls) {
            let calldate = moment(calls[_call].calldate);
            if (calldate.isAfter(dateInterval0) && calldate.isBefore(dateInterval1)) {
                dateCount1++;
            }
        }
        callsArray.push([dateInterval1.valueOf(), dateCount1]);

    } while (finishDate.isAfter(temp));

    return callsArray;
}

const period1dayReworked = (temp: moment.Moment, finishDate: moment.Moment, calls: {}) => {
    const callsArray = Array<[number, number]>();
    temp.set("hour", 0);
    finishDate.set("hour", 0);
    do {
        let dateInterval0 = moment(temp);
        let dateInterval1 = moment(temp.add(1, "d"));
        let dateCount1 = 0;

        for (const _call in calls) {
            let calldate = moment(calls[_call].calldate);
            if (calldate.isAfter(dateInterval0) && calldate.isBefore(dateInterval1)) {
                dateCount1++;
            }
        }
        callsArray.push([dateInterval0.valueOf(), dateCount1]);

    } while (finishDate.isAfter(temp));

    return callsArray;
}