import {
	createElement,
	forwardRef,
	isValidElement,
	type ReactElement,
	type RefObject,
} from 'react';
import { classes } from '../../utils';
import styles from './Text.module.css';
import type { TextProps } from './types';

const Text = forwardRef<RefObject<HTMLElement>, TextProps>((props, ref): ReactElement | null => {
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
