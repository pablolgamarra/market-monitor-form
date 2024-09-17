import { useState } from 'react';

//Types
import { InformacionMercado } from '@/types';

//Context
import { saveInformacionesMercado } from '@/services/informacionMercado';

//Services
import { useWpContext } from './useWpContext';

export const useSubmitForm = (): [
	(data: InformacionMercado[]) => void,
	string,
] => {
	const context = useWpContext();
	const [status, setStatus] = useState<string>('idle');

	const saveData = async (data: InformacionMercado[]): Promise<void> => {
		setStatus('saving');
		saveInformacionesMercado(context, data)
			.then((response) => {
				setStatus('saved');
			})
			.catch((e) => setStatus('error'));
	};

	return [saveData, status];
};
