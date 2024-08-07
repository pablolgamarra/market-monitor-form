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