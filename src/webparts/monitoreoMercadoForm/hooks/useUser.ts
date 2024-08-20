import {useContext} from 'react'
import { UserContext } from "@/context/user";

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error(
			'useUserContext must be used within the UserProvider',
		);
	}
	
	return context;
};