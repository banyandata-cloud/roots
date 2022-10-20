import PropTypes from 'prop-types';
import styles from './Chip.module.css';
import { classes } from '../../../utils';
import { BaseButton } from '../baseButton';

const Chip = (props) => {
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
};

Chip.propTypes = {
	...BaseButton.propTypes,
	size: PropTypes.oneOf(['sm', 'md']),
	variant: PropTypes.oneOf(['status', 'input']),
	color: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'default']),
	leftComponent: PropTypes.func,
	rightComponent: PropTypes.func,
};

Chip.defaultProps = {
	...BaseButton.defaultProps,
	size: 'sm',
	variant: 'status',
	color: 'success',
	leftComponent: null,
	rightComponent: null,
	radius: 'default',
};

export default Chip;
