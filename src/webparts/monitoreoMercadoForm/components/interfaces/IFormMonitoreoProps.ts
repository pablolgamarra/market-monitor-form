import { ICliente } from "./ICliente";
import { IFamiliaProducto } from "./IFamiliaProducto";
import { IUnidad } from "./IUnidad";

export interface IFormMonitoreoProps {
  listaClientes: ICliente[],
  listaUnidades: IUnidad[],
  listaFamiliaProductos: IFamiliaProducto[],
}
