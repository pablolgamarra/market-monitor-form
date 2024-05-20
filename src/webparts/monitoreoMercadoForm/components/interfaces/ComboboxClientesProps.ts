import { OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import { ICliente } from "./ICliente";

export interface ComboboxClientesProps{
	clientes:ICliente[],
	handleCambioValor(e:SelectionEvents, data:OptionOnSelectData):void
}