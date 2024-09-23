import * as React from 'react';

//Types
import { PeriodoCultivo } from '@/types';
import { IMonitorFormState } from '@/components/MonitorForm';

//Components
import {
	Button,
	// shorthands,
	Title2,
	makeStyles,
	useId,
	tokens,
	makeResetStyles,
	//	makeResetStyles,
} from '@fluentui/react-components';

//Hooks
import { useDataContext } from '@/hooks/useDataContext';

//Strings
import * as headerStrings from 'MonitorFormHeaderStrings';

//Component Styles
const useBaseStyles = makeResetStyles({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	boxSizing: 'border-box',
	color: tokens.colorBrandForeground1,
	fontSize: '1em',
	alignItems: 'center',
	marginTop: tokens.spacingHorizontalXL,
});

const useStyles = makeStyles({
	sectionTitle: {
		fontSize: '1em',
		fontWeight: tokens.fontWeightMedium,
	},
	buttonsContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: tokens.spacingHorizontalXL,
		marginTop: tokens.spacingHorizontalL,

		'@media screen and (min-width:480px)': {
			// Mediano
		},
		'@media screen and (min-width:640px)': {
			// Grande
			'.img': {
				width: '210px',
			},
		},
		'@media screen and (min-width:1024px)': {
			flexDirection: 'row',
		},
		'@media screen and (min-width:1366px)': {
			// XXL
			'.img': {
				width: '250px',
			},
		},
		'@media screen and (min-width: 1920px)': {
			// XXXL
			'.img': {
				width: '300px',
			},
		},
	},
	button: {
		width: '80%',
		fontSize: '.9em',
		fontWeight: tokens.fontWeightSemibold,
		height: '2.5em',
		'@media screen and (min-width:1024px)': {
			height: '250px',
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
	const baseStyles = useBaseStyles();
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
			className={baseStyles}
		>
			<Title2
				id={`title-${id}`}
				className={styles.sectionTitle}
				align='center'
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
