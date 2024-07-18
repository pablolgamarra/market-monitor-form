export interface UnidadesResponse {
	'@odata.context': string;
	value: UnidadesResponseValue[];
}

export interface UnidadesResponseValue {
	'@odata.type': string;
	'@odata.id': string;
	'@odata.etag': string;
	'@odata.editLink': string;
	Id: number;
	Title: string;
	ID: number;
}

export interface ClientesResponse {
	'@odata.context': string;
	value: ClientesResponseValue[];
}
export interface ClientesResponseValue {
	'@odata.type': string;
	'@odata.id': string;
	'@odata.etag': string;
	'@odata.editLink': string;
	Id: number;
	Title: string;
	RUC_x002f_CI: number;
	UnidadId: number;
	CoordinadorId: number;
	ID: number;
}

export interface FamiliaProductosResponse {
	'@odata.context': string;
	value: FamiliaProductosResponseValue[];
}

export interface FamiliaProductosResponseValue {
	'@odata.type': string;
	'@odata.id': string;
	'@odata.etag': string;
	'@odata.editLink': string;
	Id: number;
	Title: string;
	UnidaddeMedida: string;
	PeriododeCultivoId: number|undefined;
	Activo: boolean;
	ID: number;
}

export interface ProveedoresResponse {
	'@odata.context': string;
	value: ProveedoresResponseValue[];
}

export interface ProveedoresResponseValue {
	Id: number;
	Title: string;
	ID: number;
}

export interface PeriodosCultivoResponse {
	'odata.metadata': string;
	value: PeriodosCultivoResponseValue[];
}

export interface PeriodosCultivoResponseValue {
	'odata.type': string;
	'odata.id': string;
	'odata.etag': string;
	'odata.editLink': string;
	Id: number;
	Title: string;
	ID: number;
}

export interface CoordinadoresResponse {
    "odata.metadata": string;
    value:            CoordinadoresResponseValue[];
}

export interface CoordinadoresResponseValue {
    "odata.type":     string;
    "odata.id":       string;
    "odata.etag":     string;
    "odata.editLink": string;
    Id:               number;
    Title:            string;
    ID:               number;
}

