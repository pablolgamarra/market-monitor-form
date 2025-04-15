import { UploadState } from '@common/UploadState';
import { MarketMonitorFormContext } from '@context/marketMonitorFormContext';
import MarketMonitorFormState from '@models/MarketMonitorFormState';
import ProductFamilyInformation from '@models/ProductFamilyInformation';
import { useContext } from 'react';

export const useMarketMonitorFormContext = (): {
	formData: MarketMonitorFormState;
	uploadState: UploadState;
	setFormData: (data: MarketMonitorFormState) => void;
	updateField: (key: keyof MarketMonitorFormState, value: any) => void;
	updateProductInfo: (index: number, value: Partial<ProductFamilyInformation>) => void;
	handleFormSave: () => Promise<void>;
} => {
	const context = useContext(MarketMonitorFormContext);

	if (!context) {
		throw new Error('useMarketMonitorFormContext must be used within a MarketMonitorFormProvider');
	}

	return context;
};
