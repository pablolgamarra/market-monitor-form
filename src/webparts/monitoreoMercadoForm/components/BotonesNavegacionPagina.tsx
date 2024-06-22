import * as React from 'react';
import { Body2, Button, makeStyles, Text } from '@fluentui/react-components';

import {
	ArrowLeftFilled,
	ArrowRightFilled,
	SaveRegular,
} from '@fluentui/react-icons';

import { IBotonesNavegacionPagina } from './interfaces/IBotonesNavegacionPagina';

const useStyles = makeStyles({
	NavegacionContainer: {
		display: 'flex',
		width: '100%',
		height: 'auto',
	},
	BotonesContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	Boton: {
		minWidth: '180px',
	},
	BotonRetroceso: {
		minWidth: '180px',
		marginRight: 'auto',
	},
});

const BotonesNavegacionPagina: React.FC<IBotonesNavegacionPagina> = (props) => {
	const { index, max, retroceder, avanzar } = props;
	const styles = useStyles();

	return (
		<section className={styles.NavegacionContainer}>
			<div className={`${styles.BotonesContainer}`}>
				{index > 0 && (
					<Button
						className={styles.BotonRetroceso + '' + styles.Boton}
						onClick={() => {
							retroceder();
						}}
						appearance='secondary'
						shape='rounded'
						icon={<ArrowLeftFilled />}
						iconPosition='before'
					>
						<Text size={400} weight={'semibold'}>Página Anterior</Text>
					</Button>
				)}
				<Body2>
					{index + 1} de {max}
				</Body2>
			</div>
			<div className={`${styles.BotonesContainer}`}>
				<Button
					className={`${styles.Boton}`}
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
					<Text size={400} weight={'semibold'}>
						{index + 1 === max ? 'Guardar' : 'Siguiente Página'}
					</Text>
				</Button>
			</div>
		</section>
	);
};

export default BotonesNavegacionPagina;
