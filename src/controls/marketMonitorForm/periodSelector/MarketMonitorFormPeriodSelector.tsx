import * as React from 'react';

import { useMarketMonitorForm } from '@hooks/forms/useMarketMonitorForm';
import { AgroPeriod } from '@models/AgroPeriod';

interface PageProps {
	nextStep: () => void;
}

const MonitorFormPeriodSelector = ({ nextStep }: PageProps) => {
	const { marketMonitorFormData, updateMarketMonitorFormData } = useMarketMonitorForm();

	return (
		<div>
			<h2 className='text-lg font-bold'>Seleccionar Período de Cultivo</h2>
			<input
				type='text'
				placeholder='Periodo de Cultivo'
				value={marketMonitorFormData.agroPeriod.Id}
				onChange={(e) =>
					updateMarketMonitorFormData({ agroPeriod: { Id: parseInt(e.target.value) } as Partial<AgroPeriod> })
				}
				className='w-full p-2 border rounded'
			/>
			<button
				onClick={nextStep}
				className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
			>
				Siguiente
			</button>
		</div>
	);
};

export default MonitorFormPeriodSelector;
