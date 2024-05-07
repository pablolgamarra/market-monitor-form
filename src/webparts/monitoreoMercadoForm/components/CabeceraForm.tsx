import * as React from 'react';
import { Field, Input, makeStyles } from '@fluentui/react-components';

import { IUnidad } from './interfaces/IUnidad';
import { ICliente } from './interfaces/ICliente';
import DropdownCliente from './DropdownCliente';
import DropdownUnidad from './DropdownUnidad';

export interface ICabeceraForm {
  listaUnidades: IUnidad[];
  listaClientes: ICliente[];
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
});

const CabeceraForm: React.FC<ICabeceraForm> = (props) => {
  const { listaUnidades, listaClientes } = props;

  const styles = useStyles();

  return (
    <section className={styles.root}>
      <DropdownUnidad unidades={listaUnidades} />
      <DropdownCliente clientes={listaClientes} />
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