import * as React from "react";
import {Field, Input, makeStyles} from '@fluentui/react-components';

import {ICabeceraClientesProps} from './interfaces/ICabeceraClientesProps';

import DropDownCliente from "./DropDownCliente";
import DropDownUnidad from "./DropDownUnidad";

const useStyles = makeStyles({
    root:{
        display: "flex",
        flexDirection: "column",
        maxWidth:"400px"
    },
})

const CabeceraForm:React.FC<ICabeceraClientesProps> = (props) => {
    const {listaUnidades, listaClientes} = props;
    
    const styles = useStyles();

    return(
            <section className={styles.root}>
                <DropDownUnidad unidades={listaUnidades}/>
                <DropDownCliente clientes={listaClientes}/>
                <Field label="Año de Zafra" color={styles.root}>
                    <Input defaultValue="2024/2025" disabled={true}/>   
                </Field>
            </section>
        );

}

export default CabeceraForm;