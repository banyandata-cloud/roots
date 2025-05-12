import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './BaseButton.module.css';

// eslint-disable-next-line prefer-arrow-callback
const BaseButton = forwardRef(function BaseButton(props, ref) {
	const {
		className = '',
		component1,
		title,
		component3,
		size = 'sm',
		flexible,
		radius = 'default',
		disabled,
		id,
		type = 'submit',
		onClick = () => {},
		blurOnClick = true,
		variant = 'contained',
	} = props;

	const Title = title && <span data-elem='title'>{title}</span>;

	return (
		<BaseCell
			className={classes(styles.root, styles[variant], className)}
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
				id,
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

export default BaseButton;
