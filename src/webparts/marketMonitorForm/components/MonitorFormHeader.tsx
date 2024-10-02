import * as React from 'react';

//Types
import { Unidad, Cliente, PeriodoCultivo, CNG } from '@/types';
import { IMonitorFormState } from '@/components/MonitorForm';

//Components
import {
	Button,
	Combobox,
	Label,
	//	makeResetStyles,
	makeStyles,
	Option,
	OptionOnSelectData,
	Popover,
	PopoverSurface,
	PopoverTrigger,
	SelectionEvents,
	shorthands,
	Subtitle1,
	tokens,
	useId,
} from '@fluentui/react-components';

//Hooks
import { useUserContext } from '@/hooks/useUserContext';
import { useDataContext } from '@/hooks/useDataContext';

//Strings
import * as headerStrings from 'MonitorFormHeaderStrings';

//Component Styles
const useStyles = makeStyles({
	//TODO: TRABAJAR EL RESPONSIVE DESIGN
	root: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '100%',
		fontSize: '1em',
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeBase500,
			marginTop: tokens.spacingVerticalXL,
		},
	},
	label: {
		color: 'currentColor',
		fontSize: '1.3rem',
		marginBottom: '5px',
		'@media screen and (max-width:480px)': {
			fontSize: '1em',
			fontWeight: tokens.fontWeightMedium,
			marginBottom: tokens.spacingVerticalXS,
		},
	},
	formHeaderCbxContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '600px',
		maxWidth: '650px',
		paddingRight: '60px',
		flexWrap: 'wrap',
		'@media screen and (max-width:480px)': {
			width: '100%',
			fontSize: tokens.fontSizeBase500,
		},
	},
	cbx: {
		display: 'grid',
		opacity: '100%',
		gridTemplateRows: 'repeat(1fr)',
		justifyItems: 'start',
		...shorthands.gap('2px'),
		maxWidth: '650px',
		marginBottom: tokens.spacingVerticalXL,
		fontSize: '1rem',
		'@media screen and (max-width:480px)': {
			fontSize: '.8em',
		},
		'> input': {
			width: '100%',
		},
	},
	popoverSurface: {
		display: 'flex',
		flexDirection: 'column',
	},
	button: {
		fontSize: '1.3rem',
		marginTop: '5px',
		color: 'currentcolor',
	},
});

export interface IMonitorFormHeaderProps {
	cliente: Cliente | undefined;
	unidad: Unidad | undefined;
	periodoCultivo: PeriodoCultivo | undefined;
	handleSelectedChange(
		campo: keyof IMonitorFormState,
		valor: string | number | undefined,
	): void;
}

const MonitorFormHeader: React.FC<IMonitorFormHeaderProps> = (props) => {
	const { listaUnidades, listaClientes, listaCNG } = useDataContext();

	const { unidad, cliente, periodoCultivo, children, handleSelectedChange } =
		props;

	const id = useId('monitor-form-header');
	//Component Style
	const styles = useStyles();

	const user = useUserContext();

	const cng: CNG | undefined = listaCNG.find(
		(item: CNG) => item.Correo === user.email,
	);
	let listaClientesFiltro: Cliente[] = [];

	switch (cng?.Cargo) {
		case 'Gerente':
			listaClientesFiltro = listaClientes.filter(
				(item: Cliente) =>
					item.Unidad?.Id === unidad?.Id &&
					Number(item.Anho) === new Date().getFullYear() - 1,
			);
			break;
		case 'Gerente de Sucursal':
			listaClientesFiltro = listaClientes.filter(
				(item: Cliente) =>
					item.Unidad?.Id === unidad?.Id &&
					item.Unidad?.Id === cng.Unidad?.Id &&
					Number(item.Anho) === new Date().getFullYear() - 1,
			);
			break;
		case 'Coordinador':
			listaClientesFiltro = listaClientes.filter(
				(item: Cliente) =>
					item.Unidad?.Id === unidad?.Id &&
					Number(item.Anho) === new Date().getFullYear() - 1,
			);
			break;
		case 'CNG':
			listaClientesFiltro = listaClientes.filter(
				(item: Cliente) =>
					item.Unidad?.Id === unidad?.Id &&
					Number(item.Anho) === new Date().getFullYear() - 1 &&
					item.CNG?.Correo === user.email,
			);
			break;
		default:
			listaClientesFiltro = [];
			break;
	}

	const handleDpDown = React.useCallback(
		(e: SelectionEvents, data: OptionOnSelectData) => {
			const event: HTMLElement = e.target as HTMLElement;

			let elementName;

			if (event.tagName === 'svg' || event.tagName === 'path') {
				elementName =
					event.parentElement?.parentElement?.firstElementChild?.getAttribute(
						'name',
					);
				if (event.parentElement?.tagName === 'svg') {
					elementName =
						event.parentElement?.parentElement?.parentElement?.firstElementChild?.getAttribute(
							'name',
						);
				}
			} else {
				elementName = document
					.querySelector(
						`[aria-controls=${event.parentElement?.getAttribute(
							'id',
						)}]`,
					)
					?.getAttribute('name');
			}

			const name =
				elementName === null || elementName === undefined
					? ''
					: elementName;
			const value = data.optionValue;

			handleSelectedChange(name as keyof IMonitorFormState, value);
		},
		[handleSelectedChange],
	);

	return (
		<section
			id={`content-section-${id}`}
			className={styles.root}
		>
			{!periodoCultivo ? (
				<>{children}</>
			) : (
				<>
					<article
						id={`content-article-${id}`}
						className={styles.formHeaderCbxContainer}
					>
						<Label
							htmlFor={`unidad-${id}`}
							size='large'
							required
							className={styles.label}
						>
							{headerStrings.Unidad}
						</Label>
						<Combobox
							id={`unidad-${id}`}
							name='unidad'
							placeholder={headerStrings.PlaceholderUnidad}
							onOptionSelect={handleDpDown}
							value={unidad?.Nombre || ''}
							disabled={unidad && cliente ? true : false}
							positioning={{
								autoSize: 'width',
								position: 'below',
							}}
							className={styles.cbx}
						>
							{listaUnidades.map((item: Unidad) => (
								<Option
									value={item?.Id?.toString()}
									key={item.Id}
									text='Unidad'
								>
									{item.Nombre}
								</Option>
							))}
						</Combobox>

						<Label
							htmlFor={`cliente-${id}`}
							size='large'
							required
							className={styles.label}
						>
							{headerStrings.Cliente}
						</Label>
						<Combobox
							id={`cliente-${id}`}
							name='cliente'
							placeholder={headerStrings.PlaceholderCliente}
							onOptionSelect={handleDpDown}
							positioning={{
								autoSize: 'width',
								position: 'below',
							}}
							value={cliente?.Nombre || ''}
							disabled={unidad && cliente ? true : false}
							className={styles.cbx}
						>
							{!unidad && (
								<Option
									value={'-1'}
									key={'-1'}
									text='Cliente'
								>
									{
										headerStrings.AlertaCbxCliente
											.SeleccionUnidad
									}
								</Option>
							)}

							{listaClientesFiltro.length === 0 && unidad && (
								<Option
									value={'-1'}
									key={'-1'}
									text='Cliente'
								>
									{headerStrings.AlertaCbxCliente.SinCliente}
								</Option>
							)}

							{listaClientesFiltro.map((item: Cliente) => (
								<Option
									value={item?.Id?.toString()}
									key={item.Id}
									text='Cliente'
								>
									{item.Nombre}
								</Option>
							))}
						</Combobox>
						<Popover
							closeOnScroll
							positioning={{
								autoSize: 'width',
								position: 'below',
							}}
						>
							<PopoverTrigger disableButtonEnhancement>
								<Button
									id={`periodo-seleccionado-${id}`}
									className={`${styles.button}`}
								>
									Periodo de Cultivo Seleccionado
								</Button>
							</PopoverTrigger>

							<PopoverSurface
								tabIndex={-1}
								className={styles.popoverSurface}
							>
								<Subtitle1>
									Periodo de Cultivo Seleccionado
								</Subtitle1>
								<Label>{periodoCultivo.Nombre}</Label>
							</PopoverSurface>
						</Popover>
					</article>
				</>
			)}
		</section>
	);
};

export default MonitorFormHeader;
