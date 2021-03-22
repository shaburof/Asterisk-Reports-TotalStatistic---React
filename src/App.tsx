import React, { useEffect, useState } from 'react';
// import { devData } from './dev/data';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Logout from './components/Interface/logout/logout';
import Spinner from './components/Interface/spinner/spinner';
import Message from './components/Interface/message/message';
import Button from './components/Interface/Button/Button';
import { getCurrentDateForInputFormat, getData, checkSession, checkPermissions, downloadRecord } from './services/helper';
// import InfoSlice from './components/InfoSlice';

enum viewTypeEnum { 'GRAPH', 'TABLE' };

declare const Axios: any;

function App() {
    const [inbound, setInbound] = useState({});
    const [outbound, setOutbound] = useState({});
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const [received, setReceived] = useState(false);
    const [error, setError] = useState(false);

    const [viewType, setViewType] = useState<viewTypeEnum>(viewTypeEnum.GRAPH);

    const [startDate, setStartDate] = useState(getCurrentDateForInputFormat());
    const [finishDate, setFinishDate] = useState(getCurrentDateForInputFormat());

    const [allowDownload, setDownload] = useState(false);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        (async () => {
            checkSession();
            const permission = await checkPermissions('totalstats');
            if (!permission) {
                debug
                    ? console.log('section totalstats not allow for current user: REDIRECT TO LOGIN PAGE')
                    : window.location.replace("/opinion/auth.html");
            };
            const downloadPermission = await checkPermissions('download') as boolean;
            debug && console.log(`Permission to download: ${downloadPermission}`);
            setDownload(downloadPermission);
        })();

        //////////////////
        // fot test
        // console.log('devData: ', devData);
        // setInbound(devData.INBOUND);
        // setOutbound(devData.OUTBOUND);
        // setLoading(false);
        // setReceived(true);
        // loadData();
        //////////////////
    }, []);

    useEffect(() => {
        if ((new Date(startDate)).getTime() <= (new Date(finishDate)).getTime()) {
            setReady(true);
        }
        else {
            setReady(false);
        }
    }, [startDate, finishDate]);

    const setStartDate_withCheck = (date) => {
        if (new Date(date) > (new Date())) setStartDate(getCurrentDateForInputFormat());
        else setStartDate(date);
    }

    const setFinishDate_withCheck = (date) => {
        if (new Date(date) > (new Date())) setFinishDate(getCurrentDateForInputFormat());
        else setFinishDate(date);
    }

    const onClickSearchHandler = async (e) => {
        e.preventDefault();
        if (loading || !ready) return false;
        loadData();
    }

    const downloadHandler = async (record: string, date: string, who: string) => {
        let splitDate = date.split(' ')[0];
        console.log('record file: ' + record);
        console.log('splitDate: ', splitDate);
        console.log('who: ', who);
        if (busy || !allowDownload) return false;
        try {
            setBusy(true);

            let response = await downloadRecord({ record, date: splitDate, who }) as any;

            if (response.data.error === true) {
                console.log('ERROR GET RECORDING FILENAME');
            } else {
                const filename = response.data.data;
                debug
                    ? console.log('/opinion/helpers/downloadRecord.php?file=' + filename + '&extension=' + who)
                    : (window as any).location = '/opinion/helpers/downloadRecord.php?file=' + filename + '&extension=' + who;
            }


            setBusy(false);
        } catch (e) {
            console.log(e);
            setBusy(false);
        }
    }

    const loadData = async () => {
        setLoading(true);
        setError(false);
        setReceived(false);
        try {
            let { data } = await getData(startDate, finishDate);
            debug && console.log('result: ', data);
            if (!data.INBOUND || !data.OUTBOUND) throw Error('что-то пошло не так');
            setInbound(data.INBOUND);
            setOutbound(data.OUTBOUND);
            setLoading(false);
            setReceived(true);
            debug && console.log('ДАННЫЕ УСПЕШНО ПОЛУЧЕНЫ');
        } catch (err) {
            console.log(err.response);
            debug && console.log('ПРОИЗОШЛА ОШИБКА');
            setLoading(false);
            setError(true);
        }
    };

    const switchViewTypeHandler = (event: Event, currentType: viewTypeEnum) => {
        event.preventDefault();
        setViewType((viewType === viewTypeEnum.GRAPH) ? viewTypeEnum.TABLE : viewTypeEnum.GRAPH);
    }

    return (
        <>
            <Logout />
            {/* <div className="container">
                <div className="row">
                    <div className="col-sm-12 centered" style={{ marginTop: '35px', position: 'relative' }}>
                        <h2>Статистика по входящим и исходящим звонкам</h2>
                        <hr />
                        <Button viewType={viewType} switchViewTypeHandler={switchViewTypeHandler}></Button>
                    </div>
                </div>
            </div> */}
            <div className="container">
                {/* <Button viewType={viewType} switchViewTypeHandler={switchViewTypeHandler}></Button> */}
                <Form startDate={startDate} finishDate={finishDate}
                    setStartDate_withCheck={setStartDate_withCheck}
                    setFinishDate_withCheck={setFinishDate_withCheck}
                    ready={ready} loading={loading}
                    viewType={viewType} switchViewTypeHandler={switchViewTypeHandler}
                    onClickSearchHandler={onClickSearchHandler}
                />
            </div>
            <div className="App">
                {(!loading && received && !error)
                    && <Dashboard inbound={inbound} outbound={outbound}
                        downloadHandler={downloadHandler} allowDownload={allowDownload}
                        viewType={viewType} />}
                {loading && <div className="col-sm-12 centered"><Spinner /></div>}
                {error && <div className="col-sm-12 centered mt-4"><Message message="что-то пошло не так" /></div>}
            </div>
        </>
    );
}

export const debug = true;
// export const debugQueueList = true;
const devEndpoint = 'http://localhost:8080/opinion/test.php';
const devEndpoint2 = 'http://opinion.local/opinion/router/web.php';
const productionEndpoint = 'http://192.168.0.60/opinion/router/web.php';
const productionEndpoint2 = '/opinion/router/web.php';

export const endpoint = debug ? devEndpoint2 : productionEndpoint;

export default App;

Axios.defaults.withCredentials = true
// Axios({
//     method: 'post',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     url: endpoint,
//     data: {
//         params: {
//             param: 'test',
//         }
//     },
//     withCredentials: true
// }).then((result) => {
//     console.log('--------------');
//     console.log(result.data);
//     console.log('--------------');
// }).catch((err) => {
//     console.log('err: ', err);

// });
