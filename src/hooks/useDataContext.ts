import { DataContext } from '@context/dataContext';
import IAgroPeriodService from '@services/business/interfaces/IAgroPeriodService';
import IBusinessBranchService from '@services/business/interfaces/IBusinessBranchService';
import IClientService from '@services/business/interfaces/IClientService';
import ICngService from '@services/business/interfaces/ICngService';
import IMarketInformationService from '@services/business/interfaces/IMarketInformationService';
import IProductFamilyService from '@services/business/interfaces/IProductFamilyService';
import ISupplierService from '@services/business/interfaces/ISupplierService';
import { useContext } from 'react';

export const useDataContext = (): {
	agroPeriodService: IAgroPeriodService;
	businessBranchService: IBusinessBranchService;
	clientService: IClientService;
	cngService: ICngService;
	marketInformationService: IMarketInformationService;
	productFamilyService: IProductFamilyService;
	supplierService: ISupplierService;
} => {
	const context = useContext(DataContext);

	if (context === undefined) {
		throw new Error('useDataContext must be used within the DataProvider');
	}

	return context;
};
