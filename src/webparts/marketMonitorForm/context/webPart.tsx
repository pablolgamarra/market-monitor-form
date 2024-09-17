import * as React from 'react';

//Types
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface WpContextProviderProps {
	context: WebPartContext;
}

export const WpContext = React.createContext<WebPartContext>(
	{} as WebPartContext,
);

export const WpProvider: React.FunctionComponent<WpContextProviderProps> = ({
	children,
	context,
}: React.PropsWithChildren<WpContextProviderProps>) => {
	return <WpContext.Provider value={context}>{children}</WpContext.Provider>;
};

WpContext.displayName = 'WpContext';
WpProvider.displayName = 'WpContextProvider';
