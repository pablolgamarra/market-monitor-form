import { IUnidad } from "./IUnidad";

export interface ComboboxUnidadesProps{
    unidades:IUnidad[],
    handleCambioValor(e:{name:string, value:string|number}):void,
}