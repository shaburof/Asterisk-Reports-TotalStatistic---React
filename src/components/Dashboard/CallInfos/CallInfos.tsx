import React from 'react';
import classes from './callinfos.module.css';

interface CallInfosInterface {
    type: 'INBOUND' | 'OUTBOUND',
    data: any,
    downloadHandler: Function,
    allowDownload: boolean
}
const CallInfos = ({ type, data, downloadHandler, allowDownload }: CallInfosInterface) => {

    const cardColorStyle = (type === 'INBOUND') ? classes.inboundColor : classes.outboundColor;

    const doCallHaveMostCalls = (call) => Array.isArray(call) && call.length === 0 ? false : true;

    const getOperatorNameWithExtension = (call: { name: string, operatorExtension: number }) => {
        return `${call.name} {${call.operatorExtension}}`;

    }
    return <div className={classes.callInfos}>
        <section className={classes.section2}>
            <div className={classes.card2 + ' ' + cardColorStyle}>
                <p className={classes.card2__title}>общее колличество звонков</p>
                <p className={classes.card2__value}>{data.allCallCount}</p>
            </div>
            <div className={classes.card2 + ' ' + cardColorStyle}>
                <p className={classes.card2__title}>общее время звонков</p>
                <p className={classes.card2__value}>{data.sumAllCallsDurationToString}</p>
            </div>
            <div className={classes.card2 + ' ' + cardColorStyle}>
                <p className={classes.card2__title}>в среднем на один звонок</p>
                <p className={classes.card2__value}>{data.avgPerCallToString}</p>
            </div>
        </section>

        <section className={classes.section1}>
            <div className={classes.card3}>
                <p className={classes.card3__title}>самый длинный вызов</p>
                {doCallHaveMostCalls(data.mostLongCall)
                    ? <><p className={classes.card3__operatorname}>{getOperatorNameWithExtension(data.mostLongCall)}</p>
                        <p className={classes.card3__value}>{data.mostLongCall.durationToString}</p>
                        {allowDownload && <img className={classes.card3__download}
                            onClick={() => downloadHandler(
                                data.mostLongCall.recordingfile,
                                data.mostLongCall.calldate,
                                data.mostLongCall.operatorExtension
                            )}
                            src="/opinion/images/download_white.png" alt="" />}
                    </>
                    : ''}

            </div>
            <div className={classes.card3}>
                <p className={classes.card3__title}>самый короткий вызов</p>
                {doCallHaveMostCalls(data.mostShortCall)
                    ? <><p className={classes.card3__operatorname}>{getOperatorNameWithExtension(data.mostShortCall)}</p>
                        <p className={classes.card3__value}>{data.mostShortCall.durationToString}</p>
                        {allowDownload && <img className={classes.card3__download}
                            onClick={() => downloadHandler(
                                data.mostShortCall.recordingfile,
                                data.mostShortCall.calldate,
                                data.mostShortCall.operatorExtension,
                            )}
                            src="/opinion/images/download_white.png" alt="" />}
                    </>
                    : ''}

            </div>
        </section>
        <section className={classes.section1}>
            <div className={classes.card4 + ' ' + classes.colorOne}>
                <p className={classes.card4__title}>внутренние общее колличество</p>
                <p className={classes.card4__value}>{data.internalCount}</p>
            </div>
            <div className={classes.card4 + ' ' + classes.colorOne}>
                <p className={classes.card4__title}>общее время внутренних вызовов</p>
                <p className={classes.card4__value}>{data.sumAllInternalCallsDurationToString}</p>
            </div>
            <div className={classes.card4 + ' ' + classes.colorOne}>
                <p className={classes.card4__title}>в среднем на один внутренний вызов</p>
                <p className={classes.card4__value}>{data.avgPerInternalCallToString}</p>
            </div>
        </section>
        <section className={classes.section1}>
            <div className={classes.card4 + ' ' + classes.colorTwo}>
                <p className={classes.card4__title}>внешние общее колличество</p>
                <p className={classes.card4__value}>{data.externalCount}</p>
            </div>
            <div className={classes.card4 + ' ' + classes.colorTwo}>
                <p className={classes.card4__title}>общее время внешних вызовов</p>
                <p className={classes.card4__value}>{data.sumAllExternalCallsDurationToString}</p>
            </div>
            <div className={classes.card4 + ' ' + classes.colorTwo}>
                <p className={classes.card4__title}>в среднем на один внешний вызов</p>
                <p className={classes.card4__value}>{data.avgPerExternalCallToString}</p>
            </div>
        </section>
    </div >
}

export default CallInfos;