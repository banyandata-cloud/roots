/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils/utils';
import { BaseButton } from '../baseButton';
import styles from './Button.module.css';

/**
 * Renders a customized button component wrapped in an ErrorBoundary component.
 *
 * @param {string} className - The CSS class name for the button.
 * @param {string} type - The type attribute for the button element.
 * @param {React.Component} leftComponent - The component to be rendered on the left side of the button.
 * @param {string} title - The text to be displayed as the button's title.
 * @param {React.Component} rightComponent - The component to be rendered on the right side of the button.
 * @param {string} size - The size variant of the button.
 * @param {boolean} flexible - Whether the button should have flexible width.
 * @param {string} radius - The border radius variant of the button.
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {function} onClick - The event handler for the button's click event.
 * @param {boolean} blurOnClick - Whether the button should lose focus after being clicked.
 * @param {string} variant - The variant style of the button.
 * @param {string} color - The color variant of the button.
 * @param {React.Component} custom - A custom component to be rendered instead of the default error boundary fallback.
 * @returns {JSX.Element} - The rendered BaseButton component wrapped in an ErrorBoundary component.
 */
const Button = forwardRef((props, ref) => {
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
		id,
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
				id,
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
