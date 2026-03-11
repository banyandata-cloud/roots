import { fromUnixTime, getUnixTime, isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FULL_MONTHS } from '../../../constants';
import { getDatesInStringFormat, getDayInfo } from '../../../utils';
import { ClockView } from '../clockView';
import styles from './Calender.module.css';
import { CalenderBody } from './body';
import { CalenderFooter } from './footer';
import { CalenderHeader } from './header';

export interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
	unix?: number;
}

export interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

export interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

export interface TimeSlot {
	HOURS?: number | undefined;
	MINS?: number | undefined;
	MER?: string | undefined;
}

export interface TimeRangeSelection {
	next?: TimeSlot;
	previous?: TimeSlot;
}

export interface CustomRange {
	title: string;
	type: string;
	value: number;
}

export type ActiveTimeSelection = {
	previous?: 'HR' | 'MIN' | undefined;
	next?: 'HR' | 'MIN' | undefined;
};

interface CalenderProps {
	range?: boolean;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	onApply: () => void;
	onClear: () => void;
	disabledDates?: string[];
	disableDatesBefore?: number;
	disableDatesAfter?: number;
	value?: number | number[];
	setFixedRange?: (value: boolean) => void;
	fixedRange?: boolean;
	customRanges?: CustomRange[];
	timeRangeSelection?: TimeRangeSelection;
	setTimeRangeSelection: (value: TimeRangeSelection) => void;
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	defaultHourDiff?: number;
	limitHours?: number;
	showTime?: boolean;
	valueAsRange?: boolean;
	enableFutureDates?: boolean;
}

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
		valueAsRange,
		enableFutureDates,
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
				const firstDayInfo = getDayInfo(fromUnixTime(startUnix));
				setSelectedMonth({
					month: firstDayInfo.month,
					monthAsNumber: firstDayInfo.monthAsNumber,
					year: firstDayInfo.year,
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
				valueAsRange={valueAsRange}
			/>

			{showCalender ? (
				<CalenderBody
					{...commonCalenderProps}
					disabledDates={disabledDates ?? []}
					disableDatesBefore={disableDatesBefore}
					disableDatesAfter={disableDatesAfter}
					enableFutureDates={enableFutureDates}
					setFixedRange={setFixedRange}
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
			/>
		</div>
	);
};

export default Calender;
