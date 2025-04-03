import { Dropdown, Field, OptionOnSelectData } from '@fluentui/react-components';
import * as React from 'react';

export interface DropdownFieldProps {
	id: string;
	label: string;
	name: string;
	placeholder: string;
	value?: string;
	required?: boolean;
	disabled: boolean;
	onSelect: (name: string, data: OptionOnSelectData) => void;
	className: string;
	options: { value: string; label: string }[];
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
	id,
	label,
	placeholder,
	name,
	value,
	required,
	disabled,
	onSelect,
	className,
	options,
}) => {
	return (
		<Field
			id={id}
			label={label}
			required={required}
			className={className}
		>
			<Dropdown
				id={id}
				name={name}
				placeholder={placeholder}
				onOptionSelect={(e, data) => onSelect(name, data)}
				value={value}
				disabled={disabled}
			/>
		</Field>
	);
};
