/* eslint-disable no-nested-ternary */
import {
	getUnixTime,
	fromUnixTime,
	isAfter,
	isBefore,
	isSameDay,
	isToday,
	isEqual,
} from 'date-fns';
import { useEffect, useState } from 'react';
import { classes, getDatesInAMonth } from '../../../../../utils';
import { TodayIndicator } from './assets';
import styles from './Dates.module.css';
import { getDatesToDisplay, rangeSelection } from './utils';

const Dates = (props) => {
	const {
		selectedMonth,
		selectedDate,
		setSelectedDate,
		range,
		selectedRange,
		setSelectedRange,
		disabledDates,
		disableDatesBefore,
	} = props;

	const { monthAsNumber, year } = selectedMonth || {};

	const [datesToDisplay, setDatesToDisplay] = useState(() => {
		return [];
	});

	const [unSelectedDate, setUnSelectedDate] = useState(() => {
		return null;
	});

	const [hoveredEndingDate, setHoveredEndingDate] = useState(() => {
		return null;
	});

	const [datesInMonth, setDatesInMonth] = useState(() => {
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
	}, [selectedMonth]);

	useEffect(() => {
		setDatesToDisplay(
			getDatesToDisplay({
				monthAsNumber,
				year,
				days,
				dateObj,
			})
		);
	}, [days]);

	const dateSelection = (date) => {
		if (range) {
			setHoveredEndingDate(null);
			setSelectedRange(
				rangeSelection({
					selectedMonth,
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
			month: selectedMonth.month,
			year: selectedMonth.year,
			date: dateAsNumber,
			unix: getUnixTime(date.setHours(23, 59, 59, 59)),
		});
	};

	const onMouseEnterADate = (date) => {
		const sameDay = isSameDay(
			fromUnixTime(selectedRange?.unix?.[0]),
			fromUnixTime(selectedRange?.unix?.[1])
		);
		if (selectedRange.unix?.length === 2 && sameDay) {
			setHoveredEndingDate(getUnixTime(date));
			return;
		}
		if (range && selectedRange.unix?.length === 1) {
			setHoveredEndingDate(getUnixTime(date));
		}
	};

	const disabledBeforeDate = (date) => {
		return disableDatesBefore?.length > 0 && isBefore(date, fromUnixTime(disableDatesBefore));
	};

	const disabledAfterDate = (date) => {
		const dObj = new Date();
		dObj.setDate(dObj.getDate() + 1);
		dObj.setHours(0, 0, 0, 0);
		return isAfter(date, dObj);
	};

	return (
		<div className={styles.root}>
			{datesToDisplay.map((date) => {
				const dateNumber = date?.getDate();
				const today = isToday(date);

				const selectedSingleDate = isSameDay(fromUnixTime(selectedDate.unix), date);

				const isSameDayRange =
					isSameDay(fromUnixTime(firstItem), date) &&
					isSameDay(fromUnixTime(firstItem), fromUnixTime(lastItem));

				const todaySelected = today & selectedSingleDate;

				const isFirstItem =
					!isSameDayRange &&
					isEqual(
						fromUnixTime(firstItem).setHours(0, 0, 0, 0),
						date.setHours(0, 0, 0, 0)
					);
				const isLastItem =
					!isSameDayRange &&
					isEqual(
						fromUnixTime(lastItem).setHours(23, 59, 59, 59),
						date.setHours(23, 59, 59, 59)
					);

				const isFirstItemHovered =
					isBefore(date, fromUnixTime(firstItem)) &&
					hoveredEndingDate === getUnixTime(date);
				const isLastItemHovered = hoveredEndingDate === getUnixTime(date);

				const notSameMonth = date.getMonth() !== monthAsNumber;

				const isUnSelected = unSelectedDate === date.toISOString();

				const isDisabled =
					disabledDates.includes(date.toDateString()) ||
					disabledBeforeDate(date) ||
					disabledAfterDate(date);

				const isHoveringBeforeSelectedDate = isBefore(
					fromUnixTime(hoveredEndingDate),
					fromUnixTime(firstItem)
				);

				let isMidItem;

				if (hoveredEndingDate) {
					isMidItem =
						(!isSameDayRange &&
							isBefore(date, fromUnixTime(hoveredEndingDate)) &&
							isAfter(date, fromUnixTime(firstItem))) ||
						(isAfter(date, fromUnixTime(hoveredEndingDate)) &&
							isBefore(date, fromUnixTime(firstItem)));
				} else {
					isMidItem =
						isBefore(date, fromUnixTime(lastItem).setHours(0, 0, 0, 0)) &&
						isAfter(date, fromUnixTime(firstItem).setHours(23, 59, 59, 59));
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
						? styles['first-hovered']
						: '',
					(isSameDayRange && isFirstItemHovered) || isFirstItemHovered
						? styles['last-hovered']
						: '',
					today ? styles.today : '',
					todaySelected ? styles['today-selected'] : ''
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
							if (!isDisabled) {
								dateSelection(date);
							}
						}}
						onMouseEnter={() => {
							onMouseEnterADate(date);
						}}
						key={date.toDateString()}>
						<span className={childClassNames}>{dateNumber}</span>
						{today && <TodayIndicator className={styles.indicator} />}
					</div>
				);
			})}
		</div>
	);
};

export default Dates;
