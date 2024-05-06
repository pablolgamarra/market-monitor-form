import { IUnidad } from "../../MonitoreoMercadoFormWebPart";
import { IDropDownClienteProps } from "./IDropDownClienteProps";
import { IFormularioProductosProps } from "./IFormularioProductosProps";

export interface IFormMonitoreoProps {
  listaClientes: Array<IDropDownClienteProps>,
  listaUnidades: IUnidad[]
  listaFamiliaProductos: Array<IFormularioProductosProps>
}
