import * as React from 'react';
import { Field, Input, makeStyles } from '@fluentui/react-components';

import { IUnidad } from './interfaces/IUnidad';
import { ICliente } from './interfaces/ICliente';
import ComboboxCliente from './ComboboxCliente';
import ComboboxUnidad from './ComboboxUnidad';
import { FamiliasValores } from './interfaces/FamiliasValores';

interface IHandleFuncion{
  (campo:keyof FamiliasValores, valor:string|number):void,
}

export interface ICabeceraForm {
  listaUnidades: IUnidad[];
  listaClientes: ICliente[];
  handleCambioValor:IHandleFuncion;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
});

const CabeceraForm: React.FC<ICabeceraForm> = (props) => {
  const { listaUnidades, listaClientes, handleCambioValor} = props;

  const styles = useStyles();

  const handleCambioDpDown = (e:{name: keyof FamiliasValores, value:string|number}):void => {
    const {name, value} = e;

    handleCambioValor(name, value);
  }

  return (
    <section className={styles.root}>
      <ComboboxUnidad unidades={listaUnidades} handleCambioValor={handleCambioDpDown} />
      <ComboboxCliente clientes={listaClientes} />
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