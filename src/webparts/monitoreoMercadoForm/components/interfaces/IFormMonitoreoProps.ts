import { ICliente } from "./ICliente";
import { IFamiliaProducto } from "./IFamiliaProducto";
import { IUnidad } from "./IUnidad";
import {DatosValores} from './InformacionMercado';

export interface IFormMonitoreoProps {
  listaClientes: ICliente[],
  listaUnidades: IUnidad[],
  listaFamiliaProductos: IFamiliaProducto[],
  onSave(data:DatosValores):void,
  width:number,
}
