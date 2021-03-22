import React, { FormEvent } from 'react';
import classes from './form.module.css';
import Button from '../Interface/Button/Button';
enum viewTypeEnum { 'GRAPH', 'TABLE' };
interface FormInterface {
    startDate: string,
    finishDate: string,
    setStartDate_withCheck: Function,
    setFinishDate_withCheck: Function,
    ready: boolean,
    loading: boolean,
    onClickSearchHandler: (e: FormEvent) => void,
    viewType: viewTypeEnum,
    switchViewTypeHandler: Function
}

const Form = ({ startDate, finishDate, setStartDate_withCheck,
    setFinishDate_withCheck, ready, loading,
    onClickSearchHandler, viewType, switchViewTypeHandler }: FormInterface) => {

    const buttonClass = (loading || !ready) ? 'btn btn-sm btn-secondary ' + classes.disabledButton : 'btn btn-sm btn-primary'

    return <form id="dcall" onSubmit={onClickSearchHandler}>
        <div className="col-sm-12">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="inputDate">Начальная дата:</label>
                        {/* <input value={props.date_at} onChange={(e) => props.setDate_at(e.target.value)} type="date" className="form-control text-center" /> */}
                        <input type="date" className="form-control text-center" value={startDate}
                            onChange={(e) => setStartDate_withCheck(e.target.value)} />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="inputDate">Конечная дата:</label>
                        <input type="date" className="form-control text-center" value={finishDate}
                            onChange={(e) => setFinishDate_withCheck(e.target.value)} />
                        {/* <input value={props.date_to} onChange={(e) => props.setDate_to(e.target.value)} type="date" className="form-control text-center" /> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 centered" style={{ marginTop: '35px' }}>
                    <input type="submit"
                        className={buttonClass}
                        value="ПОИСК" />
                </div>
                <div className={classes.buttonField + ' col-sm-12 centered'}>
                    <Button viewType={viewType} switchViewTypeHandler={(event) => switchViewTypeHandler(event)}></Button>
                    <p className={classes.buttonDesc}><span className={classes.buttonDescArrawUp}>&uarr;</span><span className={classes.buttonDescArrawLeft}>&larr; </span>переключение представления в виде таблиц или диаграм</p>
                </div>
            </div>
        </div>
    </form>
}

export default Form;