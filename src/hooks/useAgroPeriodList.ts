import { useEffect, useMemo, useState } from 'react';

import { Status } from '@common/Status';
import AgroPeriod from '@models/AgroPeriod';
import IAgroPeriodService from '@services/business/interfaces/IAgroPeriodService';

export default function useAgroPeriodList(service: IAgroPeriodService): {
	items: AgroPeriod[];
	isLoading: boolean;
	error: string | undefined;
} {
	const [agroPeriods, setAgroPeriods] = useState<AgroPeriod[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchAgroPeriods = async (): Promise<void> => {
			try {
				setLoading(true);
				const data = await service.getAll();
				setAgroPeriods(data);
			} catch (err) {
				setError(`Error fetching Agro Periods ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchAgroPeriods();
	}, [service]);

	return { items: agroPeriods, isLoading: loading, error: error };
}

export const useActiveAgroPeriodsList = (service: IAgroPeriodService): { items: AgroPeriod[] } => {
	const { items: periods } = useAgroPeriodList(service);
	return { items: useMemo(() => periods.filter((p) => p.Status === Status.Active), [periods]) };
};
