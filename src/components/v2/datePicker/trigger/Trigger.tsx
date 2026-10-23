import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { classes } from '../../../../utils';
import { ChevronDownIcon } from '../../icons';
import { CalendarIcon } from '../icons';
import styles from './Trigger.module.css';

export interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	subLabel?: string | undefined;
	open: boolean;
}

/**
 * Default C1 trigger. A provisional implementation — refine once the Figma spec for
 * C1 is available; consumers can fully override it via the `trigger` render prop meanwhile.
 */
const Trigger = forwardRef<HTMLButtonElement, TriggerProps>((props, ref) => {
	const { label, subLabel, open, className, ...rest } = props;

	return (
		<button
			ref={ref}
			type='button'
			className={classes(styles.root, className)}
			aria-expanded={open}
			{...rest}
		>
			<span className={styles.textGroup}>
				<CalendarIcon className={styles.icon} />
				<span className={styles.label}>{label}</span>
				{subLabel && <span className={styles.subLabel}>{subLabel}</span>}
			</span>
			<ChevronDownIcon className={classes(styles.chevron, open && styles.chevronOpen)} />
		</button>
	);
});

Trigger.displayName = 'Trigger';

export default Trigger;
