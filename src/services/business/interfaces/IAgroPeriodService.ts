import { AgroPeriod } from '@models/AgroPeriod';
export interface IAgroPeriodService {
	getAll(): Promise<AgroPeriod[]>;
	getById(id: number): Promise<AgroPeriod>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ agroPeriodsPage: AgroPeriod[]; count: number }>;
	createItem(agroPeriod: AgroPeriod): Promise<boolean>;
	updateItem(agroPeriod: AgroPeriod): Promise<boolean>;
	deleteItem(agroPeriod: AgroPeriod): Promise<boolean>;
}
