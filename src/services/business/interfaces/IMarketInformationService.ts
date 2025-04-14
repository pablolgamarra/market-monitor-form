import MarketInformation from '@models/MarketInformation';
import MarketMonitorFormState from '@models/MarketMonitorFormState';

export default interface IMarketInformationService {
	configure(listName: string): void;
	getAll(): Promise<MarketInformation[]>;
	getById(id: number): Promise<MarketInformation>;
	getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ marketInformationsPage: MarketInformation[]; count: number }>;
	createItem(marketInformation: MarketInformation): Promise<boolean>;
	updateItem(marketInformation: MarketInformation): Promise<boolean>;
	deleteItem(marketInformation: MarketInformation): Promise<boolean>;
    uploadItemFromState(state: MarketMonitorFormState):Promise<boolean>;
}
