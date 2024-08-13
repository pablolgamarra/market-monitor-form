import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from 'sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Cliente, ClientesResponse, ClientesResponseValue } from '../types';
import { getUnidadById } from './unidades';
import { getCNGByCodSAP } from './cngs';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json; odata=nometadata' },
};

export const getAllClientes = async (
	context: WebPartContext,
): Promise<Cliente[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/GetByTitle('Clientes')/items?$select=Id, Title, Codigo_x0020_SAP, UnidadId, Codigo_x0020_SAP_x0020_CNGId`;

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
					const cng = await getCNGByCodSAP(
						context,
						item.Codigo_x0020_SAP_x0020_CNGId.toString(),
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: cng,
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
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/GetByTitle('Clientes')/items?$filter = Id eq '${Id}'&$select=Id, Title, Codigo_x0020_SAP, UnidadId, Codigo_x0020_SAP_x0020_CNGId`;

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
					const cng = await getCNGByCodSAP(
						context,
						item.Codigo_x0020_SAP_x0020_CNGId.toString(),
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: cng,
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
