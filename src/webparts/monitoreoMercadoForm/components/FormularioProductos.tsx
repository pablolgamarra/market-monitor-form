import * as React from 'react';
import {
  Combobox,
  Field,
  Input,
  Option,
  OptionOnSelectData,
  SelectionEvents,
  Title2,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { IFormularioProductosProps } from './interfaces/IFormularioProductosProps';
import { FamiliasValores } from './interfaces/FamiliasValores';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    ...shorthands.margin('25px'),
    backgroundColor: '',
  },
});

const FormularioProductos: React.FC<IFormularioProductosProps> = (props) => {
  const { familia, valores, handleCambioValor } = props;

  const volumenMinimo: number = 0;
  const volumenMaximo: number = 100;
  const volumenes: string[] = new Array<string>();

  for (let i = volumenMinimo; i <= volumenMaximo; i += 10) {
    volumenes.push(`${i}%`);
  }

  const styles = useStyles();

  const handleCambio = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    handleCambioValor(name as keyof FamiliasValores, value);
  };

  const manejarCambioDpDown = React.useCallback((e: SelectionEvents, data: OptionOnSelectData) => {
    const event: HTMLElement = e.target as HTMLElement;

    console.log(document.querySelector(`[aria-controls=${event.parentElement?.getAttribute('id')}]`)?.getAttribute('name'));
    const elementName = document.querySelector(`[aria-controls=${event.parentElement?.getAttribute('id')}]`)?.getAttribute('name')
    
    const name = elementName === null || elementName === undefined ? '' : elementName;
    const value = data.optionValue !== undefined ? data.optionValue : '';

    handleCambioValor(name as keyof FamiliasValores, value);
  },
    [handleCambioValor]
  )

  return (
    <section className={styles.root}>
      <Title2>{familia.Nombre}</Title2>
      <form>
        <Field
          id={`${familia.Id}-vol-comprado`}
          label={'Volumen ya comprado'}>
          <Combobox
            id={`${familia.Id}-vol-comprado`}
            name={'volumenComprado'}
            className="DpDown"
            placeholder="Volumen Ya Comprado"
            value={valores.volumenComprado}
            clearable={true}
            inlinePopup={true}
            onOptionSelect={manejarCambioDpDown}
          >
            {volumenes.map((volumen) => (
              <Option
                value={volumen}
                key={volumen}>
                {volumen}
              </Option>
            ))}
          </Combobox>
        </Field>
        <Field
          id={`${familia.Id}-precio`}
          label={`Precio por ${familia.UnidadMedida}`}>
          <Input
            name={'precio'}
            type='number'
            placeholder={`Ingresar precio ${familia.UnidadMedida}`}
            value={valores.precioPorMedida.toString()}
            onChange={handleCambio}
          />
        </Field>
        <Field
          id={`${familia.Id}-condicion-pago`}
          label={'Condición de Pago'}>
          <Combobox
            id={`${familia.Id}-condicion-pago`}
            name={'condicionPago'}
            className="DpDown"
            placeholder="Condición de Pago"
            clearable={true}
            value={valores.condicionPago}
            inlinePopup={true}
            onOptionSelect={manejarCambioDpDown}>
            <Option value={'Crédito'}>Crédito</Option>
            <Option value={'Contado'}>Contado</Option>
          </Combobox>
        </Field>
        <Field label={'Proveedor Principal'}>
          <Input
            id={`${familia.Id}-proveedor-principal`}
            placeholder="Ingresar proveedor principal"
            name={'proveedorPrincipal'}
            value={valores.idProveedorPrincipal}
            onChange={handleCambio}
          />
        </Field>
      </form>
    </section>
  );
};

export default FormularioProductos;
