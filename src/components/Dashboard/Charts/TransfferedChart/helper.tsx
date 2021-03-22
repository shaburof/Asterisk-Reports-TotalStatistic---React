export const prepare = (operators: { transfferedCalls: number, name: string, extension: string }[]): [string[], number[]] => {
    sortOperatorsByTransfferedCalls(operators);
    const names: string[] = [];
    const data: number[] = [];

    for (const operator of operators) {
        // console.log(`${operator.name}: ${operator.transfferedCalls}`);
        if (operator.transfferedCalls === 0) continue;
        data.push(operator.transfferedCalls);
        names.push(`${operator.name} (${operator.extension})`);
    }

    return [names, data];
}

const sortOperatorsByTransfferedCalls = (operators: { transfferedCalls: number }[]) => {
    operators.sort((a, b) => {
        if (a.transfferedCalls > b.transfferedCalls) return -1;
        else if (a.transfferedCalls < b.transfferedCalls) return 1;
        else return 0;
    });
}