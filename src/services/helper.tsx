import { endpoint, debug } from '../App';

declare const Axios: any;

export const logout = () => {
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

export const getData = async (startDate: string, finishDate: string) => {
    const data = await Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'totalstats',
                values: { startDate: startDate, finishDate: finishDate }
            }
        },
        withCredentials: true
    });

    return data;

}

export const checkSession = () => {
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

export const checkPermissions = (permission: string) => {
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

export const downloadRecord = (data: { record: string, date: string, who: string }) => {
    return new Promise((resolve, reject) => {
        // const endpoint = 'http://opinion.local/opinion/router/web.php';
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: endpoint,
            data: {
                params: {
                    param: 'getrecordname',
                    values: { ...data }
                }
            },
            withCredentials: true
        }).then((result) => {
            resolve(result);

        }).catch((err) => {
            console.log('err: ', err.response);
            reject(err.response);
        });
    });
}