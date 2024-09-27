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
	BrandVariants,
	createDarkTheme,
	createLightTheme,
	FluentProvider,
	IdPrefixProvider,
	makeResetStyles,
	mergeClasses,
	//	shorthands,
	Theme,
	Title1,
	Title2,
	tokens,
	useId,
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

//Theme
const marketMonitorTheme: BrandVariants = {
	10: '#010308',
	20: '#061730',
	30: '#042450',
	40: '#102F66',
	50: '#243A77',
	60: '#384584',
	70: '#4B5091',
	80: '#5E5C9D',
	90: '#7069A9',
	100: '#8276B3',
	110: '#9483BE',
	120: '#A592C7',
	130: '#B5A0D0',
	140: '#C5B0D9',
	150: '#D4C0E2',
	160: '#E1D0EA',
};

const lightTheme: Theme = {
	...createLightTheme(marketMonitorTheme),
	colorBrandForeground1: marketMonitorTheme[30],
	colorBrandForeground2: marketMonitorTheme[70],
};

const darkTheme: Theme = {
	...createDarkTheme(marketMonitorTheme),
};

darkTheme.colorBrandForeground1 = marketMonitorTheme[110];
darkTheme.colorBrandForeground2 = marketMonitorTheme[120];

const useBaseStyles = makeResetStyles({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	columnCount: 1,
	columnWidth: '100%',
	fontSize: tokens.fontSizeBase300,

	'@media screen and (min-width:480px)': {
		// Mediano
		//Margenes de 24px y padding de 8px a los costados (12 columnas y medianiles de 16px)
		width: `416px`,
		columnCount: 12,
		columnGap: '16px',
		fontSize: tokens.fontSizeBase600,
	},
	'@media screen and (min-width:640px)': {
		// Grande
		//Margenes de 24px y padding de 8px a los costados (12 columnas y medianiles de 24px)
		width: `576px`,
		columnCount: 12,
		columnGap: tokens.spacingHorizontalXXL,
		fontSize: tokens.fontSizeBase600,
	},
	'@media screen and (min-width:1024px)': {
		// XL
		//Margenes de 24px y padding de 8px a la izquierda, margen de 20 y padding de 8 a la derecha (12 columnas y medianiles de 24px)
		width: `756px`,
		columnCount: 12,
		columnGap: tokens.spacingHorizontalXXL,
		fontSize: tokens.fontSizeBase600,
	},
	'@media screen and (min-width:1366px)': {
		// XXL
		width: `1072px`,
		columnCount: 12,
		columnGap: tokens.spacingHorizontalXXXL,
		fontSize: tokens.fontSizeHero700,
	},
	'@media screen and (min-width: 1920px)': {
		// XXXL
		width: `1204px`,
		columnCount: 12,
		columnGap: tokens.spacingHorizontalXXXL,
		fontSize: tokens.fontSizeHero700,
	},
});

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
	const id = useId('App');
	const baseClass = useBaseStyles();

	return (
		<IdPrefixProvider value='MARKET-MONITOR-1'>
			<FluentProvider theme={lightTheme}>
				<div
					id={`app-container-${id}`}
					className={mergeClasses(baseClass)}
				>
					{isEmpty(props.listaClientes) ||
					isEmpty(props.listaUnidades) ||
					isEmpty(props.listaFamiliasProducto) ||
					isEmpty(props.listaPeriodosCultivo) ||
					isEmpty(props.listaProveedores) ? (
						<WpProvider context={props.context}>
							<DataProvider
								listaClientes={props.listaClientes}
								listaUnidades={props.listaUnidades}
								listaFamiliasProducto={
									props.listaFamiliasProducto
								}
								listaProveedores={props.listaProveedores}
								listaPeriodosCultivo={
									props.listaPeriodosCultivo
								}
								listaCNG={props.listaCNG}
							>
								<Title1>{strings.ApplicationErrorTitle}</Title1>
								<hr />
								<Title2>{strings.ApplicationErrorText}</Title2>
								<UploadDataButtons {...props} />
							</DataProvider>
						</WpProvider>
					) : (
						<WpProvider context={props.context}>
							<UserProvider user={props.context.pageContext.user}>
								<DataProvider
									listaClientes={props.listaClientes}
									listaUnidades={props.listaUnidades}
									listaFamiliasProducto={
										props.listaFamiliasProducto
									}
									listaProveedores={props.listaProveedores}
									listaPeriodosCultivo={
										props.listaPeriodosCultivo
									}
									listaCNG={props.listaCNG}
								>
									<MonitorForm {...props} />
								</DataProvider>
							</UserProvider>
						</WpProvider>
					)}
				</div>
			</FluentProvider>
		</IdPrefixProvider>
	);
};

export default App;
