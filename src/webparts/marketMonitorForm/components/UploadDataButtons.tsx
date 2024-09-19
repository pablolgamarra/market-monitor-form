import * as React from 'react';

//Types
import {
	Cliente,
	CNG,
	FamiliaProducto,
	PeriodoCultivo,
	Proveedor,
	Unidad,
} from '@/types';

//Components
import { Button, useId } from '@fluentui/react-components';

//Services
import { uploadData } from '@/services/uploadData';

//Hooks
import { useWpContext } from '@/hooks/useWpContext';
import { useDataContext } from '@/hooks/useDataContext';

//Strings
import * as strings from 'UploadButtonsStrings';

export interface UploadDataButtonsProps {
	listaClientes: Cliente[];
	listaUnidades: Unidad[];
	listaFamiliasProducto: FamiliaProducto[];
	listaProveedores: Proveedor[];
	listaPeriodosCultivo: PeriodoCultivo[];
	listaCNG: CNG[];
}

const UploadDataButtons: React.FC<UploadDataButtonsProps> = (props) => {
	const { listaClientes, listaFamiliasProducto, listaProveedores, listaCNG } =
		useDataContext();

	const context = useWpContext();

	const id = useId('upload-data-buttons');

	return (
		<>
			<Button
				id={`cng-${id}`}
				onClick={() => uploadData('CNG', context)}
				disabled={listaCNG.length > 0}
			>
				{strings.UploadButtons.CNG}
			</Button>
			<Button
				id={`familias-productos-${id}`}
				onClick={() => uploadData('Familias Productos', context)}
				disabled={listaFamiliasProducto.length > 0}
			>
				{strings.UploadButtons.FamiliasProducto}
			</Button>
			<Button
				id={`proveedores-${id}`}
				onClick={() => uploadData('Proveedores', context)}
				disabled={listaProveedores.length > 0}
			>
				{strings.UploadButtons.Proveedores}
			</Button>
			<Button
				id={`clientes-${id}`}
				onClick={() => uploadData('Clientes', context)}
				disabled={listaClientes.length > 0}
			>
				{strings.UploadButtons.Clientes}
			</Button>
		</>
	);
};

export default UploadDataButtons;
