import React from 'react';
import {
	DataGrid,
	DataGridHeaderCell,
	DataGridCell,
	TableColumnDefinition,
	createTableColumn,
	makeStyles,
	shorthands,
	DataGridHeader,
	DataGridRow,
	DataGridBody,
} from '@fluentui/react-components';
import { Cliente } from '@clientes/types';

const useStyles = makeStyles({
	gridContainer: {
		...shorthands.padding('20px'),
		backgroundColor: '#f3f2f1', // Color de fondo claro
		...shorthands.borderRadius('8px'),
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Sombra ligera
	},
	headerCell: {
		fontWeight: 'bold',
		backgroundColor: '#0078d4', // Color del encabezado
		color: 'white', // Texto en blanco
		...shorthands.padding('10px'),
		textAlign: 'left',
	},
	cell: {
		...shorthands.padding('8px'),
		...shorthands.borderBottom('1px solid #ddd'), // Línea divisoria entre celdas
		color: '#333', // Color del texto de las celdas
	},
	row: {
		'&:hover': {
			backgroundColor: '#e1e1e1', // Color de fondo al pasar el cursor
		},
	},
});

const ClientsList: React.FC<{ clientes: Cliente[] }> = (props) => {
	const { clientes } = props;

	const styles = useStyles(); // Usar los estilos

	const columns: TableColumnDefinition<Cliente>[] = [
		createTableColumn({
			columnId: 'nombre',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Nombre Cliente
				</DataGridHeaderCell>
			),
			renderCell: (item: Cliente) => (
				<DataGridCell className={styles.cell}>
					{item.Nombre}
				</DataGridCell>
			),
		}),
		createTableColumn({
			columnId: 'codigoSap',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Código SAP
				</DataGridHeaderCell>
			),
			renderCell: (item: Cliente) => (
				<DataGridCell className={styles.cell}>
					{item.CodigoSAP}
				</DataGridCell>
			),
		}),
		createTableColumn({
			columnId: 'sucursal',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Sucursal
				</DataGridHeaderCell>
			),
			renderCell: (item: Cliente) => (
				<DataGridCell className={styles.cell}>
					{item.Unidad?.Nombre}
				</DataGridCell>
			),
		}),
		createTableColumn({
			columnId: 'cng',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					ID CNG
				</DataGridHeaderCell>
			),
			renderCell: (item) => (
				<DataGridCell className={styles.cell}>
					{item.CNG?.Nombre}
				</DataGridCell>
			),
		}),
		createTableColumn({
			columnId: 'anio',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Año
				</DataGridHeaderCell>
			),
			renderCell: (item) => (
				<DataGridCell className={styles.cell}>{item.Anho}</DataGridCell>
			),
		}),
	];

	return (
		<div className={styles.gridContainer}>
			<DataGrid
				items={clientes}
				columns={columns}
			>
				<DataGridHeader>
					<DataGridRow
						selectionCell={{
							checkboxIndicator: {
								'aria-label': 'Select all rows',
							},
						}}
					>
						{({ renderHeaderCell }) => (
							<DataGridHeaderCell>
								{renderHeaderCell()}
							</DataGridHeaderCell>
						)}
					</DataGridRow>
				</DataGridHeader>
				<DataGridBody<Cliente>>
					{({ item, rowId }) => (
						<DataGridRow<Cliente>
							key={rowId}
							selectionCell={{
								checkboxIndicator: {
									'aria-label': 'Select row',
								},
							}}
						>
							{({ renderCell }) => (
								<DataGridCell>{renderCell(item)}</DataGridCell>
							)}
						</DataGridRow>
					)}
				</DataGridBody>
			</DataGrid>
		</div>
	);
};

export default ClientsList;
