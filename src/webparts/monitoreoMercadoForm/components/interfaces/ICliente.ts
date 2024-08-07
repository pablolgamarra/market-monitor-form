import { IUnidad } from "./IUnidad";

export interface ICliente{
    Id:number,
    Nombre:string|undefined,
    NroFiscal:number|undefined,
    Unidad: IUnidad|undefined,
    Coordinador: number|undefined,
}