import { getUnixTime } from 'date-fns';
import { useState } from 'react';
import { FULL_MONTHS } from '../../../constants';
import { getDayInfo } from '../../../utils';
import { Button } from '../../buttons';
import { ChevronIcon } from '../../icons';
import { Text } from '../../text';
import styles from './DateSwitcher.module.css';

const SwitchSelector = ({
	selectedMonth,
	setSelectedMonth,
	setSelectedDate,
	selectedDate,
	type,
}) => {
	const [monthValue, setMonthValue] = useState(selectedMonth.monthAsNumber);
	const [yearValue, setYearValue] = useState(selectedMonth.year ?? new Date().getFullYear());

	const goToDate = (year, month, date) => {
		const passedDate = new Date(year, month, date);

		const dayInfo = getDayInfo(passedDate);

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
			unix: getUnixTime(passedDate),
		});
	};

	const onPrev = () => {
		if (type === 'month') {
			if (monthValue > 0) {
				setMonthValue(monthValue - 1);
				goToDate(selectedDate.year, monthValue - 1, selectedDate.date);
			}
		} else {
			setYearValue(yearValue - 1);
			goToDate(yearValue - 1, selectedMonth.monthAsNumber, selectedDate.date);
		}
	};

	const onNext = () => {
		if (type === 'month') {
			if (monthValue < 11) {
				setMonthValue(monthValue + 1);
				goToDate(selectedDate.year, monthValue + 1, selectedDate.date);
			}
		} else {
			setYearValue(yearValue + 1);
			goToDate(yearValue + 1, selectedMonth.monthAsNumber, selectedDate.date);
		}
	};

	return (
		<div className={styles['switch-selector']}>
			<div className={styles.value}>
				<Text>{type === 'month' ? FULL_MONTHS[monthValue] : yearValue}</Text>{' '}
			</div>
			<div className={styles.arrows}>
				<Button
					className={styles.arrow}
					onClick={onPrev}
					leftComponent={() => {
						return <ChevronIcon position='bottom' />;
					}}
				/>
				<Button
					className={styles.arrow}
					onClick={onNext}
					leftComponent={() => {
						return <ChevronIcon position='top' />;
					}}
				/>
			</div>
		</div>
	);
};

const DateSwitcher = (props) => {
	return (
		<div className={styles.root}>
			<SwitchSelector type='month' {...props} />
			<Text className={styles.to}>to</Text>
			<SwitchSelector type='year' {...props} />
		</div>
	);
};

export default DateSwitcher;
