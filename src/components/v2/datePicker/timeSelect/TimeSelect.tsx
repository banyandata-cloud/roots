import type { ReactElement } from 'react';
import { Dropdown } from '../../input/dropdown';
import {
	DEFAULT_TIME,
	from12Hour,
	getHourOptions,
	getMinuteOptions,
	PERIOD_OPTIONS,
	timeToMinutes,
	to12Hour,
} from '../utils';
import type { TimeOfDay } from '../types';
import styles from './TimeSelect.module.css';
import type { TimeSelectProps } from './types';

/**
 * C13 Time select: hour : minute (AM/PM). Same-day end times are clamped to at least
 * one hour after `minExclusive` (edge case #16) instead of filtering every option list.
 */
const TimeSelect = (props: TimeSelectProps): ReactElement => {
	const { label, value, onChange, hour12, disabled = false, minExclusive, noSlotMessage } = props;

	const current = value ?? DEFAULT_TIME;

	const clamp = (candidate: TimeOfDay): TimeOfDay => {
		if (!minExclusive) {
			return candidate;
		}
		const candidateMinutes = timeToMinutes(candidate);
		const minMinutes = timeToMinutes(minExclusive);
		// Minimum same-day duration is 1 hour (edge case #16), not just "strictly after
		// start" — a candidate only 5-59 minutes later than start must also snap forward.
		const minAllowedMinutes = minMinutes + 60;
		if (candidateMinutes < minAllowedMinutes) {
			const clampedTotal = Math.min(minAllowedMinutes, 23 * 60 + 59);
			return { hour: Math.floor(clampedTotal / 60), minute: clampedTotal % 60 };
		}
		return candidate;
	};

	// No same-day slot at least 1 hour later exists once start is at/after 11:00 PM
	// (edge case #16's "A start after 11:00 PM has no valid end that day").
	const noSlotAvailable = !!minExclusive && timeToMinutes(minExclusive) + 60 > 23 * 60 + 59;

	const { hour12: displayHour, period } = to12Hour(current.hour);

	const handleHourChange = (raw: string) => {
		const hourValue = Number(raw);
		const next24Hour = hour12 ? from12Hour(hourValue, period) : hourValue;
		onChange(clamp({ hour: next24Hour, minute: current.minute }));
	};

	const handlePeriodChange = (raw: string) => {
		onChange(
			clamp({ hour: from12Hour(displayHour, raw as 'AM' | 'PM'), minute: current.minute })
		);
	};

	const handleMinuteChange = (raw: string) => {
		onChange(clamp({ hour: current.hour, minute: Number(raw) }));
	};

	if (noSlotAvailable) {
		return (
			<div className={styles.root}>
				{label && <span className={styles.label}>{label}</span>}
				<span className={styles.noSlot}>{noSlotMessage ?? 'No slot 1 hr later today'}</span>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			{label && <span className={styles.label}>{label}</span>}
			<div className={styles.selects}>
				<Dropdown
					variant='simple'
					size='sm'
					className={styles.select}
					options={getHourOptions(hour12)}
					value={disabled ? '' : String(hour12 ? displayHour : current.hour)}
					placeholder='--'
					onChange={handleHourChange}
					disabled={disabled}
				/>
				<span className={styles.colon}>:</span>
				<Dropdown
					variant='simple'
					size='sm'
					className={styles.select}
					options={getMinuteOptions(current.minute)}
					value={disabled ? '' : String(current.minute)}
					placeholder='--'
					onChange={handleMinuteChange}
					disabled={disabled}
				/>
				{hour12 && (
					<Dropdown
						variant='simple'
						size='sm'
						className={styles.select}
						options={PERIOD_OPTIONS}
						value={disabled ? '' : period}
						placeholder='--'
						onChange={handlePeriodChange}
						disabled={disabled}
					/>
				)}
			</div>
		</div>
	);
};

export default TimeSelect;
