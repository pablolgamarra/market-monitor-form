import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { Client } from '@models/Client';
import { IClientService } from '@services/business/interfaces/IClientService';
import { ISPService } from '@services/core/spService/ISPService';

export class ClientService implements IClientService {
	public static readonly serviceKey: ServiceKey<IClientService> = ServiceKey.create(
		'MarketMonitor.ClientService',
		ClientService,
	);

	private _SPService!: ISPService;

	constructor(serviceScope: ServiceScope) {
		try {
			const queryResults = await this._SPService.getAllItems('Clientes');

			const clients = this.parseToInterventionType(queryResults);

			return clients;
		} catch (e) {
			throw Error(`Error retrieving intervention types data -> ${e}`);
		}
	}

	getAll(): Promise<Client[]> {
		throw new Error('Method not implemented.');
	}
	getById(id: number): Promise<Client> {
		throw new Error('Method not implemented.');
	}
	getPaged(pageSize: number, requestedPage: number): Promise<{ clientsPage: Client[]; count: number }> {
		throw new Error('Method not implemented.');
	}
	create(client: Client): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	update(client: Client): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	delete(client: Client): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
