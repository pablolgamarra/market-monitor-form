import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import AgroPeriod from '@models/AgroPeriod';
import Client from '@models/Client';
import Cng from '@models/Cng';
import MarketInformation from '@models/MarketInformation';
import ProductFamily from '@models/ProductFamily';
import { MarketInformationResponse } from '@models/spServiceResponse/MarketInformationResponse';
import Supplier from '@models/Supplier';
import { AgroPeriodService } from '@services/business/AgroPeriodService';
import { ClientService } from '@services/business/ClientService';
import IAgroPeriodService from '@services/business/interfaces/IAgroPeriodService';
import IClientService from '@services/business/interfaces/IClientService';
import ICngService from '@services/business/interfaces/ICngService';
import IMarketInformationService from '@services/business/interfaces/IMarketInformationService';
import IProductFamilyService from '@services/business/interfaces/IProductFamilyService';
import ISupplierService from '@services/business/interfaces/ISupplierService';
import { ProductFamilyService } from '@services/business/ProductFamilyService';
import { SupplierService } from '@services/business/SupplierService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class MarketInformationService implements IMarketInformationService {
	public static readonly serviceKey: ServiceKey<IMarketInformationService> = ServiceKey.create(
		'MarketMonitor.MarketInformationService',
		MarketInformationService,
	);

	private _SPService!: ISPService;
	private _clientService!: IClientService;
	private _agroPeriodService!: IAgroPeriodService;
	private _productFamilyService!: IProductFamilyService;
	private _supplierService!: ISupplierService;
	private _cngService!: ICngService;

	private listName: string = '';

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._clientService = serviceScope.consume(ClientService.serviceKey);
				this._agroPeriodService = serviceScope.consume(AgroPeriodService.serviceKey);
				this._productFamilyService = serviceScope.consume(ProductFamilyService.serviceKey);
				this._supplierService = serviceScope.consume(SupplierService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing MarketInformationService -> ${e}`);
		}
	}

	public configure(listName: string): void {
		try {
			if (!listName) {
				throw new Error(`ListName not valid`);
			}
			this.listName = listName;
		} catch (e) {
			throw new Error(`Error configuring service -> ${e}`);
		}
	}

	private mapToMarketInformation(
		item: MarketInformationResponse,
		client: Client,
		agroPeriod: AgroPeriod,
		productFamily: ProductFamily,
		supplier: Supplier,
		cng: Cng,
	): MarketInformation {
		return {
			Id: item.Id,
			Client: client,
			AgroPeriod: agroPeriod,
			ProductFamily: productFamily,
			MainSupplier: supplier,
			Cng: cng,
			BuyedVolume: item.VolumenYaComprado,
		};
	}

	private formatSharepoint(item: MarketInformation): MarketInformationResponse {
		return {
			Id: item.Id,
			ClienteId: item.Client.Id,
			Periodo_x0020_de_x0020_CultivoId: item.AgroPeriod.Id,
			Familia_x0020_de_x0020_ProductoId: item.ProductFamily.Id,
			Proveedor_x0020_PrincipalId: item.MainSupplier.Id,
			CNGId: item.Cng.Id,
			VolumenYaComprado: item.BuyedVolume,
			ID: item.Id,
		};
	}

	public async getAll(): Promise<MarketInformation[]> {
		try {
			const queryResults: MarketInformationResponse[] = await this._SPService.getAllItems(this.listName);
			const clientList: Client[] = await this._clientService.getAll();
			const agroPeriodList: AgroPeriod[] = await this._agroPeriodService.getAll();
			const productFamilyList: ProductFamily[] = await this._productFamilyService.getAll();
			const supplierList: Supplier[] = await this._supplierService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const results: MarketInformation[] = queryResults.map((item) => {
				const client = clientList.find((client) => client.Id === item.ClienteId) || ({} as Client);
				const agroPeriod =
					agroPeriodList.find((agroPeriod) => agroPeriod.Id === item.Periodo_x0020_de_x0020_CultivoId) ||
					({} as AgroPeriod);
				const productFamily =
					productFamilyList.find(
						(productFamily) => productFamily.Id === item.Familia_x0020_de_x0020_ProductoId,
					) || ({} as ProductFamily);
				const supplier =
					supplierList.find((supplier) => supplier.Id === item.Proveedor_x0020_PrincipalId) ||
					({} as Supplier);
				const cng = cngList.find((cng) => cng.Id === item.CNGId) || ({} as Cng);
				return this.mapToMarketInformation(item, client, agroPeriod, productFamily, supplier, cng);
			});

			return results;
		} catch (e) {
			throw new Error(`Error retrieving all market informations -> ${e}`);
		}
	}

	public async getById(id: number): Promise<MarketInformation> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: MarketInformationResponse[] = await this._SPService.getItemById(this.listName, id);
			const clientList: Client[] = await this._clientService.getAll();
			const agroPeriodList: AgroPeriod[] = await this._agroPeriodService.getAll();
			const productFamilyList: ProductFamily[] = await this._productFamilyService.getAll();
			const supplierList: Supplier[] = await this._supplierService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const results: MarketInformation[] = queryResults.map((item) => {
				const client = clientList.find((client) => client.Id === item.ClienteId) || ({} as Client);
				const agroPeriod =
					agroPeriodList.find((agroPeriod) => agroPeriod.Id === item.Periodo_x0020_de_x0020_CultivoId) ||
					({} as AgroPeriod);
				const productFamily =
					productFamilyList.find(
						(productFamily) => productFamily.Id === item.Familia_x0020_de_x0020_ProductoId,
					) || ({} as ProductFamily);
				const supplier =
					supplierList.find((supplier) => supplier.Id === item.Proveedor_x0020_PrincipalId) ||
					({} as Supplier);
				const cng = cngList.find((cng) => cng.Id === item.CNGId) || ({} as Cng);
				return this.mapToMarketInformation(item, client, agroPeriod, productFamily, supplier, cng);
			});

			if (!results[0]) {
				throw new Error(`No marketinformation found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving marketinformation with Id ${id} -> ${e}`);
		}
	}

	public async getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ marketInformationsPage: MarketInformation[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const clientList: Client[] = await this._clientService.getAll();
			const agroPeriodList: AgroPeriod[] = await this._agroPeriodService.getAll();
			const productFamilyList: ProductFamily[] = await this._productFamilyService.getAll();
			const supplierList: Supplier[] = await this._supplierService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const marketinformationPage = results.map((item: MarketInformationResponse) => {
				const client = clientList.find((client) => client.Id === item.ClienteId) || ({} as Client);
				const agroPeriod =
					agroPeriodList.find((agroPeriod) => agroPeriod.Id === item.Periodo_x0020_de_x0020_CultivoId) ||
					({} as AgroPeriod);
				const productFamily =
					productFamilyList.find(
						(productFamily) => productFamily.Id === item.Familia_x0020_de_x0020_ProductoId,
					) || ({} as ProductFamily);
				const supplier =
					supplierList.find((supplier) => supplier.Id === item.Proveedor_x0020_PrincipalId) ||
					({} as Supplier);
				const cng = cngList.find((cng) => cng.Id === item.CNGId) || ({} as Cng);
				return this.mapToMarketInformation(item, client, agroPeriod, productFamily, supplier, cng);
			});

			return { marketInformationsPage: marketinformationPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving marketinformation from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(marketinformation: MarketInformation): Promise<boolean> {
		try {
			if (!marketinformation) {
				throw new Error(`Cannot Insert. MarketInformation not valid`);
			}

			const marketinformationInsert = this.formatSharepoint(marketinformation);
			await this._SPService.insertItem(this.listName, marketinformationInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting marketinformation data -> ${e}`);
		}
	}

	public async updateItem(marketinformation: MarketInformation): Promise<boolean> {
		try {
			if (!marketinformation) {
				throw new Error(`Cannot Update. MarketInformation not valid`);
			}

			const marketinformationUpdate = this.formatSharepoint(marketinformation);
			await this._SPService.updateItem(this.listName, marketinformationUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating marketinformation data -> ${e}`);
		}
	}

	public async deleteItem(marketinformation: MarketInformation): Promise<boolean> {
		try {
			if (!marketinformation) {
				throw new Error(`Cannot Update. MarketInformation not valid`);
			}
			const marketinformationDelete = this.formatSharepoint(marketinformation);
			await this._SPService.deleteItem(this.listName, marketinformationDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting marketinformation data -> ${e}`);
		}
	}
}
