import { Supplier } from '@models/Supplier';

export interface ISupplierService {
	getAll(): Promise<Supplier[]>;
	getById(id: number): Promise<Supplier>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ suppliersPage: Supplier[]; count: number }>;
	create(supplier: Supplier): Promise<boolean>;
	update(supplier: Supplier): Promise<boolean>;
	delete(supplier: Supplier): Promise<boolean>;
}
