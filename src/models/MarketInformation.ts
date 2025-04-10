import AgroPeriod from '@models/AgroPeriod';
import Client from '@models/Client';
import Cng from '@models/Cng';
import ProductFamily from '@models/ProductFamily';
import Supplier from '@models/Supplier';

export default interface MarketInformation {
	Id: number;
	Client: Client;
	AgroPeriod: AgroPeriod;
	ProductFamily: ProductFamily;
	MainSupplier: Supplier;
	Cng: Cng;
	BuyedVolume: string;
}
