import { IUnidad } from "../../MonitoreoMercadoFormWebPart";
import { IDropDownClienteProps } from "./IDropDownClienteProps";

export interface ICabeceraClientesProps{
    listaUnidades: IUnidad[],
    listaClientes: Array<IDropDownClienteProps>
}