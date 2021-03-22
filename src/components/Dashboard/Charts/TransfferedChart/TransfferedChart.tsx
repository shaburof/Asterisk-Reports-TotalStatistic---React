import React, { useEffect } from 'react';
import { chart } from './buildChart';
import { prepare } from './helper';

interface TransferChartInterface {
    operators: {
        transfferedCalls: number,
        name: string,
        extension: string
    }[],
}

const TransfferedChart = ({ operators }: TransferChartInterface) => {

    useEffect(() => {
        const [names, data] = prepare([...operators]);
        names.length > 0 && chart(names, data);
    }, []);

    return <div id="transferchart" className="mt-4"></div>
}

export default TransfferedChart;