import * as React from 'react';
import { FC, useState } from 'react';

import { MarketMonitorFormProvider } from '@context/marketMonitorFormContext';
import MonitorFormHeader from '@controls/marketMonitorForm/header/MarketMonitorFormHeader';
import MonitorFormPeriodSelector from '@controls/marketMonitorForm/periodSelector/MarketMonitorFormPeriodSelector';
import MonitorFormProducts from '@controls/marketMonitorForm/products/MarketMonitorFormProducts';

const MarketMonitorForm: FC = () => {
	const [step, setStep] = useState<number>(1);
	const [productPage, setProductPage] = useState<number>(0);

	const nextStep = (): void => setStep((prev) => prev + 1);
	const prevStep = (): void => setStep((prev) => prev - 1);

	const nextProduct = (): void => setProductPage((productPage) => productPage + 1);
	const prevProduct = (): void => setProductPage((productPage) => productPage - 1);

	return (
		<MarketMonitorFormProvider>
			<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md'>
				<MonitorFormHeader />

				{step === 1 && <MonitorFormPeriodSelector nextStep={nextStep} />}

				{step === 2 && (
					<MonitorFormProducts
						productPage={productPage}
						nextProduct={nextProduct}
						prevProduct={prevProduct}
						nextStep={nextStep}
						prevStep={prevStep}
					/>
				)}
			</div>
		</MarketMonitorFormProvider>
	);
};

export default MarketMonitorForm;
