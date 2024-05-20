import * as React from 'react';
import {
  Combobox,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { ComboboxUnidadesProps } from './interfaces/ComboboxUnidadesProps';
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

const ComboboxUnidad: React.FC<ComboboxUnidadesProps> = (props) => {
  const { unidades, handleCambioValor } = props;

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor="unidad-cliente">Unidad: </label>
      <Combobox
        name="idUnidad"
        id="unidad-cliente"
        placeholder="Seleccione Unidad"
        inlinePopup={true}
        clearable={true}
        onOptionSelect={handleCambioValor}
        >
        {unidades.map((unidad: IUnidad) => (
          <Option
            value={unidad.Id.toString()}
            key={unidad.Id}>
            {unidad.Nombre}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

export default ComboboxUnidad;
