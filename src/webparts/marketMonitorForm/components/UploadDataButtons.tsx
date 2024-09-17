import * as React from 'react';
import { useWpContext } from "src/webparts/marketMonitorForm/hooks/useWpContext"
import { uploadData } from "src/webparts/marketMonitorForm/services/uploadData"
import { Button } from "@fluentui/react-components"
import { Cliente, CNG, FamiliaProducto, PeriodoCultivo, Proveedor, Unidad } from 'src/webparts/marketMonitorForm/types';
import { useDataContext } from 'src/webparts/marketMonitorForm/hooks/useData';

export interface UploadDataButtonsProps {
    listaClientes: Cliente[];
    listaUnidades: Unidad[];
    listaFamiliasProducto: FamiliaProducto[];
    listaProveedores: Proveedor[];
    listaPeriodosCultivo: PeriodoCultivo[];
    listaCNG: CNG[];
}

const UploadDataButtons: React.FC<UploadDataButtonsProps> = (props) => {
    const { listaClientes, listaFamiliasProducto, listaProveedores, listaCNG } = useDataContext()

    const context = useWpContext()

    return (
        <>
            <Button
                onClick={() => uploadData('CNG', context)}
                disabled={listaCNG.length > 0}
            >
                Subir CNGs a DB
            </Button>
            <Button
                onClick={() => uploadData('Familias Productos', context)}
                disabled={listaFamiliasProducto.length > 0}
            >
                Subir Familias de Producto
            </Button>
            <Button
                onClick={() => uploadData('Proveedores', context)}
                disabled={listaProveedores.length > 0}
            >
                Subir Proveedores
            </Button>
            <Button
                onClick={() => uploadData('Clientes', context)}
                disabled={listaClientes.length > 0}
            >
                Subir Clientes
            </Button>
        </>
    )
}

export default UploadDataButtons