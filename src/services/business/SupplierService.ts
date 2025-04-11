import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import ProductFamily from '@models/ProductFamily';
import Supplier from '@models/Supplier';
import { SupplierResponse } from '@models/spServiceResponse/SupplierResponse';
import { ProductFamilyService } from '@services/business/ProductFamilyService';
import IProductFamilyService from '@services/business/interfaces/IProductFamilyService';
import ISupplierService from '@services/business/interfaces/ISupplierService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class SupplierService implements ISupplierService {
	public static readonly serviceKey: ServiceKey<ISupplierService> = ServiceKey.create(
		'MarketMonitor.SupplierService',
		SupplierService,
	);

	private _SPService!: ISPService;
	private _productFamilyService!: IProductFamilyService;

	private listName: string = '';

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._productFamilyService = serviceScope.consume(ProductFamilyService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing SupplierService -> ${e}`);
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

	private mapToSupplier(item: SupplierResponse, productFamily: ProductFamily[]): Supplier {
		return {
			Id: item.Id,
			Name: item.Title,
			ProductFamilyProvided: productFamily,
		};
	}

	private formatSharepoint(item: Supplier): SupplierResponse {
		return {
			Id: item.Id,
			Title: item.Name,
			Familia_x0020_de_x0020_ProductoId: item.ProductFamilyProvided.map((item) => item.Id),
			ID: item.Id,
		};
	}

	public async getAll(): Promise<Supplier[]> {
		try {
			const queryResults: SupplierResponse[] = await this._SPService.getAllItems(this.listName);
			const productFamilyList: ProductFamily[] = await this._productFamilyService.getAll();

			const results: Supplier[] = queryResults.map((item) => {
				const productFamily =
					productFamilyList.filter((productFamily) =>
						item.Familia_x0020_de_x0020_ProductoId.includes(productFamily.Id),
					) || ([] as ProductFamily[]);
				return this.mapToSupplier(item, productFamily);
			});

			return results;
		} catch (e) {
			throw new Error(`Error retrieving all supliers -> ${e}`);
		}
	}

	public async getById(id: number): Promise<Supplier> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: SupplierResponse[] = await this._SPService.getItemById(this.listName, id);
			const productFamilyList: ProductFamily[] = await this._productFamilyService.getAll();
			const results: Supplier[] = queryResults.map((item) => {
				const productFamily =
					productFamilyList.filter((productFamily) =>
						item.Familia_x0020_de_x0020_ProductoId.includes(productFamily.Id),
					) || ([] as ProductFamily[]);
				return this.mapToSupplier(item, productFamily);
			});

			if (!results[0]) {
				throw new Error(`No supplier found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving supplier with Id ${id} -> ${e}`);
		}
	}
	public async getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ suppliersPage: Supplier[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const productFamilyList: ProductFamily[] = await this._productFamilyService.getAll();

			const supplierPage = results.map((item: SupplierResponse) => {
				const productFamily =
					productFamilyList.filter((productFamily) =>
						item.Familia_x0020_de_x0020_ProductoId.includes(productFamily.Id),
					) || ([] as ProductFamily[]);
				return this.mapToSupplier(item, productFamily);
			});

			return { suppliersPage: supplierPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving supplier from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(supplier: Supplier): Promise<boolean> {
		try {
			if (!supplier) {
				throw new Error(`Cannot Insert. Supplier not valid`);
			}

			const supplierInsert = this.formatSharepoint(supplier);
			await this._SPService.insertItem(this.listName, supplierInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting supplier data -> ${e}`);
		}
	}

	public async updateItem(supplier: Supplier): Promise<boolean> {
		try {
			if (!supplier) {
				throw new Error(`Cannot Update. Supplier not valid`);
			}

			const supplierUpdate = this.formatSharepoint(supplier);
			await this._SPService.updateItem(this.listName, supplierUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating supplier data -> ${e}`);
		}
	}

	public async deleteItem(supplier: Supplier): Promise<boolean> {
		try {
			if (!supplier) {
				throw new Error(`Cannot Update. Supplier not valid`);
			}
			const supplierDelete = this.formatSharepoint(supplier);
			await this._SPService.deleteItem(this.listName, supplierDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting supplier data -> ${e}`);
		}
	}
}
