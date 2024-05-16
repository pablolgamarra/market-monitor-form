import { IFamiliaProducto } from "./IFamiliaProducto";
import { FamiliasValores } from "./FamiliasValores";

interface IHandleFuncion{
    (campo:keyof FamiliasValores, valor:any):void,
}

export interface IFormularioProductosProps{
    familia:IFamiliaProducto,
    valores:FamiliasValores,
    handleCambioValor:IHandleFuncion,
}