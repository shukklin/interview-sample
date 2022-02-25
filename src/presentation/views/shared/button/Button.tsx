import { cn } from '@bem-react/classname';
import React, { FunctionComponent, ReactNode } from 'react';

type ButtonProps = {
	className?: string;
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	readonly?: boolean;
};

const cnButton = cn('button');

export const Button: FunctionComponent<ButtonProps> = (props) => {
	return (
		<button
			type={props.type || 'button'}
			className={cnButton(undefined, [props.className])}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
