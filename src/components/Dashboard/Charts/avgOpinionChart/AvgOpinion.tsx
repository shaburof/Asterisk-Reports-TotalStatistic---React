import React, { useEffect, useState } from 'react';
import { chart } from './buildChart';
import { prepare } from './helper';

interface Props {
    operators: {
        AvgOpinion: number,
        countCallWithOpinion: number,
        name: string,
        extension: string
    }[]
}

const AvgOpinion = ({ operators }: Props) => {
    const [hasData, setHasData] = useState(false);
    const [names, setNames] = useState<any[]>([]);
    const [dataTochart, setDataTochart] = useState<any[]>([]);

    useEffect(() => {
        if (operators.length > 0) {
            const { names, dataTochart } = prepare([...operators])
            if (dataTochart.length > 0) {
                setHasData(true);
                setNames(names);
                setDataTochart(dataTochart);
            }
        }
    }, []);

    useEffect(() => {
        if (hasData) chart(names, dataTochart);
    }, [hasData]);


    return <>
        {hasData && <div id="avgopinionchart" className="mt-4"></div>}
    </>
}

export default AvgOpinion;