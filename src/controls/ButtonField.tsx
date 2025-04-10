import React, { FC } from 'react';

import { Button, Field } from '@fluentui/react-components';

export interface ButtonFieldProps {
	fieldClassName?: string;
	buttonClassName?: string;
	appearance?: 'subtle' | 'outline' | 'secondary' | 'primary' | 'transparent';
	type: 'button' | 'submit' | 'reset';
	label?: string;
	text: string;
	name: string;
	id?: string;
	disabled?: boolean;
	handleClick: (name: string, ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonField: FC<ButtonFieldProps> = ({
	fieldClassName,
	buttonClassName,
	appearance,
	type,
	label,
	text,
	id,
	disabled,
	name,
	handleClick,
}) => {
	return (
		<Field
			label={label}
			className={fieldClassName}
		>
			<Button
				id={id}
				name={name}
				disabled={disabled}
				className={buttonClassName}
				appearance={appearance}
				type={type}
				value={text}
				onClick={(ev) => handleClick(name, ev)}
			>
				{text}
			</Button>
		</Field>
	);
};
