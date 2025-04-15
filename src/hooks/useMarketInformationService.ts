import { useDataContext } from '@hooks/useDataContext';
import MarketMonitorFormState from '@models/MarketMonitorFormState';

export const useMarketInformationService = (): {
	saveMarketMonitorFormState(formData: MarketMonitorFormState): Promise<boolean>;
} => {
	const { marketInformationService } = useDataContext();

	const saveMarketMonitorFormState = async (formData: MarketMonitorFormState): Promise<boolean> => {
		try {
			return await marketInformationService.uploadItemFromState(formData);
		} catch (e) {
			throw Error(`Error saving form data -> ${e}`);
		}
	};

	return { saveMarketMonitorFormState };
};
