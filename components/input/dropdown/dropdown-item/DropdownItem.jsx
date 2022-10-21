import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../../utils';
import { Checkbox } from '../../checkbox';
import styles from './DropdownItem.module.css';

// eslint-disable-next-line prefer-arrow-callback
const DropdownItem = forwardRef(function DropdownItem(props, ref) {
	// eslint-disable-next-line object-curly-newline
	const { title, value, variant, selected, onKeyDown, onClick, dataAttrs, className } = props;

	let action = null;

	switch (variant) {
		case 'checkbox':
			action = <Checkbox checked={selected} />;
			break;
		case 'radio':
			action = <input type='radio' />;
			break;
		default:
			break;
	}

	return (
		<div
			ref={ref}
			className={classes(className, styles.root, selected ? styles.selected : '')}
			data-elem='dropdown-item'
			data-variant={variant}
			data-value={value}
			data-selected={selected}
			onClick={onClick}
			{...{
				...dataAttrs,
			}}
			tabIndex={0}
			role='option'
			aria-selected={selected}
			onKeyDown={onKeyDown}>
			{action}
			<span data-elem='title'>{title}</span>
		</div>
	);
});

DropdownItem.propTypes = {
	className: PropTypes.string,
	title: PropTypes.node,
	variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
	selected: PropTypes.bool,
	// eslint-disable-next-line react/forbid-prop-types
	dataAttrs: PropTypes.object,
};

DropdownItem.defaultProps = {
	className: '',
	title: '',
	variant: 'default',
	dataAttrs: {},
	selected: false,
};

export default DropdownItem;
