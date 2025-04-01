import { Client } from '@models/Client';

export interface IClientService {
	getAll(): Promise<Client[]>;
	getById(id: number): Promise<Client>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ clientsPage: Client[]; count: number }>;
	create(client: Client): Promise<boolean>;
	update(client: Client): Promise<boolean>;
	delete(client: Client): Promise<boolean>;
}
