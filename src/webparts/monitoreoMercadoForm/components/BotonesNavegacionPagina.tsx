import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react';
import { Body1Strong, Button } from '@fluentui/react-components';
import {
  ArrowLeftFilled,
  ArrowRightFilled,
  SaveRegular,
} from '@fluentui/react-icons';

import { IBotonesNavegacionPagina } from './interfaces/IBotonesNavegacionPagina';

const BotonesNavegacionPagina: React.FC<IBotonesNavegacionPagina> = (props) => {
  const { index, max, retroceder, avanzar } = props;

  let codigo: React.ReactElement;

  if (index !== 0) {
    if (index + 1 === max) {
      //TODO:Estilar los botones para que el tamaño no varie cuando se cambia el icono
      codigo = (
        <Stack
          horizontal
          horizontalAlign="space-around"
          verticalAlign="center">
          <StackItem>
            <Button
              onClick={() => {
                retroceder();
              }}
              appearance="secondary"
              shape="rounded"
              icon={<ArrowLeftFilled />}
              iconPosition="before">
              Página Anterior
            </Button>
          </StackItem>
          <StackItem>
            <Body1Strong>
              {index + 1} de {max}
            </Body1Strong>
          </StackItem>
          <StackItem>
            <Button
              onClick={() => {
                avanzar();
              }}
              appearance="primary"
              shape="rounded"
              icon={<SaveRegular />}
              iconPosition="after">
              Guardar
            </Button>
          </StackItem>
        </Stack>
      );
    } else {
      codigo = (
        <Stack
          horizontal
          horizontalAlign="space-around"
          verticalAlign="center">
          <StackItem>
            <Button
              onClick={() => {
                retroceder();
              }}
              appearance="secondary"
              shape="rounded"
              icon={<ArrowLeftFilled />}
              iconPosition="before">
              Página Anterior
            </Button>
          </StackItem>
          <StackItem>
            <Body1Strong>
              {index + 1} de {max}
            </Body1Strong>
          </StackItem>
          <StackItem>
            <Button
              onClick={() => {
                avanzar();
              }}
              appearance="primary"
              shape="rounded"
              icon={<ArrowRightFilled />}
              iconPosition="after">
              Página Siguiente
            </Button>
          </StackItem>
        </Stack>
      );
    }
  } else {
    codigo = (
      <Stack
        horizontal
        horizontalAlign="space-around"
        verticalAlign="center">
        <StackItem>
          <Body1Strong>
            {index + 1} de {max}
          </Body1Strong>
        </StackItem>
        <StackItem>
          <Button
            onClick={() => {
              avanzar();
            }}
            appearance="primary"
            shape="rounded"
            icon={<ArrowRightFilled />}
            iconPosition="after">
            Página Siguiente
          </Button>
        </StackItem>
      </Stack>
    );
  }

  return codigo;
};

export default BotonesNavegacionPagina;
