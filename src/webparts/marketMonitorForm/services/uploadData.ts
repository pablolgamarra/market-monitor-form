//Types
import { Cliente, CNG, FamiliaProducto, Proveedor, Unidad } from '@/types';
import { WebPartContext } from '@microsoft/sp-webpart-base';

//Services
import { getAllUnidades } from '@/services/unidades';
import { createCngs, getAllCNG } from '@/services/cngs';
import {
	createFamiliasProducto,
	getFamiliasProductoByNombre,
} from '@/services/familiasProducto';
import { getPeriodoCultivoByNombre } from '@/services/periodosCultivo';
import { createClientsBatch } from '@/services/clientes';
import { createProveedores } from '@/services/proveedores';

//Import JSON Formatted Data
import clientes from '@/data/clientes.json';
import cngs from '@/data/cngs.json';
import agroquimicos from '@/data/agroquimicos.json';
import proveedores from '@/data/proveedores.json';

interface ClientesImport {
	'Codigo SAP Cliente': string;
	'Nombre Cliente': string;
	Año: string;
	Sucursal: string;
	'Codigo SAP CNG': string;
}

interface CngsImport {
	'Codigo SAP Vendedor': string;
	'Nombre Vendedor': string;
	Correo: string;
}

interface FamiliasProductoImport {
	Nombre: string;
	'Unidad de Medida': string;
	'Periodo de Cultivo': string;
	Activo: string;
}

interface ProveedoresImport {
	Nombre: string;
	'Familia de Producto': string;
}

const formatData = async (
	listName: string,
	data:
		| ClientesImport[]
		| CngsImport[]
		| FamiliasProductoImport[]
		| ProveedoresImport[],
	context: WebPartContext,
): Promise<Cliente[] | CNG[] | FamiliaProducto[] | Proveedor[]> => {
	switch (listName) {
		case 'Clientes': {
			const parsedData = data as ClientesImport[];
			try {
				const unidades: Unidad[] | undefined = await getAllUnidades(
					context,
				);
				const cngs: CNG[] | undefined = await getAllCNG(context);

				const clientesFormatted: Cliente[] = await Promise.all(
					parsedData.map(
						async (value: ClientesImport): Promise<Cliente> => {
							const unidad = unidades.find(
								(item: Unidad) =>
									item.Nombre === value.Sucursal,
							);
							const cng = cngs.find(
								(item: CNG) =>
									item.CodigoSAP === value['Codigo SAP CNG'],
							);

							if (unidad === undefined) {
								throw Error(
									`Unidad no encontrada para el cliente con Codigo SAP: ${value['Codigo SAP Cliente']}`,
								);
							}

							return {
								Id: undefined,
								Nombre: value['Nombre Cliente'],
								CodigoSAP: parseInt(
									value['Codigo SAP Cliente'],
								),
								Unidad: unidad,
								CNG: cng,
								Anho: value['Año'],
							};
						},
					),
				);

				return clientesFormatted;
			} catch (e) {
				console.log(`${e}`);
				return [] as Cliente[];
			}
		}
		case 'CNG': {
			const parsedData = data as CngsImport[];
			const cngsFormatted: CNG[] = await Promise.all(
				parsedData.map(async (value: CngsImport): Promise<CNG> => {
					return {
						Id: undefined,
						Nombre: value['Nombre Vendedor'],
						CodigoSAP: value['Codigo SAP Vendedor'],
						Correo: value.Correo,
					};
				}),
			);

			return cngsFormatted;
		}
		case 'Proveedores': {
			const parsedData = data as ProveedoresImport[];
			const proveedoresFormatted: Proveedor[] = await Promise.all(
				parsedData.map(
					async (value: ProveedoresImport): Promise<Proveedor> => {
						const familiaProducto =
							await getFamiliasProductoByNombre(
								context,
								value['Familia de Producto'],
							);

						return {
							Id: undefined,
							Nombre: value.Nombre,
							FamiliadeProducto: familiaProducto,
						};
					},
				),
			);
			return proveedoresFormatted;
		}
		case 'Familias Productos': {
			const parsedData = data as FamiliasProductoImport[];
			const familiasProductoFormatted: FamiliaProducto[] =
				await Promise.all(
					parsedData.map(
						async (
							value: FamiliasProductoImport,
						): Promise<FamiliaProducto> => {
							const periodo = await getPeriodoCultivoByNombre(
								context,
								value['Periodo de Cultivo'],
							);

							return {
								Id: undefined,
								Nombre: value.Nombre,
								PeriodoCultivo: periodo,
								UnidadMedida: value['Unidad de Medida'],
								Estado: value.Activo,
							};
						},
					),
				);
			return familiasProductoFormatted;
		}
		default: {
			throw Error('Data not supported yet');
		}
	}
};

export const uploadData = async (
	listName: string,
	context: WebPartContext,
): Promise<void> => {
	let formattedData: Cliente[] | Proveedor[] | CNG[] | FamiliaProducto[];
	switch (listName) {
		case 'Clientes': {
			formattedData = (await formatData(
				listName,
				clientes,
				context,
			)) as Cliente[];

			const chunk1 = formattedData.slice(0, formattedData.length / 2);
			const chunk2 = formattedData.slice(
				formattedData.length / 2,
				formattedData.length,
			);
			try {
				const result1 = await createClientsBatch(context, chunk1);
				const result2 = await createClientsBatch(context, chunk2);

				console.log(
					'Batch de Clientes generados correctamente.\n Cantidad-> ' +
						formattedData.length,
				);

				console.log(`BATCH ID Clientes 1: ${result1.batchId}`);

				console.log(`BATCH ID Clientes 2: ${result2.batchId}`);

				console.log(`BATCH Clientes 1: ${result1.batchBody}`);

				console.log(`BATCH Clientes 2: ${result2.batchBody}`);
			} catch (e) {
				console.log(`${e}`);
			}
			break;
		}
		case 'CNG': {
			formattedData = (await formatData(
				listName,
				cngs,
				context,
			)) as CNG[];
			try {
				const result = await createCngs(context, formattedData);
				if (result === false) {
					throw Error('Error al insertar CNGs a DB');
				}
				console.log(
					'CNGs insertados correctamente.\n Cantidad-> ' +
						formattedData.length,
				);
			} catch (e) {
				console.log(`${e}`);
			}
			break;
		}
		case 'Proveedores': {
			formattedData = (await formatData(
				listName,
				proveedores,
				context,
			)) as Proveedor[];
			try {
				const result = await createProveedores(context, formattedData);
				if (result === false) {
					throw Error('Error al insertar proveedores a DB');
				}
				console.log(
					'Proveedores insertados correctamente.\n Cantidad-> ' +
						formattedData.length,
				);
			} catch (e) {
				console.log(`${e}`);
			}
			break;
		}
		case 'Familias Productos': {
			formattedData = (await formatData(
				listName,
				agroquimicos,
				context,
			)) as FamiliaProducto[];
			try {
				const result = await createFamiliasProducto(
					context,
					formattedData,
				);
				if (result === false) {
					throw Error('Error al insertar familias de productos a DB');
				}
				console.log(
					'Familias de Producto insertadas correctamente.\n Cantidad-> ' +
						formattedData.length,
				);
			} catch (e) {
				console.log(`${e}`);
			}
			break;
		}
		default: {
			throw Error('List insert not supported yet');
		}
	}
};
