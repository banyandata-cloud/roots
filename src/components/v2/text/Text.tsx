import {
	createElement,
	forwardRef,
	isValidElement,
	type ReactElement,
	type RefObject,
} from 'react';
import { classes } from '../utils';
import styles from './Text.module.scss';
import type { TextProps } from './types';

const Text = forwardRef<RefObject<HTMLElement>, TextProps>((props, ref): ReactElement | null => {
	const {
		variant = 'body',
		component = 'span',
		stroke,
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
			},
			className: classes(
				styles.root,
				styles[variant],
				stroke && styles[`${stroke}-stroke`],
				className
			),
			...(attrs as Record<string, unknown>),
		},
		children
	);

	if (isValidElement(TextDOM)) {
		return TextDOM;
	}

	return null;
});

export default Text;
