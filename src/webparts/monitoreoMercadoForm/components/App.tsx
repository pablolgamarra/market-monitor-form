import * as React from 'react';

import { Cliente, FamiliaProducto, Unidad, PeriodoCultivo, CNG, Proveedor } from '../types';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import {
  FluentProvider, FluentProviderProps, Title1, Title2, webLightTheme
} from '@fluentui/react-components';
import MonitorForm from './MonitorForm';
import { UserProvider } from '@/context/user';
import { WpProvider } from '@/context/webPart';

export interface AppProps {
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
        <WpProvider context={props.context}>
          <UserProvider user={props.context.pageContext.user}>
            <FluentProvider theme={webLightTheme}>
              <MonitorForm {...props} />
            </FluentProvider>
          </UserProvider>
        </WpProvider>
      )}
    </FluentProvider>
  );

  return element;
};

export default App;
