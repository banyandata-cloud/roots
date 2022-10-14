import { forwardRef } from 'react';
import { classes } from '../../../utils';
import { Checkbox } from '../../input/checkbox';
import styles from './DropdownItem.module.css';

// eslint-disable-next-line prefer-arrow-callback
const DropdownItem = forwardRef(function DropdownItem(props, ref) {
	const { title, value, variant, selected, onKeyDown, dataAttrs } = props;

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
			className={classes(styles.root, selected ? styles.selected : '')}
			data-elem='dropdown-item'
			data-variant={variant}
			data-value={value}
			data-selected={selected}
			{...dataAttrs}
			tabIndex={0}
			role='option'
			aria-selected={selected}
			onKeyDown={onKeyDown}
			{...props}>
			{action}
			{title}
		</div>
	);
});

DropdownItem.defaultProps = {
	title: '',
	variant: 'default',
	dataAttrs: {},
};

export default DropdownItem;
