import { forwardRef, useEffect, useRef, useState, type RefObject } from 'react';
import { classes } from '../../../utils';
import ErrorIcon from '../icons/error/Error';
import WarningIcon from '../icons/warning/Warning';
import type { CheckboxProps } from './';
import { CheckIcon, IndeterminateIcon } from './assets';
import styles from './CheckBox.module.scss';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const {
		className = '',
		size = 'md',
		checked,
		defaultChecked = false,
		indeterminate = false,
		disabled = false,
		readOnly = false,
		error = false,
		warning = false,
		label,
		subLabel,
		errorMessage,
		id,
		name,
		onChange,
	} = props;

	const { current: isControlled } = useRef<boolean>(checked !== undefined);
	const innerRef = useRef<HTMLInputElement>(null);
	const resolvedRef = (ref as RefObject<HTMLInputElement>) ?? innerRef;

	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(defaultChecked);

	useEffect(() => {
		if (resolvedRef.current) {
			resolvedRef.current.indeterminate = indeterminate;
		}
	}, [indeterminate, resolvedRef]);

	const isChecked = isControlled ? (checked ?? false) : uncontrolledChecked;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) {
			setUncontrolledChecked(event.target.checked);
		}
		onChange?.(event);
	};

	let stateClass: string | undefined = '';
	if (error) {
		stateClass = styles.error;
	} else if (warning) {
		stateClass = styles.warning;
	} else if (readOnly) {
		stateClass = styles.readOnly;
	}

	const wrapperClass = classes(
		styles.wrapper,
		styles[size],
		stateClass,
		disabled && styles.disabled,
		className
	);

	return (
		<label className={wrapperClass} htmlFor={id}>
			<span className={styles.checkboxWrap}>
				<input
					ref={resolvedRef}
					type='checkbox'
					id={id}
					name={name}
					checked={isChecked}
					disabled={disabled}
					readOnly={readOnly}
					onChange={readOnly ? undefined : handleChange}
					className={styles.input}
					aria-checked={indeterminate ? 'mixed' : isChecked}
				/>
				<span className={styles.box}>
					{indeterminate ? <IndeterminateIcon /> : isChecked ? <CheckIcon /> : null}
				</span>
				{(label || subLabel) && (
					<span className={styles.labelWrap}>
						{label && <span className={styles.label}>{label}</span>}
						{subLabel && <span className={styles.subLabel}>{subLabel}</span>}
					</span>
				)}
			</span>
			{(error || warning) && errorMessage && (
				<span className={styles.message}>
					{error && <ErrorIcon />}
					{warning && <WarningIcon />}
					{errorMessage}
				</span>
			)}
		</label>
	);
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
