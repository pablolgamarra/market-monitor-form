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
import { IFormMonitoreoHeader } from './interfaces/IFormMonitoreoHeader';

import * as headerStrings from 'FormMonitoreoHeaderStrings';

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

const FormMonitoreoHeader: React.FC<IFormMonitoreoHeader> = (props) => {
	const {
		listaUnidades,
		listaClientes,
		idUnidadSeleccionada,
		idClienteSeleccionado,
		handleCambioCliente,
		handleCambioUnidad,
	} = props;

	const styles = useStyles();

	const manejarCambioDpDown = React.useCallback(
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

			if (name === 'idCliente') {
				handleCambioCliente(value);
			} else {
				handleCambioUnidad(value);
			}
		},
		[handleCambioUnidad, handleCambioCliente],
	);

	const listaClientesFiltro:ICliente[] = idUnidadSeleccionada > -1 ? listaClientes.filter((cliente:ICliente) => (cliente.Unidad === idUnidadSeleccionada)) : listaClientes
	

	console.log(`Lista Clientes filtro: ${listaClientesFiltro}
	Lista Clientes: ${listaClientes}
	`)
	console.log(listaClientes);
	console.log(idUnidadSeleccionada);
	console.log(listaClientesFiltro)
	console.log(listaClientes.map((cliente:ICliente) => (cliente.Unidad === idUnidadSeleccionada)))

	return (
		<section className={styles.root}>
			<label htmlFor='idUnidad'>{headerStrings.Unidad}</label>
			<Combobox
				name='idUnidad'
				className={styles.cbx}
				placeholder={headerStrings.PlaceholderUnidad}
				clearable={true}
				onOptionSelect={manejarCambioDpDown}
				value={
					idUnidadSeleccionada > -1
						? listaUnidades.find((unidad:IUnidad) => unidad.Id === idUnidadSeleccionada)?.Nombre
						: undefined
				}
			>
				{listaUnidades.map((item: IUnidad) => (
					<Option
						value={item.Id.toString()}
						key={item.Id}
					>
						{item.Nombre}
					</Option>
				))}
			</Combobox>
			<label htmlFor='idCliente'>{headerStrings.Cliente}</label>
			<Combobox
				name='idCliente'
				className={styles.cbx}
				placeholder={headerStrings.PlaceholderCliente}
				clearable={true}
				onOptionSelect={manejarCambioDpDown}
				value={
					idClienteSeleccionado > -1
					? listaClientes.find((cliente:ICliente) => cliente.Id === idClienteSeleccionado)?.Nombre
					: undefined
				}
			>
				{listaClientesFiltro.map((item: ICliente) => (
					<Option
						value={item.Id.toString()}
						key={item.Id}
					>
						{item.Nombre}
					</Option>
				))}
			</Combobox>
		</section>
	);
};

export default FormMonitoreoHeader;
