import * as React from 'react';

import {
  Title1,
  Image,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { ICliente } from './interfaces/ICliente';
import { IUnidad } from './interfaces/IUnidad';
import { IFamiliaProducto } from './interfaces/IFamiliaProducto';
import { IPeriodoCultivo } from './interfaces/IPeriodoCultivo';
import MonitorFormHeader from './MonitorFormHeader';
import { DatosValores } from './interfaces/DatosValores';

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
  listaClientes: ICliente[];
  listaUnidades: IUnidad[];
  listaFamiliasProducto: IFamiliaProducto[];
  listaPeriodosCultivo: IPeriodoCultivo[];
}

export interface IMonitorFormState {
  unidad: IUnidad | undefined,
  cliente: ICliente | undefined,
  periodoCultivo: IPeriodoCultivo | undefined,
  onSave(data: DatosValores): void,
}

const MonitorForm: React.FC<IMonitorFormProps> = (props) => {
  const {
    listaUnidades
  } = props;

  const styles = useStyles();

  const [ formData, setFormData ] = React.useState<IMonitorFormState>({} as IMonitorFormState);

  const handleHeaderChanges = (campo: keyof IMonitorFormState, valor: string | number): void => {
    let objAux: IMonitorFormState = {} as IMonitorFormState
    switch (campo) {
      case 'unidad':
        objAux = {
          ...formData,
          unidad: listaUnidades[ Object.keys(listaUnidades).map((item: any) => listaUnidades[ item ].Id).findIndex((x: any) => x === Number(valor)) ]
        }
        setFormData(objAux)
        break;
      case 'cliente':

        break;
      case 'periodoCultivo':

        break;
      default:
        break;
    }
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

      <MonitorFormHeader
        {
        ...{ ...props, cliente: formData.cliente, unidad: formData.unidad, periodoCultivo: formData.periodoCultivo, handleSelectedChange: handleHeaderChanges }
        }
      />
      {
        /*
        <FormularioProductos
            familia={familiaActiva}
            valores={valoresForm[index]}
            handleCambioValor={handleCambioValor}
          />
    
          <BotonesNavegacionPagina
            index={index}
            max={largoLista}
            avanzar={btnPasarClick}
            retroceder={btnRetrocederClick}
          />
    
          <h2>
            {width}
          </h2>*/
      }

    </article>
  );
};

export default MonitorForm;
