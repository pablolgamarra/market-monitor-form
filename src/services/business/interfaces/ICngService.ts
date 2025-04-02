import { Cng } from '@models/Cng';

export interface ICngService {
	getAll(): Promise<Cng[]>;
	getById(id: number): Promise<Cng>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ cngsPage: Cng[]; count: number }>;
	createItem(cng: Cng): Promise<boolean>;
	updateItem(cng: Cng): Promise<boolean>;
	deleteItem(cng: Cng): Promise<boolean>;
}
