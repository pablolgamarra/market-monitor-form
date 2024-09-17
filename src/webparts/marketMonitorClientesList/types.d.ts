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
}
export interface Unidad {
	Id: number | undefined;
	Nombre: string | undefined;
}
