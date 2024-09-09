import * as React from 'react';
import { useWpContext } from "@/hooks/useWpContext"
import { uploadData } from "@/services/uploadData"
import { Button } from "@fluentui/react-components"

const UploadDataButtons: React.FC = () => {
    const context = useWpContext()

    return (
        <>
            <Button onClick={() => uploadData('CNG', context)}>
                Subir CNGs a DB
            </Button>
            <Button onClick={() => uploadData('Familias Productos', context)}>
                Subir Familias de Producto
            </Button>
            <Button onClick={() => uploadData('Proveedores', context)}>
                Subir Proveedores
            </Button>
            <Button onClick={() => uploadData('Clientes', context)}>
                Subir Clientes
            </Button>
        </>
    )
}

export default UploadDataButtons