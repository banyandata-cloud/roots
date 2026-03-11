import { forwardRef, useEffect, useRef } from 'react';
import { classes } from '../../../utils';
import styles from './CheckBox.module.scss';
import ErrorIcon from '../icons/error/Error';
import WarningIcon from '../icons/warning/Warning';
import type { CheckboxProps } from './';

const CheckIcon = () => (
	<svg viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M1 4L3.5 6.5L9 1'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const IndeterminateIcon = () => (
	<svg viewBox='0 0 10 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M1 1H9' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
	</svg>
);

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const {
		className = '',
		size = 'md',
		checked = false,
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

	const innerRef = useRef<HTMLInputElement>(null);
	const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;

	// Set indeterminate via DOM since HTML doesn't support it as attribute
	useEffect(() => {
		if (resolvedRef.current) {
			resolvedRef.current.indeterminate = indeterminate;
		}
	}, [indeterminate, resolvedRef]);

	const stateClass = error
		? styles.error
		: warning
			? styles.warning
			: readOnly
				? styles.readOnly
				: '';

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
					checked={checked}
					disabled={disabled}
					readOnly={readOnly || indeterminate}
					onChange={readOnly || indeterminate ? undefined : (onChange ?? (() => {}))}
					onClick={indeterminate ? (e) => e.preventDefault() : undefined}
					className={styles.input}
					aria-checked={indeterminate ? 'mixed' : checked}
				/>
				<span className={styles.box}>
					{indeterminate ? <IndeterminateIcon /> : checked ? <CheckIcon /> : null}
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
