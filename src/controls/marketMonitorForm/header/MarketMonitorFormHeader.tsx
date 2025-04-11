import * as React from 'react';

import { DropdownField } from '@controls/DropdownField';
import { InfoLabel, OptionOnSelectData, Skeleton, useId } from '@fluentui/react-components';
import useBusinessBranchList from '@hooks/useBusinessBranchList';
import useClientList from '@hooks/useClientList';
import { useDataContext } from '@hooks/useDataContext';
import { useMarketMonitorFormContext } from '@hooks/useMarketMonitorFormContext';
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
	const { formData, updateField } = useMarketMonitorFormContext();
	const { items: clients, isLoading: clientsLoading } = useClientList(clientService);
	const { items: branches, isLoading: branchesLoading } = useBusinessBranchList(businessBranchService);
	const businessBranchFieldDisable = false;
	const clientFieldDisable = false;

	const filteredClients = clients.filter((client) => client.BusinessBranch.Id === formData.businessBranch?.Id);

	const handleBusinessBranchDpdown = (name: string, data: OptionOnSelectData): void => {
		const selectedBranch = branches.find((branch) => branch.Id.toString() === data.optionValue);
		updateField(name as keyof MarketMonitorFormState, selectedBranch);
	};

	console.log('MonitorFormHeader', { formData, branches, clients, filteredClients });

	return (
		<div className='tw-mb-4'>
			<InfoLabel
				info={
					<>
						El periodo de Cultivo actual es: {formData.agroPeriod?.Name} <br />
					</>
				}
			>
				Periodo de Cultivo Seleccionado: {formData.agroPeriod?.Name}
			</InfoLabel>
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
					className='tw-w-full tw-p-2 tw-border tw-rounded mt-2'
					placeholder={strings?.businessBranchFieldPlaceholder || 'Select Business Branch Data'}
					disabled={businessBranchFieldDisable}
					value={formData?.businessBranch?.Name || ''}
					onSelect={handleBusinessBranchDpdown}
					options={branches.map((item) => ({
						value: item.Id.toString(),
						label: item.Name,
					}))}
				/>
			)}
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
					className='tw-w-full tw-p-2 tw-border tw-rounded mt-2'
					placeholder={strings?.clientFieldPlaceholder || 'Select Client'}
					disabled={clientFieldDisable}
					value={formData?.client?.Id?.toString() || ''}
					onSelect={handleBusinessBranchDpdown}
					options={filteredClients.map((item) => ({
						value: item.Id.toString(),
						label: item.Name,
					}))}
				/>
			)}
		</div>
	);
};

export default MonitorFormHeader;
