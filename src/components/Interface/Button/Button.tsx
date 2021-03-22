import React from 'react';

interface Props {
    viewType: viewTypeEnum,
    switchViewTypeHandler: Function
}
enum viewTypeEnum { 'GRAPH', 'TABLE' };

const Button = ({ viewType, switchViewTypeHandler }: Props) => {

    const text = viewType === viewTypeEnum.GRAPH ? 'графики' : 'таблица';
    return <button onClick={(event) => switchViewTypeHandler(event, viewType)} className="btn btn-sm btn-success">{text}</button>
}

export default Button;