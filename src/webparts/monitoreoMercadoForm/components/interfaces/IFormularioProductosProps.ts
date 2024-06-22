import { IFamiliaProducto } from "./IFamiliaProducto";
import { FamiliasValores } from "./FamiliasValores";

interface IHandleFuncion{
    (campo:keyof FamiliasValores, valor:string|number):void,
}

export interface IFormularioProductosProps{
    familia:IFamiliaProducto,
    valores:FamiliasValores,
    handleCambioValor:IHandleFuncion,
}