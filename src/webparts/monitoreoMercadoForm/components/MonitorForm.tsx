import * as React from 'react';

import {
  Title1,
  Image,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { Cliente, Unidad, FamiliaProducto, PeriodoCultivo, Proveedor, InformacionMercado } from '../types';
import MonitorFormHeader from './MonitorFormHeader';
import MonitorFormPeriodSelector from './MonitorFormPeriodSelector';
import MonitorFormProducts, { ProductValueState } from './MonitorFormProducts';
import { useSubmitForm } from '@/hooks/useSubmitForm';

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
  },
  buttons: {
    display: 'flex',
  },
});


export interface IMonitorFormProps {
  listaClientes: Cliente[];
  listaUnidades: Unidad[];
  listaFamiliasProducto: FamiliaProducto[];
  listaPeriodosCultivo: PeriodoCultivo[];
  listaProveedores: Proveedor[];
}

export interface IMonitorFormState {
  unidad: Unidad | undefined,
  cliente: Cliente | undefined,
  periodoCultivo: PeriodoCultivo,
}

const MonitorForm: React.FC<IMonitorFormProps> = (props) => {
  const {
    listaUnidades,
    listaClientes,
    listaPeriodosCultivo,
    listaFamiliasProducto,
    listaProveedores,
  } = props;

  const styles = useStyles();

  const [ formData, setFormData ] = React.useState<IMonitorFormState>({} as IMonitorFormState);

  const [ saveData, status ] = useSubmitForm()

  const handleHeaderChanges = (campo: keyof IMonitorFormState, valor: string | number): void => {
    let objAux: IMonitorFormState = {} as IMonitorFormState
    switch (campo) {
      case 'unidad':
        objAux = {
          ...formData,
          unidad: listaUnidades[ Object.keys(listaUnidades).map((item: any) => listaUnidades[ item ].Id).findIndex((x: any) => x === Number(valor)) ],
          cliente: undefined,
        }
        setFormData(objAux)
        break;
      case 'cliente':
        objAux = {
          ...formData,
          cliente: listaClientes[ Object.keys(listaClientes).map((item: any) => listaClientes[ item ].Id).findIndex((x: any) => x === Number(valor)) ]
        }
        setFormData(objAux)
        break;
      case 'periodoCultivo':
        objAux = {
          ...formData,
          periodoCultivo: listaPeriodosCultivo[ Object.keys(listaPeriodosCultivo).map((item: any) => listaPeriodosCultivo[ item ].Nombre).findIndex((x: any) => x === valor) ]
        }
        setFormData(objAux);
        break;
      default:
        break;
    }
  }

  const handleSaveData = (data: ProductValueState[]): void => {
    const data2Save: InformacionMercado[] = data.map((productValue: ProductValueState) => (
      {
        idCliente: formData.cliente ? formData.cliente.Id : 0,
        idUnidad: formData.unidad ? formData.unidad.Id : 0,
        idPeriodoCultivo: formData.periodoCultivo.Id,
        idFamilia: productValue.familiaProducto?.Id,
        idProveedorPrincipal: productValue.proveedorPrincipal?.Id,
        condicionPago: productValue.condicionPago,
        precioPorMedida: productValue.precioPorMedida,
        volumenComprado: productValue.volumenComprado,
      }
    ))

    saveData(data2Save)
  }

  return (
    <article className={styles.root}>
      <Image
        block={false}
        src={require('../assets/glymax.png')}
        alt={'Logo de Glymax Paraguay S.A.'}//TODO: COLOCAR EN i18n
        width={'150px'}
      />
      <Title1 align="center">Monitoreo del Mercado</Title1> {/*TODO: COLOCAR EN i18n*/}
      <>
        {!formData.periodoCultivo ?
          <MonitorFormPeriodSelector listaPeriodosCultivo={listaPeriodosCultivo} handleSelectedChange={handleHeaderChanges} />
          :
          <>
            <MonitorFormHeader
              {
              ...{ ...props, cliente: formData.cliente, unidad: formData.unidad, periodoCultivo: formData.periodoCultivo, handleSelectedChange: handleHeaderChanges }
              }
            />
            {
              formData.unidad && formData.cliente ?
                <MonitorFormProducts listaFamiliasProducto={listaFamiliasProducto} periodoCultivo={formData.periodoCultivo} listaProveedores={listaProveedores} status={status} saveData={handleSaveData} />
                :
                <></>
            }
          </>
        }
      </>
    </article>
  );
};

export default MonitorForm;
