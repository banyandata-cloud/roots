import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './BaseButton.module.css';

// eslint-disable-next-line prefer-arrow-callback
const BaseButton = forwardRef(function BaseButton(props, ref) {
	const {
		className,
		component1,
		title,
		component3,
		size,
		flexible,
		radius,
		disabled,
		type,
		onClick,
		blurOnClick,
		variant,
	} = props;

	const Title = title && <span data-elem='title'>{title}</span>;

	return (
		<BaseCell
			className={classes(className, styles.root, styles[variant])}
			{...{
				ref,
				component1,
				component2: Title,
				component3,
				flexible,
				radius,
				size,
			}}
			attrs={{
				disabled,
				type,
				onClick: (event) => {
					if (blurOnClick) {
						event?.currentTarget?.blur();
					}
					onClick(event);
				},
			}}
			RootDOM='button'
		/>
	);
});

BaseButton.propTypes = {
	...BaseCell.propTypes,
	title: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	onClick: PropTypes.func,
	blurOnClick: PropTypes.bool,
	variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};

BaseButton.defaultProps = {
	...BaseCell.defaultProps,
	title: null,
	disabled: false,
	type: 'submit',
	onClick: () => {},
	blurOnClick: true,
	variant: 'contained',
};

export default BaseButton;
