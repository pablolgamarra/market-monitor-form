import * as React from 'react';

import { Cliente, FamiliaProducto, Unidad, PeriodoCultivo, CNG, Proveedor } from 'src/webparts/marketMonitorForm/types';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import {
    FluentProvider, FluentProviderProps, Title1, Title2, webLightTheme
} from '@fluentui/react-components';
import MonitorForm from './MonitorForm';
import { UserProvider } from 'src/webparts/marketMonitorForm/context/user';
import { WpProvider } from 'src/webparts/marketMonitorForm/context/webPart';
import UploadDataButtons from './UploadDataButtons';
import { DataProvider } from 'src/webparts/marketMonitorForm/context/data';

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

import * as strings from 'MarketMonitorAppStrings'
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
                    <WpProvider context={props.context}>
                        <DataProvider
                            listaClientes={props.listaClientes}
                            listaUnidades={props.listaUnidades}
                            listaFamiliasProducto={props.listaFamiliasProducto}
                            listaProveedores={props.listaProveedores}
                            listaPeriodosCultivo={props.listaPeriodosCultivo}
                            listaCNG={props.listaCNG}
                        >
                            <>
                                <Title1>{strings.ApplicationErrorTitle}</Title1>
                                <hr />
                                <Title2>{strings.ApplicationErrorText}</Title2>
                                <UploadDataButtons {...props} />
                            </>
                        </DataProvider>
                    </WpProvider>
                </>
            ) : (
                <WpProvider context={props.context}>
                    <UserProvider user={props.context.pageContext.user}>
                        <DataProvider
                            listaClientes={props.listaClientes}
                            listaUnidades={props.listaUnidades}
                            listaFamiliasProducto={props.listaFamiliasProducto}
                            listaProveedores={props.listaProveedores}
                            listaPeriodosCultivo={props.listaPeriodosCultivo}
                            listaCNG={props.listaCNG}
                        >
                            <FluentProvider theme={webLightTheme}>
                                <MonitorForm {...props} />
                            </FluentProvider>
                        </DataProvider>
                    </UserProvider>
                </WpProvider>
            )
            }
        </FluentProvider >
    );

    return element;
};

export default App;
