import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { CNG, CNGResponse, CNGResponseValue } from '../types';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllCNG = async (context: WebPartContext): Promise<CNG[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('CNG')/items?$select=Id, Title, Correo, NombreCNG`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return [];
			}
			return data.json();
		})
		.then((data: CNGResponse) => {
			const CNG: CNG[] = data.value.map((item: CNGResponseValue) => ({
				Id: item.Id,
				Nombre: item.NombreCNG,
				CodigoSAP: item.Title,
				Correo: item.Correo,
			}));

			return CNG;
		})
		.catch((e) => {
			console.error(`Error fetching CNG ${e}`);
			return [];
		});
};

export const getCNGByCorreo = async (
	context: WebPartContext,
	Correo: string,
): Promise<CNG | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('CNG')/items?$filter=Correo eq ${Correo}&$select=Id, Title, Correo, NombreCNG`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then((data: CNGResponse) => {
			const CNG: CNG | undefined = data.value
				.map((item: CNGResponseValue) => ({
					Id: item.Id,
					Nombre: item.NombreCNG,
					CodigoSAP: item.Title,
					Correo: item.Correo,
				}))
				.find((item: CNG) => item.Correo === Correo);

			return CNG;
		})
		.catch((e) => {
			console.error(`Error fetching CNG por Correo ${e}`);
			return undefined;
		});
};

export const getCNGByCodSAP = async (
	context: WebPartContext,
	CodSAP: string,
): Promise<CNG | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('CNG')/items?$filter=Title eq '${CodSAP}'&$select=Id, Title, Correo, NombreCNG`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then((data: CNGResponse) => {
			const CNG: CNG | undefined = data.value
				.map((item: CNGResponseValue) => ({
					Id: item.Id,
					Nombre: item.NombreCNG,
					CodigoSAP: item.Title,
					Correo: item.Correo,
				}))
				.find((item: CNG) => item.CodigoSAP === CodSAP);

			return CNG;
		})
		.catch((e) => {
			console.error(`Error fetching CNG por Codigo SAP ${e}`);
			return undefined;
		});
};
