import * as React from 'react';
import {IPeriodoCultivo} from './interfaces/IPeriodoCultivo';
import { IMonitorFormState } from './MonitorForm';

import{
    Button
} from '@fluentui/react-components'

export interface IMonitorFormPeriodSelector{
    listaPeriodosCultivo:IPeriodoCultivo[],
    handleSelectedChange(campo: keyof IMonitorFormState, valor: string|number|undefined):void,
}

const MonitorFormPeriodSelector:React.FC<IMonitorFormPeriodSelector> = (props) => {
    const {
        listaPeriodosCultivo,
        handleSelectedChange
    } = props;

    const handleButtonClicked:React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e:React.MouseEvent)=>{
        console.log(e.currentTarget.innerHTML)
    },[handleSelectedChange])

    return (
        <section>
            <article>
                {listaPeriodosCultivo.map((item:IPeriodoCultivo) => {
                    <Button
                        shape='rounded'
                        onClick={handleButtonClicked}
                    >
                        {item.Nombre}
                    </Button>
                })}
                </article>
        </section>
    )
}

export default MonitorFormPeriodSelector