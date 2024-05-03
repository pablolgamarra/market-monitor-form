import * as React from "react";
import { Dropdown, Field, Input, Label, Option, Title2, makeStyles, shorthands } from "@fluentui/react-components";

import { IFormularioProductosProps } from "./interfaces/IFormularioProductosProps";


const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		...shorthands.gap("2px"),
	},
})

const FormularioProductos: React.FC<IFormularioProductosProps> = (props) => {
	const {
		familiaProducto,
		idFamilia,
	} = props;

	const styles = useStyles();

	return (
		<section className={styles.root}>
			<Title2>{familiaProducto}</Title2>
			<form>
				<Field id={`${idFamilia}-vol-comprado`} label={"Volumen ya comprado"}>
					<Input id={`${idFamilia}-vol-comprado`} placeholder="Ingresar volumen comprado" />
				</Field>
				<Field id={`${idFamilia}-precio`} label={"Precio USD"}>
					<Input placeholder="Ingresar precio USD" />
				</Field>
				<Label htmlFor={`${idFamilia}-condicion-pago`}>Condición de Pago</Label>
				<Dropdown id={`${idFamilia}-condicion-pago`} name="condicion-pago">
					<Option value={"credito"}>Crédito</Option>
					<Option value={"contado"}>Contado</Option>
				</Dropdown >
				<Field label={"Proveedor Principal"}>
					<Input id={`${idFamilia}-proveedor-principal`} placeholder="Ingresar proveedor principal" />
				</Field>
			</form>
		</section>
	);
}

export default FormularioProductos;