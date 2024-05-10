import * as React from 'react';
import {
  Dropdown,
  Option,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import { IDropdownVolumen } from './interfaces/IDropdownVolumen';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    opacity: '100%',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
});

const volumenes: string[] = new Array<string>();

for (let i: number = 0; i <= 100; i += 10) {
  volumenes.push(`${i}%`);
}

const DropdownVolumen: React.FC<IDropdownVolumen> = (props) => {
  const { label, placeholder, id, name, value, onChange } = props;

  const styles = useStyles();

  const onCambioValor = React.useCallback(
    (_, e) => {
		onChange({name:'volumenComprado', value:e?.nextOption?.value});
    },
    [onChange]
  );

  return (
    <div className={styles.root}>
      <label htmlFor={name}>{label}</label>
      <Dropdown
        name={name}
        id={id}
        placeholder={placeholder}
        onActiveOptionChange={onCambioValor}
        value={value}
		inlinePopup={true}
		>
        {volumenes.map((volumen) => (
          <Option
            value={volumen}
            key={volumen}>
            {volumen}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default DropdownVolumen;
