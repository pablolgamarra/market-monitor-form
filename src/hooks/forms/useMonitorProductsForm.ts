import * as React from 'react';

export const useMonitorProductsForm = () => {
	const handleMoveBackBtn = React.useCallback(() => {
		if (index - 1 > -1) {
			const indexNuevo = index - 1;
			handleSelectedChanges('familiaProducto', listaProductosFiltro[indexNuevo].Nombre);
			setIndex(indexNuevo);
		}
	}, [index, setIndex]);

	const handleMoveForwardBtn = React.useCallback(() => {
		if (index < largoLista - 1) {
			const indexNuevo = index + 1;

			handleSelectedChanges('familiaProducto', listaProductosFiltro[indexNuevo].Nombre);
			setIndex(indexNuevo);
		} else {
			const validatedValues: ProductValueState[] = productValues.map((item: ProductValueState) => ({
				familiaProducto: item.familiaProducto,
				volumenComprado: item.volumenComprado,
				proveedorPrincipal: item.proveedorPrincipal,
			}));
			saveData(validatedValues);
		}
	}, [setIndex, index, largoLista]);

	const handleRadioSelect = React.useCallback(
		(e: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
			const event: HTMLElement = e.target as HTMLElement;

			const elementName = event.getAttribute('name');

			const name = elementName === null || elementName === undefined ? '' : elementName;
			const value = data.value;

			handleSelectedChanges(name as keyof ProductValueState, value);
		},
		[handleSelectedChanges],
	);

	const handleCbxChanges = React.useCallback(
		(e: SelectionEvents, data: OptionOnSelectData) => {
			const event: HTMLElement = e.target as HTMLElement;

			const elementName = document
				.querySelector(`[aria-controls=${event.parentElement?.getAttribute('id')}]`)
				?.getAttribute('name');

			const name = elementName === null || elementName === undefined ? '' : elementName;
			const value = data.optionValue;

			handleSelectedChanges(name as keyof ProductValueState, value);
		},
		[handleSelectedChanges],
	);
};
