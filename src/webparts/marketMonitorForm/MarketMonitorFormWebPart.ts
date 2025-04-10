import * as ReactDom from 'react-dom';

//Types

//SP
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//Services

//Strings
import { AgroPeriodService } from '@services/business/AgroPeriodService';
import { BusinessBranchService } from '@services/business/BusinessBranchService';
import { ClientService } from '@services/business/ClientService';
import { CngService } from '@services/business/CngService';
import { IAgroPeriodService } from '@services/business/interfaces/IAgroPeriodService';
import { IBusinessBranchService } from '@services/business/interfaces/IBusinessBranchService';
import { IClientService } from '@services/business/interfaces/IClientService';
import { ICngService } from '@services/business/interfaces/ICngService';
import { ISupplierService } from '@services/business/interfaces/ISupplierService';
import { SupplierService } from '@services/business/SupplierService';

export interface IMarketMonitorFormWebPartProps {
	description: string;
}

export default class MarketMonitorFormWebPart extends BaseClientSideWebPart<IMarketMonitorFormWebPartProps> {
	private agroPeriodService!: IAgroPeriodService;
	private businessBranchService!: IBusinessBranchService;
	private clientService!: IClientService;
	private cngService!: ICngService;
	private supplierService!: ISupplierService;

	public async render(): Promise<void> {
		const element = React.createElement();
	}

	public async onInit(): Promise<void> {
		await super.onInit();

		try {
			this.agroPeriodService = this.context.serviceScope.consume(AgroPeriodService.serviceKey);
			this.businessBranchService = this.context.serviceScope.consume(BusinessBranchService.serviceKey);
			this.clientService = this.context.serviceScope.consume(ClientService.serviceKey);
			this.cngService = this.context.serviceScope.consume(CngService.serviceKey);
			this.supplierService = this.context.serviceScope.consume(SupplierService.serviceKey);
		} catch (e) {
			console.error('Error on services init: -> ', e);
		}
	}

	private async _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app.getContext().then((context) => {
				let environmentMessage: string = '';
				switch (context.app.host.name) {
					case 'Office': // running in Office
						environmentMessage = this.context.isServedFromLocalhost
							? strings.AppLocalEnvironmentOffice
							: strings.AppOfficeEnvironment;
						break;
					case 'Outlook': // running in Outlook
						environmentMessage = this.context.isServedFromLocalhost
							? strings.AppLocalEnvironmentOutlook
							: strings.AppOutlookEnvironment;
						break;
					case 'Teams': // running in Teams
					case 'TeamsModern':
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
			this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
			this.domElement.style.setProperty('--link', semanticColors.link || null);
			this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
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
								PropertyPaneTextField('URL de Lista de SP donde guardar datos', {
									label: 'Ingresar url relativa de Informacion de Mercado',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField('URL del listado de clientes', {
									label: 'Ingresar url relativa de la lista de clientes',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField('Lista de unidades', {
									label: 'Ingresar url relativa de la lista de Unidades/Sucursales',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField('Lista de proveedores', {
									label: 'Ingresar url relativa de lista de proveedores',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField('Lista de periodos de cultivo', {
									label: 'Ingresar url relativa de lista de periodos cultivo',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField("Lista de CNG's/vendedores", {
									label: 'Ingresar url relativa de lista vendedores',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
								PropertyPaneTextField('Lista de familias de producto', {
									label: 'Ingresar url relativa de lista de familias de producto',
									placeholder: `${this.context.pageContext.web.absoluteUrl}/<lista>`,
								}),
							],
						},
					],
				},
			],
		};
	}
}
