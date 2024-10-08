import * as React from 'react';

//Types
import { FamiliaProducto, Proveedor, PeriodoCultivo } from '@/types';

//Components
import {
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
	Spinner,
	useToastController,
	Toast,
	ToastBody,
	ToastTitle,
	Toaster,
	useId,
	shorthands,
	tokens,
	mergeClasses,
	Radio,
	RadioGroup,
	RadioGroupOnChangeData,
	//	makeResetStyles,
} from '@fluentui/react-components';
import {
	ArrowLeftFilled,
	ArrowRightFilled,
	CheckmarkFilled,
	DismissFilled,
	SaveRegular,
} from '@fluentui/react-icons';
import {
	Virtualizer,
	useStaticVirtualizerMeasure,
} from '@fluentui/react-components/unstable';

//Hooks
import { useDataContext } from '@/hooks/useDataContext';

//Strings
import * as productsFormStrings from 'MonitorFormProductsStrings';

export interface MonitorFormProductsProps {
	periodoCultivo: PeriodoCultivo;
	submitStatus: string;
	saveData(values: ProductValueState[]): void;
}

export interface ProductValueState {
	familiaProducto: FamiliaProducto | undefined;
	volumenComprado: string | undefined;
	proveedorPrincipal: Proveedor | undefined;
}

//Component Styles
const useStyles = makeStyles({
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeBase500,
			marginTop: tokens.spacingHorizontalXXXL,
		},
		'@media screen and (min-width:640px)': {
			marginTop: tokens.spacingHorizontalXXXL,
		},
	},
	sectionTitle: {
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeBase600,
			...shorthands.margin(0, 'auto'),
			marginBottom: tokens.spacingHorizontalMNudge,
		},
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'start',
	},
	NavegacionContainer: {
		display: 'flex',
		width: '100%',
		height: 'auto',
		marginTop: tokens.spacingHorizontalXXXL,
		'@media screen and (max-width:480px)': {
			marginBottom: tokens.spacingHorizontalXXXL,
		},
	},
	containerBotones: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	boton: {
		'@media screen and (max-width:480px)': {
			'> .fui-Text': {
				display: 'none',
			},
			width: 'auto',
		},
	},
	botonRetroceso: {
		marginRight: 'auto',
		'@media screen and (max-width:480px)': {
			'> .fui-Text': {
				display: 'none',
			},
			width: 'auto',
		},
	},
	field: {
		marginBottom: tokens.spacingHorizontalXXL,
		'> label': {
			color: 'currentColor',
			fontSize: '1.3rem',
			marginBottom: '5px',
			'@media screen and (max-width:480px)': {
				fontSize: '1em',
				fontWeight: tokens.fontWeightMedium,
				marginBottom: tokens.spacingVerticalXS,
			},
		},
	},
	radioGroup: {
		display: 'flex',
		flexDirection: 'row',
	},
	listbox: {
		maxHeight: '250px',
	},
	option: {
		height: '32px',
	},
	indexText: {
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeBase100,
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
	cbx: {
		display: 'grid',
		opacity: '100%',
		gridTemplateRows: 'repeat(1fr)',
		justifyItems: 'start',
		...shorthands.gap('2px'),
		fontSize: '1rem',
		'@media screen and (max-width:480px)': {
			fontSize: '.8em',
		},
		'> input': {
			width: '100%',
		},
	},
});

const MonitorFormProducts: React.FC<MonitorFormProductsProps> = (props) => {
	const { listaFamiliasProducto, listaProveedores } = useDataContext();

	const { periodoCultivo, submitStatus, saveData } = props;
	const volumen: string[] = [
		'N/S',
		'0%',
		'10%',
		'20%',
		'30%',
		'40%',
		'50%',
		'60%',
		'70%',
		'80%',
		'90%',
		'100%',
	];

	const { virtualizerLength, bufferItems, bufferSize, scrollRef } =
		useStaticVirtualizerMeasure({
			defaultItemSize: 32,
			direction: 'vertical',
		});

	const id = useId('monitor-form-products');
	//Component Style
	const styles = useStyles();
	const toastId = useId('Toaster');
	const { dispatchToast } = useToastController(toastId);

	const listaProductosFiltro: FamiliaProducto[] =
		listaFamiliasProducto.filter(
			(item: FamiliaProducto) =>
				item.PeriodoCultivo?.Id === periodoCultivo?.Id,
		);
	const largoLista = listaProductosFiltro.length;

	const [productValues, setProductValues] = React.useState<
		ProductValueState[]
	>(
		Array.from(
			{ length: largoLista },
			() =>
				({
					familiaProducto: listaProductosFiltro[0],
				} as ProductValueState),
		),
	);
	const [index, setIndex] = React.useState<number>(0);

	const listaProveedoresFiltro = listaProveedores.filter(
		(item: Proveedor) =>
			item.FamiliadeProducto?.Id ===
				productValues[index]?.familiaProducto?.Id &&
			item.FamiliadeProducto?.PeriodoCultivo?.Id === periodoCultivo.Id,
	);

	const handleSelectedChanges = (
		campo: keyof ProductValueState,
		valor: string | undefined,
	): void => {
		let objAux: ProductValueState[];
		switch (campo) {
			case 'proveedorPrincipal':
				objAux = [...productValues];

				objAux.map((productValue: ProductValueState, i: number) => {
					if (i === index) {
						objAux[i].proveedorPrincipal = listaProveedores.find(
							(proveedor: Proveedor) =>
								proveedor.Id === (valor ? +valor : undefined),
						);
					}
				});

				setProductValues(objAux);
				break;
			case 'volumenComprado':
				objAux = [...productValues];

				objAux.map((productValue: ProductValueState, i: number) => {
					if (i === index) {
						objAux[i].volumenComprado = valor;
					}
				});

				setProductValues(objAux);
				break;
			case 'familiaProducto':
				objAux = [...productValues];
				objAux.map((productValue: ProductValueState, i: number) => {
					if (i === index + 1) {
						objAux[i].familiaProducto = listaProductosFiltro.find(
							(familia: FamiliaProducto) =>
								familia.Nombre === valor,
						);
					}
				});

				setProductValues(objAux);
				break;
			default:
				console.error('Campo no switcheable');
				break;
		}
	};

	const validateFields = (values: ProductValueState): boolean => {
		return Object.keys(values).length !== 3;
	};

	const handleBtnRetrocesoClick = React.useCallback(() => {
		if (index - 1 > -1) {
			const indexNuevo = index - 1;
			handleSelectedChanges(
				'familiaProducto',
				listaProductosFiltro[indexNuevo].Nombre,
			);
			setIndex(indexNuevo);
		}
	}, [index, setIndex]);

	const handleBtnAvanzarClick = React.useCallback(() => {
		if (index < largoLista - 1) {
			const indexNuevo = index + 1;

			handleSelectedChanges(
				'familiaProducto',
				listaProductosFiltro[indexNuevo].Nombre,
			);
			setIndex(indexNuevo);
		} else {
			const validatedValues: ProductValueState[] = productValues.map(
				(item: ProductValueState) => ({
					familiaProducto: item.familiaProducto,
					volumenComprado: item.volumenComprado,
					proveedorPrincipal: item.proveedorPrincipal,
				}),
			);
			saveData(validatedValues);
		}
	}, [setIndex, index, largoLista]);

	const handleRadioSelect = React.useCallback(
		(e: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
			const event: HTMLElement = e.target as HTMLElement;

			const elementName = event.getAttribute('name');

			const name =
				elementName === null || elementName === undefined
					? ''
					: elementName;
			const value = data.value;

			handleSelectedChanges(name as keyof ProductValueState, value);
		},
		[handleSelectedChanges],
	);

	const handleCbxChanges = React.useCallback(
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
			const value = data.optionValue;

			handleSelectedChanges(name as keyof ProductValueState, value);
		},
		[handleSelectedChanges],
	);

	React.useEffect(() => {
		switch (submitStatus) {
			case 'saving':
				dispatchToast(
					<Toast>
						<ToastTitle media={<Spinner size='tiny' />}>
							{productsFormStrings.GuardandoTitle}
						</ToastTitle>
						<ToastBody>
							{productsFormStrings.GuardandoText}
						</ToastBody>
					</Toast>,
				);
				break;
			case 'saved':
				dispatchToast(
					<Toast>
						<ToastTitle>
							{productsFormStrings.GuardarTitle}
						</ToastTitle>
						<ToastBody>
							{productsFormStrings.GuardarTitle}
						</ToastBody>
					</Toast>,
					{ intent: 'success' },
				);
				setTimeout(() => {
					window.location.reload();
				}, 2000);
				break;
			case 'error':
				dispatchToast(
					<Toast>
						<ToastTitle>
							{productsFormStrings.ErrorTitle}
						</ToastTitle>
						<ToastBody>{productsFormStrings.ErrorText}</ToastBody>
					</Toast>,
					{ intent: 'error' },
				);
				break;
			default:
				break;
		}
	}, [submitStatus, dispatchToast]);

	return (
		<section
			id={`content-section-${id}`}
			className={`${styles.contentContainer}`}
		>
			<Title2
				id={`section-title-${id}`}
				className={styles.sectionTitle}
			>
				{productValues[index].familiaProducto?.Nombre}
			</Title2>
			<form id={`form-${id}`}>
				<Field
					id={`field-volumen-${id}`}
					className={`${styles.field}`}
					label={productsFormStrings.VolumenYaCompradoLabel}
					required
				>
					<RadioGroup
						id={`cbx-volumen-${id}`}
						className={styles.radioGroup}
						name='volumenComprado'
						placeholder={`Seleccione volumen ya comprado`}
						value={productValues[index]?.volumenComprado || ''}
						onChange={handleRadioSelect}
						disabled={
							submitStatus === 'saving' ||
							submitStatus === 'saved'
						}
						layout='horizontal-stacked'
					>
						{volumen.map((item: string) => (
							<Radio
								key={item}
								value={`${item}`}
								label={`${item}`}
							/>
						))}
					</RadioGroup>
				</Field>
				<Field
					id={`field-proveedor-principal-${id}`}
					className={`${styles.field}`}
					label={`Proveedor Principal`}
					required
				>
					<Combobox
						id={`cbx-proveedor-principal-${id}`}
						className={styles.cbx}
						name='proveedorPrincipal'
						placeholder='Seleccione Proveedor Principal'
						value={
							productValues[index]?.proveedorPrincipal?.Nombre ||
							''
						}
						onOptionSelect={handleCbxChanges}
						disabled={
							submitStatus === 'saving' ||
							submitStatus === 'saved'
						}
						positioning={{ autoSize: 'width', position: 'below' }}
						listbox={{ ref: scrollRef, className: styles.listbox }}
					>
						<Virtualizer
							numItems={listaProveedoresFiltro.length}
							virtualizerLength={virtualizerLength}
							bufferItems={bufferItems}
							bufferSize={bufferSize}
							itemSize={80}
						>
							{(index) => {
								return (
									<Option
										key={listaProveedoresFiltro[index].Id}
										text='Opcion'
										value={listaProveedoresFiltro[
											index
										].Id?.toString()}
									>
										{listaProveedoresFiltro[index].Nombre}
									</Option>
								);
							}}
						</Virtualizer>
					</Combobox>
				</Field>
				<section className={`${styles.NavegacionContainer}`}>
					<div className={`${styles.containerBotones}`}>
						{index > 0 && (
							<Button
								className={mergeClasses(
									styles.botonRetroceso,
									styles.boton,
								)}
								onClick={handleBtnRetrocesoClick}
								appearance='secondary'
								shape='rounded'
								icon={<ArrowLeftFilled />}
								iconPosition='before'
								disabled={
									submitStatus === 'saving' ||
									submitStatus === 'saved'
								}
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
					<div className={`${styles.containerBotones}`}>
						<Button
							className={`${styles.boton}`}
							onClick={handleBtnAvanzarClick}
							appearance='primary'
							shape='rounded'
							disabled={
								validateFields(productValues[index]) ||
								submitStatus === 'saving' ||
								submitStatus === 'saved'
							}
							icon={
								submitStatus === 'idle' ? (
									index + 1 === largoLista ? (
										<SaveRegular />
									) : (
										<ArrowRightFilled />
									)
								) : submitStatus === 'saving' ? (
									<Spinner size='tiny' />
								) : submitStatus === 'saved' ? (
									<CheckmarkFilled />
								) : submitStatus === 'error' ? (
									<DismissFilled />
								) : (
									<></>
								)
							}
							iconPosition='after'
							type={
								validateFields(productValues[index]) &&
								index + 1 === largoLista
									? 'button'
									: 'button'
							}
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
				<Toaster
					toasterId={toastId}
					position={'top-end'}
					pauseOnHover={true}
				/>
			</form>
		</section>
	);
};

export default MonitorFormProducts;
