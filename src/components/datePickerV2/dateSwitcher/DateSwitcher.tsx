import { getUnixTime } from 'date-fns';
import { useState, type ReactElement } from 'react';
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
	month?: string;
	year?: number;
	date?: number;
	unix?: number;
}

interface SwitchSelectorProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	setSelectedDate: (date: SelectedDate) => void;
	selectedDate: SelectedDate;
	type: 'month' | 'year';
}

interface DateSwitcherProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	setSelectedDate: (date: SelectedDate) => void;
	selectedDate: SelectedDate;
}

const SwitchSelector = ({
	selectedMonth,
	setSelectedMonth,
	setSelectedDate,
	selectedDate,
	type,
}: SwitchSelectorProps): ReactElement => {
	const [monthValue, setMonthValue] = useState<number>(selectedMonth.monthAsNumber);
	const [yearValue, setYearValue] = useState<number>(selectedMonth.year);

	const goToDate = (year: number, month: number, date: number): void => {
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
				goToDate(selectedDate.year ?? yearValue, monthValue - 1, selectedDate.date ?? 1);
			}
		} else {
			setYearValue(yearValue - 1);
			goToDate(yearValue - 1, selectedMonth.monthAsNumber, selectedDate.date ?? 1);
		}
	};

	const onNext = (): void => {
		if (type === 'month') {
			if (monthValue < 11) {
				setMonthValue(monthValue + 1);
				goToDate(selectedDate.year ?? yearValue, monthValue + 1, selectedDate.date ?? 1);
			}
		} else {
			setYearValue(yearValue + 1);
			goToDate(yearValue + 1, selectedMonth.monthAsNumber, selectedDate.date ?? 1);
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
					leftComponent={(): ReactElement => {
						return <ChevronIcon position='bottom' />;
					}}
				/>
				<Button
					className={styles.arrow}
					onClick={onNext}
					leftComponent={(): ReactElement => {
						return <ChevronIcon position='top' />;
					}}
				/>
			</div>
		</div>
	);
};

const DateSwitcher = (props: DateSwitcherProps): ReactElement => {
	return (
		<div className={styles.root}>
			<SwitchSelector type='month' {...props} />
			<Text className={styles.to}>to</Text>
			<SwitchSelector type='year' {...props} />
		</div>
	);
};

export default DateSwitcher;
