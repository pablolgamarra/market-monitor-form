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
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		boxSizing: 'border-box',
		...shorthands.margin('16px'),
		'@media screen and (max-width:480px)': {
			...shorthands.margin(tokens.spacingVerticalXL, 0),
			alignItems: 'center',
			marginTop: tokens.spacingHorizontalM,
		},
	},
	sectionTitle: {
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeBase500,
		},
	},
	buttonsContainer: {
		display: 'flex',
		flexWrap: 'nowrap',
		...shorthands.gap('8px'),
		'@media screen and (max-width:480px)': {
			width: '100%',
			flexDirection: 'column',
			flexWrap: 'wrap',
			alignItems: 'center',
			...shorthands.margin(tokens.spacingVerticalXL, 'auto'),
			...shorthands.gap('6vw'),
		},
	},
	button: {
		...shorthands.flex(1, 1, 'auto'),
		minWidth: '100px',
		'@media screen and (max-width:480px)': {
			width: '80%',
			height: '3em',
			fontSize: tokens.fontSizeBase400,
		},
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
			className={styles.container}
		>
			<Title2
				id={`title-${id}`}
				className={styles.sectionTitle}
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
		</article>
	);
};

export default MonitorFormPeriodSelector;
