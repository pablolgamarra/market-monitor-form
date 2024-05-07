import * as React from "react";
import { 
	Dropdown,
	Option,
	makeStyles,
	shorthands
} from "@fluentui/react-components";

import { IClientesList } from "./interfaces/IClientesList";

const useStyles = makeStyles({
	root:{
		display: "grid",
		opacity:"100%",
		gridTemplateRows: "repeat(1fr)",
		justifyItems: "start",
		...shorthands.gap("2px"),
		maxWidth:"400px",
	},
});

const DropDownCliente:React.FC<IClientesList> = (props) => {
	const {clientes} = props;

	const styles = useStyles();

	return (
		<div className={styles.root}>
			<label htmlFor="cliente">Cliente: </label>
			<Dropdown name='cliente' id='cliente' placeholder="Seleccione Cliente" inlinePopup={true}>
				{clientes.map((cliente) => (
					<Option value={cliente.Nombre} key={cliente.Id}>
						{cliente.Nombre}
					</Option>
				))}
			</Dropdown>
		</div>
	);
}

export default DropDownCliente;