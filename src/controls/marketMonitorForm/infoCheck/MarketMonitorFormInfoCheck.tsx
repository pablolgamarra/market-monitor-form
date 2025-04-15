import React, { FC } from 'react';

import { InputField } from '@controls/InputField';
import { Button, Divider, Title2, Tree, TreeItem, TreeItemLayout, useId } from '@fluentui/react-components';
import { useMarketMonitorFormContext } from '@hooks/useMarketMonitorFormContext';
import ProductFamilyInformation from '@models/ProductFamilyInformation';

interface MarketMonitorFormInfoCheckProps {
	prevStep: () => void;
	nextStep: () => void;
}

const MonitorFormInfoCheck: FC<MarketMonitorFormInfoCheckProps> = (props) => {
	const id = useId('marketMonitorFormInfoCheck');

	const { formData } = useMarketMonitorFormContext();

	return (
		<>
			<Title2>Confirm Form Data</Title2>
			<InputField
				id={`${id}-client`}
				name='client'
				type='text'
				label='Client'
				placeholder='No data'
				value={formData.client?.Name}
			/>
			<InputField
				id={`${id}-business-branch`}
				name='businessBranch'
				type='text'
				label='Business Branch'
				placeholder='No data'
				value={formData.businessBranch?.Name}
			/>
			<InputField
				id={`${id}-agro-period`}
				name='agroPeriod'
				type='text'
				label='Agro Period'
				placeholder='No data'
				value={formData.agroPeriod?.Name}
			/>
			<InputField
				id={`${id}-cng`}
				name='cng'
				type='text'
				label='CNG'
				placeholder='No data'
				value={formData.cng?.Name}
			/>
			<Divider>Products Information</Divider>
			<Tree aria-label='Productos Cargados'>
				{formData.productFamilyInformation.map((info: ProductFamilyInformation) => (
					<TreeItem
						key={info.productFamily?.Name}
						itemType='branch'
					>
						<TreeItemLayout>{info.productFamily?.Name}</TreeItemLayout>
						<Tree aria-label={info.productFamily?.Name}>
							<TreeItem itemType='leaf'>
								<TreeItemLayout>
									<InputField
										id={`${id}-${info.productFamily?.Name}`}
										key={`${id}-${info.productFamily?.Name}`}
										name={`${info.productFamily?.Name}`}
										type='text'
										label={`${info.productFamily?.Name} Buyed Volume`}
										placeholder='No data'
										value={info.buyedVolume}
									/>
								</TreeItemLayout>
							</TreeItem>
							<TreeItem itemType='leaf'>
								<InputField
									id={`${id}-${info.productFamily?.Name}`}
									key={`${id}-${info.productFamily?.Name}`}
									name={`${info.productFamily?.Name}`}
									type='text'
									label={`${info.productFamily?.Name} Main Supplier`}
									placeholder='No data'
									value={info.mainSupplier?.Name}
								/>
							</TreeItem>
							<TreeItem itemType='leaf'>
								<TreeItemLayout />
							</TreeItem>
						</Tree>
					</TreeItem>
				))}
			</Tree>
			<Button onClick={props.prevStep}>Go Back</Button>
			<Button onClick={props.nextStep}>Go Forward</Button>
		</>
	);
};

export default MonitorFormInfoCheck;
