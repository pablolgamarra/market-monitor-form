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
const useStyles = makeStyles({
	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		color: tokens.colorBrandForeground1,
		fontSize: tokens.fontSizeBase600,
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeBase300,
		},
	},
	img: {
		width: '200px',
		...shorthands.margin(0, 'auto', tokens.spacingVerticalXXL, 'auto'),
		'@media screen and (max-width:480px)': {
			width: '120px',
			...shorthands.margin(0, 'auto', tokens.spacingVerticalL, 'auto'),
		},
	},
	title: {
		'@media screen and (max-width:480px)': {
			fontSize: tokens.fontSizeHero700,
		},
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
				condicionPago: productValue.condicionPago,
				precioPorMedida: productValue.precioPorMedida,
				volumenComprado: productValue.volumenComprado,
			}),
		);

		saveData(data2Save);
	};

	return (
		<article
			id={`content-article-${id}`}
			className={styles.root}
		>
			<Image
				id={`bussiness-image-${id}`}
				block={false}
				src={require('../assets/glymax.png')}
				alt={'Logo de Glymax Paraguay S.A.'} //TODO: COLOCAR EN i18n
				className={styles.img}
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
