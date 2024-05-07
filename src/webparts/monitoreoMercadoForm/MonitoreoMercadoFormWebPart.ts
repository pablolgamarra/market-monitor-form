import * as React from "react";
import * as ReactDom from "react-dom";
import { FluentProvider, FluentProviderProps } from '@fluentui/react-components';

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

import { IDropDownClienteProps } from "./components/interfaces/IDropDownClienteProps";
import { IFormularioProductosProps } from "./components/interfaces/IFormularioProductosProps";
import FormMonitoreo from "./components/FormMonitoreo";

export interface IMonitoreoMercadoFormWebPartProps {
	description: string;
}

export interface IListaUnidades{
	value:IUnidad[]
}

export interface IUnidad{
	Id:number,
	Title:string
}

export interface ICliente{
	Id:number,
	Nombre: string,
	NroFiscal: string,
	Unidad: IUnidad,
	NombreCNG: string,
}

export default class MonitoreoMercadoFormWebPart extends BaseClientSideWebPart<IMonitoreoMercadoFormWebPartProps> {
	
	/*private listaClientes: Array<IDropDownClienteProps> = [
		{ id: 1, nombre: "Pablo" },
		{ id: 2, nombre: "Agro" },
		{ id: 3, nombre: "Glymax" },
	];*/

	private listaFamiliaProductos: Array<IFormularioProductosProps> = [
		{ idFamilia: "fert-conv", familiaProducto: "Fertilizante Convencional" },
		{ idFamilia: "fert-esp", familiaProducto: "Fertilizante Especial" },
		{ idFamilia: "fert-fol", familiaProducto: "Fertilizante Foliar" },
		{ idFamilia: "fungic", familiaProducto: "Fungicidas" },
		{ idFamilia: "herbic", familiaProducto: "Herbicidas" },
		{ idFamilia: "insect", familiaProducto: "Insecticidas" },
		{ idFamilia: "biolog", familiaProducto: "Biologicos" },
		{ idFamilia: "sem-maiz-zaf", familiaProducto: "Semilla de Maiz Zafriña" },
		{ idFamilia: "sem-soja-ver", familiaProducto: "Semilla de Soja Verano" },
	];

	public async render(): Promise<void> {
		const listaUnidades = await this._getUnidades();
		const listaClientes = await this._listarClientes();
	
		const element: React.ReactElement<FluentProviderProps> = React.createElement(FluentProvider, {},
				React.createElement(FormMonitoreo, {
					listaClientes:listaClientes,
					listaUnidades:listaUnidades,
					listaFamiliaProductos:this.listaFamiliaProductos
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


	private _getUnidades():Promise<IUnidad[]>{
		//TODO: Usar variables de entorno para 'glymaxparaguay.sharepoint.com'
		const head:ISPHttpClientOptions = {headers: {"Accept":"Application/json"} }
		const url = "https://glymaxparaguay.sharepoint.com/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Unidades')/items/?$select=Title,Id"
		return this.context.httpClient.get(url, SPHttpClient.configurations.v1, head)
			.then((respuesta:SPHttpClientResponse)=>{
				return respuesta.json();
			})
			.then((data:any) =>{
				const unidades:IUnidad[] = data.value.map((item:any) => ({
					Id: item.Id,
					Title: item.Title
				}));
				return unidades;
			})
			.catch((e)=>{
				console.log(`Error al listar ${e}`);
				return [];
			});
	}

	private _listarClientes():Promise<ICliente[]> {
		const head:ISPHttpClientOptions = {headers: {"Accept":"Application/json"} }
		const url = "https://glymaxparaguay.sharepoint.com/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Unidades')/items/?$select=Title,Id"
		return this.context.httpClient.get(url, SPHttpClient.configurations.v1, head)
		.then((respuesta) => {
			return respuesta.json();
		})
		.then((data:any)=>{
			const clientes:ICliente[] = data.value.map((item:any) => ({
				Id: item.id,
				Nombre: item.nombre,
				NroFiscal: item.NroFiscal,
				Unidad: {},
				NombreCNG: item.NombreCNG
			}))
			return clientes;
		})
		.catch((e)=>{
			console.log(`Error al listar clientes ${e}`);
			return [];
		})
	}
}
