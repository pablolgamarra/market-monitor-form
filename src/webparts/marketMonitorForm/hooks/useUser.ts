import { useContext } from 'react';
import { UserContext } from 'src/webparts/marketMonitorForm/context/user';

import { SPUser } from '@microsoft/sp-page-context';

export const useUserContext = (): SPUser => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error('useUserContext must be used within the UserProvider');
	}

	return context;
};
