export interface ICliente{
    Id:number,
    Nombre:string|undefined,
    CodigoSAP:number|undefined,
    Unidad: IUnidad|undefined,
    CNG: ICNG|undefined,
}

export interface ICNG{
    Id:number;
    Nombre:string;
    CodigoSAP:string;
    Correo:string;
}

export interface IFamiliaProducto{
    Id:number,
    Nombre:string,
    UnidadMedida:string,
    PeriodoCultivo:IPeriodoCultivo|undefined,
    Estado:boolean
}

export interface IPeriodoCultivo{
	Id:number
	Nombre:string|undefined,
}

export interface IUnidad{
    Id:number,
    Nombre:string|undefined,
}

export interface IProveedor{
    Id:number|undefined,
    Nombre:string|undefined,
    FamiliadeProducto: IFamiliaProducto|undefined
}

export interface InformacionMercado{
    idCliente: number,
    idUnidad: number,
    idPeriodoCultivo:number
    idFamilia: number|undefined,
    volumenComprado: string|undefined,
    precioPorMedida: number|undefined,
    condicionPago: string|undefined,
    idProveedorPrincipal: number|undefined,
}

export enum Activo{
    Activo = "Activo",
    Inactivo = "Inactivo"
}

export enum CondicionesPago{
    Contado = "Contado",
    Crédito = "Crédito"
}