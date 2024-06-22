import { OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import { IUnidad } from "./IUnidad";

export interface ComboboxUnidadesProps{
    unidades:IUnidad[],
    handleCambioValor(e:SelectionEvents, data: OptionOnSelectData):void,
}