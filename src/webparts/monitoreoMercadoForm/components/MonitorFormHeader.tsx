import * as React from 'react';
import {
	Combobox,
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
		maxWidth: '400px',
	},
	cbx: {
		display: 'grid',
		opacity: '100%',
		gridTemplateRows: 'repeat(1fr)',
		justifyItems: 'start',
		...shorthands.gap('2px'),
		maxWidth: '400px',
	},
});

export interface IMonitorFormHeaderProps {
	listaUnidades: IUnidad[];
	listaClientes: ICliente[];
	listaPeriodosCultivo: IPeriodoCultivo[];
	cliente: ICliente | undefined;
	unidad: IUnidad | undefined;
	periodoCultivo: IPeriodoCultivo | undefined;
	handleSelectedChange(campo: keyof IMonitorFormState, valor: string | number): void;
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

	console.log(unidad?.Nombre)

	const handleDpDown = React.useCallback(
		(e: SelectionEvents, data: OptionOnSelectData) => {
			const event: HTMLElement = e.target as HTMLElement;

			const elementName = document
				.querySelector(
					`[aria-controls=${event.parentElement?.getAttribute(
						'id',
					)}]`,
				)
				?.getAttribute('name');

			const name =
				elementName === null || elementName === undefined
					? ''
					: elementName;
			const value =
				data.optionValue !== undefined ? data.optionValue : '';

			handleSelectedChange(name as keyof IMonitorFormState, value)
		},
		[ handleSelectedChange ],
	);

	return (
		<section className={styles.root}>
			<label htmlFor='unidad'>{headerStrings.Unidad}</label>
			<Combobox
				name='unidad'
				className={styles.cbx}
				placeholder={headerStrings.PlaceholderUnidad}
				clearable={true}
				onOptionSelect={handleDpDown}
				value={
					unidad?.Id?.toString()
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

			<label htmlFor='idCliente'>{headerStrings.Cliente}</label>
			<Combobox
				name='cliente'
				className={styles.cbx}
				placeholder={headerStrings.PlaceholderCliente}
				clearable={true}
				onOptionSelect={handleDpDown}
				value={
					cliente?.Id?.toString()
				}
			>
				{listaClientes.map((item: ICliente) => (
					<Option
						value={item?.Id?.toString()}
						key={item.Id}
						text="Cliente"
					>
						{item.Nombre}
					</Option>
				))}
			</Combobox>
		</section>
	);
};

export default MonitorFormHeader;
