import * as React from 'react';
import {
  Combobox,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { ComboboxClientesProps } from './interfaces/ComboboxClientesProps';
import { ICliente } from './interfaces/ICliente';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    opacity: '100%',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
});

const ComboboxCliente: React.FC<ComboboxClientesProps> = (props) => {
  const { clientes, handleCambioValor } = props;

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor="idCliente">Cliente: </label>
      <Combobox
        name="idCliente"
        id="cliente"
        placeholder="Seleccione Cliente"
        inlinePopup={true}
        clearable={true}
        onOptionSelect={handleCambioValor}
        >
        {clientes.map((cliente: ICliente) => (
          <Option
            value={cliente?.Id?.toString()}
            key={cliente.Id}
            text='Cliente'
            >
            {cliente.Nombre}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

export default ComboboxCliente;
