import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MarketMonitorClientesListWebPartStrings';
import App, { AppProps } from '@clientes/components/App';
import { getAllClientes } from 'src/webparts/marketMonitorForm/services/clientes';

export interface IMarketMonitorClientesListWebPartProps {
	description: string;
}

export default class MarketMonitorClientesListWebPart extends BaseClientSideWebPart<IMarketMonitorClientesListWebPartProps> {
	public async render(): Promise<void> {
		const clientes = await getAllClientes(this.context);

		const element: React.FunctionComponentElement<AppProps> =
			React.createElement(App, {
				clientes: clientes,
			});

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
		return this._getEnvironmentMessage().then((message) => {
			//console.log('App Iniciada');
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
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
