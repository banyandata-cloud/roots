import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';
import { classes } from '../../../../utils';
import { InfoIcon } from '../../../icons';
import { Tooltip } from '../../../tooltip';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../radio';
import styles from './DropdownItem.module.css';
import type { ReactElement } from 'react';

type Variant = 'default' | 'checkbox' | 'radio';

interface DropdownItemProps {
	title?: ReactNode;
	value?: string | number;
	variant?: Variant;
	error?: string | boolean;
	selected?: boolean;
	onKeyDown?: KeyboardEventHandler<HTMLLIElement>;
	onMouseEnter?: MouseEventHandler<HTMLLIElement>;
	onClick?: MouseEventHandler<HTMLLIElement>;
	dataAttrs?: Record<string, any>;
	className?: string;
	tabIndex?: number;
	disabled?: boolean;
	customComponent?: ReactNode;
}

const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>(function DropdownItem(
	props,
	ref
): ReactElement {
	const {
		title = '',
		value,
		variant = 'default',
		error,
		selected = false,
		onKeyDown,
		onMouseEnter,
		onClick,
		dataAttrs = {},
		className = '',
		tabIndex,
		disabled,
		customComponent = null,
	} = props;

	let action: ReactNode = null;

	switch (variant) {
		case 'checkbox':
			action = (
				<Checkbox className={styles.input} checked={selected} disabled disabledAsChild />
			);
			break;
		case 'radio':
			action = (
				<Radio className={styles.input} checked={selected} disabled={disabled || !!error} />
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
			onClick={!disabled && !error ? onClick : undefined}
			onMouseEnter={onMouseEnter}
			{...dataAttrs}
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
							content={typeof error === 'string' ? error : ''}
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

export default DropdownItem;
