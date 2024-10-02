export interface Cliente {
	Id: number | undefined;
	Nombre: string | undefined;
	CodigoSAP: number | undefined;
	Unidad: Unidad | undefined;
	CNG: CNG | undefined;
	Anho: string;
}

export interface CNG {
	Id: number | undefined;
	Nombre: string;
	CodigoSAP: string;
	Correo: string;
	Cargo?: Cargo;
	Unidad?: Unidad;
}

export interface Cargo {
	nombre: string;
}

export interface FamiliaProducto {
	Id: number | undefined;
	Nombre: string;
	UnidadMedida: string;
	PeriodoCultivo: PeriodoCultivo | undefined;
	Estado: Activo | string;
}

export interface PeriodoCultivo {
	Id: number;
	Nombre: string | undefined;
}

export interface Unidad {
	Id: number | undefined;
	Nombre: string | undefined;
}

export interface Proveedor {
	Id: number | undefined;
	Nombre: string | undefined;
	FamiliadeProducto: FamiliaProducto | undefined;
}

export interface InformacionMercado {
	idCliente: number | undefined;
	idUnidad: number | undefined;
	idPeriodoCultivo: number | undefined;
	idFamilia: number | undefined;
	volumenComprado: string | undefined;
	idProveedorPrincipal: number | undefined;
	idCng: number | undefined;
}

export enum Activo {
	Activo = 'Activo',
	Inactivo = 'Inactivo',
}

export enum CondicionesPago {
	Contado = 'Contado',
	Crédito = 'Crédito',
}

export interface UnidadesResponse {
	value: UnidadesResponseValue[];
}

export interface UnidadesResponseValue {
	Id: number;
	Title: string;
	ID: number;
}

export interface ClientesResponse {
	value: ClientesResponseValue[];
}

export interface ClientesResponseValue {
	Id: number;
	Title: string;
	Codigo_x0020_SAP: number;
	UnidadId: number;
	Codigo_x0020_SAP_x0020_CNGId: number;
	A_x00f1_o: string;
	ID: number;
}

export interface FamiliaProductosResponse {
	value: FamiliaProductosResponseValue[];
}

export interface FamiliaProductosResponseValue {
	Id: number;
	Title: string;
	UnidaddeMedida: string;
	Activo: Activo;
	PeriododeCultivoId: number[];
	ID: number;
}

export interface PeriodosCultivoResponse {
	value: PeriodosCultivoResponseValue[];
}

export interface PeriodosCultivoResponseValue {
	Id: number;
	Title: string;
	ID: number;
}

export interface CNGResponse {
	value: CNGResponseValue[];
}

export interface CNGResponseValue {
	Id: number;
	Title: string;
	Correo: string;
	NombreCNG: string;
	Cargo: Cargo;
	UnidadId: number | null;
	ID: number;
}

export interface ProveedoresResponse {
	value: ProveedoresResponseValue[];
}

export interface ProveedoresResponseValue {
	Id: number;
	Title: string;
	Familia_x0020_de_x0020_ProductoId: number[];
	ID: number;
}

export interface InformacionMercadoRequest {
	value?: InformacionMercadoValue;
}
export interface InformacionMercadoValue {
	Id: number;
	ClienteId: number;
	Familia_x0020_de_x0020_ProductoId: number;
	VolumenYaComprado: string;
	Precio: number;
	Condici_x00f3_nPago: CondicionesPago;
	Proveedor_x0020_PrincipalId: number;
	Periodo_x0020_de_x0020_CultivoId: number;
	CNGId: undefined;
	ID: number;
}
