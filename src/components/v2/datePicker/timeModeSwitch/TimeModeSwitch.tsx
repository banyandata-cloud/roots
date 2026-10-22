import type { ReactElement } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { classes } from '../../../../utils';
import { Tooltip } from '../../tooltip';
import { CalendarIcon, ClockIcon, TimeRangeIcon } from '../icons';
import type { SingleTimeMode } from '../types';
import styles from './TimeModeSwitch.module.css';
import type { TimeModeSwitchProps } from './types';

const SEGMENTS: {
	mode: SingleTimeMode;
	label: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
	{ mode: 'whole-day', label: 'Whole day', Icon: CalendarIcon },
	{ mode: 'particular', label: 'Particular time', Icon: ClockIcon },
	{ mode: 'range', label: 'Time range', Icon: TimeRangeIcon },
];

/** C12 Time-mode switch: single-date mode only. Chooses Whole day / Particular time / Time range. */
const TimeModeSwitch = (props: TimeModeSwitchProps): ReactElement => {
	const { value, onChange, disabled = false } = props;

	return (
		<div className={styles.root}>
			{SEGMENTS.map(({ mode, label, Icon }) => (
				<Tooltip key={mode} content={label} position='bottom'>
					<button
						type='button'
						className={classes(styles.segment, value === mode && styles.selected)}
						aria-pressed={value === mode}
						aria-label={label}
						disabled={disabled}
						onClick={() => onChange(mode)}
					>
						<Icon className={styles.icon} />
					</button>
				</Tooltip>
			))}
		</div>
	);
};

export default TimeModeSwitch;
