import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import { UploadState } from '@common/UploadState';
import { MarketMonitorFormProvider } from '@context/marketMonitorFormContext';
import MonitorFormHeader from '@controls/marketMonitorForm/header/MarketMonitorFormHeader';
import MonitorFormPeriodSelector from '@controls/marketMonitorForm/periodSelector/MarketMonitorFormPeriodSelector';
import MonitorFormProducts from '@controls/marketMonitorForm/products/MarketMonitorFormProducts';
import {
	Spinner,
	Toast,
	Toaster,
	ToastIntent,
	ToastTitle,
	useId,
	useToastController,
} from '@fluentui/react-components';
import { useMarketMonitorFormContext } from '@hooks/useMarketMonitorFormContext';
import MonitorFormInfoCheck from './infoCheck/MarketMonitorFormInfoCheck';

const MarketMonitorFormInner: React.FC = () => {
	const [step, setStep] = useState<number>(1);
	const [productPage, setProductPage] = useState<number>(0);
	const { uploadState, handleFormSave } = useMarketMonitorFormContext();

	const nextStep = (): void => setStep((prev) => prev + 1);
	const prevStep = (): void => setStep((prev) => prev - 1);

	const nextProduct = (): void => setProductPage((productPage) => productPage + 1);
	const prevProduct = (): void => setProductPage((productPage) => productPage - 1);

	if (step === 5) {
		handleFormSave();
	}

	const toastId = useId('marketMonitorFormToast');
	const { dispatchToast } = useToastController(toastId);

	useEffect(() => {
		let intent: ToastIntent = 'info';
		let toast: React.ReactNode;

		switch (uploadState) {
			case UploadState.Uploaded:
				intent = 'success';
				toast = (
					<Toast>
						<ToastTitle>Market Information Uploaded</ToastTitle>
					</Toast>
				);
				break;
			case UploadState.Uploading:
				intent = 'info';
				toast = (
					<Toast>
						<ToastTitle media={<Spinner size='tiny' />}>Subiendo Datos</ToastTitle>
					</Toast>
				);
				break;
			case UploadState.Failed:
				intent = 'error';
				toast = (
					<Toast>
						<ToastTitle>Error al subir datos</ToastTitle>
					</Toast>
				);
				break;
		}

		dispatchToast(toast, { intent: intent });
	}, [uploadState]);

	return (
		<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md'>
			{step === 1 && <MonitorFormPeriodSelector nextStep={nextStep} />}
			{step === 2 && <MonitorFormHeader nextStep={nextStep} />}

			{step === 3 && (
				<MonitorFormProducts
					productPage={productPage}
					nextProduct={nextProduct}
					prevProduct={prevProduct}
					nextStep={nextStep}
					prevStep={prevStep}
				/>
			)}
			{step === 4 && (
				<MonitorFormInfoCheck
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			)}
			<Toaster
				id={toastId}
				position='top-start'
			/>
		</div>
	);
};

const MarketMonitorForm: FC = () => {
	return (
		<MarketMonitorFormProvider>
			<MarketMonitorFormInner />
		</MarketMonitorFormProvider>
	);
};

export default MarketMonitorForm;
