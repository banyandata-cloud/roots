/* eslint-disable no-nested-ternary */
import {
	fromUnixTime,
	getUnixTime,
	isAfter,
	isBefore,
	isEqual,
	isSameDay,
	isToday,
} from 'date-fns';
import { useEffect, useState, type ReactElement } from 'react';
import { classes, getDatesInAMonth, getDayInfo } from '../../../../../utils';
import { TodayIndicator } from './assets';
import styles from './Dates.module.css';
import { getDatesToDisplay, rangeSelection } from './utils';

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

interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

interface DatesProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	range: boolean;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	disabledDates: string[];
	disableDatesBefore: number[];
	enableFutureDates: boolean;
	disableDatesAfter: number[];
	hoveredEndingDate: number | null;
	setHoveredEndingDate: (date: number | null) => void;
	setFixedTime: (time: number) => void;
	setFixedTimeRange: (range: [number, number]) => void;
}

interface DatesInMonth {
	days: number[];
	dateObj: Date[];
}

const Dates = (props: DatesProps): ReactElement => {
	const {
		selectedMonth,
		setSelectedMonth,
		selectedDate,
		setSelectedDate,
		range,
		selectedRange,
		setSelectedRange,
		disabledDates,
		disableDatesBefore,
		enableFutureDates,
		disableDatesAfter,
		hoveredEndingDate,
		setHoveredEndingDate,
		setFixedTime,
		setFixedTimeRange,
	} = props;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const { monthAsNumber, year } = selectedMonth ?? {};

	const [datesToDisplay, setDatesToDisplay] = useState<Date[]>(() => {
		return [];
	});

	const [unSelectedDate, setUnSelectedDate] = useState<string | null>(() => {
		return null;
	});

	const [datesInMonth, setDatesInMonth] = useState<DatesInMonth>(() => {
		return getDatesInAMonth({
			month: monthAsNumber,
			year,
		});
	});

	const [firstItem, lastItem] = selectedRange.unix ?? [];

	const { days, dateObj } = datesInMonth;

	useEffect(() => {
		setDatesInMonth(
			getDatesInAMonth({
				month: monthAsNumber,
				year,
			})
		);
		setUnSelectedDate(null);
	}, [selectedMonth, monthAsNumber, year]);

	useEffect(() => {
		setDatesToDisplay(
			getDatesToDisplay({
				monthAsNumber,
				year,
				days,
				dateObj,
			})
		);
	}, [days, monthAsNumber, year, dateObj]);

	const dateSelection = (date: Date): void => {
		setFixedTime(0);
		setFixedTimeRange([0, 0]);
		if (range) {
			setHoveredEndingDate(null);
			setSelectedRange(
				rangeSelection({
					selectedRange,
					date,
				})
			);
			return;
		}

		const dateAsNumber = date.getDate();

		if (selectedDate.date === dateAsNumber) {
			setSelectedDate({});
			setUnSelectedDate(date.toISOString());
			return;
		}
		setUnSelectedDate(null);

		setSelectedDate({
			...selectedDate,
			month: getDayInfo(date).month,
			year: selectedMonth.year,
			date: dateAsNumber,
			unix: getUnixTime(date.setHours(23, 59, 59, 59)),
		});
		setSelectedMonth({
			month: getDayInfo(date).month,
			monthAsNumber: getDayInfo(date).monthAsNumber,
			year: getDayInfo(date).year,
		});
	};

	const onMouseEnterADate = (date: Date): void => {
		const firstUnix = selectedRange.unix?.[0];
		const secondUnix = selectedRange.unix?.[1];

		if (firstUnix === undefined || secondUnix === undefined) {
			if (range && selectedRange.unix?.length === 1) {
				setHoveredEndingDate(getUnixTime(date));
			}
			return;
		}

		const sameDay = isSameDay(fromUnixTime(firstUnix), fromUnixTime(secondUnix));

		if (selectedRange.unix?.length === 2 && sameDay) {
			setHoveredEndingDate(getUnixTime(date));
			return;
		}
		if (range && selectedRange.unix?.length === 1) {
			setHoveredEndingDate(getUnixTime(date));
		}
	};

	const disabledBeforeDate = (date: Date): boolean => {
		return (
			disableDatesBefore.length > 0 &&
			isBefore(date, fromUnixTime(disableDatesBefore[0] ?? 0))
		);
	};

	const disabledAfterDate = (date: Date): boolean => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (disableDatesAfter?.length > 0) {
			return isAfter(date, fromUnixTime(disableDatesAfter[0] ?? 0));
		}

		const dObj = new Date();
		dObj.setDate(dObj.getDate() + 1);
		dObj.setHours(0, 0, 0, 0);
		return isAfter(date, dObj);
	};

	return (
		<div className={styles.root}>
			{datesToDisplay.map((date) => {
				const dateNumber: number = date.getDate();
				const today: boolean = isToday(date);

				const selectedDateUnix = selectedDate.unix;
				const selectedSingleDate: boolean =
					selectedDateUnix !== undefined &&
					isSameDay(fromUnixTime(selectedDateUnix), date);

				const isSameDayRange: boolean =
					firstItem !== undefined &&
					lastItem !== undefined &&
					isSameDay(fromUnixTime(firstItem), date) &&
					isSameDay(fromUnixTime(firstItem), fromUnixTime(lastItem));

				const todaySelected: boolean = today && selectedSingleDate;

				const isFirstItem: boolean =
					!isSameDayRange &&
					firstItem !== undefined &&
					isEqual(
						fromUnixTime(firstItem).setHours(0, 0, 0, 0),
						date.setHours(0, 0, 0, 0)
					);

				const isLastItem: boolean =
					!isSameDayRange &&
					lastItem !== undefined &&
					isEqual(
						fromUnixTime(lastItem).setHours(23, 59, 59, 59),
						date.setHours(23, 59, 59, 59)
					);

				const isFirstItemHovered: boolean =
					firstItem !== undefined &&
					isBefore(date, fromUnixTime(firstItem)) &&
					hoveredEndingDate === getUnixTime(date);

				const isLastItemHovered: boolean = hoveredEndingDate === getUnixTime(date);

				const notSameMonth: boolean = date.getMonth() !== monthAsNumber;

				const isUnSelected: boolean = unSelectedDate === date.toISOString();

				const isDisabled: boolean =
					disabledDates.includes(date.toDateString()) ||
					disabledBeforeDate(date) ||
					(!enableFutureDates && disabledAfterDate(date));

				const isHoveringBeforeSelectedDate: boolean =
					hoveredEndingDate !== null &&
					firstItem !== undefined &&
					isBefore(fromUnixTime(hoveredEndingDate), fromUnixTime(firstItem));

				let isMidItem: boolean;

				if (hoveredEndingDate) {
					isMidItem =
						firstItem !== undefined &&
						((!isSameDayRange &&
							isBefore(date, fromUnixTime(hoveredEndingDate)) &&
							isAfter(date, fromUnixTime(firstItem))) ||
							(isAfter(date, fromUnixTime(hoveredEndingDate)) &&
								isBefore(date, fromUnixTime(firstItem))));
				} else {
					isMidItem =
						firstItem !== undefined &&
						lastItem !== undefined &&
						isBefore(date, fromUnixTime(lastItem).setHours(0, 0, 0, 0)) &&
						isAfter(date, fromUnixTime(firstItem).setHours(23, 59, 59, 59));
				}

				const parentClassNames: string = classes(
					isMidItem
						? selectedSingleDate
							? styles.midInRangeSelected
							: styles.midInRange
						: '',
					isFirstItem
						? isHoveringBeforeSelectedDate
							? styles.maxInRange
							: styles.minInRange
						: '',
					isLastItem ? styles.maxInRange : '',
					(isSameDayRange && isLastItemHovered) || isLastItemHovered
						? styles['first-hovered']
						: '',
					(isSameDayRange && isFirstItemHovered) || isFirstItemHovered
						? styles['last-hovered']
						: '',
					today ? styles.today : '',
					todaySelected ? styles['today-selected'] : ''
				);

				const childClassNames: string = classes(
					styles.date,
					isSameDayRange || selectedSingleDate ? styles.selected : '',
					isUnSelected ? styles.unSelected : '',
					notSameMonth ? styles.diffMonth : '',
					isDisabled ? styles.disabled : ''
				);

				return (
					<div
						className={parentClassNames}
						onClick={(): void => {
							if (!isDisabled) {
								dateSelection(date);
							}
						}}
						onMouseEnter={(): void => {
							onMouseEnterADate(date);
						}}
						key={date.toDateString()}>
						<span className={childClassNames}>{dateNumber}</span>
						{today && styles.indicator && (
							<TodayIndicator className={styles.indicator} />
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Dates;
