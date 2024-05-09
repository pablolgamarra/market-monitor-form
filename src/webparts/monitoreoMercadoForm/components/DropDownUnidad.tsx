import * as React from 'react';
import {
  Dropdown,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';


import { IUnidad } from './interfaces/IUnidad';
import { IDropdownUnidadProps } from './interfaces/IDropDownUnidadProps';

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

const DropdownUnidad: React.FC<IDropdownUnidadProps> = (props) => {
  const { unidades } = props;

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor="unidad-cliente">Unidad: </label>
      <Dropdown
        name="unidad-cliente"
        id="unidad-cliente"
        placeholder="Seleccione Unidad"
        inlinePopup={true}>
        {unidades.map((unidad:IUnidad) => (
          <Option
            value={unidad.Nombre}
            key={unidad.Id}>
            {unidad.Nombre}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default DropdownUnidad;