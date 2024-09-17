import { useContext } from 'react';

//Types
import { WebPartContext } from '@microsoft/sp-webpart-base';

//Context
import { WpContext } from '@/context/webPart';

export const useWpContext = (): WebPartContext => {
	const context = useContext(WpContext);

	if (context === undefined) {
		throw Error('useWpContext must be used within the WpProvider');
	}

	return context;
};
