import { IMarketMonitorFormContext, MarketMonitorFormContext } from '@context/marketMonitorFormContext';
import { useContext } from 'react';

export const useMarketMonitorForm = (): IMarketMonitorFormContext => {
	const context = useContext(MarketMonitorFormContext);
	if (!context) throw new Error('useMarketMonitorForm should be used inside an MarketMonitorFormProvider');
	return context;
};
