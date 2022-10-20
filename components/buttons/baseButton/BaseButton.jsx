import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { BaseCell } from '../../cell';
import styles from './BaseButton.module.css';

const BaseButton = (props) => {
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
		variant,
	} = props;

	const Title = title && <span data-elem='title'>{title}</span>;

	return (
		<BaseCell
			className={classes(className, styles.root, styles[variant])}
			{...{
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
				onClick,
			}}
			RootDOM='button'
		/>
	);
};

BaseButton.propTypes = {
	...BaseCell.propTypes,
	title: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	onClick: PropTypes.func,
	variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};

BaseButton.defaultProps = {
	...BaseCell.defaultProps,
	title: null,
	disabled: false,
	type: 'submit',
	onClick: () => {},
	variant: 'contained',
};

export default BaseButton;
