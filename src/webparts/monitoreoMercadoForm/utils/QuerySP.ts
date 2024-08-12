import {
	SPHttpClient,
	SPHttpClientResponse,
	ISPHttpClientOptions,
} from '@microsoft/sp-http';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { IUnidad, ICliente, IFamiliaProducto, InformacionMercado, IProveedor, IPeriodoCultivo } from '../types';

import {
	UnidadesResponse,
	UnidadesResponseValue,
	ClientesResponse,
	ClientesResponseValue,
	FamiliaProductosResponse,
	FamiliaProductosResponseValue,
	ProveedoresResponseValue,
	ProveedoresResponse,
	PeriodosCultivoResponse,
	PeriodosCultivoResponseValue,
	CNGResponse,
	CNGResponseValue,
} from './ResponseTypes';

import { InformacionMercadoValue } from './RequestTypes';
import generateBatchString from './GenerateBatchString';

//TODO:COLOCAR NOMBRE DE LA APLICACION Y DEMAS COMO VARIABLES DINAMICAS

const getUnidades = async (
	context: WebPartContext,
): Promise<IUnidad[]> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const url: string = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Unidades')/items?$select=Id,Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then((data: UnidadesResponse) => {
			const unidades: IUnidad[] = data.value.map(
				(item: UnidadesResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}),
			);
			return unidades;
		})
		.catch((e: Error) => {
			console.log(`Error al listar unidades ${e}`);
			return [];
		});
};

const getUnidad = async (
	urlBase: string,
	context: WebPartContext,
	id: number,
): Promise<IUnidad | undefined> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Unidades')/items/?$select=ID,Title&$filter=ID eq '${id}'`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return;
		})
		.then((data: UnidadesResponse) => {
			const unidad: IUnidad | undefined = data.value
				.map((item: UnidadesResponseValue) => ({
					Id: item.ID,
					Nombre: item.Title,
				}))
				.find((item: IUnidad) => item.Id === id);

			return unidad;
		});
};

const getClientes = async (
	urlBase: string,
	context: WebPartContext,
): Promise<ICliente[]> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Clientes')/items/?$select=Id,Title,RUC_x002f_CI,UnidadId,CoordinadorId`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then(async (data: ClientesResponse) => {
			const clientes: ICliente[] | undefined = await Promise.all(
				data.value.map(async (item: ClientesResponseValue) => {
					const unidad = await getUnidad(
						urlBase,
						context,
						item.UnidadId,
					);
					
					return {
						Id: item.ID,
						Nombre: item.Title,
						CodigoSAP: item.Codigo_x0020_SAP,
						Unidad: unidad,
						CNG: item.Codigo_x0020_SAP_x0020_CNGId,
					};
				}),
			);

			return clientes;
		})
		.catch((e: Error) => {
			console.log(`Error listando clientes: ${e}`);
			return [];
		});
};

const getProveedores = async (
	urlBase: string,
	context: WebPartContext,
): Promise<IProveedor[]> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const url = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Proveedores')/items/?$select=Id,Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then((data: ProveedoresResponse) => {
			const proveedores: IProveedor[] = data.value.map(
				(item: ProveedoresResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}),
			);
			return proveedores;
		})
		.catch((e) => {
			console.log(`Error listando proveedores: ${e}`);
			return [];
		});
};

const getPeriodosCultivo = async (
	urlBase: string,
	context: WebPartContext,
): Promise<IPeriodoCultivo[]> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Periodos Cultivo')/items/?$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then((data: PeriodosCultivoResponse) => {
			const periodosCultivo: IPeriodoCultivo[] = data.value.map(
				(item: PeriodosCultivoResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
				}),
			);
			return periodosCultivo;
		})
		.catch((e) => {
			console.log(`Error listando periodos de cultivo: ${e}`);
			return [];
		});
};

const getPeriodoCultivo = async (
	urlBase: string,
	context: WebPartContext,
	id: number | undefined,
): Promise<IPeriodoCultivo | undefined> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Periodos Cultivo')/items/?$select=ID,Title&$filter=ID eq ${id}`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return undefined;
		})
		.then((data: PeriodosCultivoResponse) => {
			const periodoCultivo: IPeriodoCultivo | undefined = data.value
				.map((item: PeriodosCultivoResponseValue) => ({
					Id: item.ID,
					Nombre: item.Title,
				}))
				.find((item: IPeriodoCultivo) => item.Id === id);

			return periodoCultivo;
		})
		.catch((err) => {
			console.log(`Error al listar Periodos de Cultivo: ${err}`);
			return undefined;
		});
};

const getFamiliasProductos = async (
	urlBase: string,
	context: WebPartContext,
): Promise<IFamiliaProducto[]> => {
	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Familias Productos')/items/?$filter=Activo eq 'Activo'&$select=Id,Title,UnidaddeMedida,PeriododeCultivoId`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then(async (data: FamiliaProductosResponse) => {
			const familiasProductos: IFamiliaProducto[] | undefined =
				await Promise.all(
					data.value.map(
						async (item: FamiliaProductosResponseValue) => {
							const periodoCultivo: IPeriodoCultivo | undefined =
								await getPeriodoCultivo(
									urlBase,
									context,
									item.PeriododeCultivoId,
								);

							return {
								Id: item.Id,
								Nombre: item.Title,
								UnidadMedida: item.UnidaddeMedida,
								PeriodoCultivo: periodoCultivo,
								Estado: item.Activo,
							};
						},
					),
				);
			return familiasProductos;
		})
		.catch((e: Error) => {
			console.log(`Error listando familia de productos: ${e}`);
			return [];
		});
};

const getCNGS = async (
	urlBase: string,
	context: WebPartContext,
): Promise<ICNG[]> => {
	const options: ISPHttpClientOptions = {
		headers: {
			Accept: 'Application/json',
		},
	};

	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('CNG')/items/?$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, options)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then((data: CNGResponse) => {
			const cngs: ICNG[] = data.value.map((item: CNGResponseValue) => ({
				Id: item.Id,
				CodigoSAP: item.Title,
				Correo: item.Correo,
			}));
			return cngs;
		})
		.catch((e) => {
			console.log(`Error listando CNGs: ${e}`);
			return [];
		});
};

const registrarDato = async (
	data: InformacionMercado,
	urlBase: string,
	context: WebPartContext,
): Promise<boolean> => {
	const url = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Informacion Mercado')/items`;

	const options: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const datos: InformacionMercadoValue = {
		ClienteId: data.idCliente,
		VolumenYaComprado: data.volumenComprado,
		Familia_x0020_de_x0020_ProductoId: data.idFamilia,
		Proveedor_x0020_PrincipalId: data.idProveedorPrincipal,
		Precio: data.precioPorMedida,
		Condici_x00f3_nPago: data.condicionPago,
		Periodo_x0020_de_x0020_CultivoId: data.idPeriodoCultivo
	} as InformacionMercadoValue;

	const request: ISPHttpClientOptions = {};
	request.headers = options.headers;
	request.body = JSON.stringify(datos);

	const response = await context.spHttpClient.post(
		url,
		SPHttpClient.configurations.v1,
		request,
	);

	if (response.status === 200) {
		return true;
	}

	return false;
};

const registrarDatos = async (
	data: InformacionMercado[],
	urlBase: string,
	context: WebPartContext,
): Promise<boolean> => {
	//SEND JUST ONE REQUEST TO SP MAKING THE DATA REGISTER PROCESS MORE EFICCIENT
	const url = `${urlBase}/Apps/monitoreo-mercado/_api/$batch`;

	const { batchBody, batchID } = generateBatchString(url, data);

	const request: ISPHttpClientOptions = {
		headers: {
			'Content-Type': `multipart/mixed;boundary${batchID}`,
		},
		body: batchBody,
	};

	const response = await context.spHttpClient.post(
		url,
		SPHttpClient.configurations.v1,
		request,
	);

	if (response.status === 200) {
		return true;
	} else {
		return false;
	}
};

export {
	getUnidades,
	getClientes,
	getFamiliasProductos,
	getPeriodosCultivo,
	getProveedores,
	getCNGS,
	registrarDato,
	registrarDatos,
};
