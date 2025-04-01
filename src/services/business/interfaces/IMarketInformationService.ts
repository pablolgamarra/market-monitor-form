import { MarketInformation } from '@models/MarketInformation';

export interface IMarketInformationService {
	getAll(): Promise<MarketInformation[]>;
	getById(id: number): Promise<MarketInformation>;
	getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ marketInformationsPage: MarketInformation[]; count: number }>;
	create(marketInformation: MarketInformation): Promise<boolean>;
	update(marketInformation: MarketInformation): Promise<boolean>;
	delete(marketInformation: MarketInformation): Promise<boolean>;
}
