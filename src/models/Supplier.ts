import { ProductFamily } from '@models/ProductFamily';

export interface Supplier {
	Id: number;
	Nombre: string;
	ProductFamilyProvided: ProductFamily;
}
