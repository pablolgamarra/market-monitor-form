import {
    Cliente,
    CNG,
    FamiliaProducto,
    PeriodoCultivo,
    Proveedor,
    Unidad,
} from 'src/webparts/marketMonitorForm/types';
import * as React from 'react';

interface DataProviderProps {
    listaClientes: Cliente[];
    listaUnidades: Unidad[];
    listaFamiliasProducto: FamiliaProducto[];
    listaProveedores: Proveedor[];
    listaPeriodosCultivo: PeriodoCultivo[];
    listaCNG: CNG[];
}

export const DataContext = React.createContext<DataProviderProps>(
    {} as DataProviderProps,
);

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({
    children,
    listaClientes,
    listaUnidades,
    listaFamiliasProducto,
    listaProveedores,
    listaPeriodosCultivo,
    listaCNG,
}: React.PropsWithChildren<DataProviderProps>) => {
    return (
        <DataContext.Provider
            value={{
                listaClientes: listaClientes,
                listaUnidades: listaUnidades,
                listaFamiliasProducto: listaFamiliasProducto,
                listaProveedores: listaProveedores,
                listaPeriodosCultivo: listaPeriodosCultivo,
                listaCNG: listaCNG,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataContext.displayName = 'DataContext';
DataProvider.displayName = 'DataProvider';
