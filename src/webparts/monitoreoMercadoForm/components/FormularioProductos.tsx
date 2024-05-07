import * as React from "react";
import { Dropdown, Field, Input, Option, Title2, makeStyles, shorthands } from "@fluentui/react-components";

import { IFormularioProductosProps } from "./interfaces/IFormularioProductosProps";
import DropdownVolumen from "./DropDownVolumen";


const useStyles = makeStyles({
	root: {
		display:"flex",
		flexDirection:"column",
		justifyItems:"start",
		...shorthands.gap("2px"),
		...shorthands.margin("25px"),
		backgroundColor:""
	},
})

const FormularioProductos: React.FC<IFormularioProductosProps> = (props) => {
	const {
		familiaProducto,
		idFamilia
	} = props;

	const styles = useStyles();

	return (
		<section className={styles.root}>
			<Title2>{familiaProducto}</Title2>
			<form>
				<DropdownVolumen id={`${idFamilia}-vol-comprado`} label={"Volumen ya comprado"} placeholder={"Seleccione Volumen"}/>
				<Field id={`${idFamilia}-precio`} label={"Precio USD"}>
					<Input placeholder="Ingresar precio USD" />
				</Field>
				<Field id={`${idFamilia}-condicion-pago`} label={"Condición de Pago"}>
					<Dropdown id={`${idFamilia}-condicion-pago`} inlinePopup={true} className="DpDown" placeholder="Condición de Pago">
						<Option value={"credito"}>Crédito</Option>
						<Option value={"contado"}>Contado</Option>
					</Dropdown >
				</Field>
				<Field label={"Proveedor Principal"}>
					<Input id={`${idFamilia}-proveedor-principal`} placeholder="Ingresar proveedor principal" />
				</Field>
			</form>
		</section>
	);
}

export default FormularioProductos;