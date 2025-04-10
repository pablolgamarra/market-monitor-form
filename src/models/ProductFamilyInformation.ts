import ProductFamily from '@models/ProductFamily';
import Supplier from '@models/Supplier';

export default interface ProductFamilyInformation {
	productFamily: ProductFamily | undefined;
	mainSupplier: Supplier | undefined;
	buyedVolume: string | undefined;
}
