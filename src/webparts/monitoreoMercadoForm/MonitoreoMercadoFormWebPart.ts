import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MonitoreoMercadoFormWebPartStrings';

import App, { AppProps } from '@/components/App';
import { getAllUnidades } from '@/services/unidades';
import { getAllProveedores } from '@/services/proveedores';
import { getAllPeriodosCultivo } from '@/services/periodosCultivo';
import { getAllFamiliasProducto } from '@/services/familiasProducto';
import { getAllClientes } from '@/services/clientes';
import { getAllCNG } from '@/services/cngs';

export interface IMonitoreoMercadoFormWebPartProps {
	description: string;
}

export default class MonitoreoMercadoFormWebPart extends BaseClientSideWebPart<IMonitoreoMercadoFormWebPartProps> {
	public async render(): Promise<void> {
		//TODO: Reemplazar esto por custom hooks
		const context = this.context;
		const listaUnidades = await getAllUnidades(context);
		const listaClientes = await getAllClientes(context);
		const listaFamiliasProductos = await getAllFamiliasProducto(context);
		const listaPeriodosCultivo = await getAllPeriodosCultivo(context);
		const listaProveedores = await getAllProveedores(context);
		const listaCNG = await getAllCNG(context)

		const root: React.FunctionComponentElement<AppProps> =
			React.createElement(App, {
				context: context,
				listaClientes: listaClientes,
				listaUnidades: listaUnidades,
				listaFamiliasProducto: listaFamiliasProductos,
				listaPeriodosCultivo: listaPeriodosCultivo,
				listaProveedores: listaProveedores,
				listaCNG: listaCNG,
				width: this.width,
			});

		ReactDom.render(root, this.domElement);
	}

	protected onInit(): Promise<void> {
		return this._getEnvironmentMessage().then((message) => {
			//this._environmentMessage = message;
		});
	}

	private _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app
				.getContext()
				.then((context) => {
					let environmentMessage: string = '';
					switch (context.app.host.name) {
						case 'Office': // running in Office
							environmentMessage = this.context
								.isServedFromLocalhost
								? strings.AppLocalEnvironmentOffice
								: strings.AppOfficeEnvironment;
							break;
						case 'Outlook': // running in Outlook
							environmentMessage = this.context
								.isServedFromLocalhost
								? strings.AppLocalEnvironmentOutlook
								: strings.AppOutlookEnvironment;
							break;
						case 'Teams': // running in Teams
						case 'TeamsModern':
							environmentMessage = this.context
								.isServedFromLocalhost
								? strings.AppLocalEnvironmentTeams
								: strings.AppTeamsTabEnvironment;
							break;
						default:
							environmentMessage = strings.UnknownEnvironment;
					}

					return environmentMessage;
				});
		}

		return Promise.resolve(
			this.context.isServedFromLocalhost
				? strings.AppLocalEnvironmentSharePoint
				: strings.AppSharePointEnvironment,
		);
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		//this._isDarkTheme = !!currentTheme.isInverted;
		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty(
				'--bodyText',
				semanticColors.bodyText || null,
			);
			this.domElement.style.setProperty(
				'--link',
				semanticColors.link || null,
			);
			this.domElement.style.setProperty(
				'--linkHovered',
				semanticColors.linkHovered || null,
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							//TODO: AGREGAR ESTO A LAS QUERIES DE SP
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel,
								}),
								PropertyPaneTextField(
									'URL de Lista de SP donde guardar datos',
									{
										label: 'Ingresar url relativa de Informacion de Mercado',
										placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
									},
								),
								PropertyPaneTextField(
									'URL del listado de clientes',
									{
										label: 'Ingresar url relativa de la lista de clientes',
										placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
									},
								),
								PropertyPaneTextField('Lista de unidades', {
									label: 'Ingresar url relativa de la lista de Unidades/Sucursales',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField('Lista de proveedores', {
									label: 'Ingresar url relativa de lista de proveedores',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField(
									'Lista de periodos de cultivo',
									{
										label: 'Ingresar url relativa de lista de periodos cultivo',
										placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
									},
								),
								PropertyPaneTextField(
									"Lista de CNG's/vendedores",
									{
										label: 'Ingresar url relativa de lista vendedores',
										placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
									},
								),
								PropertyPaneTextField(
									'Lista de familias de producto',
									{
										label: 'Ingresar url relativa de lista de familias de producto',
										placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
									},
								),
							],
						},
					],
				},
			],
		};
	}
}
