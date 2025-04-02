import { MarketInformation } from '@models/MarketInformation';

export interface IMarketInformationService {
	getAll(): Promise<MarketInformation[]>;
	getById(id: number): Promise<MarketInformation>;
	getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ marketInformationsPage: MarketInformation[]; count: number }>;
	createItem(marketInformation: MarketInformation): Promise<boolean>;
	updateItem(marketInformation: MarketInformation): Promise<boolean>;
	deleteItem(marketInformation: MarketInformation): Promise<boolean>;
}
