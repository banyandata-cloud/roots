import React, { useEffect, useRef, useState } from 'react';
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

	const [keyboardFocused, setKeyboardFocused] = useState(false);
	const isKeyboardNav = useRef(false);
	const isSelfClick = useRef(false);

	// Track controlled/uncontrolled mode once on first render
	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	// Uncontrolled state
	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	useEffect(() => {
		// Set keyboard nav flag when Tab is pressed
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Tab') isKeyboardNav.current = true;
		};
		// Reset keyboard nav flag on any mouse click anywhere
		const handleMouseDown = () => {
			isKeyboardNav.current = false;
		};
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleMouseDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
			onMouseDown={() => {
				// If already keyboard focused and clicking self, keep ring
				if (keyboardFocused) isSelfClick.current = true;
			}}
			className={classes(
				styles.root,
				styles[`position-${position}`],
				disabled && !disabledAsChild ? styles.disabled : '',
				disabled && isChecked ? styles['disabled-checked'] : '',
				readOnly ? styles['read-only'] : '',
				error ? styles.error : '',
				error && isChecked ? styles['error-checked'] : '',
				isChecked ? styles.selected : '',
				keyboardFocused ? styles['keyboard-focused'] : '',
				className
			)}>
			<input
				disabled={disabled || readOnly}
				type='checkbox'
				tabIndex={0}
				defaultChecked={defaultChecked}
				onFocus={() => {
					if (isKeyboardNav.current) {
						setKeyboardFocused(true);
					}
				}}
				onBlur={() => {
					if (isSelfClick.current) {
						// Clicking self — keep ring, reset flag
						isSelfClick.current = false;
						return;
					}
					// Tabbing away or clicking elsewhere — remove ring
					setKeyboardFocused(false);
				}}
				{...(isControlled ? { checked: !!checked } : {})}
				onChange={handleChange}
			/>
			<Icon className={classes(styles[`icon-${size}`], styles.icon)} />
			{label && <span data-elem='label'>{label}</span>}
		</label>
	);
};

export default Checkbox;