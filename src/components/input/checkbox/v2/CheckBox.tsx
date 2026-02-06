import React, { useRef, useState } from 'react';
import { classes, inputHelper } from '../../../../utils/utils';
import { CheckboxIcon } from '../../../icons';
import type { CheckboxProps, IconType } from '../types';
import styles from './CheckBox.module.css';

const getIcon = (checked?: boolean, intermediate?: boolean): IconType => {
	if (checked) {
		if (intermediate) return CheckboxIcon.Intermediate as IconType;
		return CheckboxIcon.Checked as IconType;
	}
	return CheckboxIcon.UnChecked as IconType;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
	const {
		label,
		onChange,
		defaultChecked,
		checked,
		position = 'right',
		size = 'sm',
		className = '',
		disabled,
		disabledAsChild,
		intermediate,
		readOnly,
		error,
	} = props;

	// Track controlled/uncontrolled mode once on first render
	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	// Uncontrolled state
	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Prefer your helper if present; fall back to standard target.checked for type safety
		const helperResult = (
			inputHelper as unknown as (
				e: React.ChangeEvent<HTMLInputElement>
			) => { fieldValue?: boolean } | undefined
		)(event);
		const fieldValue = helperResult?.fieldValue ?? event.target.checked;

		if (isControlled) {
			onChange?.(event, fieldValue);
		} else {
			setUncontrolledChecked(fieldValue);
		}
	};

	const isChecked: boolean | undefined = isControlled ? checked : uncontrolledChecked;
	const Icon = getIcon(isChecked, intermediate);

	return (
		<label
			className={classes(
				styles.root,
				styles[`position-${position}`],
				disabled && !disabledAsChild ? styles.disabled : '',
				disabled && isChecked ? styles['disabled-checked'] : '',
				readOnly ? styles['read-only'] : '',
				error ? styles.error : '',
				error && isChecked ? styles['error-checked'] : '',
				isChecked ? styles.selected : '',
				className
			)}>
			<input
				disabled={disabled || readOnly}
				type='checkbox'
				defaultChecked={defaultChecked}
				{...(isControlled
					? {
							checked: !!checked,
						}
					: {})}
				onChange={handleChange}
			/>
			<Icon className={classes(styles[`icon-${size}`], styles.icon)} />
			{label && <span data-elem='label'>{label}</span>}
		</label>
	);
};

export default Checkbox;
