import { ProductFamily } from '@models/ProductFamily';

export interface IProductFamilyService {
	getAll(): Promise<ProductFamily[]>;
	getById(id: number): Promise<ProductFamily>;
	getPaged(pageSize: number, requestedPage: number): Promise<{ productFamilysPage: ProductFamily[]; count: number }>;
	create(productFamily: ProductFamily): Promise<boolean>;
	update(productFamily: ProductFamily): Promise<boolean>;
	delete(productFamily: ProductFamily): Promise<boolean>;
}
