import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	PeriodoCultivo,
	PeriodosCultivoResponse,
	PeriodosCultivoResponseValue,
} from '@/types';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllPeriodosCultivo = async (
	context: WebPartContext,
): Promise<PeriodoCultivo[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Periodos Cultivo')/items?$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return [];
			}
			return data.json();
		})
		.then((data: PeriodosCultivoResponse) => {
			const periodosCultivo: PeriodoCultivo[] = data.value.map(
				(item: PeriodosCultivoResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}),
			);

			return periodosCultivo;
		})
		.catch((e) => {
			console.error(`Error fetching periodos cultivo ${e}`);
			return [];
		});
};

export const getPeriodoCultivoById = async (
	context: WebPartContext,
	Id: number,
): Promise<PeriodoCultivo | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Periodos Cultivo')/items?$filter=Id eq '${Id}'&$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then((data: PeriodosCultivoResponse) => {
			const PeriodoCultivo: PeriodoCultivo | undefined = data.value
				.map((item: PeriodosCultivoResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}))
				.find((item: PeriodoCultivo) => item.Id === Id);

			return PeriodoCultivo;
		})
		.catch((e) => {
			console.error(`Error fetching Periodos Cultivo por Id ${e}`);
			return undefined;
		});
};

export const getPeriodoCultivoByNombre = async (
	context: WebPartContext,
	Nombre: string,
): Promise<PeriodoCultivo | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Periodos Cultivo')/items?$filter=Title eq '${Nombre}'&$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then((data: PeriodosCultivoResponse) => {
			const PeriodoCultivo: PeriodoCultivo | undefined = data.value
				.map((item: PeriodosCultivoResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}))
				.find((item: PeriodoCultivo) => item.Nombre === Nombre);

			return PeriodoCultivo;
		})
		.catch((e) => {
			console.error(`Error fetching Periodos Cultivo por Id ${e}`);
			return undefined;
		});
};
