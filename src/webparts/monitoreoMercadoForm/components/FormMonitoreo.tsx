import * as React from 'react';
import type { IFormMonitoreoProps } from './interfaces/IFormMonitoreoProps';
import CabeceraForm from './CabeceraForm';
import FormularioProductos from './FormularioProductos';
import {ArrowLeftFilled, ArrowRightFilled, SaveRegular} from '@fluentui/react-icons';

//import styles from './styles/MonitoreoMercadoForm.module.scss'

import { Button, Title1, Image, makeStyles, shorthands, Body1Strong } from '@fluentui/react-components';
import { Stack, StackItem } from '@fluentui/react';
import { IFamiliaProducto } from './interfaces/IFamiliaProducto';

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

const useStyles = makeStyles({
  root:{
    color: "#2C3C79",
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("1em"),
    ...shorthands.margin("5px"),
    "> img":{
      alignSelf: "center",
    }
  },
})

const ControlesPagina: React.FC<IControlesPagina> = (props) => {
  const { index, max, retroceder, avanzar } = props;

  let codigo:React.ReactElement;

  if (index !== 0) {
    if (index + 1 === max) {
      //TODO:Estilar los botones para que el tamaño no varie cuando se cambia el icono
      codigo=(
        <Stack horizontal horizontalAlign='space-around' verticalAlign='center' >
          <StackItem>
            <Button onClick={() => { retroceder() }} appearance='secondary' shape='rounded' icon={<ArrowLeftFilled />} iconPosition='before'>
              Página Anterior
            </Button>
          </StackItem>
          <StackItem>
            <Body1Strong>
              {index + 1} de {max}
            </Body1Strong>
          </StackItem>
          <StackItem>
            <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded' icon={<SaveRegular />} iconPosition='after'>
              Guardar
            </Button>
          </StackItem>
        </Stack>
      );
    } else {
      codigo=(
        <Stack horizontal horizontalAlign='space-around' verticalAlign='center'>
          <StackItem>
          <Button onClick={() => { retroceder() }} appearance='secondary' shape='rounded' icon={<ArrowLeftFilled/>} iconPosition='before'>
            Página Anterior
          </Button>

          </StackItem>
          <StackItem>
          <Body1Strong>
            {index + 1} de {max}
          </Body1Strong>

          </StackItem>
          <StackItem>
          <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded' icon={<ArrowRightFilled/>} iconPosition='after'>
            Página Siguiente
          </Button>
            
          </StackItem>
        </Stack>
      );
    }
  } else {
    codigo=(
      <Stack horizontal horizontalAlign='space-around' verticalAlign='center'>
        <StackItem>
          <Body1Strong>
            {index + 1} de {max}
          </Body1Strong>
        </StackItem>
        <StackItem>
          <Button onClick={() => { avanzar() }} appearance='primary' shape='rounded' icon={<ArrowRightFilled/>} iconPosition='after'>
            Página Siguiente
          </Button>
        </StackItem>
      </Stack>
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

  const styles = useStyles();

  const largoLista = listaFamiliaProductos.length;

  const [index, setIndex] = React.useState<number>(0);
  const [pagina, setPagina] = React.useState<IFamiliaProducto>(listaFamiliaProductos[0]);

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
    <article className={styles.root}>
      <Image block={false} src={require("../assets/glymax.png")} alt={"Logo de Glymax Paraguay S.A."} width={"150px"}/>
      <Title1 align='center'>Monitoreo del Mercado</Title1>
      <CabeceraForm listaClientes={listaClientes} listaUnidades={listaUnidades} />
      <FormularioProductos {...pagina} />
      <ControlesPagina index={index} max={largoLista} avanzar={btnPasarClick} retroceder={btnRetrocederClick} />
    </article>


  );
}

export default FormMonitoreo;