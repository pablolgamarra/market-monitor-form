import * as React from 'react';

import { AgroPeriod } from '@models/AgroPeriod';
import { BusinessBranch } from '@models/BusinessBranch';
import { Client } from '@models/Client';
import { Cng } from '@models/Cng';
import { ProductFamily } from '@models/ProductFamily';
import { Supplier } from '@models/Supplier';
import { createContext, ReactNode, useState } from 'react';

export interface MarketMonitorFormProductsInformation {
	productFamily: ProductFamily;
	buyedVolume: string;
	mainSupplier: Supplier;
}

interface MarketMonitorFormData {
	id: string;
	cng: Cng;
	client: Client;
	businessBranch: BusinessBranch;
	agroPeriod: AgroPeriod;
	productsInformation: MarketMonitorFormProductsInformation[];
}

export interface IMarketMonitorFormContext {
	marketMonitorFormData: MarketMonitorFormData;
	updateMarketMonitorFormData: (newData: Partial<MarketMonitorFormData>) => void;
}

export const MarketMonitorFormContext = createContext<IMarketMonitorFormContext | undefined>(undefined);

export const MarketMonitorFormProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const [marketMonitorFormData, setMarketMonitorFormData] = useState<MarketMonitorFormData>({
		id: '',
		cng: {} as Cng,
		client: {} as Client,
		businessBranch: {} as BusinessBranch,
		agroPeriod: {} as AgroPeriod,
		productsInformation: [] as MarketMonitorFormProductsInformation[],
	});

	const updateMarketMonitorFormData = (newData: Partial<MarketMonitorFormData>): void => {
		setMarketMonitorFormData((prev) => ({ ...prev, ...newData }));
	};

	return (
		<MarketMonitorFormContext.Provider value={{ marketMonitorFormData, updateMarketMonitorFormData }}>
			{children}
		</MarketMonitorFormContext.Provider>
	);
};
