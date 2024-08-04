import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../../../utils';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../radio';
import styles from './DropdownItemv2.module.css';
import { InfoIcon } from '../../../icons';
import { Tooltip } from '../../../tooltip';

// eslint-disable-next-line prefer-arrow-callback
const DropdownItem = forwardRef(function DropdownItem(props, ref) {
	// eslint-disable-next-line object-curly-newline
	const {
		title,
		value,
		variant,
		error,
		selected,
		onKeyDown,
		onMouseEnter,
		onClick,
		dataAttrs,
		className,
		tabIndex,
		disabled,
		customComponent,
	} = props;

	let action = null;

	switch (variant) {
		case 'checkbox':
			action = (
				<Checkbox
					className={styles.input}
					checked={selected}
					disabled={disabled || error}
				/>
			);
			break;
		case 'radio':
			action = (
				<Radio className={styles.input} checked={selected} disabled={disabled || error} />
			);
			break;
		default:
			break;
	}

	return (
		<li
			ref={ref}
			className={classes(
				styles.root,
				selected ? styles.selected : '',
				disabled ? styles.disabled : '',
				error ? styles.error : '',
				className
			)}
			data-elem='dropdown-item'
			data-variant={variant}
			data-value={value}
			data-selected={selected}
			onClick={!disabled && !error ? onClick : ''}
			onMouseEnter={onMouseEnter}
			{...{
				...dataAttrs,
			}}
			tabIndex={tabIndex}
			role='option'
			aria-selected={selected}
			onKeyDown={onKeyDown}>
			{action}
			{customComponent ?? (
				<span className={styles.title} data-elem='title'>
					<span>{title}</span>
					{error && (
						<Tooltip
							content={error ?? ''}
							position='top'
							className={styles.tooltip}
							variant='light'>
							<span className={styles.span}>
								<InfoIcon className={styles.icon} />
							</span>
						</Tooltip>
					)}
				</span>
			)}
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
	customComponent: PropTypes.node,
};

DropdownItem.defaultProps = {
	className: '',
	title: '',
	variant: 'default',
	dataAttrs: {},
	selected: false,
	customComponent: null,
};

export default DropdownItem;
