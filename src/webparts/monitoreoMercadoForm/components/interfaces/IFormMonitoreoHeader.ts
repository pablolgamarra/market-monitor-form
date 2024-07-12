import { ICliente } from "./ICliente";
import { IUnidad } from "./IUnidad";

export interface IFormMonitoreoHeader {
    listaUnidades: IUnidad[];
    listaClientes: ICliente[];
    idUnidadSeleccionada: number;
    idClienteSeleccionado: number;
    handleCambioCliente(idCliente:string|number):void;
    handleCambioUnidad(idCliente:string|number):void;
}