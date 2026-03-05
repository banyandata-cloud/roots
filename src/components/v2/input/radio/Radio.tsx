import React, { useRef, useState } from 'react';
import { classes, inputHelper } from '../../../../utils';
import styles from './Radio.module.css';
import StatusIndicatorError from './assets/Status/StatusIndicatorError';
import StatusIndicatorWarning from './assets/Status/StatusIndicatorWarning';
import DisabledSelected from './assets/Clickables/DisabledSelected';
import DisabledUnSelected from './assets/Clickables/DisabledUnSelected';
import ReadOnlySelected from './assets/Clickables/ReadOnlySelected';
import ReadOnlyUnSelected from './assets/Clickables/ReadOnlyUnSelected';
import Selected from './assets/Clickables/Selected';
import SelectedError from './assets/Clickables/SelectedError';
import UnSelected from './assets/Clickables/UnSelected';
import UnSelectedError from './assets/Clickables/UnSelectedError';
import FocusUnSelected from './assets/Clickables/FocusUnSelected';

type Position = 'left' | 'right';
type Size = 'sm' | 'md' | 'lg';

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
	disabled?: boolean | undefined;
	/** Makes the radio non-interactive but visually distinct from disabled */
	readOnly?: boolean;
	/** Error message — renders below the radio with a red error icon */
	error?: string;
	/** Warning message — renders below the radio with a yellow warning icon */
	warning?: string;
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
		readOnly,
		error,
		warning,
	} = props;

	// Lock controlled vs uncontrolled on first render
	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	// Uncontrolled state
	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Prevent change if readOnly
		if (readOnly) return;

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

	const iconClassName = classes(styles[`icon-${size}`], styles.icon);

	const hasError = Boolean(error);
	const hasWarning = Boolean(warning);

	return (
		<div className={classes(styles.container, className)}>
			<label
				className={classes(
					styles.root,
					styles[`position-${position}`],
					disabled ? styles.disabled : '',
					readOnly ? styles.readonly : '',
					isChecked ? styles.selected : '',
					hasError ? styles.error : '',
					hasWarning ? styles.warning : ''
				)}>
				<input
					disabled={disabled}
					type='radio'
					checked={isChecked}
					onChange={handleChange}
				/>

				{/* Disabled states */}
				{disabled && isChecked && (
					<DisabledSelected className={iconClassName} />
				)}
				{disabled && !isChecked && (
					<DisabledUnSelected className={iconClassName} />
				)}

				{/* ReadOnly states */}
				{!disabled && readOnly && isChecked && (
					<ReadOnlySelected className={iconClassName} />
				)}
				{!disabled && readOnly && !isChecked && (
					<ReadOnlyUnSelected className={iconClassName} />
				)}

				{/* Error states */}
				{!disabled && !readOnly && hasError && isChecked && (
					<SelectedError data-elem='icon' className={iconClassName} />
				)}
				{!disabled && !readOnly && hasError && !isChecked && (
					<UnSelectedError data-elem='icon' className={iconClassName} />
				)}

				{/* Warning unselected state */}
				{!disabled && !readOnly && hasWarning && !isChecked && (
					<UnSelected data-elem='icon' className={iconClassName} />
				)}

				{/* Focus unselected — UnSelected hides on focus, FocusUnSelected shows */}
				{!disabled && !readOnly && !hasError && !hasWarning && !isChecked && (
					<>
						<UnSelected data-elem='icon' className={classes(iconClassName, styles.iconDefault)} />
						<FocusUnSelected data-elem='icon' className={classes(iconClassName, styles.iconFocus)} />
					</>
				)}

				{/* Normal selected state */}
				{!disabled && !readOnly && !hasError && isChecked && (
					<Selected data-elem='icon' className={iconClassName} />
				)}

				{label && <span data-elem='label'>{label}</span>}
			</label>

			{/* Error feedback message */}
			{hasError && (
				<div className={styles.feedback} data-elem='error-message'>
				<StatusIndicatorError className={styles.feedbackIcon || ''} />
					<span className={styles.feedbackTextError}>{error}</span>
				</div>
			)}

			{/* Warning feedback message */}
			{hasWarning && (
				<div className={styles.feedback} data-elem='warning-message'>
				<StatusIndicatorWarning className={styles.feedbackIcon || ''} />
					<span className={styles.feedbackTextWarning}>{warning}</span>
				</div>
			)}
		</div>
	);
};

export default Radio;