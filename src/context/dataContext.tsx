import { IAgroPeriodService } from '@services/business/interfaces/IAgroPeriodService';
import { IBusinessBranchService } from '@services/business/interfaces/IBusinessBranchService';
import { IClientService } from '@services/business/interfaces/IClientService';
import { ICngService } from '@services/business/interfaces/ICngService';
import { IMarketInformationService } from '@services/business/interfaces/IMarketInformationService';
import { IProductFamilyService } from '@services/business/interfaces/IProductFamilyService';
import { ISupplierService } from '@services/business/interfaces/ISupplierService';
import * as React from 'react';

//Types

interface DataProviderProps {
	agroPeriodService: IAgroPeriodService;
	businessBranchService: IBusinessBranchService;
	clientService: IClientService;
	cngService: ICngService;
	marketInformationService: IMarketInformationService;
	productFamilyService: IProductFamilyService;
	supplierService: ISupplierService;
}

export const DataContext = React.createContext<DataProviderProps>({} as DataProviderProps);

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({
	children,
	agroPeriodService,
	businessBranchService,
	clientService,
	cngService,
	marketInformationService,
	productFamilyService,
	supplierService,
}: React.PropsWithChildren<DataProviderProps>) => {
	return (
		<DataContext.Provider
			value={{
				agroPeriodService: agroPeriodService,
				businessBranchService: businessBranchService,
				clientService: clientService,
				cngService: cngService,
				marketInformationService: marketInformationService,
				productFamilyService: productFamilyService,
				supplierService: supplierService,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

DataContext.displayName = 'DataContext';
DataProvider.displayName = 'DataProvider';
