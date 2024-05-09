import { IFamiliaProducto } from "./IFamiliaProducto";
import { IFamiliasValores } from "./IFamiliasValoresProps";

export interface IHandleFuncion{
    (campo:keyof IFamiliasValores, valor:any):void,
}

export interface IFormularioProductosProps{
    familia:IFamiliaProducto,
    valores:IFamiliasValores,
    handleCambioValor:IHandleFuncion,

}