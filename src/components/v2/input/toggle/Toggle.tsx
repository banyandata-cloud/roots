import { forwardRef } from 'react';
import { classes } from '../../utils';
import ToggleTick from './assets/ToggleTick';
import type { ToggleProps } from './types';
import styles from './Toggle.module.scss';

// The checked look is driven by the native input (`input:checked + .pill`), so the component
// keeps no state of its own.
const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
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

	return (
		<label
			className={classes(
				styles.root,
				styles[`size-${size}`],
				readonly && styles.readonly,
				disabled && styles.disabled,
				className
			)}
		>
			{label && <span className={styles.label}>{label}</span>}
			<input
				ref={ref}
				type='checkbox'
				className={styles.input}
				disabled={disabled}
				aria-readonly={readonly || undefined}
				{...(checked !== undefined && { checked })}
				{...(defaultChecked !== undefined && { defaultChecked })}
				onClick={readonly ? (event) => event.preventDefault() : undefined}
				onChange={(event) => {
					if (!readonly && !disabled) onChange?.(event, event.target.checked);
				}}
			/>
			<span className={styles.pill}>
				<span className={styles.knob}>{size === 's' && <ToggleTick />}</span>
			</span>
		</label>
	);
});

Toggle.displayName = 'Toggle';

export default Toggle;
