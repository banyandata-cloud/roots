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
import React, { useEffect, useState } from 'react';
import { classes, getDatesInAMonth, getDayInfo } from '../../../../../utils';
import { TodayIndicator } from './assets';
import styles from './Dates.module.css';
import type { DatesInMonth, DatesProps } from './types';
import { getDatesToDisplay, rangeSelection } from './utils';

export type { DatesProps };

const Dates = (props: DatesProps): React.JSX.Element => {
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
		setFixedRange,
	} = props;

	const { monthAsNumber, year } = selectedMonth || {};

	const [datesToDisplay, setDatesToDisplay] = useState<Date[]>(() => []);
	const [unSelectedDate, setUnSelectedDate] = useState<string | null>(() => null);
	const [hoveredEndingDate, setHoveredEndingDate] = useState<number | null>(() => null);
	const [datesInMonth, setDatesInMonth] = useState<DatesInMonth>(
		() => getDatesInAMonth({ month: monthAsNumber, year }) as DatesInMonth
	);

	const unixArr = selectedRange.unix ?? [];
	const firstItem = unixArr[0];
	const lastItem = unixArr[unixArr.length - 1];

	const { days, dateObj } = datesInMonth;

	useEffect(() => {
		setDatesInMonth(getDatesInAMonth({ month: monthAsNumber, year }) as DatesInMonth);
		setUnSelectedDate(null);
	}, [selectedMonth]);

	useEffect(() => {
		setDatesToDisplay(getDatesToDisplay({ monthAsNumber, year, days, dateObj }));
	}, [days]);

	const dateSelection = (date: Date): void => {
		setFixedRange?.(false);

		if (range) {
			setHoveredEndingDate(null);
			setSelectedRange(rangeSelection({ selectedRange, date }));
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
			year: getDayInfo(date).year,
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
		const sameDay = isSameDay(
			fromUnixTime(selectedRange?.unix?.[0] as number),
			fromUnixTime(selectedRange?.unix?.[1] as number)
		);
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
			(disableDatesBefore ?? 0) > 0 &&
			isBefore(date, fromUnixTime(disableDatesBefore as number))
		);
	};

	const disabledAfterDate = (date: Date): boolean => {
		if (disableDatesAfter) {
			return (disableDatesAfter ?? 0) > 0 && isAfter(date, fromUnixTime(disableDatesAfter));
		}
		const dObj = new Date();
		dObj.setDate(dObj.getDate() + 1);
		dObj.setHours(0, 0, 0, 0);
		return isAfter(date, dObj);
	};

	return (
		<div className={styles.root}>
			{datesToDisplay.map((date: Date) => {
				const dateNumber = date?.getDate();
				const today = isToday(date);
				const selectedSingleDate = isSameDay(
					fromUnixTime(selectedDate.unix as number),
					date
				);
				const isSameDayRange =
					isSameDay(fromUnixTime(firstItem!), date) &&
					isSameDay(fromUnixTime(firstItem!), fromUnixTime(lastItem!));
				const todaySelected = today && selectedSingleDate;
				const isFirstItem =
					!isSameDayRange &&
					isEqual(
						fromUnixTime(firstItem!).setHours(0, 0, 0, 0),
						new Date(date).setHours(0, 0, 0, 0)
					);
				const isLastItem =
					!isSameDayRange &&
					isEqual(
						fromUnixTime(lastItem!).setHours(0, 0, 0, 0),
						new Date(date).setHours(0, 0, 0, 0)
					);

				const isFirstItemHovered =
					isBefore(date, fromUnixTime(firstItem!)) &&
					hoveredEndingDate === getUnixTime(date);

				const isLastItemHovered =
					hoveredEndingDate === getUnixTime(date) &&
					!isBefore(date, fromUnixTime(firstItem!));

				const notSameMonth = date.getMonth() !== monthAsNumber;
				const isUnSelected = unSelectedDate === date.toISOString();
				const isDisabled =
					disabledDates.includes(date.toDateString()) ||
					disabledBeforeDate(date) ||
					(!enableFutureDates && disabledAfterDate(date));

				let isHoveringBeforeSelectedDate: boolean | null = null;

				if (hoveredEndingDate) {
					isHoveringBeforeSelectedDate = isBefore(
						fromUnixTime(hoveredEndingDate),
						fromUnixTime(firstItem!)
					);
				}

				let isMidItem: boolean;
				if (hoveredEndingDate) {
					isMidItem =
						(!isSameDayRange &&
							isBefore(date, fromUnixTime(hoveredEndingDate)) &&
							isAfter(date, fromUnixTime(firstItem!))) ||
						(isAfter(date, fromUnixTime(hoveredEndingDate)) &&
							isBefore(date, fromUnixTime(firstItem!)));
				} else {
					isMidItem =
						isBefore(date, fromUnixTime(lastItem!).setHours(0, 0, 0, 0)) &&
						isAfter(date, fromUnixTime(firstItem!).setHours(23, 59, 59, 59));
				}

				const parentClassNames = classes(
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
						? styles['last-hovered']
						: '',
					(isSameDayRange && isFirstItemHovered) || isFirstItemHovered
						? styles['first-hovered']
						: '',
					today ? styles.today : '',
					todaySelected ? styles['today-selected'] : '',
					isDisabled ? styles['date-disabled'] : ''
				);

				const childClassNames = classes(
					date ? styles.date : '',
					isSameDayRange || selectedSingleDate ? styles.selected : '',
					isUnSelected ? styles.unSelected : '',
					notSameMonth ? styles.diffMonth : '',
					isDisabled ? styles.disabled : ''
				);

				return (
					<div
						className={parentClassNames}
						onClick={() => {
							if (!isDisabled) dateSelection(date);
						}}
						onMouseEnter={() => {
							onMouseEnterADate(date);
						}}
						key={date.toDateString()}>
						<span className={childClassNames}>{dateNumber}</span>
						{today && <TodayIndicator className={styles.indicator ?? ''} />}
					</div>
				);
			})}
		</div>
	);
};

export default Dates;
