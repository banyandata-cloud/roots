import { fromUnixTime, getUnixTime, isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FULL_MONTHS } from '../../../constants';
import { getDatesInStringFormat, getDayInfo } from '../../../utils';
import { ClockView } from '../clockView';
import styles from './Calender.module.css';
import { CalenderBody } from './body';
import { CalenderFooter } from './footer';
import { CalenderHeader } from './header';

const Calender = (props) => {
	const {
		range,
		selectedDate,
		setSelectedDate,
		selectedRange,
		setSelectedRange,
		onApply,
		disabledDates,
		disableDatesBefore,
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
	} = props;

	const [dateSelectionView, showDateSelectionView] = useState(false);
	const [timeSelectionView, showTimeSelectionView] = useState(false);

	const [activeGoToSelection, setActiveGoToSelection] = useState();
	const [activeTimeSelection, setActiveTimeSelection] = useState();

	const setSelectedValues = () => {
		if (fixedRange) {
			const date = new Date();
			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			const selectedDateMonth = {
				month: selectedDayInfo.month,
				monthAsNumber: selectedDayInfo.monthAsNumber,
				year: selectedDayInfo.year,
				dayAsNumber: selectedDayInfo.dayAsNumber,
			};
			setSelectedMonth({
				month: getDayInfo(fromUnixTime(selectedRange?.unix?.[0])).month,
				monthAsNumber: getDayInfo(fromUnixTime(selectedRange?.unix?.[0])).monthAsNumber,
				year: getDayInfo(fromUnixTime(selectedRange?.unix?.[0])).year,
			});
			setSelectedDate({
				...selectedDate,
				month: selectedDateMonth.month,
				year: selectedDateMonth.year,
				date: dateAsNumber,
				unix: getUnixTime(date),
			});
			return;
		}
		if (range && value?.filter(Boolean)?.length > 0) {
			setSelectedRange({
				dates: getDatesInStringFormat({
					startingDate: fromUnixTime(value[0]),
					endingDate: fromUnixTime(value[1]),
				}),
				unix: [value[0], value[1]],
			});
			const date = new Date();
			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			const selectedDateMonth = {
				month: selectedDayInfo.month,
				monthAsNumber: selectedDayInfo.monthAsNumber,
				year: selectedDayInfo.year,
				dayAsNumber: selectedDayInfo.dayAsNumber,
			};
			setSelectedMonth({
				month: getDayInfo(fromUnixTime(value[0])).month,
				monthAsNumber: getDayInfo(fromUnixTime(value[0])).monthAsNumber,
				year: getDayInfo(fromUnixTime(value[0])).year,
			});
			setSelectedDate({
				...selectedDate,
				month: selectedDateMonth.month,
				year: selectedDateMonth.year,
				date: dateAsNumber,
				unix: getUnixTime(date),
			});
			return;
		}
		if (!range && value) {
			const date = fromUnixTime(value);
			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			const selectedDateMonth = {
				month: selectedDayInfo.month,
				monthAsNumber: selectedDayInfo.monthAsNumber,
				year: selectedDayInfo.year,
				dayAsNumber: selectedDayInfo.dayAsNumber,
			};
			setSelectedMonth({
				month: selectedDayInfo.month,
				monthAsNumber: selectedDayInfo.monthAsNumber,
				year: selectedDayInfo.year,
			});
			setSelectedDate({
				...selectedDate,
				month: selectedDateMonth.month,
				year: selectedDateMonth.year,
				date: dateAsNumber,
				unix: getUnixTime(date),
			});
			return;
		}
		const date = new Date();
		if (
			(range && !value && disableDatesBefore?.length === 0) ||
			(!range && !isBefore(date, disableDatesBefore))
		) {
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

	const onMonthChange = (switchSide) => {
		if (switchSide === 'prev') {
			if (selectedMonth.monthAsNumber === 0) {
				const previousMonth = FULL_MONTHS[11];
				setSelectedMonth({
					month: previousMonth,
					monthAsNumber: 11,
					year: selectedMonth.year - 1,
				});
				return;
			}
			const previousMonthNumber = selectedMonth.monthAsNumber - 1;
			const previousMonth = FULL_MONTHS[previousMonthNumber];
			setSelectedMonth({
				month: previousMonth,
				monthAsNumber: previousMonthNumber,
				year: selectedMonth.year,
			});
			return;
		}

		if (switchSide === 'next') {
			if (selectedMonth.monthAsNumber === 11) {
				const nextMonth = FULL_MONTHS[0];
				setSelectedMonth({
					month: nextMonth,
					monthAsNumber: 0,
					year: selectedMonth.year + 1,
				});
				return;
			}
			const nextMonthNumber = selectedMonth.monthAsNumber + 1;
			const nextMonth = FULL_MONTHS[nextMonthNumber];
			setSelectedMonth({
				month: nextMonth,
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
		range,
		selectedMonth,
	};

	const showCalender = !timeSelectionView;

	return (
		<div className={styles.root}>
			<CalenderHeader
				{...commonCalenderProps}
				selectedMonth={selectedMonth}
				onMonthChange={onMonthChange}
				setSelectedMonth={setSelectedMonth}
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
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
					disabledDates={disabledDates}
					disableDatesBefore={disableDatesBefore}
				/>
			) : (
				<ClockView
					{...commonCalenderProps}
					setSelectedMonth={setSelectedMonth}
					activeTimeSelection={activeTimeSelection}
					timeRangeSelection={timeRangeSelection}
					setTimeRangeSelection={setTimeRangeSelection}
					limitHours={limitHours}
				/>
			)}
			<CalenderFooter
				{...commonCalenderProps}
				onApply={onApply}
				customRanges={customRanges}
				setFixedRange={setFixedRange}
			/>
		</div>
	);
};

export default Calender;
