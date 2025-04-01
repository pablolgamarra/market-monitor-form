//Types
import {
	Cliente,
	ClientesResponse,
	ClientesResponseValue,
	CNG,
	Unidad,
} from '@/types';
import { WebPartContext } from '@microsoft/sp-webpart-base';

//SPHTTP
import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';

//Services
import { getAllUnidades } from '@/services/unidades';
import { getAllCNG } from '@/services/cngs';
import generateBatchString from '@/services/generateBatchString';

const GET_OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllClientes = async (
	context: WebPartContext,
): Promise<Cliente[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Clientes')/items?$select=Id, Title, Codigo_x0020_SAP, UnidadId, Codigo_x0020_SAP_x0020_CNGId,A_x00f1_o&$top=5000`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, GET_OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (!data.ok) return [];
			return data.json();
		})
		.then(async (data: ClientesResponse) => {
			const unidades = await getAllUnidades(context);
			const cngs = await getAllCNG(context);

			const clientes: Cliente[] = await Promise.all(
				data.value.map(async (item: ClientesResponseValue) => {
					const unidad = unidades.find(
						(unidad: Unidad) => unidad.Id === item.UnidadId,
					);

					const cng = cngs.find(
						(cng: CNG) =>
							Number(cng.Id) ===
							item.Codigo_x0020_SAP_x0020_CNGId,
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: cng,
						Anho: item.A_x00f1_o,
					};
				}),
			);
			return clientes;
		})
		.catch((e) => {
			console.error(`Error fetching clientes -> ${e}`);
			return [];
		});
};

export const getClienteById = async (
	context: WebPartContext,
	Id: number,
): Promise<Cliente | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Clientes')/items?$filter = Id eq '${Id}'&$select=Id, Title, Codigo_x0020_SAP, UnidadId, Codigo_x0020_SAP_x0020_CNGId, A_x00f1_o&$top=5000`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, GET_OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (!data.ok) return;
			return data.json();
		})
		.then(async (data: ClientesResponse) => {
			const unidades = await getAllUnidades(context);
			const cngs = await getAllCNG(context);

			const cliente: Cliente | undefined = await Promise.all(
				data.value.map(async (item: ClientesResponseValue) => {
					const unidad = unidades.find(
						(unidad: Unidad) => unidad.Id === item.UnidadId,
					);

					const cng = cngs.find(
						(cng: CNG) =>
							Number(cng.Id) ===
							item.Codigo_x0020_SAP_x0020_CNGId,
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: cng,
						Anho: item.A_x00f1_o,
					};
				}),
			).then((value) => {
				return value.find((item) => item.Id === Id) as
					| Cliente
					| undefined;
			});

			return cliente;
		})
		.catch((e) => {
			console.error(`Error fetching clientes -> ${e}`);
			return undefined;
		});
};

export const createClient = async (
	context: WebPartContext,
	cliente: Cliente,
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Clientes')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		[cliente],
		'Clientes',
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
				`Send Clients Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};

export const createClients = async (
	context: WebPartContext,
	clientes: Cliente[],
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Clientes')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		clientes,
		'Clientes',
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
				`Send Clients Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};

export const createClientsBatch = async (
	context: WebPartContext,
	clientes: Cliente[],
): Promise<{ batchId: string; batchBody: string }> => {
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Clientes')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		clientes,
		'Clientes',
	);

	return { batchId: batchID, batchBody: batchBody };
};
