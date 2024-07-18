import * as React from "react";

import { Input, Combobox, Option } from "@fluentui/react-components";

import { IFamiliaProducto } from "./interfaces/IFamiliaProducto";


export interface IMonitorFormProductsProps{
  listaFamiliasProducto:IFamiliaProducto[],
}

interface IMonitorFormProductsState{
  familiaProducto:IFamiliaProducto,
}

const MonitorFormProducts:React.FC<IMonitorFormProductsProps> = (props) =>{

  const volumen:number[] = Array.from({length:11}, (item:any) => item+10)
  return(
    <section>
      <form>
        <Input/>
        <Combobox>
      {
        volumen.map((item:number) => (
          <Option key={item}>
            {`${item}%`}
          </Option>
        ))
      }
    </Combobox>
        <Input/>
        <Combobox>
          <Option>Crédito</Option>
          <Option>Contado</Option>
        </Combobox>
        <Combobox>
          <Option>Proveedor</Option>
        </Combobox>
      </form>
    </section>
  )
}

export default MonitorFormProducts