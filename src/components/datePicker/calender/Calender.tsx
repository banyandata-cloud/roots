import { fromUnixTime, getUnixTime, isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FULL_MONTHS } from '../../../constants';
import { getDatesInStringFormat, getDayInfo } from '../../../utils';
import { ClockView } from '../clockView';
import styles from './Calender.module.css';
import { CalenderBody } from './body';
import { CalenderFooter } from './footer';
import { CalenderHeader } from './header';
import type {
	ActiveTimeSelection,
	CalenderProps,
	CustomRange,
	SelectedDate,
	SelectedMonth,
	SelectedRange,
	TimeRangeSelection,
	TimeSlot,
} from './types';

export type {
	ActiveTimeSelection,
	CustomRange,
	SelectedDate,
	SelectedMonth,
	SelectedRange,
	TimeRangeSelection,
	TimeSlot,
};

const Calender = (props: CalenderProps): React.JSX.Element => {
	const {
		range,
		selectedDate,
		setSelectedDate,
		selectedRange,
		setSelectedRange,
		onApply,
		onClear,
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		value,
		setFixedRange,
		fixedRange,
		customRanges,
		timeRangeSelection,
		setTimeRangeSelection,
		selectedMonth,
		setSelectedMonth,
		defaultHourDiff,
		limitHours,
		showTime,
		timeRange,
		valueAsRange,
		enableFutureDates,
		isDefaultRangeUntouched,
		setIsDefaultRangeUntouched,
	} = props;

	const [dateSelectionView, showDateSelectionView] = useState<boolean>(false);
	const [timeSelectionView, showTimeSelectionView] = useState<boolean>(false);
	const [activeGoToSelection, setActiveGoToSelection] = useState<string | undefined>();
	const [activeTimeSelection, setActiveTimeSelection] = useState<
		ActiveTimeSelection | undefined
	>();

	const setSelectedValues = (): void => {
		if (fixedRange) {
			const date = new Date();
			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			const firstUnix = selectedRange?.unix?.[0];
			if (firstUnix !== undefined) {
				const dayInfo = getDayInfo(fromUnixTime(firstUnix));
				setSelectedMonth({
					month: dayInfo.month,
					monthAsNumber: dayInfo.monthAsNumber,
					year: dayInfo.year,
				});
			}
			setSelectedDate({
				...selectedDate,
				month: selectedDayInfo.month,
				year: selectedDayInfo.year,
				date: dateAsNumber,
				unix: getUnixTime(date),
			});
			return;
		}

		if (range && (value as number[])?.filter?.(Boolean)?.length > 0) {
			const rangeValue = value as number[];
			const startUnix = rangeValue[0];
			const endUnix = rangeValue[1];
			if (startUnix !== undefined && endUnix !== undefined) {
				setSelectedRange({
					dates: getDatesInStringFormat({
						startingDate: fromUnixTime(startUnix),
						endingDate: fromUnixTime(endUnix),
					}) as string[],
					unix: [startUnix, endUnix],
				});
				const endDayInfo = getDayInfo(fromUnixTime(endUnix));
				setSelectedMonth({
					month: endDayInfo.month,
					monthAsNumber: endDayInfo.monthAsNumber,
					year: endDayInfo.year,
				});
			}
			const date = new Date();
			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			setSelectedDate({
				...selectedDate,
				month: selectedDayInfo.month,
				year: selectedDayInfo.year,
				date: dateAsNumber,
				unix: getUnixTime(date),
			});
			return;
		}

		if (!range && value) {
			const singleValue = typeof value === 'number' ? value : undefined;
			if (singleValue !== undefined) {
				const date = fromUnixTime(singleValue);
				const dateAsNumber = date.getDate();
				const selectedDayInfo = getDayInfo(date);
				setSelectedMonth({
					month: selectedDayInfo.month,
					monthAsNumber: selectedDayInfo.monthAsNumber,
					year: selectedDayInfo.year,
				});
				setSelectedDate({
					...selectedDate,
					month: selectedDayInfo.month,
					year: selectedDayInfo.year,
					date: dateAsNumber,
					unix: getUnixTime(date),
				});
			}
			return;
		}

		if (range && timeRange && !value) {
			const now = new Date();
			const startDate = new Date(now);
			startDate.setHours(0, 0, 0, 0);
			const endDate = new Date(now);
			endDate.setHours(23, 59, 59, 999);

			setIsDefaultRangeUntouched?.(true);
			setSelectedRange({
				dates: getDatesInStringFormat({
					startingDate: startDate,
					endingDate: endDate,
				}) as string[],
				unix: [getUnixTime(startDate), getUnixTime(endDate)],
			});
			const startInfo = getDayInfo(startDate);
			const endInfo = getDayInfo(endDate);
			setTimeRangeSelection({
				previous: {
					HOURS: startInfo.hours,
					MINS: startInfo.minutes,
					MER: startInfo.meridian,
				},
				next: { HOURS: endInfo.hours, MINS: endInfo.minutes, MER: endInfo.meridian },
			});
			setSelectedMonth({
				month: endInfo.month,
				monthAsNumber: endInfo.monthAsNumber,
				year: endInfo.year,
			});
			return;
		}

		const date = new Date();
		if (
			(range && !value && (disableDatesBefore ?? 0) === 0) ||
			(!range &&
				(disableDatesBefore === undefined ||
					!isBefore(date, fromUnixTime(disableDatesBefore))))
		) {
			setSelectedRange({ dates: [], unix: [] });
			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			setSelectedDate({
				...selectedDate,
				month: selectedDayInfo.month,
				year: selectedDayInfo.year,
				date: dateAsNumber,
				unix: getUnixTime(date),
			});
			setSelectedMonth({
				month: selectedDayInfo.month,
				monthAsNumber: selectedDayInfo.monthAsNumber,
				year: selectedDayInfo.year,
			});
		}
	};

	useEffect(() => {
		setSelectedValues();
	}, []);

	useEffect(() => {
		if (fixedRange) {
			const firstUnix = selectedRange?.unix?.[0];
			if (firstUnix !== undefined) {
				const dayInfo = getDayInfo(fromUnixTime(firstUnix));
				setSelectedMonth({
					month: dayInfo.month,
					monthAsNumber: dayInfo.monthAsNumber,
					year: dayInfo.year,
				});
			}
		}
	}, [fixedRange]);

	const onMonthChange = (switchSide: 'prev' | 'next'): void => {
		if (switchSide === 'prev') {
			if (selectedMonth.monthAsNumber === 0) {
				setSelectedMonth({
					month: FULL_MONTHS[11] ?? '',
					monthAsNumber: 11,
					year: selectedMonth.year - 1,
				});
				return;
			}
			const previousMonthNumber = selectedMonth.monthAsNumber - 1;
			setSelectedMonth({
				month: FULL_MONTHS[previousMonthNumber] ?? '',
				monthAsNumber: previousMonthNumber,
				year: selectedMonth.year,
			});
			return;
		}

		if (switchSide === 'next') {
			if (selectedMonth.monthAsNumber === 11) {
				setSelectedMonth({
					month: FULL_MONTHS[0] ?? '',
					monthAsNumber: 0,
					year: selectedMonth.year + 1,
				});
				return;
			}
			const nextMonthNumber = selectedMonth.monthAsNumber + 1;
			setSelectedMonth({
				month: FULL_MONTHS[nextMonthNumber] ?? '',
				monthAsNumber: nextMonthNumber,
				year: selectedMonth.year,
			});
		}
	};

	const commonCalenderProps = {
		selectedDate,
		setSelectedDate,
		selectedRange,
		setSelectedRange,
		range: range ?? false,
		selectedMonth,
		setSelectedMonth,
	};

	const showCalender = !timeSelectionView;

	return (
		<div className={styles.root}>
			<CalenderHeader
				{...commonCalenderProps}
				onMonthChange={onMonthChange}
				showDateSelectionView={showDateSelectionView}
				showTimeSelectionView={showTimeSelectionView}
				dateSelectionView={dateSelectionView}
				timeSelectionView={timeSelectionView}
				activeGoToSelection={activeGoToSelection}
				setActiveGoToSelection={setActiveGoToSelection}
				activeTimeSelection={activeTimeSelection}
				setActiveTimeSelection={setActiveTimeSelection}
				timeRangeSelection={timeRangeSelection}
				setTimeRangeSelection={setTimeRangeSelection}
				defaultHourDiff={defaultHourDiff}
				limitHours={limitHours}
				showTime={showTime}
				timeRange={timeRange}
				valueAsRange={valueAsRange}
				committedRange={props.committedRange}
				isDefaultRangeUntouched={isDefaultRangeUntouched}
				setIsDefaultRangeUntouched={setIsDefaultRangeUntouched}
			/>

			{showCalender ? (
				<CalenderBody
					{...commonCalenderProps}
					timeRange={timeRange}
					disabledDates={disabledDates ?? []}
					disableDatesBefore={disableDatesBefore}
					disableDatesAfter={disableDatesAfter}
					enableFutureDates={enableFutureDates}
					setFixedRange={setFixedRange}
					isDefaultRangeUntouched={isDefaultRangeUntouched}
					setIsDefaultRangeUntouched={setIsDefaultRangeUntouched}
					activeGoToSelection={activeGoToSelection}
					setActiveGoToSelection={setActiveGoToSelection}
				/>
			) : (
				<ClockView
					activeTimeSelection={activeTimeSelection ?? {}}
					timeRangeSelection={timeRangeSelection}
					setTimeRangeSelection={setTimeRangeSelection}
					limitHours={limitHours}
				/>
			)}

			<CalenderFooter
				{...commonCalenderProps}
				onApply={onApply}
				onClear={onClear}
				value={value}
				customRanges={customRanges}
				setFixedRange={setFixedRange}
				setSelectedRange={setSelectedRange}
				setSelectedDate={setSelectedDate}
				timeRange={timeRange}
				timeRangeSelection={timeRangeSelection}
				committedRange={props.committedRange}
			/>
		</div>
	);
};

export default Calender;
