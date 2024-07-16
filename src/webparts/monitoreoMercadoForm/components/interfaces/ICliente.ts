import { IUnidad } from "./IUnidad";

export interface ICliente{
    Id:number|undefined,
    Nombre:string|undefined,
    NroFiscal:number|undefined,
    Unidad: IUnidad|undefined,
    Coordinador: number|undefined,
}