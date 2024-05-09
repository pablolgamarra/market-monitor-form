import * as React from "react";
import { 
	Select,
	makeStyles,
	shorthands
} from "@fluentui/react-components";
import { IDropdownVolumen } from "./interfaces/IDropdownVolumen";

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

const volumenes:string[] = new Array<string>;

	for(let i:number = 0; i <= 100; i+=10){
		volumenes.push(`${i}%`);
	}

const DropdownVolumen:React.FC<IDropdownVolumen>= (props) => {
	const {
		label, placeholder, id, name, value, onChange
	} = props;

	const styles = useStyles();

	return (
		<div className={styles.root}>
			<label htmlFor={name}>{label}</label>
			<Select name={name} id={id} placeholder={placeholder} onChange={onChange} value={value} >
				<option value={'defaults'}>
					Seleccionar volumen ya comprado
				</option>
				{volumenes.map((volumen) => (
					<option value={volumen} key={volumen}>
						{volumen}
					</option>
				))}
			</Select>
		</div>
	);
}

export default DropdownVolumen;