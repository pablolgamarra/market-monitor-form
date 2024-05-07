import * as React from "react";
import { 
	Dropdown,
	Option,
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
		label, placeholder, id
	} = props;

	const styles = useStyles();

	return (
		<div className={styles.root}>
			<label htmlFor='volumen'>{label}</label>
			<Dropdown name='volumen' id={id} placeholder={placeholder} inlinePopup={true}>
				{volumenes.map((volumen) => (
					<Option value={volumen} key={volumen}>
						{volumen}
					</Option>
				))}
			</Dropdown>
		</div>
	);
}

export default DropdownVolumen;