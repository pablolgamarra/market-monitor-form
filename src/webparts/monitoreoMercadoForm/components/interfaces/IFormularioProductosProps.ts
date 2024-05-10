import { IFamiliaProducto } from "./IFamiliaProducto";
import { IFamiliasValores } from "./IFamiliasValores";

export interface IHandleFuncion{
    (campo:keyof IFamiliasValores, valor:any):void,
}

export interface IFormularioProductosProps{
    familia:IFamiliaProducto,
    valores:IFamiliasValores,
    handleCambioValor:IHandleFuncion,
}