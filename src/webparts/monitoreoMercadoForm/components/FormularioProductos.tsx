import * as React from 'react';
import {
  Dropdown,
  Field,
  Input,
  Option,
  Title2,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import DropdownVolumen from './DropDownVolumen';
import { IFormularioProductosProps } from './interfaces/IFormularioProductosProps';
import { IFamiliasValores } from './interfaces/IFamiliasValores';

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

  const styles = useStyles();

  const handleCambio = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ):void => {
    const {name, value} = e.target;

    handleCambioValor(name as keyof IFamiliasValores, value);
  };

  const handleCambioDpDown = (e:{name: keyof IFamiliasValores, value:string|number}) => {
    const {name, value} = e;

    handleCambioValor(name, value);
  }

  const handleCambioDpDownCond = React.useCallback((_,e)=>{
    const name='condicionPago';
    const value= e.nextOption.value;

    handleCambioValor(name, value)
  },[handleCambioValor]);

  return (
    <section className={styles.root}>
      <Title2>{familia.Nombre}</Title2>
      <form>
        <DropdownVolumen
          id={`${familia.Id}-vol-comprado`}
          name={'volumenComprado'}
          label={'Volumen ya comprado'}
          placeholder={'Seleccione Volumen'}
          value={valores.volumenComprado}
          onChange={handleCambioDpDown}
        />
        <Field
          id={`${familia.Id}-precio`}
          label={`Precio por ${familia.UnidadMedida}`}>
          <Input
            name={'precio'}
            placeholder={`Ingresar precio ${familia.UnidadMedida}`}
            value={valores.precio.toString()}
            onChange={handleCambio}
          />
        </Field>
        <Field
          id={`${familia.Id}-condicion-pago`}
          label={'Condición de Pago'}>
          <Dropdown
            id={`${familia.Id}-condicion-pago`}
            name={'condicionPago'}
            className="DpDown"
            placeholder="Condición de Pago"
            clearable={true}
            value={valores.condicionPago}
            inlinePopup={true}
            onActiveOptionChange={handleCambioDpDownCond}>
            <Option value={'Crédito'}>Crédito</Option>
            <Option value={'Contado'}>Contado</Option>
          </Dropdown>
        </Field>
        <Field label={'Proveedor Principal'}>
          <Input
            id={`${familia.Id}-proveedor-principal`}
            placeholder="Ingresar proveedor principal"
            name={'proveedorPrincipal'}
            value={valores.proveedorPrincipal}
            onChange={handleCambio}
          />
        </Field>
      </form>
    </section>
  );
};

export default FormularioProductos;
