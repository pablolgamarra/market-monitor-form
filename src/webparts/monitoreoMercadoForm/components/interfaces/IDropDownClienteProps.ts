import { IUnidad } from "../../MonitoreoMercadoFormWebPart";

export interface IDropDownClienteProps{
    Id:number,
	Nombre: string,
	NroFiscal: string,
	Unidad: IUnidad,
	NombreCNG: string,
}