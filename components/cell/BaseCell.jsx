import React, { createElement, isValidElement } from 'react';
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// import { createElement, isValidElement } from 'react';
import { classes } from '../../utils';
import styles from './BaseCell.module.css';

export const BaseCell = (props) => {
	const {
		className,
		size,
		flexible,
		rounded,
		component1,
		component2,
		component3,
		RootDOM,
		attrs,
		radius,
	} = props;

	const Component = createElement(
		RootDOM,
		{
			'data-elem': 'base-cell',
			className: classes(
				className,
				styles.root,
				styles[size],
				styles[`border-radius-${radius}`],
				flexible ? styles.flexible : '',
				rounded ? styles.rounded : ''
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
};

BaseCell.propTypes = {
	className: PropTypes.string,
	component1: PropTypes.element,
	component2: PropTypes.element,
	component3: PropTypes.element,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'auto']),
	flexible: PropTypes.bool,
	radius: PropTypes.oneOf(['none', 'default', 'round', 'ellipse']),
	RootDOM: PropTypes.oneOf(['div', 'span', 'button']),
	attrs: PropTypes.object,
};

BaseCell.defaultProps = {
	className: '',
	component1: null,
	component2: null,
	component3: null,
	size: 'sm',
	flexible: false,
	radius: 'none',
	RootDOM: 'div',
	attrs: {},
};

export default BaseCell;
