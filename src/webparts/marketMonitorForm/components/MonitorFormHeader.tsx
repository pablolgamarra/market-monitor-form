import * as React from 'react';

//Types
import { Unidad, Cliente, PeriodoCultivo } from '@/types';
import { IMonitorFormState } from '@/components/MonitorForm';

//Components
import {
	Button,
	Combobox,
	Label,
	makeStyles,
	Option,
	OptionOnSelectData,
	Popover,
	PopoverSurface,
	PopoverTrigger,
	SelectionEvents,
	shorthands,
	Subtitle1,
	useId,
} from '@fluentui/react-components';

//Hooks
import { useUserContext } from '@/hooks/useUserContext';
import { useDataContext } from '@/hooks/useDataContext';

//Strings
import * as headerStrings from 'MonitorFormHeaderStrings';

const useStyles = makeStyles({
	//TODO: TRABAJAR EL RESPONSIVE DESIGN
	root: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '100%',
	},
	formHeaderCbxContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '600px',
		maxWidth: '650px',
		paddingRight: '60px',
		flexWrap: 'wrap',
		'>Label': {
			color: 'currentcolor',
			fontSize: '1.3rem',
			marginBottom: '5px',
		},
		'>button': {
			fontSize: '1.3rem',
			marginTop: '5px',
		},
	},
	cbx: {
		display: 'grid',
		opacity: '100%',
		gridTemplateRows: 'repeat(1fr)',
		justifyItems: 'start',
		...shorthands.gap('2px'),
		maxWidth: '650px',
		marginBottom: '10px',
		fontSize: '1rem',
	},
	popoverSurface: {
		display: 'flex',
		flexDirection: 'column',
	},
	button: {
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
	const { listaUnidades, listaClientes } = useDataContext();

	const { unidad, cliente, periodoCultivo, children, handleSelectedChange } =
		props;

	const id = useId('monitor-form-header');
	//Component Style
	const styles = useStyles();

	const user = useUserContext();

	const listaClientesFiltro: Cliente[] = listaClientes.filter(
		(item: Cliente) =>
			item.Unidad?.Id === unidad?.Id &&
			Number(item.Anho) === new Date().getFullYear() - 1 &&
			item.CNG?.Correo === user.email,
	);

	console.log(
		listaClientes.filter(
			(item: Cliente) => item.CNG?.Correo === user.email,
		),
	);

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
						>
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
								position: 'after',
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
