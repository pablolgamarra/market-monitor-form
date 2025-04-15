import * as ReactDom from 'react-dom';

//Types

//SP
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//Services

//Strings
import { DataProvider, DataProviderProps } from '@context/dataContext';
import ErrorComponent from '@controls/ErrorComponent';
import MarketMonitorForm from '@controls/marketMonitorForm/MarketMonitorForm';
import { AgroPeriodService } from '@services/business/AgroPeriodService';
import { BusinessBranchService } from '@services/business/BusinessBranchService';
import { ClientService } from '@services/business/ClientService';
import { CngService } from '@services/business/CngService';
import IAgroPeriodService from '@services/business/interfaces/IAgroPeriodService';
import IBusinessBranchService from '@services/business/interfaces/IBusinessBranchService';
import IClientService from '@services/business/interfaces/IClientService';
import ICngService from '@services/business/interfaces/ICngService';
import IMarketInformationService from '@services/business/interfaces/IMarketInformationService';
import IProductFamilyService from '@services/business/interfaces/IProductFamilyService';
import ISupplierService from '@services/business/interfaces/ISupplierService';
import { MarketInformationService } from '@services/business/MarketInformationService';
import { ProductFamilyService } from '@services/business/ProductFamilyService';
import { SupplierService } from '@services/business/SupplierService';
import * as strings from 'MarketMonitorFormWebPartStrings';
import React from 'react';

export interface IMarketMonitorFormWebPartProps {
	clientListName: string;
	businessBranchListName: string;
	supplierListName: string;
	agroPeriodListName: string;
	cngListName: string;
	productFamilyListName: string;
	marketInformationListName: string;
}

export default class MarketMonitorFormWebPart extends BaseClientSideWebPart<IMarketMonitorFormWebPartProps> {
	private agroPeriodService!: IAgroPeriodService;
	private businessBranchService!: IBusinessBranchService;
	private clientService!: IClientService;
	private cngService!: ICngService;
	private supplierService!: ISupplierService;
	private marketInformationService!: IMarketInformationService;
	private productFamilyService!: IProductFamilyService;

	private app!: React.FunctionComponentElement<DataProviderProps>;

	public async render(): Promise<void> {
		ReactDom.render(this.app, this.domElement);
	}

	public async onInit(): Promise<void> {
		await super.onInit();

		try {
			const configs = this.properties;

			if (
				!(
					configs.agroPeriodListName ||
					configs.businessBranchListName ||
					configs.clientListName ||
					configs.cngListName ||
					configs.supplierListName ||
					configs.marketInformationListName ||
					configs.productFamilyListName
				)
			) {
				throw new Error('Missing required lists names in the webpart configuration panel');
			}

			this.agroPeriodService = this.context.serviceScope.consume(AgroPeriodService.serviceKey);
			this.agroPeriodService.configure(configs.agroPeriodListName);

			this.businessBranchService = this.context.serviceScope.consume(BusinessBranchService.serviceKey);
			this.businessBranchService.configure(configs.businessBranchListName);

			this.clientService = this.context.serviceScope.consume(ClientService.serviceKey);
			this.clientService.configure(configs.clientListName);

			this.cngService = this.context.serviceScope.consume(CngService.serviceKey);
			this.cngService.configure(configs.cngListName);

			this.supplierService = this.context.serviceScope.consume(SupplierService.serviceKey);
			this.supplierService.configure(configs.supplierListName);

			this.marketInformationService = this.context.serviceScope.consume(MarketInformationService.serviceKey);
			this.marketInformationService.configure(configs.marketInformationListName);

			this.productFamilyService = this.context.serviceScope.consume(ProductFamilyService.serviceKey);
			this.productFamilyService.configure(configs.productFamilyListName);

			this.app = React.createElement(
				DataProvider,
				{
					agroPeriodService: this.agroPeriodService,
					businessBranchService: this.businessBranchService,
					clientService: this.clientService,
					cngService: this.cngService,
					supplierService: this.supplierService,
					marketInformationService: this.marketInformationService,
					productFamilyService: this.productFamilyService,
					spWebpartContext: this.context,
				},
				React.createElement(MarketMonitorForm, {}),
			);
		} catch (e) {
			console.error(e);
			this.app = React.createElement(
				DataProvider,
				{
					agroPeriodService: this.agroPeriodService,
					businessBranchService: this.businessBranchService,
					clientService: this.clientService,
					cngService: this.cngService,
					supplierService: this.supplierService,
					marketInformationService: this.marketInformationService,
					productFamilyService: this.productFamilyService,
					spWebpartContext: this.context,
				},
				React.createElement(ErrorComponent, { message: `${e}` }),
			);
		}
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('marketInformationListName', {
									label: 'Ingresar url relativa de Informacion de Mercado',
									placeholder: `MarketInformationList`,
								}),
								PropertyPaneTextField('clientListName', {
									label: 'Ingresar url relativa de la lista de clientes',
									placeholder: `ClientList`,
								}),
								PropertyPaneTextField('businessBranchListName', {
									label: 'Ingresar url relativa de la lista de Unidades/Sucursales',
									placeholder: `BranchesList`,
								}),
								PropertyPaneTextField('supplierListName', {
									label: 'Ingresar url relativa de lista de proveedores',
									placeholder: `ProductSuppliersList`,
								}),
								PropertyPaneTextField('agroPeriodListName', {
									label: 'Ingresar url relativa de lista de periodos cultivo',
									placeholder: `AgriculturalPeriodsList`,
								}),
								PropertyPaneTextField('cngListName', {
									label: 'Ingresar url relativa de lista vendedores',
									placeholder: `SellersList`,
								}),
								PropertyPaneTextField('productFamilyListName', {
									label: 'Ingresar url relativa de lista de familias de producto',
									placeholder: `ProductFamiliesList`,
								}),
							],
						},
					],
				},
			],
		};
	}
}
