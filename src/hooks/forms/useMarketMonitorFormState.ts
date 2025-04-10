import MarketMonitorFormState from '@models/MarketMonitorFormState';
import ProductFamilyInformation from '@models/ProductFamilyInformation';
import { useState } from 'react';

const initialFormData: MarketMonitorFormState = {
	id: undefined,
	client: undefined,
	businessBranch: undefined,
	agroPeriod: undefined,
	cng: undefined,
	productFamilyInformation: [],
};

export const useMarketMonitorFormState = (): {
	formData: MarketMonitorFormState;
	setFormData: React.Dispatch<React.SetStateAction<MarketMonitorFormState>>;
	updateField: (key: keyof MarketMonitorFormState, value: any) => void;
	updateProductInfo: (index: number, value: Partial<ProductFamilyInformation>) => void;
} => {
	const [formData, setFormData] = useState<MarketMonitorFormState>(initialFormData);

	const updateField = (key: keyof typeof formData, value: any): void => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const updateProductInfo = (index: number, value: Partial<ProductFamilyInformation>): void => {
		setFormData((prev) => {
			const updated = [...prev.productFamilyInformation];
			updated[index] = { ...updated[index], ...value };
			return { ...prev, productFamilyInformation: updated };
		});
	};

	return { formData, setFormData, updateField, updateProductInfo };
};
