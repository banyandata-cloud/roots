/* eslint-disable no-nested-ternary */
import { getUnixTime, fromUnixTime, isAfter, isBefore, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { classes, getDatesInAMonth } from '../../../../../utils';
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

	const { monthAsNumber, year } = selectedMonth;

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
		<div className={styles.dates}>
			{datesToDisplay.map((date) => {
				const dateNumber = date?.getDate();
				const selectedSingleDate = isSameDay(fromUnixTime(selectedDate.unix), date);
				const [firstItem, lastItem] = selectedRange.unix ?? [];

				const isFirstItem = isSameDay(fromUnixTime(firstItem), date);
				const isLastItem = isSameDay(fromUnixTime(lastItem), date);
				const isLastItemHovered = hoveredEndingDate === getUnixTime(date);
				const isFirstItemHovered =
					isBefore(date, fromUnixTime(firstItem)) &&
					hoveredEndingDate === getUnixTime(date);
				const notSameMonth = date.getMonth() !== monthAsNumber;
				const isUnSelected = unSelectedDate === date.toISOString();

				const disabled =
					disabledDates.includes(date.toDateString()) ||
					disabledBeforeDate(date) ||
					disabledAfterDate(date);

				const isDisabled = disabled;
				const isHoveringBeforeSelectedDate = isBefore(
					fromUnixTime(hoveredEndingDate),
					fromUnixTime(firstItem)
				);
				let isMidItem;

				if (hoveredEndingDate) {
					isMidItem =
						(isBefore(date, fromUnixTime(hoveredEndingDate)) &&
							isAfter(date, fromUnixTime(firstItem))) ||
						(isAfter(date, fromUnixTime(hoveredEndingDate)) &&
							isBefore(date, fromUnixTime(firstItem)));
				} else {
					isMidItem =
						isBefore(date, fromUnixTime(lastItem)) &&
						isAfter(date, fromUnixTime(firstItem).setHours(23, 59, 59, 59));
				}

				const parentClassNames = classes(
					isMidItem ? styles.midInRange : '',
					isFirstItem
						? isHoveringBeforeSelectedDate
							? styles.maxInRange
							: styles.minInRange
						: '',
					isLastItem ? styles.maxInRange : '',
					isLastItemHovered ? styles['first-hovered'] : '',
					isFirstItemHovered ? styles['last-hovered'] : ''
				);

				const childClassNames = classes(
					date ? styles.date : '',
					selectedSingleDate ? styles.selected : '',
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
					</div>
				);
			})}
		</div>
	);
};

export default Dates;
