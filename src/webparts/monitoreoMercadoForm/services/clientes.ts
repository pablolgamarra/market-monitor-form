import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Cliente, ClientesResponse, ClientesResponseValue } from '../types';
import { getUnidadById } from './unidades';
import { getCNGById } from './cngs';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllClientes = async (
	context: WebPartContext,
): Promise<Cliente[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Clientes')/items?$select=Id, Title, Codigo_x0020_SAP, UnidadId, Codigo_x0020_SAP_x0020_CNGId,A_x00f1_o`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (!data.ok) return [];
			return data.json();
		})
		.then(async (data: ClientesResponse) => {
			const clientes: Cliente[] = await Promise.all(
				data.value.map(async (item: ClientesResponseValue) => {
					const unidad = await getUnidadById(context, item.UnidadId);
					const cng = await getCNGById(
						context,
						item.Codigo_x0020_SAP_x0020_CNGId,
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: cng,
						Anho: item.A_x00f1_o
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
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Clientes')/items?$filter = Id eq '${Id}'&$select=Id, Title, Codigo_x0020_SAP, UnidadId, Codigo_x0020_SAP_x0020_CNGId, A_x00f1_o`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (!data.ok) return;
			return data.json();
		})
		.then(async (data: ClientesResponse) => {
			const cliente: Cliente | undefined = await Promise.all(
				data.value.map(async (item: ClientesResponseValue) => {
					const unidad = await getUnidadById(context, item.UnidadId);
					const cng = await getCNGById(
						context,
						item.Codigo_x0020_SAP_x0020_CNGId,
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: cng,
						Anho: item.A_x00f1_o
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
