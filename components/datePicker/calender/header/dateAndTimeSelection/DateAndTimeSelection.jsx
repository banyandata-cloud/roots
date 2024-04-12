import { useEffect, useState } from 'react';
import { classes, doubleDigitted } from '../../../../../utils';
import { Button } from '../../../../buttons';
import styles from './DateAndTimeSelection.module.css';

const DateAndTimeSelection = ({
	selectedDate,
	setActiveGoToSelection,
	activeGoToSelection,
	showDateSelectionView,
	showTimeSelectionView,
	timeRangeSelection = {},
}) => {
	const { date, month, year } = selectedDate || {};

	const defaultDate = date ? `${doubleDigitted(date)} ${month?.substring(0, 3)} ${year}` : '';
	const defaultTime = `${doubleDigitted(timeRangeSelection.previous?.HOURS)}:${doubleDigitted(
		timeRangeSelection.previous?.MINS
	)} ${timeRangeSelection.previous?.MER} - ${doubleDigitted(
		timeRangeSelection.next?.HOURS
	)}:${doubleDigitted(timeRangeSelection.next?.MINS)} ${timeRangeSelection.next?.MER}`;

	const [dateValue, setDateValue] = useState();

	const [timeValue, setTimeValue] = useState();

	useEffect(() => {
		setDateValue(defaultDate);
		setTimeValue(defaultTime);
	}, [selectedDate, timeRangeSelection]);

	const onDateSelectorClick = () => {
		showTimeSelectionView(false);
		showDateSelectionView((prev) => {
			return !prev;
		});
		setActiveGoToSelection('date');
	};

	const onTimeSelectorClick = () => {
		showDateSelectionView(false);
		showTimeSelectionView((prev) => {
			return !prev;
		});
		setActiveGoToSelection('time');
	};

	return (
		<div className={styles.root}>
			<span>Date & Time</span>
			<div>
				<Button
					onClick={onDateSelectorClick}
					className={classes(
						styles.selector,
						activeGoToSelection === 'date' ? styles.active : ''
					)}
					title={dateValue}
					variant='outlined'
				/>
				<Button
					onClick={onTimeSelectorClick}
					className={classes(
						styles.selector,
						activeGoToSelection === 'time' ? styles.active : ''
					)}
					title={timeValue}
					variant='outlined'
				/>
			</div>
		</div>
	);
};

export default DateAndTimeSelection;
