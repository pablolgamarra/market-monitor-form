import { useState } from 'react';

import { UploadState } from '@common/UploadState';
import { useMarketInformationService } from '@hooks/useMarketInformationService';
import MarketMonitorFormState from '@models/MarketMonitorFormState';
import ProductFamilyInformation from '@models/ProductFamilyInformation';

const initialFormData: MarketMonitorFormState = {
	id: undefined,
	client: undefined,
	businessBranch: undefined,
	agroPeriod: undefined,
	cng: undefined,
	productFamilyInformation: [] as ProductFamilyInformation[],
};

export const useMarketMonitorForm = (): {
	formData: MarketMonitorFormState;
	uploadState: UploadState;
	setFormData: React.Dispatch<React.SetStateAction<MarketMonitorFormState>>;
	updateField: (key: keyof MarketMonitorFormState, value: any) => void;
	updateProductInfo: (index: number, value: Partial<ProductFamilyInformation>) => void;
	handleFormSave: () => Promise<void>;
} => {
	const [formData, setFormData] = useState<MarketMonitorFormState>(initialFormData);
	const [uploadState, setUploadState] = useState<UploadState>(UploadState.Idle);

	const { saveMarketMonitorFormState } = useMarketInformationService();

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

	const handleFormSave = async (): Promise<void> => {
		setUploadState(UploadState.Uploading);
		try {
			const success = await saveMarketMonitorFormState(formData);
			if (success) {
				setUploadState(UploadState.Uploaded);
			}
		} catch (e) {
			console.log(e);
			setUploadState(UploadState.Failed);
		}
	};

	return { formData, uploadState, setFormData, updateField, updateProductInfo, handleFormSave };
};
