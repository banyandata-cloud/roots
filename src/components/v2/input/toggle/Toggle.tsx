import React, { useRef, useState } from 'react';
import { classes, inputHelper } from '../../../../utils';
import styles from './Toggle.module.css';
import { TickIcon } from '../../icons';

type Size = 'l' | 's';

export interface ToggleProps {
	label?: React.ReactNode;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
	className?: string;
	disabled?: boolean;
	size?: Size;
	readonly?: boolean;
}

const Toggle: React.FC<ToggleProps> = (props) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange,
		className,
		disabled,
		size = 's',
		readonly,
	} = props;

	// Freeze controlled vs uncontrolled mode on first render
	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	// Uncontrolled state
	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (readonly || disabled) {
			event.preventDefault();
			return;
		}

		// Safely extract fieldValue; fall back to event.target.checked
		const helperResult = (
			inputHelper as unknown as
				| ((e: React.ChangeEvent<HTMLInputElement>) => { fieldValue?: boolean })
				| undefined
		)?.(event);
		const fieldValue = helperResult?.fieldValue ?? event.target.checked;

		if (isControlled) {
			onChange?.(event, fieldValue);
		} else {
			setUncontrolledChecked(fieldValue);
		}
	};

	const isChecked: boolean | undefined = isControlled ? checked : uncontrolledChecked;

	return (
		<label
			className={classes(
				styles.root,
				styles[`size-${size}`],
				readonly ? styles.readonly : '',
				disabled ? styles.disabled : '',
				className
			)}>
			{label && <span data-elem='label'>{label}</span>}
			<input
				disabled={disabled || readonly}
				type='checkbox'
				checked={isChecked}
				onChange={handleChange}
			/>
			<div className={styles.pill}>
				{size === 's' && (
					<span className={classes(styles.tick, !isChecked && styles['hide-tick'])}>
						<TickIcon />
					</span>
				)}
			</div>
		</label>
	);
};

export default Toggle;
