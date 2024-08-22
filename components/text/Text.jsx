/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { createElement, forwardRef, isValidElement } from 'react';
import { classes } from '../../utils';
import styles from './Text.module.css';

const Text = forwardRef((props, ref) => {
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

Text.propTypes = {
	variant: PropTypes.oneOf(['h1', 'h2', 'b1', 'b2', 'b3']),
	component: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a']),
	weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600]),
	stroke: PropTypes.oneOf(['regular', 'medium', 'semibold', 'bold']),
	italic: PropTypes.bool,
	underline: PropTypes.bool,
	className: PropTypes.string,
	attrs: PropTypes.object,
};

export default Text;
