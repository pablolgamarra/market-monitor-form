import { IFamiliaProducto } from "./IFamiliaProducto";

export interface IProveedor{
    Id:number|undefined,
    Nombre:string|undefined,
    FamiliaProductos: IFamiliaProducto|undefined
}