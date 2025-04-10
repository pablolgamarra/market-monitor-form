import ProductFamily from '@models/ProductFamily';

export default interface Supplier {
	Id: number;
	Name: string;
	ProductFamilyProvided: ProductFamily[];
}
