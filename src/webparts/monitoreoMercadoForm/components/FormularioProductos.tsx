import * as React from "react";
import { Dropdown, Field, Input, Option, Title2, makeStyles, shorthands } from "@fluentui/react-components";

import DropdownVolumen from "./DropDownVolumen";
import { IFamiliaProducto } from "./interfaces/IFamiliaProducto";


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

const FormularioProductos: React.FC<IFamiliaProducto> = (props) => {
	const {
		Id,
		Nombre,
		UnidadMedida
	} = props;

	const styles = useStyles();

	return (
		<section className={styles.root}>
			<Title2>{Nombre}</Title2>
			<form>
				<DropdownVolumen id={`${Id}-vol-comprado`} label={"Volumen ya comprado"} placeholder={"Seleccione Volumen"}/>
				<Field id={`${Id}-precio`} label={`Precio por ${UnidadMedida}`}>
					<Input placeholder={`Ingresar precio ${UnidadMedida}`} />
				</Field>
				<Field id={`${Id}-condicion-pago`} label={"Condición de Pago"}>
					<Dropdown id={`${Id}-condicion-pago`} inlinePopup={true} className="DpDown" placeholder="Condición de Pago">
						<Option value={"credito"}>Crédito</Option>
						<Option value={"contado"}>Contado</Option>
					</Dropdown >
				</Field>
				<Field label={"Proveedor Principal"}>
					<Input id={`${Id}-proveedor-principal`} placeholder="Ingresar proveedor principal" />
				</Field>
			</form>
		</section>
	);
}

export default FormularioProductos;