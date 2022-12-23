import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../../utils';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../radio';
import styles from './DropdownItem.module.css';

// eslint-disable-next-line prefer-arrow-callback
const DropdownItem = forwardRef(function DropdownItem(props, ref) {
	// eslint-disable-next-line object-curly-newline
	const {
		title,
		value,
		variant,
		selected,
		onKeyDown,
		onMouseEnter,
		onClick,
		dataAttrs,
		className,
		tabIndex,
	} = props;

	let action = null;

	switch (variant) {
		case 'checkbox':
			action = <Checkbox className={styles.input} checked={selected} disabled />;
			break;
		case 'radio':
			action = <Radio className={styles.input} checked={selected} disabled />;
			break;
		default:
			break;
	}

	return (
		<li
			ref={ref}
			className={classes(className, styles.root, selected ? styles.selected : '')}
			data-elem='dropdown-item'
			data-variant={variant}
			data-value={value}
			data-selected={selected}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			{...{
				...dataAttrs,
			}}
			tabIndex={tabIndex}
			role='option'
			aria-selected={selected}
			onKeyDown={onKeyDown}>
			{action}
			<span data-elem='title'>{title}</span>
		</li>
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
