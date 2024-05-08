import { IUnidad } from "./IUnidad";

export interface ICliente{
    Id:number,
    Nombre:string,
    NroFiscal:string,
    Unidad: IUnidad,
    NombreCNG: string,
}