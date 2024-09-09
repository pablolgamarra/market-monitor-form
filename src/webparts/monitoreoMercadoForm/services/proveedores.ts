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
import generateBatchString from './generateBatchString';

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

export const createProveedor = async (
	context: WebPartContext,
	proveedor: Proveedor,
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Proveedores')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		[proveedor],
		'Proveedores',
	);

	const requestOptions: ISPHttpClientOptions = {
		headers: {
			Accept: 'application/json',
			'Content-Type': `multipart/mixed; boundary=batch_${batchID}`,
		},
		body: batchBody,
	};

	try {
		const response = await context.spHttpClient.post(
			url,
			SPHttpClient.configurations.v1,
			requestOptions,
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Send Proveedores Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};

export const createProveedores = async (
	context: WebPartContext,
	proveedores: Proveedor[],
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Proveedores')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		proveedores,
		'Proveedores',
	);

	const requestOptions: ISPHttpClientOptions = {
		headers: {
			Accept: 'application/json',
			'Content-Type': `multipart/mixed; boundary=batch_${batchID}`,
		},
		body: batchBody,
	};

	try {
		const response = await context.spHttpClient.post(
			url,
			SPHttpClient.configurations.v1,
			requestOptions,
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Send Proveedores Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};
