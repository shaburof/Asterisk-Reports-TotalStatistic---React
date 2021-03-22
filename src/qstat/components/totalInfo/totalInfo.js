import React from 'react';
import InfoSlice from './infoSlice/infoSlice';

const TotalInfo = ({ data }) => {

    const downloadHandler = data.downloadHandler;
    const allowDownload = data.allowDownload;

    return <section className="totalinfo">
        <InfoSlice title="принято вызовов" value={data.totalAnswerCalls} />
        <InfoSlice title="общее время" value={data.totalTimeInConversation} />
        <InfoSlice title="в среднем на один вызов" value={data.avgTimeInConversation} />
        <InfoSlice title="дольше всех на паузе"
            value={data.mostLongOnPause.datetime}
            agent={data.mostLongOnPause.agent} />
        <InfoSlice title="самый длинный вызов"
            value={data.totalMostLongConversation.value}
            download={allowDownload && { uniqueid: data.totalMostLongConversation.uniqueid, ext: data.totalMostLongConversation.ext }}
            downloadHandler={allowDownload && downloadHandler}
            agent={data.totalMostLongConversation.agent} />
        <InfoSlice title="самый короткий вызов"
            value={data.totalMostShortConversation.value}
            download={allowDownload && { uniqueid: data.totalMostShortConversation.uniqueid, ext: data.totalMostShortConversation.ext }}
            downloadHandler={allowDownload && downloadHandler}
            agent={data.totalMostShortConversation.agent} />
    </section>
}

export default TotalInfo;