import { IPeriodoCultivo } from "./IPeriodoCultivo";

export interface IFamiliaProducto{
    Id:number,
    Nombre:string,
    UnidadMedida:string,
    PeriodoCultivo:IPeriodoCultivo|undefined,
    Estado:boolean
}