import * as React from 'react';
import type { IFormMonitoreoProps } from './interfaces/IFormMonitoreoProps';
import CabeceraForm from './CabeceraForm';
import FormularioProductos from './FormularioProductos';

import {
  Title1,
  Image,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { IFamiliaProducto } from './interfaces/IFamiliaProducto';
import BotonesNavegacionPagina from './BotonesNavegacionPagina';

export interface IFamiliasInformacion{
  /*
  Familia de Producto
  Familia_x0020_de_x0020_ProductoId
  
  Volumen ya Comprado
  VolumenYaComprado

  Condicion de Pago
  Condici_x00f3_nPago

  Proveedor Principal
  ProveedorPrincipal

  Cliente
  ClienteId

  
  familiaDeProducto:IFamiliaProducto;

  */
  volumenComprado: string,
  precio: number,
  condicionPago: string,
  proveedorPrincipal: string,
}

const useStyles = makeStyles({
  root: {
    color: '#2C3C79',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('1em'),
    ...shorthands.margin('5px'),
    '> img': {
      alignSelf: 'center',
    },
  },
  buttons: {
    display: 'flex',
  },
});


const FormMonitoreo: React.FC<IFormMonitoreoProps> = (props) => {
  const { listaClientes, listaUnidades, listaFamiliaProductos } = props;

  const styles = useStyles();

  const largoLista = listaFamiliaProductos.length;

  const informacionInicial:IFamiliasInformacion[] = new Array<IFamiliasInformacion>(largoLista).fill({precio:0, volumenComprado:'', condicionPago:'', proveedorPrincipal:'' },0,largoLista);

  const [index, setIndex] = React.useState<number>(0);
  const [familiaActiva, setFamiliaActiva] = React.useState<IFamiliaProducto>(listaFamiliaProductos[0]);
  const [valoresForm, setValoresForm] = React.useState<Array<IFamiliasInformacion>>(informacionInicial);

  //TODO:Cambiar estado a contexto
  const btnPasarClick = (): void => {
    if (index < largoLista - 1) {
      setIndex(index + 1);
      setFamiliaActiva(listaFamiliaProductos[index + 1]);
     }
  };

  const btnRetrocederClick = (e:Event): void => {
    if (index > 0) {
      console.log(e);
      setIndex(index - 1);
      setFamiliaActiva(listaFamiliaProductos[index - 1]);
    }
  };

  const handleCambioValor = (campo: keyof IFamiliaProducto, valor:any) =>{
    const nuevosValores = [...valoresForm];
    nuevosValores[index] = {...nuevosValores[index], [campo]:valor};
    setValoresForm(nuevosValores);
  }

  return (
    <article className={styles.root}>
      <Image
        block={false}
        src={require('../assets/glymax.png')}
        alt={'Logo de Glymax Paraguay S.A.'}
        width={'150px'}
      />
      <Title1 align="center">Monitoreo del Mercado</Title1>
      <CabeceraForm
        listaClientes={listaClientes}
        listaUnidades={listaUnidades}
      />
      <FormularioProductos Id={familiaActiva.Id} Nombre={familiaActiva.Nombre} UnidadMedida={familiaActiva.UnidadMedida} handleCambioValor={handleCambioValor}/>
      <BotonesNavegacionPagina
        index={index}
        max={largoLista}
        avanzar={btnPasarClick}
        retroceder={btnRetrocederClick}
      />
    </article>
  );
};

export default FormMonitoreo;
