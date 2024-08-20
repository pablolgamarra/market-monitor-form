import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	Proveedor,
	ProveedoresResponse,
	ProveedoresResponseValue,
} from '../types';
import { getFamiliasProductoById } from './familiasProducto';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllProveedores = async (
	context: WebPartContext,
): Promise<Proveedor[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Proveedores')/items?$select=Id, Title, Familia_x0020_de_x0020_ProductoId`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return [];
			}
			return data.json();
		})
		.then(async (data: ProveedoresResponse) => {
			const proveedores: Proveedor[] = await Promise.all(
				data.value.map(async (item: ProveedoresResponseValue) => {
					const familiaProducto = await getFamiliasProductoById(
						context,
						item.Familia_x0020_de_x0020_ProductoId,
					);
					return {
						Id: item.Id,
						Nombre: item.Title,
						FamiliadeProducto: familiaProducto,
					};
				}),
			);

			return proveedores;
		})
		.catch((e) => {
			console.error(`Error fetching Proveedores ${e}`);
			return [];
		});
};

export const getProveedorById = async (
	context: WebPartContext,
	Id: number,
): Promise<Proveedor | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Proveedores')/items?$filter=Id eq '${Id}'&$select=Id,Title, Familia_x0020_de_x0020_ProductoId`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then(async (data: ProveedoresResponse) => {
			const proveedor: Proveedor | undefined = await Promise.all(
				data.value.map(async (item: ProveedoresResponseValue) => {
					const familiaProducto = getFamiliasProductoById(
						context,
						Id,
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						FamiliadeProducto: familiaProducto,
					};
				}),
			).then((value) => {
				return value.find((item) => item.Id === Id) as
					| Proveedor
					| undefined;
			});

			return proveedor;
		})
		.catch((e) => {
			console.error(`Error fetching Proveedor por Id ${e}`);
			return undefined;
		});
};
