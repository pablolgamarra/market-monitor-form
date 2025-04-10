import AgroPeriod from '@models/AgroPeriod';
import BusinessBranch from '@models/BusinessBranch';
import Client from '@models/Client';
import Cng from '@models/Cng';
import ProductFamilyInformation from '@models/ProductFamilyInformation';

export default interface MarketMonitorFormState {
	id: string | undefined;
	cng: Cng | undefined;
	client: Client | undefined;
	businessBranch: BusinessBranch | undefined;
	agroPeriod: AgroPeriod | undefined;
	productFamilyInformation: ProductFamilyInformation[];
}
