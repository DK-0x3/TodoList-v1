import { ButtonHTMLAttributes, FC } from 'react';
import { ButtonSize } from './types';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
	fullWidth?: boolean;
	className?: string;
}

const Button: FC<IButtonProps> = ({
	children,
	size = 'medium',
	className,
	disabled,
	fullWidth,
	...props
}) => {
	return (
		<button
			className={classNames(
				styles.button,
				styles[size],
				{
					[styles.fullWidth]: fullWidth,
				},
				className
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;