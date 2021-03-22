export const prepare = (operators) => {
    let names: string[] = [];
    let dataTochart: {}[] = [];

    for (const operator of operators) {
        if (operator.avgOpinion) {
            dataTochart.push({
                name: `${operator.name}`,
                y: operator.avgOpinion,
                color: addOpinionColor(operator.avgOpinion),
                depth: 5
            });
        }
    }

    dataTochart = sortByOpinion(dataTochart);

    dataTochart = dataTochart.map((data) => {
        names.push((data as any).name);
        delete (data as any).name;
        return data;
    })

    return { names, dataTochart }
}

const addOpinionColor = (opinion: number) => {
    let color: string = 'gray';
    if (opinion >= 1 && opinion < 2) color = '#ef1000';
    else if (opinion >= 2 && opinion < 3) color = '#c23f00';
    else if (opinion >= 3 && opinion < 4) color = '#758d00';
    else if (opinion >= 4 && opinion < 5) color = '#4bb900';
    else if (opinion === 5) color = '#07fe00';

    return color;
}

const sortByOpinion = (data: {}[]) => {
    return data.sort((a: any, b: any) => {
        if (a.y > b.y) return 1;
        else if (a.y < b.y) return -1
        else return 0;
    })
}