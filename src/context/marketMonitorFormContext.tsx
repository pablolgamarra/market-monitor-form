import React, { createContext, ReactNode } from 'react';

import { useMarketMonitorForm } from '@hooks/forms/useMarketMonitorForm';
import MarketMonitorFormState from '@models/MarketMonitorFormState';
import ProductFamilyInformation from '@models/ProductFamilyInformation';

export interface MarketMonitorFormContextProps {
	formData: MarketMonitorFormState;
	setFormData: (data: MarketMonitorFormState) => void;
	updateField: (key: keyof MarketMonitorFormState, value: any) => void;
	updateProductInfo: (index: number, value: Partial<ProductFamilyInformation>) => void;
}

export const MarketMonitorFormContext = createContext<MarketMonitorFormContextProps | undefined>(undefined);

export const MarketMonitorFormProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const { formData, setFormData, updateField, updateProductInfo } = useMarketMonitorForm();

	return (
		<MarketMonitorFormContext.Provider value={{ formData, setFormData, updateField, updateProductInfo }}>
			{children}
		</MarketMonitorFormContext.Provider>
	);
};
