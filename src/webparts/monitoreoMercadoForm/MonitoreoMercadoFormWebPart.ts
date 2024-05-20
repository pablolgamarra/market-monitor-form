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

import { getClientes, getFamiliaProductos, getUnidades, registrarDatos } from "./utils/QuerySP";

import FormMonitoreo from "./components/FormMonitoreo";

import { isEmpty } from "@microsoft/sp-lodash-subset";
import { DatosValores } from "./components/interfaces/DatosValores";

export interface IMonitoreoMercadoFormWebPartProps {
	description: string;
}

export default class MonitoreoMercadoFormWebPart extends BaseClientSideWebPart<IMonitoreoMercadoFormWebPartProps> {
	
	public async render(): Promise<void> {
		const url = this.context.pageContext.web.absoluteUrl;
		const context = this.context

		const listaUnidades = await getUnidades(url, context);
		const listaClientes = await getClientes(url, context);
		const listaFamiliasProductos = await getFamiliaProductos(url, context);
		
		const onSave = (data:DatosValores):void=>{
			registrarDatos(data, this.context.pageContext.web.absoluteUrl, this.context)
			.then(()=>{
				alert('Datos Guardados Correctamente');
			})
			.catch((e:Error) => {
				console.log(`Error al guardar datos: ${e}`);
				alert('Error al guardar los datos');
			})
		}

		let element: React.ReactElement<FluentProviderProps>

		if (isEmpty(listaClientes) || isEmpty(listaUnidades) || isEmpty(listaFamiliasProductos)){
			element = React.createElement(FluentProvider,{},
				React.createElement(Title1,{},"Error, listas vacias")
			);
		}else{
			element = React.createElement(FluentProvider, {},
				React.createElement(FormMonitoreo, {
					listaClientes:listaClientes,
					listaUnidades:listaUnidades,
					listaFamiliaProductos:listaFamiliasProductos,
					onSave:onSave,
				})
		);
		}

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


}
