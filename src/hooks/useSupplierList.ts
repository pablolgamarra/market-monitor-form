import { useEffect, useMemo, useState } from 'react';

import Supplier from '@models/Supplier';
import ISupplierService from '@services/business/interfaces/ISupplierService';

export default function useSupplierList(service: ISupplierService): {
	items: Supplier[];
	isLoading: boolean;
	error: string | undefined;
} {
	const [suppliers, setSuppliers] = useState<Supplier[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchSuppliers = async (): Promise<void> => {
			try {
				setLoading(true);
				const data = await service.getAll();
				setSuppliers(data);
			} catch (err) {
				setError(`Error fetching Suppliers  ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchSuppliers();
	}, [service]);

	return { items: suppliers, isLoading: loading, error: error };
}

export const useSuppliersForFamily = (service: ISupplierService, familyId: number): Supplier[] => {
	const { items: suppliers } = useSupplierList(service);
	return useMemo(
		() => suppliers.filter((s) => s.ProductFamilyProvided.map((pFamily) => pFamily.Id === familyId)),
		[suppliers, familyId],
	);
};
