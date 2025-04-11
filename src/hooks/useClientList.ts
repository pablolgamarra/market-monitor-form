import { useEffect, useState } from 'react';

import Client from '@models/Client';
import IClientService from '@services/business/interfaces/IClientService';

export default function useClientList(service: IClientService): {
	items: Client[];
	isLoading: boolean;
	error: string | undefined;
} {
	const [clients, setClients] = useState<Client[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchClients = async (): Promise<void> => {
			try {
				console.log('PORRA');
				setLoading(true);
				const data = await service.getAll();
				setClients(data);
			} catch (err) {
				setError(`Error fetching Clients  ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchClients();
	}, [service]);

	return { items: clients, isLoading: loading, error: error };
}
