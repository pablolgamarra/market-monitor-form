import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { BusinessBranch } from '@models/BusinessBranch';
import { BusinessBranchResponse } from '@models/spServiceResponse/BusinessBranchResponse';
import { IBusinessBranchService } from '@services/business/interfaces/IBusinessBranchService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class BusinessBranchService implements IBusinessBranchService {
	public static readonly serviceKey: ServiceKey<IBusinessBranchService> = ServiceKey.create(
		'MarketMonitor.BusinessBranchService',
		BusinessBranchService,
	);

	private _SPService!: ISPService;

	private listName: string = 'Unidades';

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
			});
		} catch (e) {
			throw new Error(`Error initializing BusinessBranchService -> ${e}`);
		}
	}

	private mapToBusinessBranch(item: BusinessBranchResponse): BusinessBranch {
		return {
			Id: item.Id,
			Name: item.Title,
		};
	}

	private formatSharepoint(item: BusinessBranch): BusinessBranchResponse {
		return {
			Id: item.Id,
			Title: item.Name,
			ID: item.Id,
		};
	}

	public async getAll(): Promise<BusinessBranch[]> {
		try {
			const queryResults: BusinessBranchResponse[] = await this._SPService.getAllItems(this.listName);
			const results: BusinessBranch[] = queryResults.map(this.mapToBusinessBranch);
			return results;
		} catch (e) {
			throw new Error(`Error retrieving all business branches -> ${e}`);
		}
	}

	public async getById(id: number): Promise<BusinessBranch> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: BusinessBranchResponse[] = await this._SPService.getItemById(this.listName, id);
			const results: BusinessBranch[] = queryResults.map(this.mapToBusinessBranch);

			if (!results[0]) {
				throw new Error(`No business branch found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving business branch with Id ${id} -> ${e}`);
		}
	}
	public async getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ businessBranchsPage: BusinessBranch[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const businessBranchPage = results.map(this.mapToBusinessBranch);

			return { businessBranchsPage: businessBranchPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving business branch from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(businessBranch: BusinessBranch): Promise<boolean> {
		try {
			if (!businessBranch) {
				throw new Error(`Cannot Insert. Business Branch not valid`);
			}

			const businessBranchInsert = this.formatSharepoint(businessBranch);
			await this._SPService.insertItem(this.listName, businessBranchInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting business branch data -> ${e}`);
		}
	}

	public async updateItem(businessBranch: BusinessBranch): Promise<boolean> {
		try {
			if (!businessBranch) {
				throw new Error(`Cannot Update. Business Branch not valid`);
			}

			const businessBranchUpdate = this.formatSharepoint(businessBranch);
			await this._SPService.updateItem(this.listName, businessBranchUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating business branch data -> ${e}`);
		}
	}

	public async deleteItem(businessBranch: BusinessBranch): Promise<boolean> {
		try {
			if (!businessBranch) {
				throw new Error(`Cannot Update. Business Branch not valid`);
			}
			const businessBranchDelete = this.formatSharepoint(businessBranch);
			await this._SPService.deleteItem(this.listName, businessBranchDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting business branch data -> ${e}`);
		}
	}
}
