import ProductFamily from '@models/ProductFamily';

export default interface IProductFamilyService {
	configure(listName: string): void;
	getAll(): Promise<ProductFamily[]>;
	getById(id: number): Promise<ProductFamily>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ productFamiliesPage: ProductFamily[]; count: number }>;
	createItem(productFamily: ProductFamily): Promise<boolean>;
	updateItem(productFamily: ProductFamily): Promise<boolean>;
	deleteItem(productFamily: ProductFamily): Promise<boolean>;
}
