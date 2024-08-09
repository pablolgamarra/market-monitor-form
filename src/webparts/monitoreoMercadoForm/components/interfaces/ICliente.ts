import {ICNG} from "./ICNG";
import { IUnidad } from "./IUnidad";

export interface ICliente{
    Id:number,
    Nombre:string|undefined,
    NroFiscal:number|undefined,
    Unidad: IUnidad|undefined,
    CNG: ICNG|undefined,
}