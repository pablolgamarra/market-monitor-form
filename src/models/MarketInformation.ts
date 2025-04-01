import { AgroPeriod } from '@models/AgroPeriod';
import { BusinessBranch } from '@models/BusinessBranch';
import { Client } from '@models/Client';
import { Cng } from '@models/Cng';
import { ProductFamily } from '@models/ProductFamily';
import { Supplier } from '@models/Supplier';

export interface MarketInformation {
	Client: Client;
	BusinessBranch: BusinessBranch;
	AgroPeriod: AgroPeriod;
	ProductFamily: ProductFamily;
	MainSupplier: Supplier;
	Cng: Cng;
	BuyedVolume: string;
}
