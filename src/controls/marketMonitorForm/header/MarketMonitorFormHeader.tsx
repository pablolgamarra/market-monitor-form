import * as React from 'react';

import { DropdownField } from '@controls/DropdownField';
import { OptionOnSelectData, Skeleton, useId } from '@fluentui/react-components';
import { useMarketMonitorForm } from '@hooks/forms/useMarketMonitorForm';
import useBusinessBranchList from '@hooks/useBusinessBranchList';
import useClientList from '@hooks/useClientList';
import { useDataContext } from '@hooks/useDataContext';

export interface MarketMonitorFormHeaderProps {
	businessBranchFieldPlaceholder: string;
	clientFieldPlaceholder: string;
}

const MonitorFormHeader: React.FC<MarketMonitorFormHeaderProps> = (props) => {
	const id = useId('marketMonitorFormHeader');
	const { clientService, businessBranchService } = useDataContext();
	const { marketMonitorFormData, updateMarketMonitorFormData } = useMarketMonitorForm();
	const { items: clients, isLoading: clientsLoading } = useClientList(clientService);
	const { items: branches, isLoading: branchesLoading } = useBusinessBranchList(businessBranchService);
	const businessBranchFieldDisable = false;

	const handleBusinessBranchDpdown = (name: string, data: OptionOnSelectData): void => {
		updateMarketMonitorFormData({
			...marketMonitorFormData,
			[name]: { ...marketMonitorFormData.businessBranch, Id: Number(data.optionValue) },
		});
	};

	return (
		<div className='mb-4'>
			<h2 className='text-lg font-bold'>Datos del Cliente</h2>
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
					label={'Cliente'}
					name={'client'}
					className='w-full p-2 border rounded mt-2'
					placeholder={props.clientFieldPlaceholder}
					disabled={businessBranchFieldDisable}
					value={marketMonitorFormData.client.Id.toString()}
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
					label={'Unidad'}
					name={'businessBranch'}
					className='w-full p-2 border rounded mt-2'
					placeholder={props.businessBranchFieldPlaceholder}
					disabled={businessBranchFieldDisable}
					value={marketMonitorFormData.businessBranch.Id.toString()}
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
