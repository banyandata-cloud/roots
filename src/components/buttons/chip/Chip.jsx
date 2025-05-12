import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { BaseButton } from '../baseButton';
import styles from './Chip.module.css';

const Chip = forwardRef((props, ref) => {
	const {
		className = '',
		type = 'button',
		leftComponent: LeftComponent,
		title,
		rightComponent: RightComponent,
		size = 'sm',
		flexible,
		radius = 'default',
		disabled,
		onClick = () => {},
		variant = 'status',
		color = 'default',
	} = props;

	return (
		<BaseButton
			{...{
				ref,
				type,
				component1: LeftComponent && <LeftComponent />,
				title,
				component3: RightComponent && <RightComponent />,
				size: 'auto',
				flexible,
				radius,
				disabled,
				onClick,
				variant: 'contained',
			}}
			className={classes(
				styles.root,
				styles[`radius-${radius}`],
				styles[variant],
				styles[color],
				styles[size],
				className
			)}
		/>
	);
});

Chip.propTypes = {
	...BaseButton.propTypes,
	size: PropTypes.oneOf(['sm', 'md']),
	variant: PropTypes.oneOf(['status', 'input']),
	color: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'default']),
	leftComponent: PropTypes.func,
	rightComponent: PropTypes.func,
};

export default Chip;
