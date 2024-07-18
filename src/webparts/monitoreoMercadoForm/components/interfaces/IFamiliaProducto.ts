import { IPeriodoCultivo } from "./IPeriodoCultivo";

export interface IFamiliaProducto{
    Id:number,
    Nombre:string,
    UnidadMedida:string,
    PeriodoCultivo:IPeriodoCultivo,
    Estado:boolean
}