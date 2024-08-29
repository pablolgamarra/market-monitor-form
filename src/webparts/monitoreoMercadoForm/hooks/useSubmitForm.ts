import { useState } from 'react';
import { InformacionMercado } from '@/types';
import { saveInformacionesMercado } from '@/services/informacionMercado';
import { useWpContext } from './useWpContext';

export const useSubmitForm = (): [Function, string] => {
	const context = useWpContext();
	const [status, setStatus] = useState<string>('idle');

	const saveData = async (data: InformacionMercado[]): Promise<void> => {
		setStatus('saving');
		try {
			console.log(data);
			await saveInformacionesMercado(context, data)
			setStatus('saved')
		} catch (e) {
			console.error(`Error ${e}`);
			setStatus('error');
		}
	};

	return [saveData, status];
};
