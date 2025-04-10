import * as React from 'react';

import { DropdownField } from '@controls/DropdownField';
import { OptionOnSelectData, Skeleton, useId } from '@fluentui/react-components';
import { useMarketMonitorFormState } from '@hooks/forms/useMarketMonitorFormState';
import useBusinessBranchList from '@hooks/useBusinessBranchList';
import useClientList from '@hooks/useClientList';
import { useDataContext } from '@hooks/useDataContext';
import MarketMonitorFormState from '@models/MarketMonitorFormState';

export interface MarketMonitorFormHeaderProps {
	strings?: {
		businessBranchFieldLabel: string;
		businessBranchFieldPlaceholder: string;
		clientFieldLabel: string;
		clientFieldPlaceholder: string;
	};
}

const MonitorFormHeader: React.FC<MarketMonitorFormHeaderProps> = (props) => {
	const id = useId('marketMonitorFormHeader');
	const strings = props.strings;

	const { clientService, businessBranchService } = useDataContext();
	const { formData, updateField } = useMarketMonitorFormState();
	const { items: clients, isLoading: clientsLoading } = useClientList(clientService);
	const { items: branches, isLoading: branchesLoading } = useBusinessBranchList(businessBranchService);
	const businessBranchFieldDisable = false;
	const clientFieldDisable = false;

	const handleBusinessBranchDpdown = (name: string, data: OptionOnSelectData): void => {
		updateField(name as keyof MarketMonitorFormState, data.optionValue);
	};

	return (
		<div className='mb-4'>
			{clientsLoading ? (
				<>
					<Skeleton
						animation='pulse'
						appearance='opaque'
						className='tw-h-8 tw-w-full tw-mb-2 tw-bg-gray-300'
					/>
					<Skeleton
						animation='pulse'
						appearance='opaque'
						className='tw-h-8 tw-w-full tw-bg-gray-300'
					/>
				</>
			) : (
				<DropdownField
					id={`dpDown-clients-${id}`}
					label={strings?.clientFieldLabel || 'Client Data'}
					name={'client'}
					className='w-full p-2 border rounded mt-2'
					placeholder={strings?.clientFieldPlaceholder || 'Select Client'}
					disabled={clientFieldDisable}
					value={formData?.client?.Id.toString() || ''}
					onSelect={handleBusinessBranchDpdown}
					options={clients.map((item) => ({
						value: item.Id.toString(),
						label: item.Name,
					}))}
				/>
			)}
			{branchesLoading ? (
				<>
					<Skeleton
						animation='pulse'
						appearance='opaque'
						className='tw-h-8 tw-w-full tw-mb-2 tw-bg-gray-300'
					/>
					<Skeleton
						animation='pulse'
						appearance='opaque'
						className='tw-h-8 tw-w-full tw-bg-gray-300'
					/>
				</>
			) : (
				<DropdownField
					id={`dpDown-businessBranches-${id}`}
					label={strings?.businessBranchFieldLabel || 'Business Branch Data'}
					name={'businessBranch'}
					className='w-full p-2 border rounded mt-2'
					placeholder={strings?.businessBranchFieldPlaceholder || 'Select Business Branch Data'}
					disabled={businessBranchFieldDisable}
					value={formData?.businessBranch?.Id.toString() || ''}
					onSelect={handleBusinessBranchDpdown}
					options={branches.map((item) => ({
						value: item.Id.toString(),
						label: item.Name,
					}))}
				/>
			)}
		</div>
	);
};

export default MonitorFormHeader;
