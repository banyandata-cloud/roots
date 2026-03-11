import { getUnixTime } from 'date-fns';
import React, { useState } from 'react';
import { FULL_MONTHS } from '../../../constants';
import { getDayInfo } from '../../../utils';
import { Button } from '../../buttons';
import { ChevronIcon } from '../../icons';
import { Text } from '../../text';
import styles from './DateSwitcher.module.css';

interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
	unix?: number;
}

interface SwitchSelectorProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	type: 'month' | 'year';
}

interface DateSwitcherProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
}

// --- SwitchSelector ---

const SwitchSelector = ({
	selectedMonth,
	setSelectedMonth,
	setSelectedDate,
	selectedDate,
	type,
}: SwitchSelectorProps): React.JSX.Element => {
	const [monthValue, setMonthValue] = useState<number>(selectedMonth.monthAsNumber);
	const [yearValue, setYearValue] = useState<number>(
		selectedMonth.year ?? new Date().getFullYear()
	);

	const goToDate = (year: number, month: number, date: number | undefined): void => {
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

	const onPrev = (): void => {
		if (type === 'month') {
			if (monthValue > 0) {
				setMonthValue(monthValue - 1);
				goToDate(
					selectedDate.year ?? new Date().getFullYear(),
					monthValue - 1,
					selectedDate.date
				);
			}
		} else {
			setYearValue(yearValue - 1);
			goToDate(yearValue - 1, selectedMonth.monthAsNumber, selectedDate.date);
		}
	};

	const onNext = (): void => {
		if (type === 'month') {
			if (monthValue < 11) {
				setMonthValue(monthValue + 1);
				goToDate(
					selectedDate.year ?? new Date().getFullYear(),
					monthValue + 1,
					selectedDate.date
				);
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

const DateSwitcher = (props: DateSwitcherProps): React.JSX.Element => {
	return (
		<div className={styles.root}>
			<SwitchSelector type='month' {...props} />
			<Text className={styles.to}>to</Text>
			<SwitchSelector type='year' {...props} />
		</div>
	);
};

export default DateSwitcher;
