import React, { useState } from 'react';
import { CalenderHeader } from './header';
import styles from './Calender.module.css';
import { getToday } from '../../utils';
import { FULL_MONTHS } from '../../constants';
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
	} = props;

	const { month, year, monthAsNumber, dayAsNumber } = getToday();
	const [selectedMonth, setSelectedMonth] = useState({
		month,
		monthAsNumber,
		year,
		dayAsNumber,
	});

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
			/>
			<CalenderFooter
				range={range}
				selectedDate={selectedDate}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
				onApply={onApply}
			/>
		</div>
	);
};

export default Calender;
