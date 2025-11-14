import { addMonths, fromUnixTime, getUnixTime, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';
import { FULL_MONTHS } from '../../../constants';
import { getDatesInStringFormat, getDayInfo } from '../../../utils';
import styles from './Calender.module.css';
import { CalenderBody } from './body';
import { CalenderHeader } from './header';

// @ts-ignore
const Calender = (props) => {
	const {
		range,
		selectedDate,
		setSelectedDate,
		selectedRange,
		setSelectedRange,
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		value,
		fixedRange,
		selectedMonth,
		setSelectedMonth,
		displayMonthRight,
		setDisplayMonthRight,
		valueAsRange,
		enableFutureDates,
		setFixedTime,
		setFixedTimeRange,
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
				month: getDayInfo(fromUnixTime(selectedRange?.unix?.[0] + 2592000)).month,
				monthAsNumber: getDayInfo(fromUnixTime(selectedRange?.unix?.[0])).monthAsNumber,
				year: getDayInfo(fromUnixTime(selectedRange?.unix?.[0] + 2592000)).year,
			});
			setDisplayMonthRight({
				month: getDayInfo(fromUnixTime(selectedRange?.unix?.[0] + 2592000)).month,
				monthAsNumber: getDayInfo(fromUnixTime(selectedRange?.unix?.[0])).monthAsNumber + 1,
				year: getDayInfo(fromUnixTime(selectedRange?.unix?.[0] + 2592000)).year,
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

		if (range && value?.filter?.(Boolean)?.length > 0) {
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
			setDisplayMonthRight({
				month: getDayInfo(fromUnixTime(value[0] + 2592000)).month,
				monthAsNumber: getDayInfo(fromUnixTime(value[0])).monthAsNumber + 1,
				year: getDayInfo(fromUnixTime(value[0] + 2592000)).year,
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
			const oneMonthLater = fromUnixTime(value);

			const dateAsNumber = date.getDate();
			const selectedDayInfo = getDayInfo(date);
			const nextMonthInfo = getDayInfo(addMonths(oneMonthLater, 1));

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
			setDisplayMonthRight({
				month: nextMonthInfo.month,
				monthAsNumber: nextMonthInfo.monthAsNumber,
				year: nextMonthInfo.year,
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
			setSelectedRange({
				dates: [],
				unix: [],
			});
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
			setDisplayMonthRight({
				month: selectedDayInfo.month,
				monthAsNumber: selectedDayInfo.monthAsNumber + 1,
				year: selectedDayInfo.year,
			});
		}
	};

	useEffect(() => {
		setSelectedValues();
	}, []);

	// @ts-ignore
	const onMonthChange = (switchSide) => {
		if (switchSide === 'prev') {
			if (Number(selectedMonth.monthAsNumber) - 2 < 0) {
				const nextMonth = FULL_MONTHS[(Number(selectedMonth.monthAsNumber) + 12 - 1) % 12];
				setSelectedMonth({
					month: FULL_MONTHS[(Number(selectedMonth.monthAsNumber) + 12 - 2) % 12],
					monthAsNumber: (Number(selectedMonth.monthAsNumber) + 12 - 2) % 12,
					year:
						(Number(selectedMonth.monthAsNumber) + 12 - 2) % 12 > 0
							? Number(selectedMonth.year) - 1
							: Number(selectedMonth.year),
				});
				setDisplayMonthRight({
					month: nextMonth,
					monthAsNumber: (Number(selectedMonth.monthAsNumber) + 12 - 1) % 12,
					year:
						(Number(selectedMonth.monthAsNumber) + 12 - 1) % 12 > 0
							? Number(selectedMonth.year) - 1
							: Number(selectedMonth.year),
				});
				return;
			}
			const previousMonthNumber = Number(selectedMonth.monthAsNumber) - 2;
			const previousRightMonthNumber = Number(selectedMonth.monthAsNumber) - 1;
			const previousMonth = FULL_MONTHS[previousMonthNumber];
			const previousRightMonth = FULL_MONTHS[previousRightMonthNumber];
			setSelectedMonth({
				month: previousMonth,
				monthAsNumber: previousMonthNumber,
				year: selectedMonth.year,
			});
			setDisplayMonthRight({
				month: previousRightMonth,
				monthAsNumber: previousRightMonthNumber,
				year: selectedMonth.year,
			});
			return;
		}

		if (switchSide === 'next') {
			if (Number(selectedMonth.monthAsNumber) + 2 >= 11) {
				const nextMonth = FULL_MONTHS[(Number(selectedMonth.monthAsNumber) + 3) % 12];
				setSelectedMonth({
					month: FULL_MONTHS[(Number(selectedMonth.monthAsNumber) + 2) % 12],
					monthAsNumber: (Number(selectedMonth.monthAsNumber) + 2) % 12,
					year:
						(Number(selectedMonth.monthAsNumber) + 3) % 12 > 0
							? Number(selectedMonth.year) + 1
							: Number(selectedMonth.year),
				});
				setDisplayMonthRight({
					month: nextMonth,
					monthAsNumber: (Number(selectedMonth.monthAsNumber) + 3) % 12,
					year: Number(selectedMonth.year) + 1,
				});
				return;
			}
			const nextMonthNumber = Number(selectedMonth.monthAsNumber) + 2;
			const nextRightMonthNumber = Number(displayMonthRight.monthAsNumber) + 2;
			const nextMonth = FULL_MONTHS[nextMonthNumber];
			const nextRightMonth = FULL_MONTHS[nextRightMonthNumber];
			setSelectedMonth({
				month: nextMonth,
				monthAsNumber: nextMonthNumber,
				year: selectedMonth.year,
			});
			setDisplayMonthRight({
				month: nextRightMonth,
				monthAsNumber: nextRightMonthNumber,
				year: displayMonthRight.year,
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
		setFixedTime,
		setFixedTimeRange,
	};

	return (
		<div className={styles.root}>
			<CalenderHeader
				{...commonCalenderProps}
				selectedMonth={selectedMonth}
				onMonthChange={onMonthChange}
				setSelectedMonth={setSelectedMonth}
				displayMonthRight={displayMonthRight}
				// @ts-ignore
				setDisplayMonthRight={setDisplayMonthRight}
				showDateSelectionView={showDateSelectionView}
				showTimeSelectionView={showTimeSelectionView}
				dateSelectionView={dateSelectionView}
				timeSelectionView={timeSelectionView}
				activeGoToSelection={activeGoToSelection}
				setActiveGoToSelection={setActiveGoToSelection}
				activeTimeSelection={activeTimeSelection}
				setActiveTimeSelection={setActiveTimeSelection}
				valueAsRange={valueAsRange}
			/>

			<CalenderBody
				{...commonCalenderProps}
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
				displayMonthRight={displayMonthRight}
				setDisplayMonthRight={setDisplayMonthRight}
				disabledDates={disabledDates}
				disableDatesBefore={disableDatesBefore}
				disableDatesAfter={disableDatesAfter}
				enableFutureDates={enableFutureDates}
			/>
		</div>
	);
};

export default Calender;
