import { useRef, useState } from 'react';
import { classes, inputHelper } from '../../../../utils';
import styles from './Radio.module.css';

import StatusIndicatorError from './assets/Status/StatusIndicatorError';
import StatusIndicatorWarning from './assets/Status/StatusIndicatorWarning';

import DisableSelected from './assets/Clickables/Disable/DisableSelected';
import DisableUnSelected from './assets/Clickables/Disable/DisableUnSelected';
import ReadOnlySelected from './assets/Clickables/Read-Only/ReadOnlySelected';
import ReadOnlyUnSelected from './assets/Clickables/Read-Only/ReadOnlyUnSelected';

import Selected from './assets/Clickables/Enable/EnableSelected';
import SelectedError from './assets/Clickables/Error/SelectedError';

import UnSelected from './assets/Clickables/Enable/EnableUnselected';
import UnSelectedError from './assets/Clickables/Error/UnSelectedError';

import type { RadioProps } from './types';

const Radio: React.FC<RadioProps> = (props) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange,
		position = 'left',
		className,
		disabled,
		readOnly,
		error,
		warning,
		focused = false,
	} = props;

	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	const [isFocused, setIsFocused] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (readOnly) return;

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

	const hasError = Boolean(error);
	const hasWarning = Boolean(warning);

	const renderIcon = () => {
		if (disabled) {
			return isChecked ? <DisableSelected /> : <DisableUnSelected />;
		}

		if (readOnly) {
			return isChecked ? <ReadOnlySelected /> : <ReadOnlyUnSelected />;
		}

		if (hasError) {
			return isChecked ? <SelectedError /> : <UnSelectedError />;
		}

		if (hasWarning) {
			return isChecked ? <Selected /> : <UnSelected />;
		}

		return isChecked ? <Selected /> : <UnSelected />;
	};

	return (
		<div className={classes(styles.container, className)}>
			<label
				className={classes(
					styles.root,
					styles[`position-${position}`],
					disabled && styles.disabled,
					readOnly && styles.readonly,
					isChecked && styles.selected,
					hasError && styles.error,
					hasWarning && styles.warning
				)}>
				<input
					disabled={disabled}
					type='radio'
					checked={isChecked}
					onChange={handleChange}
					onFocus={(e) => {
						if (e.target.matches(':focus-visible')) {
							setIsFocused(true);
						}
					}}
					onBlur={() => setIsFocused(false)}
				/>

				<span
					className={classes(
						styles['radio-icon'],
						(isFocused || focused) && !hasError && styles['focus'],
						(isFocused || focused) && hasError && styles['focus-error']
					)}>
					{renderIcon()}
				</span>

				{label && <span data-elem='label'>{label}</span>}
			</label>

			{hasError && (
				<div className={styles.feedback} data-elem='error-message'>
					<StatusIndicatorError />
					<span className={styles.feedbackTextError}>{error}</span>
				</div>
			)}

			{hasWarning && (
				<div className={styles.feedback} data-elem='warning-message'>
					<StatusIndicatorWarning />
					<span className={styles.feedbackTextWarning}>{warning}</span>
				</div>
			)}
		</div>
	);
};

export default Radio;
