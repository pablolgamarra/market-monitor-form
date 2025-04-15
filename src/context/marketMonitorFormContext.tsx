import React, { createContext, ReactNode } from 'react';

import { UploadState } from '@common/UploadState';
import { useMarketMonitorForm } from '@hooks/forms/useMarketMonitorForm';
import MarketMonitorFormState from '@models/MarketMonitorFormState';
import ProductFamilyInformation from '@models/ProductFamilyInformation';

export interface MarketMonitorFormContextProps {
	formData: MarketMonitorFormState;
	uploadState: UploadState;
	setFormData: (data: MarketMonitorFormState) => void;
	updateField: (key: keyof MarketMonitorFormState, value: any) => void;
	updateProductInfo: (index: number, value: Partial<ProductFamilyInformation>) => void;
	handleFormSave: () => Promise<void>;
}

export const MarketMonitorFormContext = createContext<MarketMonitorFormContextProps | undefined>(undefined);

export const MarketMonitorFormProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const { formData, uploadState, setFormData, updateField, updateProductInfo, handleFormSave } =
		useMarketMonitorForm();

	return (
		<MarketMonitorFormContext.Provider
			value={{ formData, uploadState, setFormData, updateField, updateProductInfo, handleFormSave }}
		>
			{children}
		</MarketMonitorFormContext.Provider>
	);
};
