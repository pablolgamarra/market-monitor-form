import { useEffect, useState } from 'react';

import { Cng } from '@models/Cng';
import { ICngService } from '@services/business/interfaces/ICngService';

export default function useCngList(service: ICngService): {
	items: Cng[];
	isLoading: boolean;
	error: string | undefined;
} {
	const [cngs, setCngs] = useState<Cng[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchCngs = async (): Promise<void> => {
			try {
				setLoading(true);
				const data = await service.getAll();
				setCngs(data);
			} catch (err) {
				setError(`Error fetching Cngs  ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchCngs();
	}, [service]);

	return { items: cngs, isLoading: loading, error: error };
}
