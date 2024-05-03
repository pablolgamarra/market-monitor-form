import { IDropDownClienteProps } from "./IDropDownClienteProps";
import { IFormularioProductosProps } from "./IFormularioProductosProps";

export interface IFormMonitoreoProps {
  listaClientes: Array<IDropDownClienteProps>,
  listaUnidades: Array<string>
  listaFamiliaProductos: Array<IFormularioProductosProps>
}
