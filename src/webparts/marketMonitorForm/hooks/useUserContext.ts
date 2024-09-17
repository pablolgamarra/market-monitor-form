import { useContext } from 'react';

//Types
import { SPUser } from '@microsoft/sp-page-context';

//Context
import { UserContext } from '@/context/user';

export const useUserContext = (): SPUser => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error('useUserContext must be used within the UserProvider');
	}

	return context;
};
