import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { BusinessBranch } from '@models/BusinessBranch';
import { Cng } from '@models/Cng';
import { CngResponse } from '@models/spServiceResponse/CngResponse';
import { BusinessBranchService } from '@services/business/BusinessBranchService';
import { IBusinessBranchService } from '@services/business/interfaces/IBusinessBranchService';
import { ICngService } from '@services/business/interfaces/ICngService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class CngService implements ICngService {
	public static readonly serviceKey: ServiceKey<ICngService> = ServiceKey.create(
		'MarketMonitor.CngService',
		CngService,
	);

	private _SPService!: ISPService;
	private _businessBranchService!: IBusinessBranchService;

	private listName: string = 'Cng';

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._businessBranchService = serviceScope.consume(BusinessBranchService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing CngService -> ${e}`);
		}
	}

	private mapToCng(item: CngResponse, businessBranch: BusinessBranch): Cng {
		return {
			Id: item.Id,
			Name: item.NombreCNG,
			BusinessBranch: businessBranch,
			Email: item.Correo,
			Role: item.Cargo,
			SAPCode: item.Title,
		};
	}

	private formatSharepoint(item: Cng): CngResponse {
		return {
			Id: item.Id,
			Title: item.SAPCode,
			ID: item.Id,
			UnidadId: item.BusinessBranch.Id,
			NombreCNG: item.Name,
			Cargo: item.Role,
			Correo: item.Email,
		};
	}

	public async getAll(): Promise<Cng[]> {
		try {
			const queryResults: CngResponse[] = await this._SPService.getAllItems(this.listName);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();

			const results: Cng[] = queryResults.map((item) => {
				const businessBranch =
					businessBranchList.find((branch) => branch.Id === item.UnidadId) || ({} as BusinessBranch);
				return this.mapToCng(item, businessBranch);
			});

			return results;
		} catch (e) {
			throw new Error(`Error retrieving all CNGs -> ${e}`);
		}
	}

	public async getById(id: number): Promise<Cng> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: CngResponse[] = await this._SPService.getItemById(this.listName, id);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();
			const results: Cng[] = queryResults.map((item) => {
				const businessBranch =
					businessBranchList.find((branch) => branch.Id === item.UnidadId) || ({} as BusinessBranch);
				return this.mapToCng(item, businessBranch);
			});

			if (!results[0]) {
				throw new Error(`No cng found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving cng with Id ${id} -> ${e}`);
		}
	}
	public async getPaged(pageSize: number, requestedPage: number): Promise<{ cngsPage: Cng[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();

			const cngPage = results.map((item: CngResponse) => {
				const businessBranch =
					businessBranchList.find((branch) => branch.Id === item.UnidadId) || ({} as BusinessBranch);
				return this.mapToCng(item, businessBranch);
			});

			return { cngsPage: cngPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving cng from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(cng: Cng): Promise<boolean> {
		try {
			if (!cng) {
				throw new Error(`Cannot Insert. Cng not valid`);
			}

			const cngInsert = this.formatSharepoint(cng);
			await this._SPService.insertItem(this.listName, cngInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting cng data -> ${e}`);
		}
	}

	public async updateItem(cng: Cng): Promise<boolean> {
		try {
			if (!cng) {
				throw new Error(`Cannot Update. Cng not valid`);
			}

			const cngUpdate = this.formatSharepoint(cng);
			await this._SPService.updateItem(this.listName, cngUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating cng data -> ${e}`);
		}
	}

	public async deleteItem(cng: Cng): Promise<boolean> {
		try {
			if (!cng) {
				throw new Error(`Cannot Update. Cng not valid`);
			}
			const cngDelete = this.formatSharepoint(cng);
			await this._SPService.deleteItem(this.listName, cngDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting cng data -> ${e}`);
		}
	}
}
