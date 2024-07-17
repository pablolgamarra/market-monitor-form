import * as React from 'react';
import {
	Combobox,
	Label,
	makeStyles,
	Option,
	OptionOnSelectData,
	SelectionEvents,
	shorthands,
} from '@fluentui/react-components';

import { IUnidad } from './interfaces/IUnidad';
import { ICliente } from './interfaces/ICliente';

import * as headerStrings from 'MonitorFormHeaderStrings';
import { IMonitorFormState } from './MonitorForm';
import { IPeriodoCultivo } from './interfaces/IPeriodoCultivo';

const useStyles = makeStyles({
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
			marginTop: '15px',
			marginBottom: '10px',
		}
	},
	cbx: {
		display: 'grid',
		opacity: '100%',
		gridTemplateRows: 'repeat(1fr)',
		justifyItems: 'start',
		...shorthands.gap('2px'),
		maxWidth: '650px',
		marginBottom: '15px',
		fontSize: '1rem',
	},
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
		handleSelectedChange
	} = props;

	//Component Style
	const styles = useStyles();

	const listaClientesFiltro: ICliente[] = listaClientes.filter((item: ICliente) => item.Unidad?.Id === unidad?.Id);

	const handleDpDown = React.useCallback(
		(e: SelectionEvents, data: OptionOnSelectData) => {
			const event: HTMLElement = e.target as HTMLElement;

			let elementName;

			if(event.tagName === 'svg' || event.tagName === 'path'){
				elementName = event.parentElement?.parentElement?.firstElementChild?.getAttribute('name');
				if(event.parentElement?.tagName === 'svg'){
					elementName = event.parentElement?.parentElement?.parentElement?.firstElementChild?.getAttribute('name')
				}
				console.log('SVG CLICKEADO')
				console.log(data)
			}else{
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
			<article className={styles.formHeaderCbxContainer}>
				<Label htmlFor='unidad' size='large' required>{headerStrings.Unidad}</Label>
				<Combobox
					id='cbxUnidad'
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
			</article>
			<article className={styles.formHeaderCbxContainer}>
				<Label htmlFor='cliente' size='large' required>{headerStrings.Cliente}</Label>
				<Combobox
					id='cbxClient'
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
			</article>
		</section>
	);
};

export default MonitorFormHeader;
