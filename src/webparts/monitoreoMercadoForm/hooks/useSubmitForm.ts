import { useState } from 'react';
import { InformacionMercado } from '@/types';
import { saveInformacionesMercado } from '@/services/informacionMercado';
import { useWpContext } from './useWpContext';

export const useSubmitForm = (): [Function, string] => {
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
