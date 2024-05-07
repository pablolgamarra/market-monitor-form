import * as React from 'react';
import {
  Dropdown,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { IDropdownClienteProps } from './interfaces/IDropdownClienteProps';
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

const DropdownCliente: React.FC<IDropdownClienteProps> = (props) => {
  const { clientes } = props;

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor="cliente">Cliente: </label>
      <Dropdown
        name="cliente"
        id="cliente"
        placeholder="Seleccione Cliente"
        inlinePopup={true}>
        {clientes.map((cliente:ICliente) => (
          <Option
            value={cliente.Nombre}
            key={cliente.Id}>
            {cliente.Nombre}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default DropdownCliente;