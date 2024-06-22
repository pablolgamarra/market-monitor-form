import * as React from 'react';

import {
  Title1,
  Image,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import type { IFormMonitoreoProps } from './interfaces/IFormMonitoreoProps';
import CabeceraForm from './CabeceraForm';
import FormularioProductos from './FormularioProductos';

import { IFamiliaProducto } from './interfaces/IFamiliaProducto';
import BotonesNavegacionPagina from './BotonesNavegacionPagina';
import { FamiliasValores } from './interfaces/FamiliasValores';
import { DatosValores } from './interfaces/DatosValores';

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
  const { listaClientes, listaUnidades, listaFamiliaProductos, onSave} = props;

  const styles = useStyles();

  const largoLista = listaFamiliaProductos.length;
  const estadoInicial: FamiliasValores = {
    idFamiliaProducto: listaFamiliaProductos[0].Id,
    precio: 0,
    volumenComprado: '',
    condicionPago: '',
    proveedorPrincipal: '',
  };

  const informacionInicial: FamiliasValores[] = new Array<FamiliasValores>(
    largoLista
  ).fill(estadoInicial, 0, largoLista);

  const [cliente, setCliente] = React.useState<number>(-1);
  const [unidad, setUnidad] = React.useState<number>(-1);

  const [index, setIndex] = React.useState<number>(0);
  const [familiaActiva, setFamiliaActiva] = React.useState<IFamiliaProducto>(listaFamiliaProductos[0]);
  const [valoresForm, setValoresForm] =
    React.useState<Array<FamiliasValores>>(informacionInicial);

  const actualizarFamilia = (index:number):IFamiliaProducto=>{
    return listaFamiliaProductos[index];
  }

  const actualizarValores = (valores:FamiliasValores[]):FamiliasValores[]=>{
    const prevValores=valores;
    const nuevosValores = [...prevValores];
    nuevosValores[index] = { ...nuevosValores[index], idFamiliaProducto: familiaActiva.Id };
    setValoresForm(nuevosValores);
    return nuevosValores;
  }

  const handleCambioValor = (
    campo: keyof FamiliasValores,
    valor: string | number
  ): void => {

    setValoresForm(prevValores => {
      const nuevosValores = [...prevValores];
      nuevosValores[index] = { ...nuevosValores[index], [campo]: valor };
      return nuevosValores;
    });
  };

  const handleCambioCliente = (idCliente:number|string):void=>{
    setCliente(idCliente as number);
  }

  const handleCambioUnidad= (idUnidad:number|string):void=>{
    setUnidad(idUnidad as number);
  }

  const reset = ():void => {
    setCliente(-1);
    setUnidad(-1);
    setIndex(0);
    setFamiliaActiva(listaFamiliaProductos[0]);
    setValoresForm(informacionInicial);
  }

  const btnPasarClick = (): void => {
    if (index < largoLista - 1) {
      const indexNuevo = index + 1;
      const familiaNueva = actualizarFamilia(indexNuevo);
      setFamiliaActiva(familiaNueva);
      setValoresForm(prevValores => {
        const nuevosValores = [...prevValores];
        nuevosValores[index] = { ...nuevosValores[index], idFamiliaProducto: familiaActiva.Id };
        return nuevosValores;
      });
      setIndex(indexNuevo);
    } else {
      const listaValoresProductos = actualizarValores(valoresForm);

      const dataGuardar:DatosValores[] = listaValoresProductos.map(
        (valoresProducto: FamiliasValores)  => ({
          idCliente: cliente,
          idUnidad: unidad,
          idFamilia: valoresProducto.idFamiliaProducto,
          volumenComprado: valoresProducto.volumenComprado,
          precio: valoresProducto.precio,
          condicionPago: valoresProducto.condicionPago,
          proveedorPrincipal: valoresProducto.proveedorPrincipal,
    }));
      dataGuardar.map((data:DatosValores)=>{
        onSave(data);
        reset();
      })
    }
  };

  const btnRetrocederClick = (): void => {
    if (index > 0) {
      const indexNuevo = index - 1;
      const familiaNueva = actualizarFamilia(indexNuevo);
      setFamiliaActiva(familiaNueva);
      setIndex(indexNuevo);
    }
  };

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
        handleCambioCliente={handleCambioCliente}
        handleCambioUnidad={handleCambioUnidad}
      />
      <FormularioProductos
        familia={familiaActiva}
        valores={valoresForm[index]}
        handleCambioValor={handleCambioValor}
      />
<<<<<<< HEAD
      <FormularioProductos Id={familiaActiva.Id} Nombre={familiaActiva.Nombre} UnidadMedida={familiaActiva.UnidadMedida} handleCambioValor={handleCambioValor}/>
=======
>>>>>>> 69ca604457d23766894531998e3892e037192545
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
