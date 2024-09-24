import * as React from 'react';

//Types
import { Cliente, Unidad, PeriodoCultivo, InformacionMercado } from '@/types';

//Components
import {
	Title1,
	Image,
	makeStyles,
	shorthands,
	useId,
	tokens,
	makeResetStyles,
	mergeClasses,
} from '@fluentui/react-components';
import MonitorFormHeader from '@/components/MonitorFormHeader';
import MonitorFormPeriodSelector from '@/components/MonitorFormPeriodSelector';
import MonitorFormProducts, {
	ProductValueState,
} from '@/components/MonitorFormProducts';

//Hooks
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { useDataContext } from '@/hooks/useDataContext';

//Strings

//Component Styles
const useBaseStyles = makeResetStyles({
	display: 'flex',
	flexDirection: 'column',
	width: `100%`,
	boxSizing: 'border-box',
	color: tokens.colorBrandForeground1,
	fontSize: '1em',

	'.img': {
		width: '180px',
		...shorthands.margin(0, 'auto', tokens.spacingVerticalXXL, 'auto'),
	},

	'@media screen and (min-width:480px)': {
		// Mediano
		'.img': {
			width: '200px',
			...shorthands.margin(0, 'auto', tokens.spacingVerticalL, 'auto'),
		},
	},
	'@media screen and (min-width:640px)': {
		// Grande
		'.img': {
			width: '210px',
		},
	},
	'@media screen and (min-width:1024px)': {
		// XL
		'.img': {
			width: '230px',
		},
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
});

const useStyles = makeStyles({
	img: {
		width: '150px',
		...shorthands.margin(0, 'auto', tokens.spacingVerticalXL, 'auto'),

		'@media screen and (min-width:480px)': {
			// Mediano
			width: '180px',
			...shorthands.margin(0, 'auto', tokens.spacingVerticalL, 'auto'),
		},
		'@media screen and (min-width:640px)': {
			// Grande
			width: '200px',
		},
		'@media screen and (min-width:1024px)': {
			// XL
			width: '230px',
		},
		'@media screen and (min-width:1366px)': {
			// XXL
			width: '250px',
		},
		'@media screen and (min-width: 1920px)': {
			// XXXL
			width: '300px',
		},
	},
	title: {
		fontSize: '1.4em',
	},
});

export interface IMonitorFormProps {}

export interface IMonitorFormState {
	unidad: Unidad | undefined;
	cliente: Cliente | undefined;
	periodoCultivo: PeriodoCultivo | undefined;
}

const MonitorForm: React.FC<IMonitorFormProps> = (props) => {
	const { listaUnidades, listaClientes, listaPeriodosCultivo } =
		useDataContext();

	const id = useId('monitor-form');
	const styles = useStyles();
	const baseStyles = useBaseStyles();

	const [formData, setFormData] = React.useState<IMonitorFormState>(
		{} as IMonitorFormState,
	);

	const [saveData, submitStatus] = useSubmitForm();

	const handleHeaderChanges = (
		campo: keyof IMonitorFormState,
		valor: string | number,
	): void => {
		let objAux: IMonitorFormState = {} as IMonitorFormState;
		switch (campo) {
			case 'unidad':
				objAux = {
					...formData,
					unidad: listaUnidades.find(
						(unidad: Unidad) => unidad.Id === Number(valor),
					),
					cliente: undefined,
				};
				setFormData(objAux);
				break;
			case 'cliente':
				objAux = {
					...formData,
					cliente: listaClientes.find(
						(cliente: Cliente) => cliente.Id === Number(valor),
					),
				};
				setFormData(objAux);
				break;
			case 'periodoCultivo':
				objAux = {
					...formData,
					periodoCultivo: listaPeriodosCultivo.find(
						(periodo: PeriodoCultivo) => periodo.Nombre === valor,
					),
				};
				setFormData(objAux);
				break;
			default:
				break;
		}
	};

	const handleSaveData = (data: ProductValueState[]): void => {
		const data2Save: InformacionMercado[] = data.map(
			(productValue: ProductValueState) => ({
				idCliente: formData.cliente?.Id,
				idUnidad: formData.unidad?.Id,
				idPeriodoCultivo: formData.periodoCultivo?.Id,
				idFamilia: productValue.familiaProducto?.Id,
				idProveedorPrincipal: productValue.proveedorPrincipal?.Id,
				volumenComprado: productValue.volumenComprado,
			}),
		);

		saveData(data2Save);
	};

	return (
		<article
			id={`content-article-${id}`}
			className={baseStyles}
		>
			<Image
				id={`bussiness-image-${id}`}
				block={false}
				src={require('../assets/glymax.png')}
				alt={'Logo de Glymax Paraguay S.A.'} //TODO: COLOCAR EN i18n
				className={mergeClasses(styles.img)}
			/>
			<Title1
				id={`title-${id}`}
				align='center'
				className={styles.title}
			>
				Monitoreo del Mercado
			</Title1>
			{/*TODO: COLOCAR EN i18n*/}
			<>
				{!formData.periodoCultivo ? (
					<MonitorFormPeriodSelector
						handleSelectedChange={handleHeaderChanges}
					/>
				) : (
					<>
						<MonitorFormHeader
							{...{
								cliente: formData.cliente,
								unidad: formData.unidad,
								periodoCultivo: formData.periodoCultivo,
								handleSelectedChange: handleHeaderChanges,
							}}
						/>
						{formData.unidad && formData.cliente ? (
							<MonitorFormProducts
								periodoCultivo={formData.periodoCultivo}
								submitStatus={submitStatus}
								saveData={handleSaveData}
							/>
						) : (
							<></>
						)}
					</>
				)}
			</>
		</article>
	);
};

export default MonitorForm;
