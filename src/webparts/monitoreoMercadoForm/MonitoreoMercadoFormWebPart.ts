import * as React from "react";
import * as ReactDom from "react-dom";
import { FluentProvider, FluentProviderProps, Title1 } from '@fluentui/react-components';

import { Version } from "@microsoft/sp-core-library";
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";


import * as strings from "MonitoreoMercadoFormWebPartStrings";

import {SPHttpClient, 
	SPHttpClientResponse,
	ISPHttpClientOptions
} from '@microsoft/sp-http';

import FormMonitoreo from "./components/FormMonitoreo";
import { IUnidad } from "./components/interfaces/IUnidad";
import { ICliente } from "./components/interfaces/ICliente";
import { IFamiliaProducto } from "./components/interfaces/IFamiliaProducto";
import { isEmpty } from "@microsoft/sp-lodash-subset";

export interface IMonitoreoMercadoFormWebPartProps {
	description: string;
}

export default class MonitoreoMercadoFormWebPart extends BaseClientSideWebPart<IMonitoreoMercadoFormWebPartProps> {

	/*private listaFamiliaProductos: Array<IFormularioProductosProps> = [
		{ idFamilia: "fert-conv", familiaProducto: "Fertilizante Convencional" },
		{ idFamilia: "fert-esp", familiaProducto: "Fertilizante Especial" },
		{ idFamilia: "fert-fol", familiaProducto: "Fertilizante Foliar" },
		{ idFamilia: "fungic", familiaProducto: "Fungicidas" },
		{ idFamilia: "herbic", familiaProducto: "Herbicidas" },
		{ idFamilia: "insect", familiaProducto: "Insecticidas" },
		{ idFamilia: "biolog", familiaProducto: "Biologicos" },
		{ idFamilia: "sem-maiz-zaf", familiaProducto: "Semilla de Maiz Zafriña" },
		{ idFamilia: "sem-soja-ver", familiaProducto: "Semilla de Soja Verano" },
	];*/

	public async render(): Promise<void> {
		const listaUnidades = await this._getUnidades();
		const listaClientes = await this._getClientes();
		const listaFamiliasProductos = await this._getFamiliaProductos();
		
		let element: React.ReactElement<FluentProviderProps>

		if (isEmpty(listaClientes) || isEmpty(listaUnidades) || isEmpty(listaFamiliasProductos)){
			element = React.createElement(FluentProvider,{},
				React.createElement(Title1,{},"Error, listas vacias")
			);
		}

		element = React.createElement(FluentProvider, {},
				React.createElement(FormMonitoreo, {
					listaClientes:listaClientes,
					listaUnidades:listaUnidades,
					listaFamiliaProductos:listaFamiliasProductos
				})
		);

		ReactDom.render(element, this.domElement);
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
					let environmentMessage: string = "";
					switch (context.app.host.name) {
						case "Office": // running in Office
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentOffice
								: strings.AppOfficeEnvironment;
							break;
						case "Outlook": // running in Outlook
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentOutlook
								: strings.AppOutlookEnvironment;
							break;
						case "Teams": // running in Teams
						case "TeamsModern":
							environmentMessage = this.context.isServedFromLocalhost
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
				: strings.AppSharePointEnvironment
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
				"--bodyText",
				semanticColors.bodyText || null
			);
			this.domElement.style.setProperty("--link", semanticColors.link || null);
			this.domElement.style.setProperty(
				"--linkHovered",
				semanticColors.linkHovered || null
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}

	private async _getUnidades():Promise<IUnidad[]>{
		//this.context.pageContext.web.absoluteUrl
		const head:ISPHttpClientOptions = {headers: {"Accept":"Application/json"} }
		const url:string = "https://glymaxparaguay.sharepoint.com/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Unidades')/items/?$select=Title,Id"
		
		return await this.consultarSP(url, head)
		.then((respuesta:SPHttpClientResponse) => {
			if(respuesta.status === 200){
				return respuesta.json();
			}
			return [];
		})
		.then((data:any) => {
			const unidades:IUnidad[] = data.value.map((item:any)=>({
				Id: item.Id,
				Nombre: item.Title,
			}))
			return unidades;
		})
		.catch((e)=>{
			console.log(`Error al listar unidades ${e}`)
			return [];
		})
	}

	private async _getClientes():Promise<ICliente[]> {
		//this.context.pageContext.web.absoluteUrl
		const head:ISPHttpClientOptions = {headers: {"Accept":"Application/json"} }
		const url:string = "https://glymaxparaguay.sharepoint.com/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Clientes')/items/?$select=Id,Title,RUC_x002f_CI,Nombre_x0020_CNG,UnidadId"
		
		return await this.consultarSP(url, head)
		.then((respuesta:SPHttpClientResponse) => {
			if(respuesta.status === 200){
				return respuesta.json()
			}
			return [];
		})
		.then((data:any) => {
			const clientes:ICliente[] = data.value.map((item:any) => ({
				Id: item.Id,
				Nombre: item.Title,
				NroFiscal: item.RUC_x002f_CI,
				Unidad: item.UnidadId,
				NombreCNG: item.Nombre_x0020_CNG, 
			}))
			return clientes;
		})
		.catch((e) => {
			console.log(`Error listando clientes: ${e}`)
			return [];
		})
	}

	private async _getFamiliaProductos():Promise<IFamiliaProducto[]> {
		//this.context.pageContext.web.absoluteUrl
		const head:ISPHttpClientOptions ={headers:{"Accept":"Application/json"}}
		const url:string = "https://glymaxparaguay.sharepoint.com/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Familias Productos')/items/?$select=Id,Title,UnidaddeMedida"
		
		return this.consultarSP(url, head)
		.then(
			(respuesta:SPHttpClientResponse) => {
				if(respuesta.status === 200){
					return respuesta.json();
				}
				return [];
			}
		)
		.then(
			(data:any) => {
				const familiasProductos:IFamiliaProducto[] = data.value.map((item:any) => ({
					Id: item.Id,
					Nombre: item.Title,
					UnidadMedida: item.UnidaddeMedida
				}))
				return familiasProductos;
			}
		)
	}
	
	private async consultarSP(url:string, headers:ISPHttpClientOptions):Promise<SPHttpClientResponse>{
		return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1, headers);
	}
}
