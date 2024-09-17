import { WpContext } from 'src/webparts/marketMonitorForm/context/webPart';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { useContext } from 'react';

export const useWpContext = (): WebPartContext => {
	const context = useContext(WpContext);

	if (context === undefined) {
		throw Error('useWpContext must be used within the WpProvider');
	}

	return context;
};
