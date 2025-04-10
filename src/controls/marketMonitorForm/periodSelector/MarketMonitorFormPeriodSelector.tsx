import * as React from 'react';

import { ButtonField } from '@controls/ButtonField';
import { Title2, useId } from '@fluentui/react-components';
import { useMarketMonitorFormState } from '@hooks/forms/useMarketMonitorFormState';
import useAgroPeriodList from '@hooks/useAgroPeriodList';
import { useDataContext } from '@hooks/useDataContext';
import AgroPeriod from '@models/AgroPeriod';
import MarketMonitorFormState from '@models/MarketMonitorFormState';

interface PageProps {
	nextStep: () => void;
}

const MonitorFormPeriodSelector: React.FC<PageProps> = ({ nextStep }: PageProps) => {
	const id = useId('period-selector-');

	const { updateField } = useMarketMonitorFormState();
	const { agroPeriodService } = useDataContext();
	const { items: agroPeriods } = useAgroPeriodList(agroPeriodService);

	const handleAgroPeriodSelected = (name: string, ev: React.MouseEvent<HTMLButtonElement>): void => {
		const agroPeriod = agroPeriods.find((period) => period.Name === ev.currentTarget.value);
		updateField(name as keyof MarketMonitorFormState, agroPeriod);
	};

	return (
		<div>
			<Title2 className='text-lg font-bold'>Seleccionar Período de Cultivo</Title2>
			{agroPeriods.map((agroPeriod: AgroPeriod) => (
				<ButtonField
					id={id}
					key={`${agroPeriod}-selector`}
					name={'agroPeriod'}
					text={agroPeriod.Name}
					type='button'
					appearance='primary'
					disabled={false}
					handleClick={handleAgroPeriodSelected}
				/>
			))}

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
