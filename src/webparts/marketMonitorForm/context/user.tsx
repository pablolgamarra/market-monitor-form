import * as React from 'react';
import { SPUser } from '@microsoft/sp-page-context';

interface UserProviderProps {
	user:SPUser
}

export const UserContext = React.createContext<SPUser>({} as SPUser);

export const UserProvider: React.FunctionComponent<UserProviderProps> = ({
	children,user
}: React.PropsWithChildren<UserProviderProps>) => {
	return (
        <UserContext.Provider value={user}>
			{children}
        </UserContext.Provider>
	);
};



UserContext.displayName = 'UserContext';
UserProvider.displayName = 'UserProvider';