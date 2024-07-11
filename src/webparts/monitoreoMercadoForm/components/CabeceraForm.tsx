import * as React from 'react';
import { Field, Input, makeStyles, OptionOnSelectData, SelectionEvents } from '@fluentui/react-components';

import { IUnidad } from './interfaces/IUnidad';
import { ICliente } from './interfaces/ICliente';
import ComboboxCliente from './ComboboxCliente';
import ComboboxUnidad from './ComboboxUnidad';

export interface ICabeceraForm {
  listaUnidades: IUnidad[];
  listaClientes: ICliente[];
  handleCambioCliente(idCliente:string|number):void;
  handleCambioUnidad(idCliente:string|number):void;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
});

const CabeceraForm: React.FC<ICabeceraForm> = (props) => {
  const { listaUnidades, listaClientes, handleCambioCliente, handleCambioUnidad} = props;

  const styles = useStyles();

  const manejarCambioDpDown = React.useCallback((e: SelectionEvents, data: OptionOnSelectData) => {
    const event: HTMLElement = e.target as HTMLElement;

    console.log(document.querySelector(`[aria-controls=${event.parentElement?.getAttribute('id')}]`)?.getAttribute('name'));
    const elementName = document.querySelector(`[aria-controls=${event.parentElement?.getAttribute('id')}]`)?.getAttribute('name')
    
    const name = elementName === null || elementName === undefined ? '' : elementName;
    const value = data.optionValue !== undefined ? data.optionValue : '';

    if(name === 'idCliente'){
      handleCambioCliente(value);
    }else{
      handleCambioUnidad(value)
    }

  },
    [handleCambioUnidad, handleCambioCliente]
  )


  return (
    <section className={styles.root}>
      <ComboboxCliente clientes={listaClientes} handleCambioValor={manejarCambioDpDown} />
      <ComboboxUnidad unidades={listaUnidades} handleCambioValor={manejarCambioDpDown} />
      <Field
        label="Año de Zafra"
        color={styles.root}>
        <Input
          defaultValue="2024/2025"
          disabled={true}
        />
      </Field>
    </section>
  );
};

export default CabeceraForm;