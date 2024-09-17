import { useState } from 'react';
import { InformacionMercado } from 'src/webparts/marketMonitorForm/types';
import { saveInformacionesMercado } from 'src/webparts/marketMonitorForm/services/informacionMercado';
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
