import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	Unidad,
	UnidadesResponse,
	UnidadesResponseValue,
} from 'src/webparts/marketMonitorForm/types';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllUnidades = async (
	context: WebPartContext,
): Promise<Unidad[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Unidades')/items?$select=Id,Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status === 200) {
				return data.json();
			}
			return [];
		})
		.then((data: UnidadesResponse) => {
			const unidades: Unidad[] = data.value.map(
				(item: UnidadesResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}),
			);

			return unidades;
		})
		.catch((e) => {
			console.error(`Error fetching unidades ${e}`);
			return [];
		});
};

export const getUnidadById = async (
	context: WebPartContext,
	Id: number,
): Promise<Unidad | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Unidades')/items?$filter=Id eq '${Id}'&$select=Id,Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then((data: UnidadesResponse) => {
			const unidad: Unidad | undefined = data.value
				.map((item: UnidadesResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}))
				.find((item: Unidad) => item.Id === Id);

			return unidad;
		})
		.catch((e) => {
			console.error(`Error fetching unidad por Id ${e}`);
			return undefined;
		});
};

export const getUnidadByNombre = async (
	context: WebPartContext,
	Nombre: string,
): Promise<Unidad | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Unidades')/items?$filter=Title eq '${Nombre}'&$select=Id,Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then((data: UnidadesResponse) => {
			const unidad: Unidad | undefined = data.value
				.map((item: UnidadesResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}))
				.find((item: Unidad) => item.Nombre === Nombre);

			return unidad;
		})
		.catch((e) => {
			console.error(`Error fetching unidad por Nombre ${e}`);
			return undefined;
		});
};
