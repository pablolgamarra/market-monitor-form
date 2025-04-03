import { useEffect, useState } from 'react';

import { ProductFamily } from '@models/ProductFamily';
import { IProductFamilyService } from '@services/business/interfaces/IProductFamilyService';

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
