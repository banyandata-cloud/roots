import { createElement, forwardRef, type HTMLAttributes, isValidElement } from 'react';
import { classes } from '../../utils';
import styles from './Text.module.css';

type Variant = 'h1' | 'h2' | 'b1' | 'b2' | 'b3';
type ComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';
type Stroke = 'regular' | 'medium' | 'semibold' | 'bold';
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600;

interface TextProps {
	variant?: Variant;
	component?: ComponentType;
	stroke?: Stroke;
	weight?: FontWeight;
	italic?: boolean;
	underline?: boolean;
	children?: React.ReactNode;
	className?: string;
	attrs?: HTMLAttributes<HTMLElement>;
}

const Text = forwardRef<HTMLElement, TextProps>((props, ref): React.ReactElement | null => {
	const {
		variant = 'b2',
		component = 'span',
		stroke = 'regular',
		weight,
		italic,
		underline,
		children,
		className = '',
		attrs = {},
	} = props;

	const TextDOM = createElement(
		component,
		{
			ref,
			style: {
				...(italic && {
					fontStyle: 'italic',
				}),
				...(underline && {
					textDecoration: 'underline',
				}),
				...(weight && {
					fontWeight: weight,
				}),
			},
			className: classes(styles.root, styles[variant], styles[`${stroke}-stroke`], className),
			...attrs,
		},
		children
	);

	if (isValidElement(TextDOM)) {
		return TextDOM;
	}

	return null;
});

export default Text;
