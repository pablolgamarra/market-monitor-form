import * as React from 'react';
import FormMonitoreo from './FormMonitoreo';
import { ICliente } from './interfaces/ICliente';
import { IUnidad } from './interfaces/IUnidad';
import { IFamiliaProducto } from './interfaces/IFamiliaProducto';
import { registrarDatos } from '../utils/QuerySP';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DatosValores } from './interfaces/DatosValores';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import {
  FluentProvider,
  FluentProviderProps,
  Title1,
  webLightTheme,
} from '@fluentui/react-components';

export interface AppProps {
  url: string;
  context: WebPartContext;
  listaClientes: ICliente[];
  listaUnidades: IUnidad[];
  listaFamiliaProductos: IFamiliaProducto[];
  width:number;
}

const App: React.FC<AppProps> = (props) => {
  const onSave = (data: DatosValores): void => {
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
        isEmpty(props.listaFamiliaProductos) ? (
        <Title1>Error en la Aplicación</Title1>
      ) : (
        <FluentProvider theme={webLightTheme}>
          <FormMonitoreo {...{ ...props, onSave: onSave }} />
        </FluentProvider>
      )}
    </FluentProvider>
  );

  return element;
};

export default App;
