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
import React, { useEffect, useMemo, useState } from 'react';
import { MONTHS } from '../../../../../constants';
import { classes, getDatesInAMonth, getDayInfo } from '../../../../../utils';
import { TodayIndicator } from './assets';
import styles from './Dates.module.css';
import type { DatesInMonth, DatesProps, SelectedRange } from './types';
import { getDatesToDisplay, rangeSelection } from './utils';

export type { DatesProps };

const withReplacedEndpoint = (
	baseRange: SelectedRange,
	date: Date,
	index: 0 | 1
): SelectedRange => {
	const dateAsNumber = date.getDate();
	const month = MONTHS[date.getMonth()]?.substring(0, 3);
	const year = date.getFullYear();
	const dates = [...(baseRange.dates ?? [])];
	const unix = [...(baseRange.unix ?? [])];
	dates[index] = `${dateAsNumber} ${month} ${year}`;
	unix[index] =
		index === 0
			? getUnixTime(new Date(date).setHours(0, 0, 0, 0))
			: getUnixTime(new Date(date).setHours(23, 59, 59, 59));
	return { dates, unix };
};

const Dates = (props: DatesProps): React.JSX.Element => {
	const {
		selectedMonth,
		setSelectedMonth,
		selectedDate,
		setSelectedDate,
		range,
		timeRange,
		selectedRange,
		setSelectedRange,
		disabledDates,
		disableDatesBefore,
		enableFutureDates,
		disableDatesAfter,
		setFixedRange,
		isDefaultRangeUntouched,
		setIsDefaultRangeUntouched,
		activeGoToSelection,
		setActiveGoToSelection,
	} = props;

	const { monthAsNumber, year } = selectedMonth || {};

	const [unSelectedDate, setUnSelectedDate] = useState<string | null>(() => null);
	const [hoveredEndingDate, setHoveredEndingDate] = useState<number | null>(() => null);

	const datesInMonth = useMemo(
		() => getDatesInAMonth({ month: monthAsNumber, year }) as DatesInMonth,
		[monthAsNumber, year]
	);

	const unixArr = selectedRange.unix ?? [];
	const firstItem = unixArr[0];
	const lastItem = unixArr[unixArr.length - 1];

	const { days, dateObj } = datesInMonth;

	const datesToDisplay = useMemo(
		() => getDatesToDisplay({ monthAsNumber, year, days, dateObj }),
		[monthAsNumber, year, datesInMonth]
	);

	useEffect(() => {
		setUnSelectedDate(null);
	}, [selectedMonth]);

	const dateSelection = (date: Date): void => {
		setFixedRange?.(false);

		if (range && timeRange) {
			const isDateFieldFocused = activeGoToSelection === 'startDate' || activeGoToSelection === 'endDate';

			if (isDateFieldFocused) {
				const index = activeGoToSelection === 'endDate' ? 1 : 0;
				if (isDefaultRangeUntouched) {
					setIsDefaultRangeUntouched?.(false);
				}
				if (index === 0) {
					setActiveGoToSelection?.('endDate');
				}
				setSelectedRange(withReplacedEndpoint(selectedRange, date, index));
				return;
			}

			const isFirstClick = isDefaultRangeUntouched;
			if (isFirstClick) {
				setIsDefaultRangeUntouched?.(false);
			}
			const newRange = rangeSelection({
				selectedRange: isFirstClick ? { dates: [], unix: [] } : selectedRange,
				date,
				allowSameDayRange: true,
			});
			setHoveredEndingDate(newRange.unix?.length === 1 ? getUnixTime(date) : null);
			setSelectedRange(newRange);
			return;
		}

		if (range) {
			const newRange = rangeSelection({ selectedRange, date, allowSameDayRange: false });
			setHoveredEndingDate(newRange.unix?.length === 1 ? getUnixTime(date) : null);
			setSelectedRange(newRange);
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

	const disabledByActiveField = (date: Date): boolean => {
		if (!range || !timeRange) {
			return false;
		}
		if (activeGoToSelection === 'endDate' && selectedRange.unix?.[0] !== undefined) {
			return isBefore(date, fromUnixTime(selectedRange.unix[0]).setHours(0, 0, 0, 0));
		}
		if (activeGoToSelection === 'startDate' && selectedRange.unix?.[1] !== undefined) {
			return isAfter(date, fromUnixTime(selectedRange.unix[1]).setHours(23, 59, 59, 999));
		}
		return false;
	};

	return (
		<div className={styles.root} onMouseLeave={() => setHoveredEndingDate(null)}>
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
					(!enableFutureDates && disabledAfterDate(date)) ||
					disabledByActiveField(date);

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
					!isDisabled && isMidItem
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
					!isDisabled && ((isSameDayRange && isLastItemHovered) || isLastItemHovered)
						? styles['last-hovered']
						: '',
					!isDisabled && ((isSameDayRange && isFirstItemHovered) || isFirstItemHovered)
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
							if (!isDisabled) onMouseEnterADate(date);
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
