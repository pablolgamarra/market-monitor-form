import Client from '@models/Client';

export default interface IClientService {
	configure(listName: string): void;
	getAll(): Promise<Client[]>;
	getById(id: number): Promise<Client>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ clientsPage: Client[]; count: number }>;
	createItem(client: Client): Promise<boolean>;
	updateItem(client: Client): Promise<boolean>;
	deleteItem(client: Client): Promise<boolean>;
}
