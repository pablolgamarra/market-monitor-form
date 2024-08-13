import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from 'sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	FamiliaProducto,
	FamiliaProductosResponse,
	FamiliaProductosResponseValue,
} from '../types';
import { getPeriodoCultivoById } from './periodosCultivo';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json; odata=nometadata' },
};

export const getAllFamiliasProducto = async (
	context: WebPartContext,
): Promise<FamiliaProducto[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Familias Productos')/items?$select=Id, Title, UnidaddeMedida, PeriododeCultivoId, Activo`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return [];
			}
			return data.json();
		})
		.then(async (data: FamiliaProductosResponse) => {
			const familiasProducto: FamiliaProducto[] = await Promise.all(
				data.value.map(async (item: FamiliaProductosResponseValue) => {
					const periodoCultivo = await getPeriodoCultivoById(
						context,
						item.PeriododeCultivoId,
					);

					return {
						Id: item.Id,
						Nombre: item.Title,
						Estado: item.Activo,
						UnidadMedida: item.UnidaddeMedida,
						PeriodoCultivo: periodoCultivo,
					};
				}),
			);

			return familiasProducto;
		})
		.catch((e) => {
			console.error(`Error fetching familias producto ${e}`);
			return [];
		});
};

export const getFamiliasProductoById = async (
	context: WebPartContext,
	Id: number,
): Promise<FamiliaProducto | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Familias Productos')/items?$filter=Id eq '${Id}'&$select=Id, Title, UnidaddeMedida, PeriododeCultivoId, Activo`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then(async (data: FamiliaProductosResponse) => {
			const familiaProducto: FamiliaProducto | undefined =
				await Promise.all(
					data.value.map(
						async (item: FamiliaProductosResponseValue) => {
							const periodoCultivo = getPeriodoCultivoById(
								context,
								item.Id,
							);

							return {
								Id: item.Id,
								Nombre: item.Title,
								Estado: item.Activo,
								UnidadMedida: item.UnidaddeMedida,
								PeriodoCultivo: periodoCultivo,
							};
						},
					),
				).then((value) => {
					return value.find((item) => item.Id === Id) as
						| FamiliaProducto
						| undefined;
				});

			return familiaProducto;
		})
		.catch((e) => {
			console.error(`Error fetching Familia Producto por Id ${e}`);
			return undefined;
		});
};
