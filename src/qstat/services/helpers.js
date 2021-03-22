import { endpoint, debug, debugQueueList } from '../App';
const Axios = window.axios;

export const queueList = [
    { queue: '0908', queue_id: 20, description: 'обратные звонки VIP очереди' },
    { queue: '0909', queue_id: 19, description: 'обслуживание VIP клиентов' },
    { queue: '0990', queue_id: 21, description: 'выдача карт' },
    { queue: '0991', queue_id: 9, description: 'техподдержка по Банку' },
    { queue: '0992', queue_id: 10, description: 'техподдержка по Клиент-банку' },
    { queue: '0993', queue_id: 13, description: 'основная очередь 377-66-55' },
    { queue: '0994', queue_id: 14, description: 'обратный вызов для 377-66-55' },
    { queue: '0995', queue_id: 17, description: 'очередь консультации по кредитованию' },
    { queue: '0996', queue_id: 18, description: 'очередь техподдержки, консультация клиентов' },
]

export const checkPermissionsQueueListForCurrentUser = async () => {
    if (debugQueueList) return queueList;
    const allowQueueList = [];
    for (const item in queueList) {
        const queueNumber = `queue:${queueList[item].queue_id}`;
        let isAllow = await checkPermissions(queueNumber);
        isAllow && allowQueueList.push(queueList[item]);
    };
    return allowQueueList;
}

export const getData = async (queue, date) => {
    const data = await Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'queue',
                values: { date: date, queue: queue }
            }
        },
        withCredentials: true
    });

    return data;

}

export const getRecord = async (uniqueid) => {
    const devEndpoint2 = 'http://opinion.local/opinion/router/web.php';
    const data = await Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'queuegetrecord',
                values: { uniqueid: uniqueid }
            }
        },
        withCredentials: true
    });

    return data;
}

export const login = () => {
    const endpoint2 = 'http://192.168.0.60/opinion/router/web2.php';
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'login',
                values: { name: 'admin', password: 'rfgbnjirf' }
            }
        },
        withCredentials: true
    }).then((result) => {
        console.log('result: ', result);
        debug && console.log('login result: result: ', result.data);

    }).catch((err) => {
        console.log('login error: ', err);

    });
}

export const logout = () => {
    const Axios = window.axios;
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'logout',
            }
        },
        withCredentials: true
    }).then((result) => {
        debug ? console.log('result: ', result.data) : window.location.replace("/opinion/auth.html");

    }).catch((err) => {
        console.log('err: ', err);

    });
}

export const getCurrentDateForInputFormat = () => {
    return (new Date()).toISOString().substring(0, 10);
}

export const checkPermissions = (permission) => {
    return new Promise((resolve, reject) => {
        // const endpoint = 'http://opinion.local/opinion/router/web.php';
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: endpoint,
            data: {
                params: {
                    param: 'check permissions',
                    values: { permissions: permission }
                }
            },
            withCredentials: true
        }).then((result) => {
            const status = result.data;
            resolve(status.content);

        }).catch((err) => {
            debug && console.log('err: ', err.response);
            resolve(false);
        });
    });
}

export const checkSession = () => {
    const Axios = window.axios;
    // const endpoint = 'http://opinion.local/opinion/router/web.php';
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'check session',
            }
        },
        withCredentials: true
    }).then((result) => {
        const status = result.data.content;
        if (status.active === false) {
            debug
                ? console.log('session not active REDIRECT TO LOGIN PAGE')
                : window.location.replace("/opinion/auth.html");
        } else debug && console.log('check session: SESSION ACTIVE');
    }).catch((err) => {
        console.log('err: ', err);

    });

}

export const preparedCrossPauses = (arr2) => {
    const arrPrepared = [];
    for (const item in arr2.data) {
        const _t = arr2.data[item];

        arrPrepared.push({ name: _t.name, login: _t.queue.login, logout: _t.queue.logout, data: _t.pause[0] });
        //  arrPrepared.push({ name: _t.name, login: _t.queue.login, logout: _t.queue.logout, data: [] });
    }
    let arr = arrPrepared;
    // console.log(arr);
    const prepareArr = [];
    for (const item of arr) {
        // console.log('item: ', item);
        if (item.data.length > 0) {
            for (const item2 of item.data) {
                prepareArr.push({ name: item.name, login: item.login, logout: item.logout, ...item2 })
            }
        } else {
            prepareArr.push({ name: item.name, login: item.login, logout: item.logout })
        }
    }
    let cross = [];
    let qwe2 = [];
    for (const item of prepareArr) {
        const startFrom = item.start;
        const finishFrom = item.finish;


        for (const item2 of prepareArr) {
            if (item.name != item2.name) {
                const start = item2.start;
                const finish = item2.finish;
                let cr = null;

                if (startFrom <= start && finishFrom <= finish) {
                    if (start < finishFrom) {
                        let newCross = [];
                        cr = {
                            start: start, finish: finishFrom,
                            login: item.login, logout: item.logout,
                            names: [item.name, item2.name]
                        };
                        if (cross.length > 0) {

                            newCross = cross.map(subItem => {
                                if (cr && cr.start >= subItem.start && cr.finish >= subItem.finish) {
                                    if (cr.start < subItem.finish) {
                                        let names = new Set([...subItem.names, item.name, item2.name])
                                        cr = null;
                                        return { ...subItem, names: [...names] };
                                    }
                                } else {
                                    // return subItem;
                                }
                                return subItem;
                            })
                        }
                        if (cr === null) cross = newCross;

                    }
                } else if (startFrom < start && finishFrom > finish) {
                    cr = {
                        start: start, finish: finish,
                        login: item.login, logout: item.logout,
                        names: [item.name, item2.name]
                    };
                    // console.log('cr1: ', cr);
                    let newCross = [];
                    // console.log('cross.lengtn: ', cross.length);
                    // console.log(cross.length > 0 && cr);
                    if (cross.length > 0 && cr) {
                        newCross = cross.map(subItem => {
                            // console.log('cr2: ', cr);
                            if (cr && cr.start >= subItem.start && cr.finish >= subItem.finish) {
                                if (cr.start < subItem.finish) {
                                    let names = new Set([...subItem.names, item.name, item2.name])
                                    // console.log({ ...subItem, names: [...names] });
                                    cr = null;
                                    return { ...subItem, names: [...names] };
                                }
                            } else {
                                // return subItem;
                            }
                            return subItem;
                        });
                        // console.log(newCross);

                    }
                    if (cr === null && typeof newCross !== 'undefined') cross = newCross;
                } else {
                    //    if(typeof item2.start==='undefined'){
                    //        console.log(item);
                    //        console.log(item2);
                    //        console.log('-------------------');
                    //        if(item.login<item2.login){
                    //            console.log(cr);
                    //        }
                    //    }
                }
                if (cr !== null) {
                    // console.log('cr: ', cr);
                    cross.push(cr);
                }
            }
        }
    }

    // const crossObj = cross.map(item => {
    //     return JSON.parse(item);
    // })

    // console.table(cross);
    const finalCross = [];
    let arrCount = arr.length;
    // console.log('arrCount: ', arrCount);
    for (const crossItem of cross) {
        let addCrossToArray = true;
        // console.log('crossItem: ', crossItem);
        const crossItemStart = new Date(crossItem.start);
        const crossItemFinish = new Date(crossItem.finish);
        // console.log('crossItemStart: ', crossItemStart);
        // console.log('crossItemFinish: ', crossItemFinish);
        for (const arrItem of arr) {
            // console.log(arrItem.name);
            addCrossToArray = addCrossToArray !== false && true;
            // console.log('arrItem: ', arrItem);
            const arrItemLogin = new Date(arrItem.login);
            const arrItemLogout = new Date(arrItem.logout);
            // console.log('arrItemLogin: ', arrItemLogin);
            // console.log('arrItemLogout: ', arrItemLogout);
            // console.log('crossItem', crossItem);
            // console.log('arrItem', arrItem);
            if (arrItemLogout < crossItemStart && arrItemLogout < crossItemFinish) {
                // console.log('logout раньше чем началась пауза');
                // addCrossToArray=false;
                // finalCross.push(crossItem);
            } else if (arrItemLogin > crossItemStart && arrItemLogin > crossItemFinish) {
                // console.log('login позднее чем началась пауза');
                // finalCross.push(crossItem);
            } else if (arrItemLogin < crossItemStart && arrItemLogout > crossItemFinish) {
                // console.log('пауза произошла межде событиями login и logout');
                // console.log(arrItem.name);
                if (!crossItem.names.includes(arrItem.name)) {
                    // console.log('имя не содержиться в массиве names');
                    addCrossToArray = false;
                    // arrCount++;
                } else {
                    // finalCross.push(crossItem);
                }
            } else {
                // console.log('другое');
            }
            // console.log(addCrossToArray);
            // console.log('---------------------');
        }
        // console.log('addCrossToArray: ', addCrossToArray);
        if (addCrossToArray) {
            finalCross.push(crossItem);
        }
    }

    finalCross.sort((a, b) => {
        const t1 = new Date(a.start);
        const t2 = new Date(b.start);
        if (t1 > t2) return 1;
        else if (t1 < t2) return -1;
        else return 0;
    })


    for (let index = 0; index < finalCross.length; index++) {
        const period = finalCross[index];
        let nextPeriod;
        if ((index + 1) !== finalCross.length) {
            nextPeriod = finalCross[index + 1]
        } else {
            nextPeriod = false;
        }

        const start = new Date(period.start);
        const finish = new Date(period.finish);
        if (nextPeriod) {
            const nextPeriodStart = new Date(nextPeriod.start);
            const nextPeriodFinish = new Date(nextPeriod.finish);
            if (start <= nextPeriodStart && finish <= nextPeriodFinish && finish >= nextPeriodStart) {
                delete finalCross[index];
                finalCross[index + 1] = { start: period.start, finish: nextPeriod.finish };
            } else if (start <= nextPeriodStart && finish >= nextPeriodFinish) {
                delete finalCross[index];
                finalCross[index + 1] = { start: period.start, finish: period.finish };
            }

        }
    }
    return finalCross;
}

export const dateIntervalToString = (data1, data2) => {
    const d1 = new Date(data1);
    const d2 = new Date(data2);
    const interval = (d2 - d1) / 1000;
    const hours = Math.floor(interval / 60 / 60);
    const minutes = Math.floor(interval / 60 - (hours * 60));
    const sec = interval - (minutes * 60 + hours * 60 * 60);
    let dataString = '';
    hours > 0 && (dataString += `${hours}ч. `);
    minutes > 0 && (dataString += `${minutes}м.`);
    sec > 0 && (dataString += `${sec}с. `);
    return dataString;
}