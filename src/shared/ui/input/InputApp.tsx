import styles from './InputApp.module.scss';
import {FC, useState} from 'react';

interface IInputAppProps {
    className?: string;
    placeholder?: string;
    type?: string;
    onChange?: () => void;
	value?: string;
}

export const InputApp: FC<IInputAppProps> = (props) => {
	const {
		placeholder,
		className = '',
		onChange,
		value,
		...otherProps
	} = props;

	const [text, setText] = useState(value);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
		if (onChange) {
			onChange();
		}
	}

	return (
		<textarea
			{...otherProps}
			className={`${className} ${styles.InputApp}`}
			onChange={handleChange}
			placeholder={placeholder}
			value={text}
		/>
	);
};
