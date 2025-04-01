import { Cng } from '@models/Cng';

export interface ICngService {
	getAll(): Promise<Cng[]>;
	getById(id: number): Promise<Cng>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ cngsPage: Cng[]; count: number }>;
	create(cng: Cng): Promise<boolean>;
	update(cng: Cng): Promise<boolean>;
	delete(cng: Cng): Promise<boolean>;
}
