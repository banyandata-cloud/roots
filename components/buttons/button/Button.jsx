/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import { classes } from '../../../utils/utils';
import { BaseButton } from '../baseButton';

const Button = (props) => {
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
		variant,
		color,
	} = props;

	return (
		<BaseButton
			{...{
				type,
				component1: LeftComponent && <LeftComponent />,
				title,
				component3: RightComponent && <RightComponent />,
				size,
				flexible,
				radius,
				disabled,
				onClick,
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
};

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
