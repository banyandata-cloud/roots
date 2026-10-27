import { forwardRef, useId } from 'react';
import { classes } from '../../utils';
import StatusIndicator from './assets/StatusIndicator';
import styles from './Radio.module.scss';
import type { RadioProps } from './types';

// Selection is driven by the native input (`input:checked ~ .control` in the stylesheet), so
// radios sharing a `name` deselect each other without any component state.
const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange,
		className,
		disabled,
		readOnly,
		error,
		warning,
		name,
		value,
		id,
	} = props;

	const generatedId = useId();
	const messageId = `${id ?? generatedId}-message`;
	const message = error || warning;
	const messageType = error ? 'error' : 'warning';

	return (
		<div className={classes(styles.container, className)}>
			<label
				className={classes(
					styles.root,
					disabled && styles.disabled,
					readOnly && styles.readonly,
					error && styles.error
				)}
			>
				<input
					ref={ref}
					id={id}
					className={styles.input}
					type='radio'
					name={name}
					value={value}
					disabled={disabled}
					aria-readonly={readOnly || undefined}
					aria-invalid={error ? true : undefined}
					aria-describedby={message ? messageId : undefined}
					{...(checked !== undefined && { checked })}
					{...(defaultChecked !== undefined && { defaultChecked })}
					onClick={readOnly ? (event) => event.preventDefault() : undefined}
					onChange={(event) => {
						if (!readOnly && !disabled) onChange?.(event, event.target.checked);
					}}
				/>
				<span className={styles.control} aria-hidden='true' />
				{label && <span className={styles.label}>{label}</span>}
			</label>

			{message && (
				<div id={messageId} className={styles.message} data-type={messageType}>
					<span className={styles.messageIcon}>
						<StatusIndicator />
					</span>
					<span className={styles.messageText}>{message}</span>
				</div>
			)}
		</div>
	);
});

Radio.displayName = 'Radio';

export default Radio;
