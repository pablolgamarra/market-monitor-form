import * as React from 'react';
import { Stack, StackItem } from '@fluentui/react';
import { Body1Strong, Button} from '@fluentui/react-components';
import {
	ArrowLeftFilled,
	ArrowRightFilled,
	SaveRegular,
} from '@fluentui/react-icons';

import { IBotonesNavegacionPagina } from './interfaces/IBotonesNavegacionPagina';

const BotonesNavegacionPagina: React.FC<IBotonesNavegacionPagina> = (props) => {
	const { index, max, retroceder, avanzar } = props;

	return (
		<Stack
      horizontal
			verticalAlign='center'
      horizontalAlign='space-between'
			tokens={{ childrenGap: 10 }}
		>
			<Stack
      horizontal
      verticalAlign='center'
      >
				{index > 0 && (
					<StackItem align='start'>
						<Button
							onClick={() => {
								retroceder();
							}}
							appearance='secondary'
							shape='rounded'
							icon={<ArrowLeftFilled />}
							iconPosition='before'
						>
							Página Anterior
						</Button>
					</StackItem>
				)}
				<StackItem align={'center'} grow={true}>
					<Body1Strong align='center'>
						{index + 1} de {max}
					</Body1Strong>
				</StackItem>
			</Stack>
      <Stack
      horizontal
      horizontalAlign='end'
      verticalAlign='center'>
      <StackItem>
					<Button
						onClick={() => {
							avanzar();
						}}
						appearance='primary'
						shape='rounded'
						icon={
							index + 1 === max ? (
								<SaveRegular />
							) : (
								<ArrowRightFilled />
							)
						}
						iconPosition='after'
					>
						{index + 1 === max ? 'Guardar' : 'Siguiente Página'}
					</Button>
				</StackItem>
      </Stack>
		</Stack>
	);
};

export default BotonesNavegacionPagina;
