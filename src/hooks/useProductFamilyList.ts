import { useEffect, useMemo, useState } from 'react';

import ProductFamily from '@models/ProductFamily';
import IProductFamilyService from '@services/business/interfaces/IProductFamilyService';

export default function useProductFamilyList(service: IProductFamilyService): {
	items: ProductFamily[];
	isLoading: boolean;
	error: string | undefined;
} {
	const [productfamilys, setProductFamilys] = useState<ProductFamily[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchProductFamilys = async (): Promise<void> => {
			try {
				setLoading(true);
				const data = await service.getAll();
				setProductFamilys(data);
			} catch (err) {
				setError(`Error fetching Product Families  ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchProductFamilys();
	}, [service]);

	return { items: productfamilys, isLoading: loading, error: error };
}

export const useActiveFamiliesForPeriod = (service: IProductFamilyService, agroPeriodId: number): ProductFamily[] => {
	const { items: families } = useProductFamilyList(service);
	return useMemo(
		() => families.filter((f) => f.Status && f.AgroPeriod.map((aPeriod) => aPeriod.Id === agroPeriodId)),
		[families, agroPeriodId],
	);
};
