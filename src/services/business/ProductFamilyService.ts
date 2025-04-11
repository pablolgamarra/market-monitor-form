import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import AgroPeriod from '@models/AgroPeriod';
import ProductFamily from '@models/ProductFamily';
import { ProductFamilyResponse } from '@models/spServiceResponse/ProductFamilyResponse';
import { AgroPeriodService } from '@services/business/AgroPeriodService';
import IAgroPeriodService from '@services/business/interfaces/IAgroPeriodService';
import IProductFamilyService from '@services/business/interfaces/IProductFamilyService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class ProductFamilyService implements IProductFamilyService {
	public static readonly serviceKey: ServiceKey<IProductFamilyService> = ServiceKey.create(
		'MarketMonitor.ProductFamilyService',
		ProductFamilyService,
	);

	private _SPService!: ISPService;
	private _agroPeriodService!: IAgroPeriodService;

	private listName: string = '';

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._agroPeriodService = serviceScope.consume(AgroPeriodService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing ProductFamilyService -> ${e}`);
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

	private mapToProductFamily(item: ProductFamilyResponse, agroPeriod: AgroPeriod[]): ProductFamily {
		return {
			Id: item.Id,
			Name: item.Title,
			AgroPeriod: agroPeriod,
			MeasureUnit: item.UnidaddeMedida,
			Status: item.Activo,
		};
	}

	private formatSharepoint(item: ProductFamily): ProductFamilyResponse {
		return {
			Id: item.Id,
			Title: item.Name,
			UnidaddeMedida: item.MeasureUnit,
			PeriododeCultivoId: item.AgroPeriod.map((item) => item.Id),
			Activo: item.Status,
			ID: item.Id,
		};
	}

	public async getAll(): Promise<ProductFamily[]> {
		try {
			const queryResults: ProductFamilyResponse[] = await this._SPService.getAllItems(this.listName);
			const agroPeriodList: AgroPeriod[] = await this._agroPeriodService.getAll();

			const results: ProductFamily[] = queryResults.map((item) => {
				const agroPeriods =
					agroPeriodList.filter((agroPeriod) => item.PeriododeCultivoId.includes(agroPeriod.Id)) ||
					([] as AgroPeriod[]);
				return this.mapToProductFamily(item, agroPeriods);
			});

			return results;
		} catch (e) {
			throw new Error(`Error retrieving all product families -> ${e}`);
		}
	}

	public async getById(id: number): Promise<ProductFamily> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: ProductFamilyResponse[] = await this._SPService.getItemById(this.listName, id);
			const agroPeriodList: AgroPeriod[] = await this._agroPeriodService.getAll();

			const results: ProductFamily[] = queryResults.map((item) => {
				const agroPeriods =
					agroPeriodList.filter((agroPeriod) => item.PeriododeCultivoId.includes(agroPeriod.Id)) ||
					([] as AgroPeriod[]);
				return this.mapToProductFamily(item, agroPeriods);
			});

			if (!results[0]) {
				throw new Error(`No productfamily found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving productfamily with Id ${id} -> ${e}`);
		}
	}

	public async getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ productFamiliesPage: ProductFamily[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const agroPeriodList: AgroPeriod[] = await this._agroPeriodService.getAll();

			const productfamilyPage = results.map((item: ProductFamilyResponse) => {
				const agroPeriods =
					agroPeriodList.filter((agroPeriod) => item.PeriododeCultivoId.includes(agroPeriod.Id)) ||
					([] as AgroPeriod[]);

				return this.mapToProductFamily(item, agroPeriods);
			});

			return { productFamiliesPage: productfamilyPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving productfamily from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(productfamily: ProductFamily): Promise<boolean> {
		try {
			if (!productfamily) {
				throw new Error(`Cannot Insert. ProductFamily not valid`);
			}

			const productfamilyInsert = this.formatSharepoint(productfamily);
			await this._SPService.insertItem(this.listName, productfamilyInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting productfamily data -> ${e}`);
		}
	}

	public async updateItem(productfamily: ProductFamily): Promise<boolean> {
		try {
			if (!productfamily) {
				throw new Error(`Cannot Update. ProductFamily not valid`);
			}

			const productfamilyUpdate = this.formatSharepoint(productfamily);
			await this._SPService.updateItem(this.listName, productfamilyUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating productfamily data -> ${e}`);
		}
	}

	public async deleteItem(productfamily: ProductFamily): Promise<boolean> {
		try {
			if (!productfamily) {
				throw new Error(`Cannot Update. ProductFamily not valid`);
			}
			const productfamilyDelete = this.formatSharepoint(productfamily);
			await this._SPService.deleteItem(this.listName, productfamilyDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting productfamily data -> ${e}`);
		}
	}
}
