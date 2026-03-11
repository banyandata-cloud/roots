import React from 'react';
import { classes, doubleDigitted } from '../../../utils';
import { Button } from '../../buttons';
import { Text } from '../../text';
import { calculateMeridian } from '../utils';
import styles from './TimeSwitcher.module.css';

// Types

interface TimeSlot {
	HOURS?: number | undefined;
	MINS?: number | undefined;
	MER?: string | undefined;
}

interface TimeRangeSelection {
	next?: TimeSlot | undefined;
	previous?: TimeSlot | undefined;
}

type RangeType = 'previous' | 'next';

interface ActiveTimeSelection {
	previous?: 'HR' | 'MIN' | undefined;
	next?: 'HR' | 'MIN' | undefined;
}

interface TimeCounterProps {
	activeTimeSelection?: ActiveTimeSelection | undefined;
	setActiveTimeSelection: (value: ActiveTimeSelection) => void;
	setTimeRangeSelection: (value: TimeRangeSelection) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	type: RangeType;
	limitHours?: number | undefined;
}

interface TimeSwitcherProps {
	activeTimeSelection?: ActiveTimeSelection | undefined;
	setActiveTimeSelection: (value: ActiveTimeSelection) => void;
	setTimeRangeSelection: (value: TimeRangeSelection) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	limitHours?: number | undefined;
	valueAsRange?: boolean | undefined;
}

// TimeCounter

const TimeCounter = ({
	activeTimeSelection = {},
	setActiveTimeSelection,
	setTimeRangeSelection,
	timeRangeSelection = {},
	type,
	limitHours,
}: TimeCounterProps): React.JSX.Element => {
	const onMeridianClick = (value: string): void => {
		if (limitHours) {
			if (type === 'previous') {
				setTimeRangeSelection({
					...timeRangeSelection,
					[type]: {
						...timeRangeSelection[type],
						MER: value,
					},
					next: {
						...timeRangeSelection.next,
						MER:
							timeRangeSelection.previous?.MINS === 0 &&
							timeRangeSelection.previous?.HOURS !== 12 &&
							(timeRangeSelection.previous?.HOURS ?? 0) + limitHours >= 12
								? calculateMeridian(value, timeRangeSelection.next?.MER)
								: value,
					},
				});
			} else {
				setTimeRangeSelection({
					...timeRangeSelection,
					[type]: {
						...timeRangeSelection[type],
						MER: value,
					},
					previous: {
						...timeRangeSelection.previous,
						MER:
							timeRangeSelection.previous?.MINS === 0 &&
							timeRangeSelection.previous?.HOURS !== 12 &&
							(timeRangeSelection.previous?.HOURS ?? 0) + limitHours >= 12
								? calculateMeridian(value, timeRangeSelection.previous?.MER)
								: value,
					},
				});
			}
		} else {
			setTimeRangeSelection({
				...timeRangeSelection,
				[type]: {
					...timeRangeSelection[type],
					MER: value,
				},
			});
		}
	};

	const onTimeSelect = (value: 'HR' | 'MIN'): void => {
		setActiveTimeSelection({
			[type]: value,
		});
	};

	return (
		<div className={styles['time-counter']}>
			<Button
				onClick={() => {
					onTimeSelect('HR');
				}}
				className={classes(
					styles.time,
					activeTimeSelection[type] === 'HR' ? styles.selected : ''
				)}
				title={doubleDigitted(timeRangeSelection[type]?.HOURS) ?? undefined}
			/>
			<Text weight={600}>:</Text>
			<Button
				onClick={() => {
					onTimeSelect('MIN');
				}}
				className={classes(
					styles.time,
					activeTimeSelection[type] === 'MIN' ? styles.selected : ''
				)}
				title={doubleDigitted(timeRangeSelection[type]?.MINS) ?? undefined}
			/>
			<div className={styles['meridian-container']}>
				<Button
					className={classes(
						styles.meridian,
						timeRangeSelection[type]?.MER === 'AM' ? styles.selected : ''
					)}
					title='AM'
					onClick={() => {
						onMeridianClick('AM');
					}}
				/>
				<Button
					className={classes(
						styles.meridian,
						timeRangeSelection[type]?.MER === 'PM' ? styles.selected : ''
					)}
					title='PM'
					onClick={() => {
						onMeridianClick('PM');
					}}
				/>
			</div>
		</div>
	);
};

// TimeSwitcher

const TimeSwitcher = (props: TimeSwitcherProps): React.JSX.Element => {
	const { valueAsRange } = props;
	return (
		<div className={styles.root}>
			{(valueAsRange && <TimeCounter {...props} type='previous' />) || undefined}
			{(valueAsRange && <Text className={styles.to}>to</Text>) || undefined}
			<TimeCounter {...props} type='next' />
		</div>
	);
};

export default TimeSwitcher;
