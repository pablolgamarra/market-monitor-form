import { ICliente } from "./ICliente";

export interface ComboboxClientesProps{
	clientes:ICliente[],
	handleCambioValor(e:{name:string, value:string|number}):void
}