/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils/utils';
import { BaseButton } from '../baseButton';
import styles from './Button.module.css';

// eslint-disable-next-line prefer-arrow-callback
const Button = forwardRef(function Button(props, ref) {
	const {
		className,
		type,
		leftComponent: LeftComponent,
		title,
		rightComponent: RightComponent,
		size,
		flexible,
		radius,
		disabled,
		onClick,
		blurOnClick,
		variant,
		color,
	} = props;

	return (
		<BaseButton
			{...{
				ref,
				type,
				component1: LeftComponent && <LeftComponent />,
				title,
				component3: RightComponent && <RightComponent />,
				size,
				flexible,
				radius,
				disabled,
				onClick,
				blurOnClick,
				variant,
			}}
			className={classes(
				styles.root,
				styles[`radius-${radius}`],
				styles[variant],
				styles[color],
				className
			)}
		/>
	);
});

Button.propTypes = {
	...BaseButton.propTypes,
	color: PropTypes.oneOf(['primary', 'success', 'danger', 'warning']),
	leftComponent: PropTypes.node,
	rightComponent: PropTypes.node,
};

Button.defaultProps = {
	...BaseButton.defaultProps,
	color: 'primary',
	leftComponent: null,
	rightComponent: null,
	radius: 'default',
};

export default Button;
