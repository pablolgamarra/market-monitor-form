import { useEffect, useState } from 'react';

import BusinessBranch from '@models/BusinessBranch';
import IBusinessBranchService from '@services/business/interfaces/IBusinessBranchService';

export default function useBusinessBranchList(service: IBusinessBranchService): {
	items: BusinessBranch[];
	isLoading: boolean;
	error: string | undefined;
} {
	const [businessBranchs, setBusinessBranchs] = useState<BusinessBranch[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchBusinessBranchs = async (): Promise<void> => {
			try {
				setLoading(true);
				const data = await service.getAll();
				setBusinessBranchs(data);
			} catch (err) {
				setError(`Error fetching Business Branches ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchBusinessBranchs();
	}, [service]);

	return { items: businessBranchs, isLoading: loading, error: error };
}
