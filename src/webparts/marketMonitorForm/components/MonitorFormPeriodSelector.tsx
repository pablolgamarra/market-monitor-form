import * as React from 'react';
import { PeriodoCultivo } from 'src/webparts/marketMonitorForm/types';
import { IMonitorFormState } from './MonitorForm';

import {
    Button,
    shorthands,
    Title2
} from '@fluentui/react-components'

import * as headerStrings from 'MonitorFormHeaderStrings'

import { makeStyles } from '@fluentui/react-components';
import { useDataContext } from 'src/webparts/marketMonitorForm/hooks/useData';

const useStyles = makeStyles(
    {
        root: {
            width: '100%',
        },
        periodSelectorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px',
            ...shorthands.border('.1rem', 'solid', '#003c79'),
            ...shorthands.borderRadius('1rem'),
        },
        buttonsContainer: {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            '>Button': {
                width: '250px',
                height: '250px',
                fontSize: '1.6rem',
                ...shorthands.margin('50px', '100px'),
            }
        }
    }
)

export interface IMonitorFormPeriodSelector {
    handleSelectedChange(campo: keyof IMonitorFormState, valor: string | number | undefined): void,
}

const MonitorFormPeriodSelector: React.FC<IMonitorFormPeriodSelector> = (props) => {
    const { listaPeriodosCultivo } = useDataContext()

    const {
        handleSelectedChange
    } = props;

    //Component Style
    const styles = useStyles();

    const handleButtonClicked: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e: React.MouseEvent) => {
        const value = e.currentTarget.textContent === null ? '' : e.currentTarget.textContent;
        handleSelectedChange('periodoCultivo', value);
    }, [ handleSelectedChange ])

    return (
        <article className={styles.root}>
            <section className={styles.periodSelectorContainer}>
                <Title2>{headerStrings.PeriodoCultivoTitle}</Title2>
                <section className={styles.buttonsContainer}>
                    {listaPeriodosCultivo.map((item: PeriodoCultivo) => (
                        <Button
                            key={item.Id}
                            shape='rounded'
                            onClick={handleButtonClicked}
                        >
                            {item.Nombre}
                        </Button>
                    ))}
                </section>
            </section>
        </article>
    )
}

export default MonitorFormPeriodSelector