/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { createElement, forwardRef, isValidElement } from 'react';
import { classes } from '../../utils';
import styles from './BaseCell.module.css';

export const BaseCell = forwardRef((props, ref) => {
	const {
		className = '',
		size = 'sm',
		flexible,
		rounded,
		component1,
		component2,
		component3,
		RootDOM = 'div',
		attrs = {},
		radius,
	} = props;

	const Component = createElement(
		RootDOM,
		{
			'data-elem': 'base-cell',
			ref,
			className: classes(
				styles.root,
				styles[size],
				radius ? styles[`border-radius-${radius}`] : '',
				flexible ? styles.flexible : '',
				rounded ? styles.rounded : '',
				className
			),
			...attrs,
		},
		<>
			{component1 && <span data-elem='component1'>{component1}</span>}
			{component2 && <span data-elem='component2'>{component2}</span>}
			{component3 && <span data-elem='component3'>{component3}</span>}
		</>
	);

	if (isValidElement(Component)) {
		return Component;
	}
	return null;
});

BaseCell.propTypes = {
	className: PropTypes.string,
	component1: PropTypes.element,
	component2: PropTypes.element,
	component3: PropTypes.element,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'auto']),
	flexible: PropTypes.bool,
	radius: PropTypes.oneOf(['none', 'default', 'round', 'ellipse']),
	RootDOM: PropTypes.oneOf(['div', 'span', 'button', 'td']),
	attrs: PropTypes.object,
};

export default BaseCell;
