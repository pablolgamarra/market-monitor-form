import * as React from 'react';

import { Field, Radio, RadioGroup, RadioGroupOnChangeData } from '@fluentui/react-components';

export interface RadioGroupFieldProps {
	id: string;
	label: string;
	required: boolean;
	name: string;
	value: string;
	onChange: (name: string, value: RadioGroupOnChangeData) => void;
	options: { value: string; label: string }[];
	disabled: boolean;
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
	id,
	label,
	required,
	name,
	options,
	value,
	onChange,
	disabled,
}) => {
	return (
		<Field
			id={id}
			label={label}
			required={required}
		>
			<RadioGroup
				name={name}
				disabled={disabled}
				onChange={(e, data) => onChange(name, data)}
				value={value || ''}
			>
				{options.map((option) => (
					<Radio
						key={option.value}
						value={option.value}
						label={option.label}
					/>
				))}
			</RadioGroup>
		</Field>
	);
};
