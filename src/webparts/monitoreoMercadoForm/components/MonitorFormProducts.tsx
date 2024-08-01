import * as React from 'react';

import {
	Input,
	Combobox,
	Option,
	Title2,
	Button,
	Text,
	Body2,
	makeStyles,
	Field,
	SelectionEvents,
	OptionOnSelectData,
	InputOnChangeData,
} from '@fluentui/react-components';
import {
	ArrowLeftFilled,
	ArrowRightFilled,
	SaveRegular,
} from '@fluentui/react-icons';

import { IFamiliaProducto } from './interfaces/IFamiliaProducto';
import { IProveedor } from './interfaces/IProveedor';
import { IPeriodoCultivo } from './interfaces/IPeriodoCultivo';

export interface IMonitorFormProductsProps {
	listaFamiliasProducto: IFamiliaProducto[];
	listaProveedores: IProveedor[];
	periodoCultivo: IPeriodoCultivo | undefined;
}

interface IProductValueState {
	familiaProducto: IFamiliaProducto | undefined;
	volumenComprado: string | undefined;
	precioPorMedida: number | undefined;
	condicionPago: string | undefined;
	proveedorPrincipal: IProveedor | undefined;
}

const useStyles = makeStyles({
	NavegacionContainer: {
		display: 'flex',
		width: '100%',
		height: 'auto',
	},
	BotonesContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	Boton: {
		minWidth: '180px',
	},
	BotonRetroceso: {
		minWidth: '180px',
		marginRight: 'auto',
	},
});

const MonitorFormProducts: React.FC<IMonitorFormProductsProps> = (props) => {
	const { listaFamiliasProducto, listaProveedores, periodoCultivo } = props;
	const volumen: number[] = [...Array(11).keys()].map(
		(value: number) => value * 10,
	);

	//Component Style
	const styles = useStyles();

	const listaProductosFiltro: IFamiliaProducto[] =
		listaFamiliasProducto.filter(
			(item: IFamiliaProducto) =>
				item.PeriodoCultivo?.Id === periodoCultivo?.Id,
		);
	const largoLista = listaProductosFiltro.length;

	const [productValues, setProductValues] = React.useState<
		IProductValueState[]
	>(Array.from({ length: largoLista }, () => ({} as IProductValueState)));
	const [index, setIndex] = React.useState<number>(0);

	const handleBtnRetrocesoClick = React.useCallback(() => {
		const indexNuevo = index - 1 > -1 ? index - 1 : index;
		setIndex(indexNuevo);
	}, [setIndex]);

	const handleBtnAvanzarClick = React.useCallback(() => {
		const indexNuevo = index + 1 < largoLista ? index + 1 : index;
		setIndex(indexNuevo);
	}, [setIndex]);

	const handleSelectedChanges = (
		campo: keyof IProductValueState,
		valor: string | undefined,
	): void => {
		let objAux: IProductValueState[];
		console.log(productValues);
		switch (campo) {
			case 'condicionPago':
				objAux = [...productValues];

				objAux.map((productValue: IProductValueState, i: number) => {
					if (i === index) {
						objAux[i].condicionPago = valor;
					}
				});

				setProductValues(objAux);
				break;

				setProductValues(objAux);
				break;
			case 'precioPorMedida':
				objAux = [...productValues];

				objAux.map((productValue: IProductValueState, i: number) => {
					if (i === index) {
						objAux[i].precioPorMedida = valor ? +valor : undefined;
					}
				});

				setProductValues(objAux);
				break;
			case 'proveedorPrincipal':
				objAux = [...productValues];

				objAux.map((productValue: IProductValueState, i: number) => {
					if (i === index) {
						objAux[i].proveedorPrincipal = listaProveedores.find(
							(proveedor: IProveedor) =>
								proveedor.Id === (valor ? +valor : undefined),
						);
					}
				});

				setProductValues(objAux);
				break;
			case 'volumenComprado':
				objAux = [...productValues];

				objAux.map((productValue: IProductValueState, i: number) => {
					if (i === index) {
						objAux[i].volumenComprado = valor;
					}
				});

				setProductValues(objAux);
				break;
			default:
				console.log('Campo no switcheable');
				break;
		}
	};

	const handleCbxChanges = React.useCallback(
		(e: SelectionEvents, data: OptionOnSelectData) => {
			const event: HTMLElement = e.target as HTMLElement;

			let elementName;

			elementName = document
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
			const value = data.optionValue;

			console.log(`Cambio en Dpdown ${name}, valor: ${value}`);

			handleSelectedChanges(name as keyof IProductValueState, value);
		},
		[handleSelectedChanges],
	);

	const handleInputChanges = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
			const event: HTMLElement = e.target as HTMLElement;

			const elementName = event.getAttribute('name');

			const name =
				elementName === null || elementName === undefined
					? ''
					: elementName;
			const value = data.value;

			console.log(`Cambio en Input ${name}, valor: ${value}`);

			handleSelectedChanges(name as keyof IProductValueState, value);
		},
		[handleSelectedChanges],
	);

	return (
		<section>
			<Title2>{listaProductosFiltro[index].Nombre}</Title2>
			<form>
				<Field
					label={'Volumen Ya Comprado'}
					required
				>
					<Combobox
						name='volumenComprado'
						placeholder={`Seleccione volumen ya comprado`}
						value={productValues[index]?.volumenComprado || ''}
						onOptionSelect={handleCbxChanges}
					>
						{volumen.map((item: number) => (
							<Option
								value={`${item}%`}
								key={item}
							>
								{`${item}%`}
							</Option>
						))}
					</Combobox>
				</Field>
				<Field
					label={`Precio por ${listaProductosFiltro[index].UnidadMedida}`}
					required
				>
					<Input
						name='precioPorMedida'
						placeholder={`Seleccionar precio por ${listaProductosFiltro[index].UnidadMedida}`}
						value={
							productValues[index]?.precioPorMedida?.toString() ||
							''
						}
						onChange={handleInputChanges}
					/>
				</Field>
				<Field
					label={`Condición de Pago`}
					required
				>
					<Combobox
						name='condicionPago'
						placeholder={'Seleccione condicion de pago'}
						value={productValues[index]?.condicionPago || ''}
						onOptionSelect={handleCbxChanges}
					>
						<Option>Crédito</Option>
						<Option>Contado</Option>
					</Combobox>
				</Field>
				<Field
					label={`Proveedor Principal`}
					required
				>
					<Combobox
						name='proveedorPrincipal'
						placeholder='Seleccione Proveedor Principal'
						value={
							productValues[index]?.proveedorPrincipal?.Nombre ||
							''
						}
						onOptionSelect={handleCbxChanges}
					>
						{listaProveedores.map((item: IProveedor) => (
							<Option
								key={item.Id}
								text='Opcion'
								value={item.Id?.toString()}
							>
								{item.Nombre}
							</Option>
						))}
					</Combobox>
				</Field>
			</form>
			<div className={`${styles.BotonesContainer}`}>
				{index > 0 && (
					<Button
						className={styles.BotonRetroceso + '' + styles.Boton}
						onClick={handleBtnRetrocesoClick}
						appearance='secondary'
						shape='rounded'
						icon={<ArrowLeftFilled />}
						iconPosition='before'
					>
						<Text
							size={400}
							weight={'semibold'}
						>
							Página Anterior
						</Text>
					</Button>
				)}
				<Body2>
					{index + 1} de {largoLista}
				</Body2>
			</div>
			<div className={`${styles.BotonesContainer}`}>
				<Button
					className={`${styles.Boton}`}
					onClick={handleBtnAvanzarClick}
					appearance='primary'
					shape='rounded'
					icon={
						index + 1 === largoLista ? (
							<SaveRegular />
						) : (
							<ArrowRightFilled />
						)
					}
					iconPosition='after'
				>
					<Text
						size={400}
						weight={'semibold'}
					>
						{index + 1 === largoLista
							? 'Guardar'
							: 'Siguiente Página'}
					</Text>
				</Button>
			</div>
		</section>
	);
};

export default MonitorFormProducts;
