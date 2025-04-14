import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import BusinessBranch from '@models/BusinessBranch';
import Client from '@models/Client';
import Cng from '@models/Cng';
import { ClientResponse } from '@models/spServiceResponse/ClientResponse';
import { BusinessBranchService } from '@services/business/BusinessBranchService';
import { CngService } from '@services/business/CngService';
import IBusinessBranchService from '@services/business/interfaces/IBusinessBranchService';
import IClientService from '@services/business/interfaces/IClientService';
import ICngService from '@services/business/interfaces/ICngService';
import { ISPService } from '@services/core/spService/ISPService';
import { SPService } from '@services/core/spService/SPService';

export class ClientService implements IClientService {
	public static readonly serviceKey: ServiceKey<IClientService> = ServiceKey.create(
		'MarketMonitor.ClientService',
		ClientService,
	);

	private _SPService!: ISPService;
	private _businessBranchService!: IBusinessBranchService;
	private _cngService!: ICngService;

	private listName: string = '';

	constructor(serviceScope: ServiceScope) {
		try {
			serviceScope.whenFinished(() => {
				this._SPService = serviceScope.consume(SPService.servicekey);
				this._businessBranchService = serviceScope.consume(BusinessBranchService.serviceKey);
				this._cngService = serviceScope.consume(CngService.serviceKey);
			});
		} catch (e) {
			throw new Error(`Error initializing ClientService -> ${e}`);
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

	private mapToClient(item: ClientResponse, cng: Cng, businessBranch: BusinessBranch): Client {
		return {
			Id: item.Id,
			Name: item.Title,
			AssignedCng: cng,
			BusinessBranch: businessBranch,
			SAPCode: item.Codigo_x0020_SAP,
			Year: item.A_x00f1_o,
		};
	}

	private formatSharepoint(item: Client): ClientResponse {
		return {
			Id: item.Id,
			Title: item.Name,
			Codigo_x0020_SAP_x0020_CNGId: item.AssignedCng.Id,
			UnidadId: item.BusinessBranch.Id,
			Codigo_x0020_SAP: item.SAPCode,
			A_x00f1_o: item.Year,
			ID: item.Id,
		};
	}

	public async getAll(): Promise<Client[]> {
		try {
			const queryResults: ClientResponse[] = await this._SPService.getAllItems(this.listName);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const results: Client[] = queryResults.map((item) => {
				const businessBranch =
					businessBranchList.find((businessBranch) => businessBranch.Id === item.UnidadId) ||
					({} as BusinessBranch);
				const cng = cngList.find((cng) => item.Codigo_x0020_SAP_x0020_CNGId === cng.Id) || ({} as Cng);
				return this.mapToClient(item, cng, businessBranch);
			});

			return results;
		} catch (e) {
			throw new Error(`Error retrieving all clients -> ${e}`);
		}
	}

	public async getAllFiltered(filter: string): Promise<Client[]> {
		try {
			if (!filter) {
				throw Error(`Filter not valid`);
			}
			const queryResults: ClientResponse[] = await this._SPService.getItemsFiltered(this.listName, filter);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const results: Client[] = queryResults.map((item) => {
				const businessBranch =
					businessBranchList.find((businessBranch) => businessBranch.Id === item.UnidadId) ||
					({} as BusinessBranch);
				const cng = cngList.find((cng) => item.Codigo_x0020_SAP_x0020_CNGId === cng.Id) || ({} as Cng);
				return this.mapToClient(item, cng, businessBranch);
			});

			return results;
		} catch (e) {
			throw new Error(`Error retrieving all clients -> ${e}`);
		}
	}

	public async getById(id: number): Promise<Client> {
		try {
			if (!id) {
				throw new Error(`Id not valid`);
			}

			const queryResults: ClientResponse[] = await this._SPService.getItemById(this.listName, id);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const results: Client[] = queryResults.map((item) => {
				const businessBranch =
					businessBranchList.find((businessBranch) => businessBranch.Id === item.UnidadId) ||
					({} as BusinessBranch);
				const cng = cngList.find((cng) => item.Codigo_x0020_SAP_x0020_CNGId === cng.Id) || ({} as Cng);
				return this.mapToClient(item, cng, businessBranch);
			});

			if (!results[0]) {
				throw new Error(`No client found with Id ${id}`);
			}

			return results[0];
		} catch (e) {
			throw new Error(`Error retrieving client with Id ${id} -> ${e}`);
		}
	}
	public async getPaged(pageSize: number, requestedPage: number): Promise<{ clientsPage: Client[]; count: number }> {
		try {
			const { results, totalCount } = await this._SPService.getListItemsPaged(
				this.listName,
				pageSize,
				requestedPage,
			);
			const businessBranchList: BusinessBranch[] = await this._businessBranchService.getAll();
			const cngList: Cng[] = await this._cngService.getAll();

			const clientPage = results.map((item: ClientResponse) => {
				const businessBranch =
					businessBranchList.find((businessBranch) => businessBranch.Id === item.UnidadId) ||
					({} as BusinessBranch);
				const cng = cngList.find((cng) => item.Codigo_x0020_SAP_x0020_CNGId === cng.Id) || ({} as Cng);
				return this.mapToClient(item, cng, businessBranch);
			});

			return { clientsPage: clientPage, count: totalCount };
		} catch (e) {
			throw Error(`Error retrieving client from page ${requestedPage}-> ${e}`);
		}
	}

	public async createItem(client: Client): Promise<boolean> {
		try {
			if (!client) {
				throw new Error(`Cannot Insert. Client not valid`);
			}

			const clientInsert = this.formatSharepoint(client);
			await this._SPService.insertItem(this.listName, clientInsert);

			return true;
		} catch (e) {
			throw Error(`Error inserting client data -> ${e}`);
		}
	}

	public async updateItem(client: Client): Promise<boolean> {
		try {
			if (!client) {
				throw new Error(`Cannot Update. Client not valid`);
			}

			const clientUpdate = this.formatSharepoint(client);
			await this._SPService.updateItem(this.listName, clientUpdate);
			return true;
		} catch (e) {
			throw Error(`Error updating client data -> ${e}`);
		}
	}

	public async deleteItem(client: Client): Promise<boolean> {
		try {
			if (!client) {
				throw new Error(`Cannot Update. Client not valid`);
			}
			const clientDelete = this.formatSharepoint(client);
			await this._SPService.deleteItem(this.listName, clientDelete.Id);
			return true;
		} catch (e) {
			throw Error(`Error deleting client data -> ${e}`);
		}
	}
}
