import {
	SPHttpClient,
	SPHttpClientResponse,
	ISPHttpClientOptions,
} from '@microsoft/sp-http';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { IUnidad } from '../components/interfaces/IUnidad';
import { ICliente } from '../components/interfaces/ICliente';
import { IFamiliaProducto } from '../components/interfaces/IFamiliaProducto';
import { DatosValores } from '../components/interfaces/DatosValores';
import { IProveedor } from '../components/interfaces/IProveedor';
import { IPeriodoCultivo } from '../components/interfaces/IPeriodoCultivo';

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
	CoordinadoresResponse,
	CoordinadoresResponseValue,
} from './ResponseTypes';

import { DatosMercadoValue } from './RequestTypes';
import { ICoordinador } from '../components/interfaces/ICoordinador';

const getUnidades = async (
	urlBase: string,
	context: WebPartContext,
): Promise<IUnidad[]> => {
	const head: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Unidades')/items/?$select=Title,Id`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, head)
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

const getClientes = async (
	urlBase: string,
	context: WebPartContext,
): Promise<ICliente[]> => {
	const head: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Clientes')/items/?$select=Id,Title,RUC_x002f_CI,UnidadId,CoordinadorId`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, head)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then((data: ClientesResponse) => {
			const clientes: ICliente[] = data.value.map(
				(item: ClientesResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
					NroFiscal: item.RUC_x002f_CI,
					Unidad: item.UnidadId,
					Coordinador: item.CoordinadorId
				}),
			);
			return clientes;
		})
		.catch((e: Error) => {
			console.log(`Error listando clientes: ${e}`);
			return [];
		});
};

const getFamiliaProductos = (
	urlBase: string,
	context: WebPartContext,
): Promise<IFamiliaProducto[]> => {
	const head: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Familias Productos')/items/?$filter=Activo eq 'Activo'&$select=Id,Title,UnidaddeMedida`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, head)
		.then((respuesta: SPHttpClientResponse) => {
			if (respuesta.status === 200) {
				return respuesta.json();
			}
			return [];
		})
		.then((data: FamiliaProductosResponse) => {
			const familiasProductos: IFamiliaProducto[] = data.value.map(
				(item: FamiliaProductosResponseValue) => ({
					Id: item.Id,
					Nombre: item.Title,
					UnidadMedida: item.UnidaddeMedida,
				}),
			);
			return familiasProductos;
		})
		.catch((e: Error) => {
			console.log(`Error listando familia de productos: ${e}`);
			return [];
		});
};

const getProveedores = (
	urlBase: string,
	context: WebPartContext,
): Promise<IProveedor[]> => {
	const head: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const url = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Proveedores')/items/?$select=Id,Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, head)
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

const getPeriodosCultivo = (
	urlBase: string,
	context: WebPartContext,
): Promise<IPeriodoCultivo[]> => {
	const head: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};

	const url: string = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Periodos Cultivo')/items/?$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, head)
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

const getCoordinadores = (urlBase:string, context:WebPartContext):Promise<ICoordinador[]> => {
	const head:ISPHttpClientOptions = {
		headers:{
			'Accept':'Application/json'
		}
	}

	const url:string = `${urlBase}/Apps/monitoreo-mercado/lists/getByTitle('Coordinadores')/items/?$select=Id,Title`;

	return context.spHttpClient.get(url, SPHttpClient.configurations.v1, head)
	.then((respuesta:SPHttpClientResponse)=>{
		if(respuesta.status === 200){
			return respuesta.json();
		}
		return [];
	})
	.then((data:CoordinadoresResponse) => {
		const coordinadores:ICoordinador[]= data.value.map((item:CoordinadoresResponseValue) => ({
			Id: item.Id,
			Nombre: item.Title,
		})
	);
		return coordinadores;	
	})
	.catch((e)=>{
		console.log(`Error listando Coordinadores: ${e}`);
		return [];
	})
}

const registrarDatos = async (
	data: DatosValores,
	urlBase: string,
	context: WebPartContext,
): Promise<boolean> => {
	const url = `${urlBase}/Apps/monitoreo-mercado/_api/web/lists/GetByTitle('Datos Mercado')/items`;
	const head: ISPHttpClientOptions = {
		headers: { Accept: 'Application/json' },
	};
	const datos: DatosMercadoValue = {
		ClienteId: data.idCliente,
		VolumenYaComprado: data.volumenComprado,
		Familia_x0020_de_x0020_ProductoId: data.idFamilia,
		ProveedorPrincipal: data.proveedorPrincipal,
		Precio: data.precio,
		Condici_x00f3_nPago: data.condicionPago,
	};

	const request: ISPHttpClientOptions = {};
	request.headers = head.headers;
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

export { getUnidades, getClientes, getFamiliaProductos, getPeriodosCultivo, getProveedores, getCoordinadores, registrarDatos };
