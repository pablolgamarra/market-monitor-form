import { useEffect, useMemo, useState } from 'react';

import BusinessBranch from '@models/BusinessBranch';
import Client from '@models/Client';
import Cng from '@models/Cng';
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

export function useClientListFiltered(
	service: IClientService,
	filter: string,
	trigger: any,
): {
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
				setLoading(true);
				console.log(filter);
				const data = await service.getAllFiltered(filter);
				setClients(data);
			} catch (err) {
				setError(`Error fetching Clients  ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchClients();
	}, [trigger]);

	return { items: clients, isLoading: loading, error: error };
}

export const useClientListByCNG = (
	service: IClientService,
	cng: Cng,
	selectedBBranch?: BusinessBranch,
): { filteredClients: Client[]; isLoading: boolean; requireBusinessBranchSelect: boolean } => {
	const { items: clients, isLoading } = useClientList(service);

	const businessbranch = cng.BusinessBranch ?? selectedBBranch;

	const filteredClients = useMemo(() => {
		if (!cng.Role) return [];

		switch (cng.Role) {
			case 'CNG':
			case 'Gerente de Sucursal':
				if (!businessbranch) return [];
				return clients.filter((c) => c.BusinessBranch.Id === businessbranch.Id);
			case 'Gerente':
			case 'Coordinador':
				return selectedBBranch ? clients.filter((c) => c.BusinessBranch.Id === selectedBBranch.Id) : clients;
			default:
				return [];
		}
	}, [clients, cng, selectedBBranch]);

	const requireBusinessBranchSelect =
		(cng.Role === 'CNG' || cng.Role === 'Gerente de Sucursal') && !cng.BusinessBranch;

	return { filteredClients, isLoading, requireBusinessBranchSelect };
};
