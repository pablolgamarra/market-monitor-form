import * as React from "react";
import FormMonitoreo from "./FormMonitoreo";
import { ICliente } from "./interfaces/ICliente";
import { IUnidad } from "./interfaces/IUnidad";
import { IFamiliaProducto } from "./interfaces/IFamiliaProducto";
import { registrarDatos } from "../utils/QuerySP";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DatosValores } from "./interfaces/DatosValores";

export interface AppProps{
    url:string,
    context:WebPartContext,
    listaClientes:ICliente[],
    listaUnidades:IUnidad[],
    listaFamiliaProductos:IFamiliaProducto[],
}

const App:React.FC<AppProps> = (props) => {
    const onSave = (data:DatosValores):void=>{
        registrarDatos(data, props.url, props.context)
        .then(()=>{
            alert('Datos Guardados Correctamente');
        })
        .catch((e:Error) => {
            console.log(`Error al guardar datos: ${e}`);
            alert('Error al guardar los datos');
        })
    }

    return (
        <>
            <FormMonitoreo {...{...props, onSave:onSave}}/>
        </>
    )
}

export default App;