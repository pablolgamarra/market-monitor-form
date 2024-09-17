import {
	SPHttpClient,
	ISPHttpClientOptions,
	SPHttpClientResponse,
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	FamiliaProducto,
	FamiliaProductosResponse,
	FamiliaProductosResponseValue,
	PeriodoCultivo,
} from 'src/webparts/marketMonitorForm/types';
import { getAllPeriodosCultivo } from './periodosCultivo';
import generateBatchString from './generateBatchString';

const OPTIONS: ISPHttpClientOptions = {
	headers: { Accept: 'application/json' },
};

export const getAllFamiliasProducto = async (
	context: WebPartContext,
): Promise<FamiliaProducto[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Familias Productos')/items?$select=Id, Title, UnidaddeMedida, PeriododeCultivoId, Activo`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return [];
			}
			return data.json();
		})
		.then(async (data: FamiliaProductosResponse) => {
			const periodosCultivo = await getAllPeriodosCultivo(context);

			const familiasProducto: FamiliaProducto[] = await Promise.all(
				data.value.map(async (item: FamiliaProductosResponseValue) => {
					const periodoCultivo = periodosCultivo.find(
						(periodo: PeriodoCultivo) =>
							periodo.Id === item.PeriododeCultivoId,
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
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Familias Productos')/items?$filter=Id eq '${Id}'&$select=Id, Title, UnidaddeMedida, PeriododeCultivoId, Activo`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then(async (data: FamiliaProductosResponse) => {
			const periodosCultivo = await getAllPeriodosCultivo(context);

			const familiaProducto: FamiliaProducto | undefined =
				await Promise.all(
					data.value.map(
						async (item: FamiliaProductosResponseValue) => {
							const periodoCultivo = periodosCultivo.find(
								(periodo: PeriodoCultivo) =>
									periodo.Id === item.PeriododeCultivoId,
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

export const getFamiliasProductoByNombre = async (
	context: WebPartContext,
	Nombre: string,
): Promise<FamiliaProducto | undefined> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Familias Productos')/items?$filter=Title eq '${Nombre}'&$select=Id, Title, UnidaddeMedida, PeriododeCultivoId, Activo`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, OPTIONS)
		.then((data: SPHttpClientResponse) => {
			if (data.status !== 200) {
				return;
			}
			return data.json();
		})
		.then(async (data: FamiliaProductosResponse) => {
			const periodosCultivo = await getAllPeriodosCultivo(context);

			const familiaProducto: FamiliaProducto | undefined =
				await Promise.all(
					data.value.map(
						async (item: FamiliaProductosResponseValue) => {
							const periodoCultivo = periodosCultivo.find(
								(periodo: PeriodoCultivo) =>
									periodo.Id === item.PeriododeCultivoId,
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
					return value.find((item) => item.Nombre === Nombre) as
						| FamiliaProducto
						| undefined;
				});

			return familiaProducto;
		})
		.catch((e) => {
			console.error(`Error fetching Familia Producto por Nombre ${e}`);
			return undefined;
		});
};

export const createFamiliaProducto = async (
	context: WebPartContext,
	familiaProducto: FamiliaProducto,
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Familias Productos')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		[familiaProducto],
		'Familias Productos',
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
				`Send Familias Productos Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};

export const createFamiliasProducto = async (
	context: WebPartContext,
	familiasProductos: FamiliaProducto[],
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;
	const batchUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Familias Productos')/items`;

	const { batchID, batchBody } = generateBatchString(
		batchUrl,
		familiasProductos,
		'Familias Productos',
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
				`Send Familias Productos Data Query failed! Status: ${response.status} - ${errorText}`,
			);
		}

		return true;
	} catch (error) {
		console.error(`Error al insertar datos en SP: ${error}`);
		return false;
	}
};
