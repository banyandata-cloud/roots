import PropTypes from 'prop-types';
import { createElement, isValidElement } from 'react';
import { classes } from '../../utils';
import styles from './Text.module.css';

const Text = (props) => {
	const { variant, component, style, weight, italic, underline, children } = props;

	const TextDOM = createElement(
		component,
		{
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
			className: classes(styles.root, styles[variant], styles[`${style}-weight`]),
		},
		children
	);

	if (isValidElement(TextDOM)) {
		return TextDOM;
	}

	return null;
};

Text.propTypes = {
	variant: PropTypes.oneOf(['h1', 'h2', 'b1', 'b2', 'b3']),
	component: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
	weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600]),
	style: PropTypes.oneOf(['regular', 'medium', 'semibold', 'bold']),
	italic: PropTypes.bool,
	underline: PropTypes.bool,
};

Text.defaultProps = {
	variant: 'b2',
	weight: null,
	component: 'span',
	style: 'regular',
	italic: false,
	underline: false,
};
export default Text;
