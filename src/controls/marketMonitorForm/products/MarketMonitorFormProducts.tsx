import { DropdownField } from '@controls/DropdownField';
import { RadioGroupField } from '@controls/RadioGroupField';
import { OptionOnSelectData, RadioGroupOnChangeData, Title2, useId } from '@fluentui/react-components';
import { useMarketMonitorFormState } from '@hooks/forms/useMarketMonitorFormState';
import { useDataContext } from '@hooks/useDataContext';
import useProductFamilyList from '@hooks/useProductFamilyList';
import useSupplierList from '@hooks/useSupplierList';
import ProductFamily from '@models/ProductFamily';
import Supplier from '@models/Supplier';
import React from 'react';

interface PageProps {
	productPage: number;
	nextProduct: () => void;
	prevProduct: () => void;
	nextStep: () => void;
	prevStep: () => void;
}

const MonitorFormProducts: React.FC<PageProps> = ({
	productPage,
	nextProduct,
	prevProduct,
	nextStep,
	prevStep,
}: PageProps) => {
	const id = useId('productFamily-');

	const { formData } = useMarketMonitorFormState();
	const { productFamilyService, supplierService } = useDataContext();
	const { items: productFamiliesList } = useProductFamilyList(productFamilyService);
	const { items: suppliersList } = useSupplierList(supplierService);
	const productFamily: ProductFamily = productFamiliesList.find((productFamily) => productFamily.Id === productPage);
	const pageInformation = formData.productFamilyInformation[productPage];

	const volumes = [
		{ value: '0%', label: '0%' },
		{ value: '10%', label: '10%' },
		{ value: '20%', label: '20%' },
		{ value: '30%', label: '30%' },
		{ value: '40%', label: '40%' },
		{ value: '50%', label: '50%' },
		{ value: '60%', label: '60%' },
		{ value: '70%', label: '70%' },
		{ value: '80%', label: '80%' },
		{ value: '90%', label: '90%' },
		{ value: '100%', label: '100%' },
		{ value: 'N/S%', label: 'No Sabe' },
	];

	const handleBuyedVolumeSelect = (name: string, data: RadioGroupOnChangeData): void => {
		const updated = { ...pageInformation, buyedVolume: data.value };
		updateProductInfo(productPage, updated);
	};

	const handleMainSupplierSelect = (name: string, data: OptionOnSelectData): void => {
		const updated = {
			...pageInformation,
			mainSupplier: suppliersList.find((supplier) => supplier.Id.toString() === data.optionValue),
		};
		updateProductInfo(productPage, updated);
	};

	return (
		<div>
			<Title2
				id={`${id}`}
				key={`${id}${productPage}-title`}
			>
				{productFamily.Name}
			</Title2>
			<RadioGroupField
				id={`${id}${productPage}-buyed-volume`}
				name='buyedVolume'
				label={`Volumen de ${productFamily.Name} Ya Comprado`}
				value={pageInformation.buyedVolume || ''}
				onChange={handleBuyedVolumeSelect}
				options={volumes.map((volume) => ({
					value: volume.value,
					label: volume.label,
				}))}
				disabled={false}
				required
			/>
			<DropdownField
				id={`${id}${productPage}-supplier`}
				name='mainSupplier'
				placeholder='Seleccione un Proveedor'
				label={`Proveedor Principal de ${productFamily.Name}`}
				value={pageInformation.mainSupplier?.Id.toString() || ''}
				onSelect={handleMainSupplierSelect}
				options={suppliersList.map((supplier: Supplier) => ({
					value: supplier.Id.toString(),
					label: supplier.Name,
				}))}
				disabled={false}
				required
			/>
			{/* formData.informacionCompras.map((producto, index) => (
				<div
					key={index}
					className='mb-4'
				>
					<input
						type='text'
						placeholder='Familia Producto'
						value={producto.familiaProducto}
						onChange={(e) => {
							const updated = [...formData.informacionCompras];
							updated[index].familiaProducto = e.target.value;
							updateFormData({ informacionCompras: updated });
						}}
						className='w-full p-2 border rounded'
					/>
				</div>
			))
			
            <button
				onClick={addProduct}
				className='px-4 py-2 bg-green-500 text-white rounded'
			>
				Agregar Producto
			</button> */}
			<button
				onClick={prevStep}
				className='mr-2 px-4 py-2 bg-gray-400 text-white rounded'
			>
				Atrás
			</button>
			<button
				onClick={nextStep}
				className='px-4 py-2 bg-blue-500 text-white rounded'
			>
				Siguiente
			</button>
		</div>
	);
};

export default MonitorFormProducts;
