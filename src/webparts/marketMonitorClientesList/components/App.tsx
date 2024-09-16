import React from 'react';
import { DataGrid, DataGridHeaderCell, DataGridCell, TableColumnDefinition, createTableColumn } from '@fluentui/react-components';
import { Cliente } from '@clientes/types';

export interface AppProps {
    clientes: Cliente[]
}

const App: React.FC<AppProps> = (props) => {
    const { clientes } = props

    const columns: TableColumnDefinition<Cliente>[] = [
        createTableColumn({ columnId: 'nombre', renderHeaderCell: () => <DataGridHeaderCell>Nombre Cliente</DataGridHeaderCell>, renderCell: (item: Cliente) => <DataGridCell>{item.Nombre}</DataGridCell> }),
        createTableColumn({ columnId: 'codigoSap', renderHeaderCell: () => <DataGridHeaderCell>Código SAP</DataGridHeaderCell>, renderCell: (item: Cliente) => <DataGridCell>{item.CodigoSAP}</DataGridCell> }),
        createTableColumn({ columnId: 'sucursal', renderHeaderCell: () => <DataGridHeaderCell>Sucursal</DataGridHeaderCell>, renderCell: (item: Cliente) => <DataGridCell>{item.Unidad}</DataGridCell> }),
        createTableColumn({ columnId: 'cng', renderHeaderCell: () => <DataGridHeaderCell>ID CNG</DataGridHeaderCell>, renderCell: (item: Cliente) => <DataGridCell>{item.CNG}</DataGridCell> }),
        createTableColumn({ columnId: 'anio', renderHeaderCell: () => <DataGridHeaderCell>Año</DataGridHeaderCell>, renderCell: (item: Cliente) => <DataGridCell>{item.Anho}</DataGridCell> }),
    ];

    return <DataGrid items={clientes} columns={columns} />;
};

export default App;
