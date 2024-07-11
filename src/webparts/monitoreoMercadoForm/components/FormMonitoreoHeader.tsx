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
	const { listaUnidades, listaClientes, handleCambioCliente, handleCambioUnidad} = props;

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

	const handleOnChange = (e:React.EventHandler<ActiveOptionChangeData>) => {
		console.log(e.target);
	}

	return (
		<section className={styles.root}>
			<label htmlFor='idUnidad'>{headerStrings.Unidad}</label>
			<Combobox
				name='idUnidad'
				placeholder={headerStrings.PlaceholderUnidad}
				clearable={true}
				onOptionSelect={manejarCambioDpDown}
				onChange={handleOnChange}
				onActiveOptionChange={handleOnChange}
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
				placeholder={headerStrings.PlaceholderCliente}
				clearable={true}
				onOptionSelect={manejarCambioDpDown}
				onChange={handleOnChange}

			>
				{listaClientes.map((item: ICliente) => (
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
