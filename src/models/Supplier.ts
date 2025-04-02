import { ProductFamily } from '@models/ProductFamily';

export interface Supplier {
	Id: number;
	Name: string;
	ProductFamilyProvided: ProductFamily[];
}
