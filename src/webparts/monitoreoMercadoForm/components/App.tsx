import * as React from 'react';

import { ICliente } from './interfaces/ICliente';
import { IUnidad } from './interfaces/IUnidad';
import { IFamiliaProducto } from './interfaces/IFamiliaProducto';
import { registrarDatos } from '../utils/QuerySP';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { InformacionMercado } from './interfaces/InformacionMercado';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import {
  FluentProvider,
  FluentProviderProps,
  Title1,
  Title2,
  webLightTheme,
} from '@fluentui/react-components';
import { IProveedor } from './interfaces/IProveedor';
import { IPeriodoCultivo } from './interfaces/IPeriodoCultivo';
import { ICoordinador } from './interfaces/ICoordinador';
import MonitorForm from './MonitorForm';
import ICNG from './interfaces/ICNG';

export interface AppProps {
  url: string;
  context: WebPartContext;
  listaClientes: ICliente[];
  listaUnidades: IUnidad[];
  listaFamiliasProducto: IFamiliaProducto[];
  listaProveedores: IProveedor[];
  listaPeriodosCultivo: IPeriodoCultivo[];
  listaCNG: ICNG[];
  width:number;
}

//TODO: Estilar min-width para la app a full 320 px.

const App: React.FC<AppProps> = (props) => {
  const saveData = (data: InformacionMercado[]): void => {
    registrarDatos(data, props.url, props.context)
      .then(() => {
        alert('Datos Guardados Correctamente');
      })
      .catch((e: Error) => {
        console.log(`Error al guardar datos: ${e}`);
        alert('Error al guardar los datos');
      });
  };

  const element: React.ReactElement<FluentProviderProps> = (
    <FluentProvider theme={webLightTheme}>
      {isEmpty(props.listaClientes) ||
        isEmpty(props.listaUnidades) ||
        isEmpty(props.listaFamiliasProducto) ||
        isEmpty(props.listaPeriodosCultivo)||
        isEmpty(props.listaProveedores) ? (
          <>
            <Title1>Error en la Aplicación</Title1>
            <hr/>
            <Title2>Comuníquese con el Departamento de T.I.</Title2>
          </>
      ) : (
        <FluentProvider theme={webLightTheme}>
          <MonitorForm {...{ ...props, saveData: saveData }} />
        </FluentProvider>
      )}
    </FluentProvider>
  );

  return element;
};

export default App;
