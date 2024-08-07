import { ICliente } from "./ICliente";
import { IFamiliaProducto } from "./IFamiliaProducto";
import { IUnidad } from "./IUnidad";
import {InformacionMercado} from './InformacionMercado';

export interface IFormMonitoreoProps {
  listaClientes: ICliente[],
  listaUnidades: IUnidad[],
  listaFamiliaProductos: IFamiliaProducto[],
  onSave(data:InformacionMercado):void,
  width:number,
}
