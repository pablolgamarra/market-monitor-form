import Supplier from '@models/Supplier';

export default interface ISupplierService {
	configure(listName: string): void;
	getAll(): Promise<Supplier[]>;
	getById(id: number): Promise<Supplier>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ suppliersPage: Supplier[]; count: number }>;
	createItem(supplier: Supplier): Promise<boolean>;
	updateItem(supplier: Supplier): Promise<boolean>;
	deleteItem(supplier: Supplier): Promise<boolean>;
}
