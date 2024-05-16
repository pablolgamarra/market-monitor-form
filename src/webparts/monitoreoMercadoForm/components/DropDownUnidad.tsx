import * as React from 'react';
import {
  Combobox,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { IDropdownUnidadProps } from './interfaces/IDropdownUnidadProps';
import { IUnidad } from './interfaces/IUnidad';

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

const ComboboxUnidad: React.FC<IDropdownUnidadProps> = (props) => {
  const { unidades, handleCambioValor } = props;

  const styles = useStyles();

  const HandleCambio = React.useCallback(
    (_, e) => {
      handleCambioValor({
        name: 'idUnidad',
        value: e?.nextOption?.value,
      });
    },
    [handleCambioValor]
  );

  return (
    <div className={styles.root}>
      <label htmlFor="unidad-cliente">Unidad: </label>
      <Combobox
        name="unidad-cliente"
        id="unidad-cliente"
        placeholder="Seleccione Unidad"
        inlinePopup={true}
        clearable={true}
        onActiveOptionChange={HandleCambio}
        >
        {unidades.map((unidad: IUnidad) => (
          <Option
            value={unidad.Nombre}
            key={unidad.Id}>
            {unidad.Nombre}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

export default ComboboxUnidad;
