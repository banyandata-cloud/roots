import type { ReactElement } from 'react';
import RangeArrow from '../rangeArrow/RangeArrow';
import TimeSelect from '../timeSelect/TimeSelect';
import type { TimeOfDay } from '../types';
import { DEFAULT_TIME } from '../utils';
import styles from './TimeRangeCard.module.css';

export interface TimeRangeCardProps {
	fromTime: TimeOfDay | null;
	toTime: TimeOfDay | null;
	onChangeFromTime: (time: TimeOfDay) => void;
	onChangeToTime: (time: TimeOfDay) => void;
	hour12: boolean;
	disabled?: boolean | undefined;
}

/**
 * Single-date "Time range" sub-mode: a standalone card, separate from the date card,
 * with Starts-at/Ends-at side by side (horizontal), matching the Figma layout — not
 * stacked, and not embedded inside the date box (unlike the "Particular time" sub-mode).
 */
const TimeRangeCard = (props: TimeRangeCardProps): ReactElement => {
	const { fromTime, toTime, onChangeFromTime, onChangeToTime, hour12, disabled = false } = props;

	return (
		<div className={styles.root}>
			<div className={styles.column}>
				<TimeSelect
					label='Starts at'
					value={fromTime}
					hour12={hour12}
					onChange={onChangeFromTime}
					disabled={disabled}
				/>
			</div>
			<RangeArrow />
			<div className={styles.column}>
				<TimeSelect
					label='Ends at'
					value={toTime}
					hour12={hour12}
					onChange={onChangeToTime}
					// Falls back to DEFAULT_TIME (not undefined) when fromTime hasn't been
					// touched yet — "Starts at" still *displays* 9:00 AM as its default even
					// though the state is null, so the clamp must use that same effective
					// value or it silently stays disabled and lets "Ends at" be picked less
					// than an hour later.
					minExclusive={fromTime ?? DEFAULT_TIME}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default TimeRangeCard;
