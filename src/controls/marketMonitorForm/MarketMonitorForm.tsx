import * as React from 'react';

import { MarketMonitorFormProvider } from '@context/marketMonitorFormContext';
import MonitorFormHeader from '@controls/marketMonitorForm/header/MarketMonitorFormHeader';
import MonitorFormPeriodSelector from '@controls/marketMonitorForm/periodSelector/MonitorFormPeriodSelector';
import { useState } from 'react';
import MonitorFormProducts from './MonitorFormProducts';

const MonitorForm = () => {
	const [step, setStep] = useState<number>(1);

	const nextStep = () => setStep((prev) => prev + 1);
	const prevStep = () => setStep((prev) => prev - 1);

	return (
		<MarketMonitorFormProvider>
			<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md'>
				<MonitorFormHeader />
				{step === 1 && <MonitorFormPeriodSelector nextStep={nextStep} />}
				{step === 2 && (
					<MonitorFormProducts
						nextStep={nextStep}
						prevStep={prevStep}
					/>
				)}
			</div>
		</MarketMonitorFormProvider>
	);
};

export default MonitorForm;
