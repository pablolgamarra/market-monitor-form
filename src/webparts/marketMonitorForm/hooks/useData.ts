import { useContext } from 'react';
import { DataContext } from 'src/webparts/marketMonitorForm/context/data';

import {
	Cliente,
	CNG,
	FamiliaProducto,
	PeriodoCultivo,
	Proveedor,
	Unidad,
} from 'src/webparts/marketMonitorForm/types';

export const useDataContext = (): {
	listaClientes: Cliente[];
	listaUnidades: Unidad[];
	listaFamiliasProducto: FamiliaProducto[];
	listaProveedores: Proveedor[];
	listaPeriodosCultivo: PeriodoCultivo[];
	listaCNG: CNG[];
} => {
	const context = useContext(DataContext);

	if (context === undefined) {
		throw new Error('useDataContext must be used within the DataProvider');
	}

	return context;
};
