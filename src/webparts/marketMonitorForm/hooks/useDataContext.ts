import { useContext } from 'react';

//Types
import {
	Cliente,
	CNG,
	FamiliaProducto,
	PeriodoCultivo,
	Proveedor,
	Unidad,
} from '@/types';

//Context
import { DataContext } from '@/context/data';

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
