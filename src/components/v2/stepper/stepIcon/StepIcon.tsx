import { classes } from '../../utils';
import type { StepperSize, StepStatus } from '../types';
import styles from './StepIcon.module.scss';

interface StepIconProps {
	size: StepperSize;
	status: StepStatus;
	/** `icon` draws a dot for open steps, `number` draws the step number. */
	kind: 'icon' | 'number';
	number?: number | undefined;
	className?: string | undefined;
}

// Figma "step icon" check, drawn on a 24px grid and scaled with the icon.
const CheckMark = () => (
	<svg className={styles.check} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
		<path
			d='M8 11.6776L10.5793 14.5793L16 9.42065'
			stroke='currentColor'
			strokeWidth='1.71702'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const StepIcon = ({ size, status, kind, number, className }: StepIconProps) => {
	let content = <span className={styles.dot} />;
	if (status === 'completed') content = <CheckMark />;
	else if (kind === 'number') content = <span className={styles.number}>{number}</span>;

	return (
		<span
			className={classes(styles.icon, className)}
			data-size={size}
			data-status={status}
			data-kind={kind}
			aria-hidden='true'
		>
			{content}
		</span>
	);
};

export default StepIcon;
