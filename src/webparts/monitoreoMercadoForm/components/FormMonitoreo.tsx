import * as React from 'react';
import type { IFormMonitoreoProps } from './interfaces/IFormMonitoreoProps';
import CabeceraForm from './CabeceraForm';
import FormularioProductos from './FormularioProductos';
import { IFormularioProductosProps } from './interfaces/IFormularioProductosProps';

import styles from './styles/MonitoreoMercadoForm.module.scss'

import { Button } from '@fluentui/react-components';

export interface IFuncionBtn{
  ():void;
}

export interface IControlesPagina{
  index:number,
  max:number,
  retroceder: IFuncionBtn,
  avanzar: IFuncionBtn
}

const ControlesPagina: React.FC<IControlesPagina> = (props) => {
  const { index, max, retroceder, avanzar } = props;

  let codigo:React.ReactElement;

  if (index !== 0) {
    if (index + 1 === max) {
      codigo=(
        <section>
          <Button onClick={() => { retroceder() }} appearance='secondary' shape='rounded'>
            Página Anterior
          </Button>
          <p>
            {index + 1} de {max}
          </p>
          <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded'>
            Guardar
          </Button>
        </section>
      );
    } else {
      codigo=(
        <section>
          <Button onClick={() => { retroceder() }} appearance='secondary' shape='rounded'>
            Página Anterior
          </Button>
          <p>
            {index + 1} de {max}
          </p>
          <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded'>
            Página Siguiente
          </Button>
        </section>
      );
    }
  } else {
    codigo=(
      <section>
        <p>
          {index + 1} de {max}
        </p>
        <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded'>
          Página Siguiente
        </Button>
      </section>
    );
  }
  return codigo;
}

const MonitoreoMercadoForm: React.FC<IFormMonitoreoProps> = (props) => {
  const {
    listaClientes,
    listaUnidades,
    listaFamiliaProductos
  } = props;


  const [index, setIndex] = React.useState<number>(0)
  const [pagina, setPagina] = React.useState<IFormularioProductosProps>(listaFamiliaProductos[0])

  const largoLista = listaFamiliaProductos.length;

  const btnPasarClick = (): void => {
    if (index < largoLista - 1) {
      setIndex(index + 1)
      setPagina(listaFamiliaProductos[index + 1]);
    }
  }

  const btnRetrocederClick = (): void => {
    if (index > 0) {
      setIndex(index - 1)
      setPagina(listaFamiliaProductos[index - 1]);
    }
  }

  return (
    <article className={styles.monitoreoMercadoForm}>
      <h1 className={styles.formTitle}>Monitoreo del Mercado</h1>
      <CabeceraForm listaClientes={listaClientes} listaUnidades={listaUnidades} />
      <FormularioProductos {...pagina} />
      <ControlesPagina index={index} max={largoLista} avanzar={btnPasarClick} retroceder={btnRetrocederClick} />
    </article>


  );
}

export default MonitoreoMercadoForm;