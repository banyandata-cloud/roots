import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './Chip.module.css';
import { ErrorBoundary } from 'react-error-boundary';
import { classes } from '../../../utils';
import { BaseButton } from '../baseButton';
import { ErrorBoundaryWrapper } from '../../errorBoundary';

// eslint-disable-next-line prefer-arrow-callback
const Chip = forwardRef(function Chip(props, ref) {
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
		custom,
	} = props;

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
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
		</ErrorBoundary>
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

Chip.defaultProps = {
	...BaseButton.defaultProps,
	size: 'sm',
	variant: 'status',
	color: 'default',
	leftComponent: null,
	rightComponent: null,
	radius: 'default',
};

export default Chip;
