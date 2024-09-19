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
		color: '#2C3C79',
		display: 'flex',
		flexDirection: 'column',
		...shorthands.padding('1em'),
		...shorthands.margin('5px'),
		'> img': {
			alignSelf: 'center',
		},
		minWidth: '320px',
	},
	buttons: {
		display: 'flex',
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
				width={'150px'}
			/>
			<Title1
				id={`title-${id}`}
				align='center'
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
