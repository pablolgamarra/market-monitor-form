import { Combobox, Field, Option } from '@fluentui/react-components';
import * as React from 'react';

interface ComboboxFieldProps {
	id: string;
	label: string;
	name: string;
	options: { id: string; name: string }[];
	value?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export const ComboboxField: React.FC<ComboboxFieldProps> = ({
	id,
	label,
	name,
	options,
	value,
	onOptionSelect,
	disabled,
}) => (
	<Field
		id={id}
		label={label}
		required
	>
		<Combobox
			id={`cbx-${id}`}
			name={name}
			value={value?.toString()}
			onOptionSelect={onOptionSelect}
			disabled={disabled}
		>
			{options.map(({ Id, Nombre }) => (
				<Option
					key={Id}
					value={Id.toString()}
				>
					{Nombre}
				</Option>
			))}
		</Combobox>
	</Field>
);
