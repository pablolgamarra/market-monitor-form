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
import { CNG } from '@cngs/types';

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

const CngsList: React.FC<{ cngs: CNG[] }> = (props) => {
	const { cngs } = props;

	const styles = useStyles(); // Usar los estilos

	const columns: TableColumnDefinition<CNG>[] = [
		createTableColumn({
			columnId: 'nombre',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Nombre CNG
				</DataGridHeaderCell>
			),
			renderCell: (item: CNG) => (
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
			renderCell: (item: CNG) => (
				<DataGridCell className={styles.cell}>
					{item.CodigoSAP}
				</DataGridCell>
			),
		}),
		createTableColumn({
			columnId: 'correo',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Correo
				</DataGridHeaderCell>
			),
			renderCell: (item: CNG) => (
				<DataGridCell className={styles.cell}>
					{item.Correo}
				</DataGridCell>
			),
		}),
		createTableColumn({
			columnId: 'codigosap',
			renderHeaderCell: () => (
				<DataGridHeaderCell className={styles.headerCell}>
					Codigo SAP
				</DataGridHeaderCell>
			),
			renderCell: (item) => (
				<DataGridCell className={styles.cell}>
					{item.CodigoSAP}
				</DataGridCell>
			),
		}),
	];

	return (
		<div className={styles.gridContainer}>
			<DataGrid
				items={cngs}
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
				<DataGridBody<CNG>>
					{({ item, rowId }) => (
						<DataGridRow<CNG>
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

export default CngsList;
