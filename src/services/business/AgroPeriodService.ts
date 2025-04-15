import { Status } from '@common/Status';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import AgroPeriod from '@models/AgroPeriod';
import { AgroPeriodResponse } from '@models/spServiceResponse/AgroPeriodResponse';
import IAgroPeriodService from '@services/business/interfaces/IAgroPeriodService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class AgroPeriodService implements IAgroPeriodService {
	public static readonly serviceKey: ServiceKey<IAgroPeriodService> = ServiceKey.create(
		'MarketMonitor.AgroPeriodService',
		AgroPeriodService,
	);

	private _SPService!: ISPService;

	private listName!: string;

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
			});
		} catch (e) {
			throw new Error(`Error initializing AgroPeriodService -> ${e}`);
		}
	}

	public configure(listName: string): void {
		try {
			if (!listName) {
				console.log(`ListName not valid -> ${listName}`);
				throw new Error(`ListName not valid`);
			}
			this.listName = listName;
		} catch (e) {
			throw new Error(`Error configuring service -> ${e}`);
		}
	}

	private mapToAgroPeriod(item: AgroPeriodResponse): AgroPeriod {
		return {
			Id: item.Id,
			Name: item.Title,
			Status: item.Activo as Status,
		};
	}

	private formatSharepoint(item: AgroPeriod): AgroPeriodResponse {
		return {
			Id: item.Id,
			Title: item.Name,
			Activo: item.Status,
		};
	}

	public async getAll(): Promise<AgroPeriod[]> {
		try {
			const queryResults: AgroPeriodResponse[] = await this._SPService.getAllItems(this.listName);
			const results: AgroPeriod[] = queryResults.map(this.mapToAgroPeriod);
			return results;
		} catch (e) {
			throw new Error(`Error retrieving all agro periods -> ${e}`);
		}
	}

	public async getById(id: number): Promise<AgroPeriod> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: AgroPeriodResponse[] = await this._SPService.getItemById(this.listName, id);
			const results: AgroPeriod[] = queryResults.map(this.mapToAgroPeriod);

			if (!results[0]) {
				throw new Error(`No agro period found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving agro periods with Id ${id} -> ${e}`);
		}
	}
	public async getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ agroPeriodsPage: AgroPeriod[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const agroPeriodPage = results.map(this.mapToAgroPeriod);

			return { agroPeriodsPage: agroPeriodPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving agro periods from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(agroPeriod: AgroPeriod): Promise<boolean> {
		try {
			if (!agroPeriod) {
				throw new Error(`Cannot Insert. Agro Period not valid`);
			}

			const agroPeriodInsert = this.formatSharepoint(agroPeriod);
			await this._SPService.insertItem('Periodo%20Cultivo', agroPeriodInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting agro period data -> ${e}`);
		}
	}

	public async updateItem(agroPeriod: AgroPeriod): Promise<boolean> {
		try {
			if (!agroPeriod) {
				throw new Error(`Cannot Update. Agro Period not valid`);
			}

			const agroPeriodUpdate = this.formatSharepoint(agroPeriod);
			await this._SPService.updateItem(this.listName, agroPeriodUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating agro period data -> ${e}`);
		}
	}

	public async deleteItem(agroPeriod: AgroPeriod): Promise<boolean> {
		try {
			if (!agroPeriod) {
				throw new Error(`Cannot Update. Agro Period not valid`);
			}
			const agroPeriodDelete = this.formatSharepoint(agroPeriod);
			await this._SPService.deleteItem(this.listName, agroPeriodDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting agro period data -> ${e}`);
		}
	}
}
