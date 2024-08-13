import * as React from 'react';

import { Cliente, FamiliaProducto, Unidad, PeriodoCultivo, CNG, Proveedor, InformacionMercado } from '../types';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import {
  FluentProvider, FluentProviderProps, Title1, Title2, webLightTheme
} from '@fluentui/react-components';
import MonitorForm from './MonitorForm';
import { saveInformacionesMercado } from '../services/informacionMercado';

export interface AppProps {
  url: string;
  context: WebPartContext;
  listaClientes: Cliente[];
  listaUnidades: Unidad[];
  listaFamiliasProducto: FamiliaProducto[];
  listaProveedores: Proveedor[];
  listaPeriodosCultivo: PeriodoCultivo[];
  listaCNG: CNG[];
  width: number;
}

//TODO: Estilar min-width para la app a full 320 px.

const App: React.FC<AppProps> = (props) => {
  const saveData = (data: InformacionMercado[]): void => {
    saveInformacionesMercado(props.context, data)
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
        isEmpty(props.listaPeriodosCultivo) ||
        isEmpty(props.listaProveedores) ? (
        <>
          <Title1>Error en la Aplicación</Title1>
          <hr />
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
