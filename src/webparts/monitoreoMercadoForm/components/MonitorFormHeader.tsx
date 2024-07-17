import * as React from 'react';
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
} from '@fluentui/react-components';

import { IUnidad } from './interfaces/IUnidad';
import { ICliente } from './interfaces/ICliente';

import * as headerStrings from 'MonitorFormHeaderStrings';
import { IMonitorFormState } from './MonitorForm';
import { IPeriodoCultivo } from './interfaces/IPeriodoCultivo';

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
			fontSize: '1.3rem',
			marginBottom: '5px',
		},
		'>button':{
			fontSize:'1.3rem',
			marginTop:'5px',
		}
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
	popoverSurface:{
		display:'flex',
		flexDirection:'column',

	}
});

export interface IMonitorFormHeaderProps {
	listaUnidades: IUnidad[];
	listaClientes: ICliente[];
	listaPeriodosCultivo: IPeriodoCultivo[];
	cliente: ICliente | undefined;
	unidad: IUnidad | undefined;
	periodoCultivo: IPeriodoCultivo | undefined;
	handleSelectedChange(campo: keyof IMonitorFormState, valor: string | number | undefined): void;
}

const MonitorFormHeader: React.FC<IMonitorFormHeaderProps> = (props) => {
	const {
		listaUnidades,
		listaClientes,
		unidad,
		cliente,
		periodoCultivo,
		children,
		handleSelectedChange
	} = props;

	//Component Style
	const styles = useStyles();

	const listaClientesFiltro: ICliente[] = listaClientes.filter((item: ICliente) => item.Unidad?.Id === unidad?.Id);

	const handleDpDown = React.useCallback(
		(e: SelectionEvents, data: OptionOnSelectData) => {
			const event: HTMLElement = e.target as HTMLElement;

			let elementName;

			if (event.tagName === 'svg' || event.tagName === 'path') {
				elementName = event.parentElement?.parentElement?.firstElementChild?.getAttribute('name');
				if (event.parentElement?.tagName === 'svg') {
					elementName = event.parentElement?.parentElement?.parentElement?.firstElementChild?.getAttribute('name')
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
			const value = data.optionValue

			console.log(`Cambio en Dpdown ${name}, valor: ${value}`)
			handleSelectedChange(name as keyof IMonitorFormState, value)
		},
		[ handleSelectedChange ],
	);

	return (
		<section className={styles.root}>
			{!periodoCultivo ?
				<>
					{children}
				</>
				:
				<>
					<article className={styles.formHeaderCbxContainer}>
						<Label htmlFor='unidad' size='large' required>{headerStrings.Unidad}</Label>
						<Combobox
							name='unidad'
							className={styles.cbx}
							placeholder={headerStrings.PlaceholderUnidad}
							onOptionSelect={handleDpDown}
							value={
								unidad?.Nombre || ''
							}
						>
							{listaUnidades.map((item: IUnidad) => (
								<Option
									value={item?.Id?.toString()}
									key={item.Id}
									text="Unidad"
								>
									{item.Nombre}
								</Option>
							))}
						</Combobox>

						<Label htmlFor='cliente' size='large' required>{headerStrings.Cliente}</Label>
						<Combobox
							name='cliente'
							className={styles.cbx}
							placeholder={headerStrings.PlaceholderCliente}
							onOptionSelect={handleDpDown}
							value={
								cliente?.Nombre || ''
							}
						>
							{listaClientesFiltro.map((item: ICliente) => (
								<Option
									value={item?.Id?.toString()}
									key={item.Id}
									text="Cliente"
								>
									{item.Nombre}
								</Option>
							))}
						</Combobox>
						<Popover inline closeOnScroll>
							<PopoverTrigger disableButtonEnhancement>
								<Button>
									Periodo de Cultivo
								</Button>
							</PopoverTrigger>

							<PopoverSurface tabIndex={-1} className={styles.popoverSurface}>
								<Subtitle1>
									Periodo de Cultivo Seleccionado
								</Subtitle1>
								<Label>
									{periodoCultivo.Nombre}
								</Label>
							</PopoverSurface>
					</Popover>
					</article>
				</>
			}
		</section>
	);
};

export default MonitorFormHeader;
