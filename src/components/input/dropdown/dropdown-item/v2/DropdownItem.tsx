import { forwardRef, type ReactNode } from 'react';
import { classes } from '../../../../../utils';
import { CheckedIcon, InfoIcon } from '../../../../icons';
import { Tooltip } from '../../../../tooltip';
import { Checkbox } from '../../../checkbox';
import { Radio } from '../../../radio';
import styles from './DropdownItem.module.css';
import type { DropdownItemProps } from './types';

const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>((props, ref) => {
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
		intermediate = false,
		customComponent,
	} = props;

	let action: ReactNode = null;

	switch (variant) {
		case 'checkbox':
			action = (
				<Checkbox
					v2
					className={styles.input}
					checked={!!selected}
					intermediate={intermediate}
					disabledAsChild
				/>
			);
			break;
		case 'radio':
			action = (
				<Radio
					className={styles.input}
					checked={!!selected}
					disabled={!!disabled || !!error}
				/>
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
			{...(dataAttrs ?? {})}
			tabIndex={tabIndex}
			role='option'
			aria-selected={!!selected}
			onKeyDown={onKeyDown}>
			{action}
			{customComponent ?? (
				<span className={styles.title} data-elem='title'>
					<span>{title}</span>
					{selected && variant !== 'checkbox' && (
						<span className={styles.icon}>
							<CheckedIcon className={styles['info-icon']} />
						</span>
					)}
					{error && (
						<Tooltip
							content={error}
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
