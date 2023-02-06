import React, { useEffect, useState } from 'react';
import { fromUnixTime, getUnixTime, isBefore } from 'date-fns';
import { CalenderHeader } from './header';
import styles from './Calender.module.css';
import { getDatesInStringFormat, getDayInfo } from '../../../utils';
import { FULL_MONTHS } from '../../../constants';
import { CalenderBody } from './body';
import { CalenderFooter } from './footer';

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
		customRanges,
	} = props;

	const { month, year, monthAsNumber, dayAsNumber } = getDayInfo(new Date());
	const [selectedMonth, setSelectedMonth] = useState({
		month,
		monthAsNumber,
		year,
		dayAsNumber,
	});

	useEffect(() => {
		if (range && value) {
			setSelectedRange({
				dates: getDatesInStringFormat({
					startingDate: fromUnixTime(value[0]),
					endingDate: fromUnixTime(value[1]),
				}),
				unix: [value[0], value[1]],
			});
			const dateAsNumber = fromUnixTime(value[0]).getDate();
			const selectedDayInfo = getDayInfo(fromUnixTime(value[0]));
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
				unix: getUnixTime(fromUnixTime(value[0])),
			});
		} else if (value) {
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
		} else {
			const date = new Date();
			if (!range && !isBefore(date, disableDatesBefore)) {
				const dateAsNumber = date.getDate();
				setSelectedDate({
					...selectedDate,
					month: selectedMonth.month,
					year: selectedMonth.year,
					date: dateAsNumber,
					unix: getUnixTime(date),
				});
			}
		}
	}, []);

	const goToDate = (unix) => {
		const dayInfo = getDayInfo(new Date(unix * 1000));
		setSelectedMonth({
			month: dayInfo.month,
			monthAsNumber: dayInfo.monthAsNumber,
			year: dayInfo.year,
		});
		setSelectedDate({
			...selectedDate,
			month: dayInfo.month,
			year: dayInfo.year,
			date: dayInfo.dateAsNumber,
			unix: getUnixTime(new Date(unix * 1000)),
		});
	};

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
	return (
		<div className={styles.root}>
			<CalenderHeader selectedMonth={selectedMonth} onMonthChange={onMonthChange} />
			<CalenderBody
				selectedMonth={selectedMonth}
				range={range}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
				disabledDates={disabledDates}
				disableDatesBefore={disableDatesBefore}
			/>
			<CalenderFooter
				range={range}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
				onApply={onApply}
				goToDate={goToDate}
				customRanges={customRanges}
				setFixedRange={setFixedRange}
			/>
		</div>
	);
};

export default Calender;
