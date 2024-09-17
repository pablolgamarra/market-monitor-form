import * as React from 'react';

//Types
import {
	Cliente,
	FamiliaProducto,
	Unidad,
	PeriodoCultivo,
	CNG,
	Proveedor,
} from '@/types';
import { WebPartContext } from '@microsoft/sp-webpart-base';

//Components
import {
	FluentProvider,
	FluentProviderProps,
	Title1,
	Title2,
	webLightTheme,
} from '@fluentui/react-components';
import MonitorForm from '@/components/MonitorForm';
import UploadDataButtons from '@/components/UploadDataButtons';

//Contexts
import { UserProvider } from '@/context/user';
import { WpProvider } from '@/context/webPart';
import { DataProvider } from '@/context/data';

//Strings
import * as strings from 'MarketMonitorAppStrings';

import { isEmpty } from '@microsoft/sp-lodash-subset';

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
			)}
		</FluentProvider>
	);

	return element;
};

export default App;
