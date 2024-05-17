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

  const handleCambio = React.useCallback(
    (_, e) => {
      handleCambioValor({
        name: 'idCliente',
        value: e?.nextOption?.value,
      });
    },
    [handleCambioValor]
  );

  return (
    <div className={styles.root}>
      <label htmlFor="cliente">Cliente: </label>
      <Combobox
        name="cliente"
        id="cliente"
        placeholder="Seleccione Cliente"
        inlinePopup={true}
        clearable={true}
        onActiveOptionChange={handleCambio}
        >
        {clientes.map((cliente: ICliente) => (
          <Option
            value={cliente.Id.toString()}
            key={cliente.Id}>
            {cliente.Nombre}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

export default ComboboxCliente;
