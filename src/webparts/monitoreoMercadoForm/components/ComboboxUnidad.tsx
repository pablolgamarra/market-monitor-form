import * as React from 'react';
import {
  Combobox,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

<<<<<<< HEAD:src/webparts/monitoreoMercadoForm/components/DropDownUnidad.tsx

=======
import { ComboboxUnidadesProps } from './interfaces/ComboboxUnidadesProps';
>>>>>>> 69ca604457d23766894531998e3892e037192545:src/webparts/monitoreoMercadoForm/components/ComboboxUnidad.tsx
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
