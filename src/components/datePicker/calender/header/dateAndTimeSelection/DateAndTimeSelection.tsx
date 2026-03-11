import React, { useEffect, useState } from 'react';
import { classes, doubleDigitted } from '../../../../../utils';
import { Button } from '../../../../buttons';
import styles from './DateAndTimeSelection.module.css';

interface TimeSlot {
	HOURS?: number | undefined;
	MINS?: number | undefined;
	MER?: string | undefined;
}

interface TimeRangeSelection {
	next?: TimeSlot | undefined;
	previous?: TimeSlot | undefined;
}

interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
}

interface DateAndTimeSelectionProps {
	selectedDate?: SelectedDate | undefined;
	setActiveGoToSelection: (value: string) => void;
	activeGoToSelection?: string | undefined;
	showDateSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	showTimeSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	showTime?: boolean | undefined;
	valueAsRange?: boolean | undefined;
}

const DateAndTimeSelection = ({
	selectedDate,
	setActiveGoToSelection,
	activeGoToSelection,
	showDateSelectionView,
	showTimeSelectionView,
	timeRangeSelection = {},
	showTime,
	valueAsRange,
}: DateAndTimeSelectionProps): React.JSX.Element | null => {
	const { date, month, year } = selectedDate || {};

	const defaultDate = date ? `${doubleDigitted(date)} ${month?.substring(0, 3)} ${year}` : '';

	let defaultTime = `${doubleDigitted(timeRangeSelection.next?.HOURS)}:${doubleDigitted(
		timeRangeSelection.next?.MINS
	)} ${timeRangeSelection.next?.MER}`;

	console.log({ defaultTime });

	if (valueAsRange) {
		defaultTime = `${doubleDigitted(timeRangeSelection.previous?.HOURS)}:${doubleDigitted(
			timeRangeSelection.previous?.MINS
		)} ${timeRangeSelection.previous?.MER} - ${doubleDigitted(
			timeRangeSelection.next?.HOURS
		)}:${doubleDigitted(timeRangeSelection.next?.MINS)} ${timeRangeSelection.next?.MER}`;
	}

	const [dateValue, setDateValue] = useState<string | undefined>();

	const [timeValue, setTimeValue] = useState<string | undefined>();

	useEffect(() => {
		setDateValue(defaultDate);
		setTimeValue(defaultTime);
	}, [defaultDate, defaultTime]);

	const onDateSelectorClick = (): void => {
		showTimeSelectionView(false);
		showDateSelectionView((prev) => !prev);
		if (activeGoToSelection === 'date') {
			setActiveGoToSelection('');
			return;
		}
		setActiveGoToSelection('date');
	};

	const onTimeSelectorClick = (): void => {
		showDateSelectionView(false);
		showTimeSelectionView((prev) => !prev);
		if (activeGoToSelection === 'time') {
			setActiveGoToSelection('');
			return;
		}
		setActiveGoToSelection('time');
	};

	if (!dateValue) {
		return null;
	}

	return (
		<div className={styles.root}>
			<span>Date & Time</span>
			<div>
				<Button
					onClick={onDateSelectorClick}
					className={classes(
						styles.selector,
						activeGoToSelection === 'date' ? styles.active : ''
					)}
					title={dateValue}
					variant='outlined'
				/>
				{showTime && (
					<Button
						onClick={onTimeSelectorClick}
						className={classes(
							styles.selector,
							activeGoToSelection === 'time' ? styles.active : ''
						)}
						title={timeValue}
						variant='outlined'
					/>
				)}
			</div>
		</div>
	);
};

export default DateAndTimeSelection;
