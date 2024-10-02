//Types
import { CNG, CNGResponse, CNGResponseValue, Unidad } from '@/types';
import { WebPartContext } from '@microsoft/sp-webpart-base';

//SPHTTP
import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';

//Services
import generateBatchString from '@/services/generateBatchString';
import { getAllUnidades } from './unidades';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllCNG = async (context: WebPartContext): Promise<CNG[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('CNG')/items?$select=Id, Title, Correo, NombreCNG, Cargo, UnidadId`;
	const listaUnidades = await getAllUnidades(context);

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
				Cargo: item.Cargo,
				Unidad: listaUnidades.find(
					(unidad: Unidad) => unidad.Id === item.UnidadId,
				),
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
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('CNG')/items?$filter=Correo eq ${Correo}&$select=Id, Title, Correo, NombreCNG, Cargo, UnidadId`;
	const listaUnidades = await getAllUnidades(context);

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
					Cargo: item.Cargo,
					Unidad: listaUnidades.find(
						(unidad: Unidad) => unidad.Id === item.UnidadId,
					),
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
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('CNG')/items?$filter=Title eq '${CodSAP}'&$select=Id, Title, Correo, NombreCNG, Cargo, UnidadId`;
	const listaUnidades = await getAllUnidades(context);

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
					Cargo: item.Cargo,
					Unidad: listaUnidades.find(
						(unidad: Unidad) => unidad.Id === item.UnidadId,
					),
				}))
				.find((item: CNG) => item.CodigoSAP === CodSAP);
			return CNG;
		})
		.catch((e) => {
			console.error(`Error fetching CNG por Codigo SAP ${e}`);
			return undefined;
		});
};

export const getCNGById = async (
	context: WebPartContext,
	Id: number,
): Promise<CNG | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('CNG')/items?$filter=Id eq '${Id}'&$select=Id, Title, Correo, NombreCNG, Cargo, UnidadId`;
	const listaUnidades = await getAllUnidades(context);

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
					Cargo: item.Cargo,
					Unidad: listaUnidades.find(
						(unidad: Unidad) => unidad.Id === item.UnidadId,
					),
				}))
				.find((item: CNG) => item.Id === Id);

			return CNG;
		})
		.catch((e) => {
			console.error(`Error fetching CNG por Codigo SAP ${e}`);
			return undefined;
		});
};

export const createCng = async (
	context: WebPartContext,
	cng: CNG,
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('CNG')/items`;

	const { batchID, batchBody } = generateBatchString(batchUrl, [cng], 'CNG');

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
				`Send CNG Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};

export const createCngs = async (
	context: WebPartContext,
	cngs: CNG[],
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('CNG')/items`;

	const { batchID, batchBody } = generateBatchString(batchUrl, cngs, 'CNG');

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
				`Send CNGs Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};
