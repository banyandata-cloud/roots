import { fromUnixTime, getHours, getMinutes, isAfter, isBefore, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { MONTHS } from '../../../../../constants';
import { classes, doubleDigitted, getDayInfo } from '../../../../../utils';
import { TextField } from '../../../../input';
import styles from './DateAndTimeSelection.module.css';

const DateAndTimeSelection = ({
	selectedDate,
	setSelectedDate,
	range,
	selectedRange,
	setSelectedRange,
	setSelectedMonth,
}) => {
	const blurOnEnter = ({ keyCode, target }) => {
		if (keyCode === 13) {
			target.blur();
		}
	};

	if (range) {
		const startRange = getDayInfo(fromUnixTime(selectedRange?.unix?.[0]));
		const endRange = getDayInfo(fromUnixTime(selectedRange?.unix?.[1]));

		const defaultStartDate = startRange?.dateAsNumber
			? `${doubleDigitted(startRange?.dateAsNumber)} ${startRange?.month?.substring(0, 3)} ${
					startRange?.year
			  }`
			: '';

		const defaultEndDate = endRange?.dateAsNumber
			? `${doubleDigitted(endRange?.dateAsNumber)} ${endRange?.month?.substring(0, 3)} ${
					endRange?.year
			  }`
			: '';

		const startDateFromUnix = fromUnixTime(selectedRange?.unix?.[0] || 0);
		const startHours = getHours(startDateFromUnix);
		const startHoursIn12 = ((startHours + 11) % 12) + 1;
		const startMinutes = getMinutes(startDateFromUnix);
		const startMeridian = startHours >= 12 ? 'PM' : 'AM';

		const endDateFromUnix = fromUnixTime(selectedRange?.unix?.[1] || 0);
		const endHours = getHours(endDateFromUnix);
		const endHoursIn12 = ((endHours + 11) % 12) + 1;
		const endMinutes = getMinutes(endDateFromUnix);
		const endMeridian = endHours >= 12 ? 'PM' : 'AM';

		const defaultStartTime = startHoursIn12
			? `${doubleDigitted(startHoursIn12)}:${doubleDigitted(startMinutes)} ${startMeridian}`
			: '';

		const defaultEndTime = endHoursIn12
			? `${doubleDigitted(endHoursIn12)}:${doubleDigitted(endMinutes)} ${endMeridian}`
			: '';

		const [dateRange, setDateRange] = useState(() => {
			return {
				start: defaultStartDate,
				end: defaultEndDate,
			};
		});

		const [timeRange, setTimeRange] = useState(() => {
			return {
				start: defaultStartTime,
				end: defaultEndTime,
			};
		});

		const onDateInputChange = ({ target: { value } }, key) => {
			setDateRange({
				...dateRange,
				[key]: value,
			});
		};

		const onTimeInputChange = ({ target: { value } }, key) => {
			setTimeRange({
				...timeRange,
				[key]: value,
			});
		};

		const onDateValueInputBlur = ({ target: { value } }, key) => {
			const validUnix = Date.parse(`${value} ${timeRange[key]}`) / 1000;
			const parsedDate = fromUnixTime(validUnix);
			const rangeValue = {
				date: parsedDate?.getDate(),
				month: MONTHS[parsedDate?.getMonth()],
				year: parsedDate?.getFullYear(),
			};
			if (isValid(parsedDate)) {
				if (key === 'start') {
					if (isBefore(fromUnixTime(validUnix), fromUnixTime(selectedRange.unix[1]))) {
						setSelectedRange({
							dates: [
								`${rangeValue.date} ${rangeValue.month} ${rangeValue?.year}`,
								selectedRange.dates[1],
							],

							unix: [validUnix, selectedRange.unix[1]],
						});
						setSelectedMonth({
							month: MONTHS[parsedDate?.getMonth()],
							monthAsNumber: parsedDate?.getMonth(),
							year: parsedDate?.getFullYear(),
						});
						return;
					}
				}

				if (key === 'end') {
					if (isAfter(fromUnixTime(validUnix), fromUnixTime(selectedRange.unix[0]))) {
						setSelectedRange({
							dates: [
								selectedRange.dates[0],
								`${rangeValue.date} ${rangeValue.month} ${rangeValue?.year}`,
							],
							unix: [selectedRange.unix[0], validUnix],
						});
						setSelectedMonth({
							month: MONTHS[parsedDate?.getMonth()],
							monthAsNumber: parsedDate?.getMonth(),
							year: parsedDate?.getFullYear(),
						});
						return;
					}
				}
			}

			setDateRange({
				...dateRange,
				[key]: key === 'start' ? defaultStartDate : defaultEndDate,
			});
		};

		const onTimeValueInputBlur = ({ target: { value } }, key) => {
			const validUnix = Date.parse(`${dateRange[key]} ${value}`) / 1000;
			const parsedDate = fromUnixTime(validUnix);
			const rangeValue = {
				date: parsedDate?.getDate(),
				month: MONTHS[parsedDate?.getMonth()],
				year: parsedDate?.getFullYear(),
			};

			if (isValid(parsedDate)) {
				if (key === 'start') {
					if (isBefore(fromUnixTime(validUnix), fromUnixTime(selectedRange.unix[1]))) {
						setSelectedRange({
							dates: [
								`${rangeValue.date} ${rangeValue.month} ${rangeValue?.year}`,
								selectedRange.dates[1],
							],

							unix: [validUnix, selectedRange.unix[1]],
						});
						return;
					}
				}

				if (key === 'end') {
					if (isAfter(fromUnixTime(validUnix), fromUnixTime(selectedRange.unix[0]))) {
						setSelectedRange({
							dates: [
								selectedRange.dates[0],
								`${rangeValue.date} ${rangeValue.month} ${rangeValue?.year}`,
							],
							unix: [selectedRange.unix[0], validUnix],
						});
						return;
					}
				}
			}
			setTimeRange({
				...timeRange,
				[key]: key === 'start' ? defaultStartTime : defaultEndTime,
			});
		};

		useEffect(() => {
			setDateRange({
				start: defaultStartDate,
				end: defaultEndDate,
			});

			setTimeRange({
				start: defaultStartTime,
				end: defaultEndTime,
			});
		}, [selectedRange]);

		return (
			<div className={classes(styles.root, styles.range)}>
				<span>Start</span>
				<div>
					<TextField
						className={styles.input}
						value={dateRange.start}
						onChange={(event) => {
							onDateInputChange(event, 'start');
						}}
						onKeyDown={blurOnEnter}
						placeholder='Eg., 05 Jun 2023'
						onBlur={(event) => {
							onDateValueInputBlur(event, 'start');
						}}
					/>
					<TextField
						className={styles.input}
						value={timeRange.start}
						onChange={(event) => {
							onTimeInputChange(event, 'start');
						}}
						onKeyDown={blurOnEnter}
						placeholder='Eg., 08:23 AM'
						onBlur={(event) => {
							onTimeValueInputBlur(event, 'start');
						}}
					/>
				</div>
				<span>End</span>
				<div>
					<TextField
						className={styles.input}
						value={dateRange.end}
						onChange={(event) => {
							onDateInputChange(event, 'end');
						}}
						onKeyDown={blurOnEnter}
						placeholder='Eg., 24 Nov 2023'
						onBlur={(event) => {
							onDateValueInputBlur(event, 'end');
						}}
					/>
					<TextField
						className={styles.input}
						value={timeRange.end}
						onChange={(event) => {
							onTimeInputChange(event, 'end');
						}}
						onKeyDown={blurOnEnter}
						placeholder='Eg., 05:56 PM'
						onBlur={(event) => {
							onTimeValueInputBlur(event, 'end');
						}}
					/>
				</div>
			</div>
		);
	}

	const { date, month, year, unix } = selectedDate || {};

	const dateFromUnix = fromUnixTime(unix || 0);

	const hours = getHours(dateFromUnix);
	const hoursIn12 = ((hours + 11) % 12) + 1;
	const minutes = getMinutes(dateFromUnix);
	const meridian = hours >= 12 ? 'PM' : 'AM';

	const defaultDate = date ? `${doubleDigitted(date)} ${month?.substring(0, 3)} ${year}` : '';
	const defaultTime = date
		? `${doubleDigitted(hoursIn12)}:${doubleDigitted(minutes)} ${meridian}`
		: '';

	const [dateValue, setDateValue] = useState(() => {
		return defaultDate || '';
	});

	const [timeValue, setTimeValue] = useState(() => {
		return defaultTime || '';
	});

	const onDateInputChange = ({ target: { value } }) => {
		setDateValue(value);
	};

	const onTimeInputChange = ({ target: { value } }) => {
		setTimeValue(value);
	};

	const onDateValueInputBlur = ({ target: { value } }) => {
		const validUnix = Date.parse(`${value} ${timeValue}`) / 1000;
		const parsedDate = fromUnixTime(validUnix);
		if (isValid(parsedDate)) {
			setSelectedDate({
				date: parsedDate?.getDate(),
				month: MONTHS[parsedDate?.getMonth()],
				year: parsedDate?.getFullYear(),
				unix: validUnix,
			});
			setSelectedMonth({
				month: MONTHS[parsedDate?.getMonth()],
				monthAsNumber: parsedDate?.getMonth(),
				year: parsedDate?.getFullYear(),
			});
			return;
		}
		setDateValue(defaultDate);
	};

	const onTimeValueInputBlur = ({ target: { value } }) => {
		const validUnix = Date.parse(`${dateValue} ${value}`) / 1000;
		const parsedDate = fromUnixTime(validUnix);

		if (isValid(parsedDate)) {
			setSelectedDate({
				date: parsedDate?.getDate(),
				month: MONTHS[parsedDate?.getMonth()],
				year: parsedDate?.getFullYear(),
				unix: validUnix,
			});
			return;
		}
		setTimeValue(defaultTime);
	};

	useEffect(() => {
		setDateValue(defaultDate);
		setTimeValue(defaultTime);
	}, [selectedDate]);

	return (
		<div className={styles.root}>
			<span>Date & Time</span>
			<div>
				<TextField
					className={styles.input}
					value={dateValue}
					onChange={onDateInputChange}
					onKeyDown={blurOnEnter}
					placeholder='Eg., 05 Jun 2023'
					onBlur={onDateValueInputBlur}
				/>
				<TextField
					className={styles.input}
					value={timeValue}
					placeholder='Eg., 12:24 AM'
					onChange={onTimeInputChange}
					onKeyDown={blurOnEnter}
					onBlur={onTimeValueInputBlur}
				/>
			</div>
		</div>
	);
};

export default DateAndTimeSelection;
