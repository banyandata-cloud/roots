/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { createElement, isValidElement, forwardRef } from 'react';
import { classes } from '../../utils';
import styles from './Text.module.css';

// eslint-disable-next-line prefer-arrow-callback
const Text = forwardRef(function Text(props, ref) {
	// eslint-disable-next-line object-curly-newline
	const { variant, component, stroke, weight, italic, underline, children, className, attrs } =
		props;

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
			className: classes(className, styles.root, styles[variant], styles[`${stroke}-stroke`]),
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

Text.defaultProps = {
	variant: 'b2',
	weight: null,
	component: 'span',
	stroke: 'regular',
	italic: false,
	underline: false,
	className: '',
	attrs: {},
};
export default Text;
