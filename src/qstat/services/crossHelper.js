export function getCross(arr) {
    let globalCross = [];
    let res1 = cross(getPrepareArrQ(arr))
    const operatorThatIsNotLogoutHasNoCrossPauses = Object.values(res1).length === 0;
    const firstLoginInArrQ = new Date(getFirstLoginInArrQ(arr));

    const now = new Date().setHours(0, 0, 0, 0);
    const todayIsNowDay = new Date(getFirstLoginInArrQ(arr)).setHours(0, 0, 0, 0) === now;


    if (todayIsNowDay) {
        const res1_2 = cross(getPrepareArrQ1_2(arr));
        Object.values(res1_2).map(value => globalCross.push(value));
        // Object.values(res1).map(value => globalCross.push(value));
    } else {
        let res2 = cross(getPrepareArrQ2(arr))
        Object.values(res2).map(value => globalCross.push(value));
    }


    let res3 = cross(getPrepareArrQ3(arr))
    if (Object.values(res3).length > 0) {
        const lastStartArrQ3 = Object.values(res3)[Object.values(res3).length - 1].start;
        const lastFinishArrQ3 = Object.values(res3)[Object.values(res3).length - 1].finish;
        Object.values(res3).map(value => {
            if (new Date(value.finish) > new Date(firstLoginInArrQ)) {
                globalCross.push({ start: value.start, finish: firstLoginInArrQ });
            } else globalCross.push(value);
        });
    } else {
        Object.values(res3).map(value => {
            globalCross.push(value)
        });
    }


    globalCross.sort((a, b) => {
        const t1 = new Date(a.start);
        const t2 = new Date(b.start);
        if (t1 > t2) return 1;
        else if (t1 < t2) return -1;
        else return 0;
    })

    return globalCross;
}

function getPrepareArrQ(arr) {
    const prepareArr = [];
    let sumLengthOfNewArray = 0;
    for (const item in arr.data) {
        const _t = arr.data[item];

        if (_t.queue.login && typeof _t.queue.logout === 'undefined') {
            if (arr.data[item].pause[0].length > 0) {
                for (const item2 of arr.data[item].pause[0]) {
                    prepareArr.push({
                        name: _t.name, login: _t.queue.login, logout: _t.queue.logout,
                        start: item2.start, finish: item2.finish
                    });
                }
            } else {
                prepareArr.push({
                    name: _t.name, login: _t.queue.login, logout: _t.queue.logout
                });
            }
            sumLengthOfNewArray++;
        }
    }
    return { prepareArr, sumLengthOfNewArray };
}

function getFirstLoginInArrQ(arr) {
    let firstLogin = '';
    for (const item in arr.data) {
        const _t = arr.data[item];
        if (_t.queue.login && typeof _t.queue.logout === 'undefined') {
            const login = new Date(_t.queue.login);
            if (firstLogin === '') firstLogin = _t.queue.login;
            else {
                if (login < new Date(firstLogin)) {
                    firstLogin = _t.queue.login;
                }
            }
        }
    }
    return firstLogin;
}

function getPrepareArrQ2(arr) {
    const prepareArr = [];
    let sumLengthOfNewArray = 0;
    for (const item in arr.data) {
        const _t = arr.data[item];
        if (_t.queue.login && _t.queue.logout) {
            if (arr.data[item].pause[0].length > 0) {
                for (const item2 of arr.data[item].pause[0]) {
                    prepareArr.push({
                        name: _t.name, login: _t.queue.login, logout: _t.queue.logout,
                        start: item2.start, finish: item2.finish
                    });
                }
            } else {
                prepareArr.push({
                    name: _t.name, login: _t.queue.login, logout: _t.queue.logout
                });
            }
            sumLengthOfNewArray++;
        }
    }
    return { prepareArr, sumLengthOfNewArray };
}

function getFirstLoginInArrQ2(arr) {
    let firstLogin = '';
    for (const item in arr.data) {
        const _t = arr.data[item];
        if (_t.queue.login && _t.queue.logout) {
            const login = new Date(_t.queue.login);
            if (firstLogin === '') firstLogin = _t.queue.login;
            else {
                if (login < new Date(firstLogin)) {
                    firstLogin = _t.queue.login;
                }
            }
        }
    }
    return firstLogin;
}

function getPrepareArrQ1_2(arr) {
    const prepareArr = [];
    let sumLengthOfNewArray = 0;
    for (const item in arr.data) {
        const _t = arr.data[item];

        if ((_t.queue.login && typeof _t.queue.logout === 'undefined') || _t.queue.login && _t.queue.logout) {
            if (arr.data[item].pause[0].length > 0) {
                for (const item2 of arr.data[item].pause[0]) {
                    prepareArr.push({
                        name: _t.name, login: _t.queue.login, logout: _t.queue.logout,
                        start: item2.start, finish: item2.finish
                    });
                }
            } else {
                prepareArr.push({
                    name: _t.name, login: _t.queue.login, logout: _t.queue.logout
                });
            }
            sumLengthOfNewArray++;
        }
    }
    return { prepareArr, sumLengthOfNewArray };
}


function getPrepareArrQ3(arr) {
    const prepareArr = [];
    let sumLengthOfNewArray = 0;
    for (const item in arr.data) {
        const _t = arr.data[item];
        if (typeof _t.queue.login === 'undefined' && _t.queue.logout) {
            if (arr.data[item].pause[0].length > 0) {
                for (const item2 of arr.data[item].pause[0]) {
                    prepareArr.push({
                        name: _t.name, login: _t.queue.login, logout: _t.queue.logout,
                        start: item2.start, finish: item2.finish
                    });
                }
            } else {
                prepareArr.push({
                    name: _t.name, login: _t.queue.login, logout: _t.queue.logout
                });
            }
            sumLengthOfNewArray++;
        }
    }
    return { prepareArr, sumLengthOfNewArray };
}

function cross(data) {
    let { prepareArr, sumLengthOfNewArray } = data;
    prepareArr.sort((a, b) => {
        const t1 = new Date(a.start);
        const t2 = new Date(b.start);
        if (t1 > t2) return 1;
        else if (t1 < t2) return -1;
        else return 0;
    })

    const res = {};
    let cnt = 0;
    let allLength = sumLengthOfNewArray - 1;
    for (const item of prepareArr) {
        const start = new Date(item.start);
        const finish = new Date(item.finish);
        const login = item.login ? new Date(item.login) : false;
        const logout = item.logout ? new Date(item.logout) : false;
        let qwe;
        let count = 0;
        let totalCount = allLength;
        if (totalCount === 0) {
            res[cnt] = { start: item.start, finish: item.finish };
            cnt++;
            continue;
        }

        for (const item2 of prepareArr) {
            const start2 = new Date(item2.start);
            const finish2 = new Date(item2.finish);
            const login2 = item.login ? new Date(item2.login) : false;
            const logout2 = item.logout ? new Date(item2.logout) : false;
            if (JSON.stringify(item) !== JSON.stringify(item2)) {

                if (start >= start2 && finish <= finish2) {
                    qwe = { start: item.start, finish: item.finish }
                    count++;
                }
                else if (start > start2 && finish > finish2 && start < finish2) {
                    qwe = { start: item.start, finish: item2.finish }
                    count++;
                }
            }
        }

        if (qwe && totalCount === count) {
            let valueAlredyIncludesInResult = Object.values(res).filter(r => JSON.stringify(r) === JSON.stringify(qwe)).length > 0;
            !valueAlredyIncludesInResult && (res[cnt] = qwe);
        }
        cnt++;
    }

    return res;
}
