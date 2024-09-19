import * as React from 'react';

//Types
import { PeriodoCultivo } from '@/types';
import { IMonitorFormState } from '@/components/MonitorForm';

//Components
import {
	Button,
	shorthands,
	Title2,
	makeStyles,
	useId,
	tokens,
} from '@fluentui/react-components';

//Hooks
import { useDataContext } from '@/hooks/useDataContext';

//Strings
import * as headerStrings from 'MonitorFormHeaderStrings';

//Component Styles
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		boxSizing: 'border-box',
		...shorthands.margin('16px'),
	},
	periodSelectorContainer: {
		marginBottom: '16px',
	},
	buttonsContainer: {
		display: 'flex',
		flexWrap: 'nowrap',
		...shorthands.gap('8px'),
		'@media screen and (max-width:320px)': {
			width: '100%',
			flexDirection: 'column',
			flexWrap: 'wrap',
			marginTop: tokens.spacingVerticalL,
			...shorthands.gap('10vw'),
		},
	},
	button: {
		...shorthands.flex(1, 1, 'auto'),
		minWidth: '100px',
	},
});

export interface IMonitorFormPeriodSelector {
	handleSelectedChange(
		campo: keyof IMonitorFormState,
		valor: string | number | undefined,
	): void;
}

const MonitorFormPeriodSelector: React.FC<IMonitorFormPeriodSelector> = (
	props,
) => {
	const { listaPeriodosCultivo } = useDataContext();

	const { handleSelectedChange } = props;

	const id = useId('monitor-form-period-selector');
	//Component Style
	const styles = useStyles();

	const handleButtonClicked: React.MouseEventHandler<HTMLButtonElement> =
		React.useCallback(
			(e: React.MouseEvent) => {
				const value =
					e.currentTarget.textContent === null
						? ''
						: e.currentTarget.textContent;
				handleSelectedChange('periodoCultivo', value);
			},
			[handleSelectedChange],
		);

	return (
		<article
			id={`content-article-${id}`}
			className={styles.root}
		>
			<section
				id={`content-section-${id}`}
				className={styles.periodSelectorContainer}
			>
				<Title2
					id={`title-${id}`}
					className=''
				>
					{headerStrings.PeriodoCultivoTitle}
				</Title2>
				<section
					id={`buttons-container-${id}`}
					className={styles.buttonsContainer}
				>
					{listaPeriodosCultivo.map((item: PeriodoCultivo) => (
						<Button
							id={`period-button-${item.Id}`}
							key={item.Id}
							shape='rounded'
							onClick={handleButtonClicked}
							className={styles.button}
						>
							{item.Nombre}
						</Button>
					))}
				</section>
			</section>
		</article>
	);
};

export default MonitorFormPeriodSelector;
