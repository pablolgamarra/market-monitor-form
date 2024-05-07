import * as React from 'react';
import type { IFormMonitoreoProps } from './interfaces/IFormMonitoreoProps';
import CabeceraForm from './CabeceraForm';
import FormularioProductos from './FormularioProductos';
import { IFormularioProductosProps } from './interfaces/IFormularioProductosProps';
import {ArrowLeftFilled, ArrowRightFilled, SaveRegular} from '@fluentui/react-icons';

import styles from './styles/MonitoreoMercadoForm.module.scss'

import { Button, Title1, Image } from '@fluentui/react-components';

export interface IFuncionBtn{
  ():void;
}

export interface IControlesPagina{
  index:number,
  max:number,
  retroceder: IFuncionBtn,
  avanzar: IFuncionBtn
}

export interface IFormData{
    FamiliaProducto:string,
    Precio:number,
    condicionPago:string,
    ProveedorPrincipal:string,
}

const ControlesPagina: React.FC<IControlesPagina> = (props) => {
  const { index, max, retroceder, avanzar } = props;

  let codigo:React.ReactElement;

  if (index !== 0) {
    if (index + 1 === max) {
      codigo=(
        <section>
          <Button onClick={() => { retroceder() }} appearance='secondary' shape='rounded' icon={<ArrowLeftFilled />} iconPosition='before'>
            Página Anterior
          </Button>
          <p>
            {index + 1} de {max}
          </p>
          <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded' icon={<SaveRegular />} iconPosition='after'>
            Guardar
          </Button>
        </section>
      );
    } else {
      codigo=(
        <section>
          <Button onClick={() => { retroceder() }} appearance='secondary' shape='rounded' icon={<ArrowLeftFilled/>} iconPosition='before'>
            Página Anterior
          </Button>
          <p>
            {index + 1} de {max}
          </p>
          <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded' icon={<ArrowRightFilled/>} iconPosition='after'>
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
        <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded' icon={<ArrowRightFilled/>} iconPosition='after'>
          Página Siguiente
        </Button>
      </section>
    );
  }
  return codigo;
}

const FormMonitoreo: React.FC<IFormMonitoreoProps> = (props) => {
  const {
    listaClientes,
    listaUnidades,
    listaFamiliaProductos
  } = props;

  const largoLista = listaFamiliaProductos.length;
  
  //const inicialForm = new Array<IFormData>(largoLista);

  const [index, setIndex] = React.useState<number>(0);
  const [pagina, setPagina] = React.useState<IFormularioProductosProps>(listaFamiliaProductos[0]);
  //const [formulario, setFormulario] = React.useState<Array<IFormData> >(inicialForm);

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
      <Image block={false} src={require("../assets/glymax.png")} alt={"Logo de Glymax Paraguay S.A."} width={"150px"}/>
      <Title1 align='center'>Monitoreo del Mercado</Title1>
      <CabeceraForm listaClientes={listaClientes} listaUnidades={listaUnidades} />
      <FormularioProductos {...pagina} />
      <ControlesPagina index={index} max={largoLista} avanzar={btnPasarClick} retroceder={btnRetrocederClick} />
    </article>


  );
}

export default FormMonitoreo;