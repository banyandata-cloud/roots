import React, { type ComponentType, useRef, useState } from 'react';
import { classes, inputHelper } from '../../../utils';
import { RadioIcon } from '../../icons';
import styles from './Radio.module.css';

type Position = 'left' | 'right';
type Size = 'sm' | 'md' | 'lg';

// Your icon set should accept at least className
type IconType = ComponentType<{ className?: string; 'data-elem'?: string }>;

export interface RadioProps {
	label?: React.ReactNode;
	/** Controlled state */
	checked?: boolean;
	/** Uncontrolled default */
	defaultChecked?: boolean;
	/** Fires with (event, value) where value is the boolean checked state */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
	position?: Position;
	size?: Size;
	className?: string | undefined;
	disabled?: boolean;
}

const Radio: React.FC<RadioProps> = (props) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange,
		position = 'left',
		size = 'sm',
		className,
		disabled,
	} = props;

	// Lock controlled vs uncontrolled on first render
	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	// Uncontrolled state
	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

	const CheckedIcon = RadioIcon.Checked as IconType;
	const UncheckedIcon = RadioIcon.UnChecked as IconType;

	return (
		<label
			className={classes(
				styles.root,
				styles[`position-${position}`],
				disabled ? styles.disabled : '',
				isChecked ? styles.selected : '',
				className
			)}>
			<input
				disabled={disabled}
				type='radio'
				// Preserve original pattern: always pass checked (undefined keeps it uncontrolled)
				checked={isChecked}
				onChange={handleChange}
			/>

			{isChecked ? (
				<CheckedIcon
					data-elem='icon'
					className={classes(styles[`icon-${size}`], styles.icon)}
				/>
			) : (
				<UncheckedIcon
					data-elem='icon'
					className={classes(styles[`icon-${size}`], styles.icon)}
				/>
			)}

			{label && <span data-elem='label'>{label}</span>}
		</label>
	);
};

export default Radio;
