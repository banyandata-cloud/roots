/* eslint-disable no-nested-ternary */
import { fromUnixTime, getUnixTime } from 'date-fns';
import { classes, doubleDigitted, getDayInfo } from '../../../../utils';
import { Button } from '../../../buttons';
import { CalenderIcon, HalfShadeIcon, ResetIcon, CrossIcon } from '../../../icons';
import { TimePicker } from '../../../timePicker';
import styles from './Footer.module.css';
import { dateRanges } from './utils';

const SelectedDateView = (props) => {
	const { value, action, icon: Icon } = props;

	return (
		<div className={styles['selected-date']}>
			<CalenderIcon />
			<div className={styles.date}>
				<span className={classes(styles.value)}>{value}</span>
				<Button size='auto' variant='text' onClick={action} leftComponent={Icon} />
			</div>
		</div>
	);
};

const Footer = (props) => {
	const {
		selectedDate = {},
		selectedRange = {},
		setSelectedDate,
		setSelectedRange,
		range,
		goToDate,
		onApply,
		setFixedRange,
		customRanges,
	} = props;

	const { date, month, year } = selectedDate;

	const { dates = [] } = selectedRange;

	const monthInShort = month?.substr(0, 3);

	const datesSelected = date || dates.length === 2;

	const selectFixedDateRange = (dateRange, title) => {
		setSelectedRange(dateRange);
		setFixedRange(title);
	};

	const resetDate = () => {
		goToDate(getUnixTime(new Date()));
	};

	const clearRangeSelection = () => {
		setSelectedRange({});
	};

	const datePassed = fromUnixTime(selectedDate.unix);

	const onTimeChange = (time) => {
		const monthNumber = datePassed.getMonth();
		let hours = null;
		hours = time.hours;
		if (time.hours === '12') {
			hours = '00';
		}
		if (time.meridian === 'PM') {
			hours = 12 + parseInt(time.hours, 10);
		}

		const unix = getUnixTime(
			new Date(
				!Number.isNaN(selectedDate.year) ? selectedDate.year : getDayInfo(new Date()).year,
				!Number.isNaN(monthNumber) ? monthNumber : getDayInfo(new Date()).monthAsNumber,
				!Number.isNaN(selectedDate.date)
					? selectedDate.date
					: getDayInfo(new Date()).dateAsNumber,
				Number(hours),
				Number(time.minutes),
				Number(time.seconds)
			)
		);

		setSelectedDate({
			...selectedDate,
			unix,
		});
	};

	const getTimePickerValue = () => {
		if (datePassed.getDate()) {
			const hours = (((datePassed.getHours() + 11) % 12) + 1).toString();
			const minutes = datePassed.getMinutes().toString();
			const seconds = datePassed.getSeconds().toString();
			const meridian = datePassed.getHours() >= 12 ? 'PM' : 'AM';
			return {
				hours: doubleDigitted(hours),
				minutes: doubleDigitted(minutes),
				seconds: doubleDigitted(seconds),
				meridian,
			};
		}
		const { hours } = getDayInfo(new Date());
		const { minutes } = getDayInfo(new Date());
		const { seconds } = getDayInfo(new Date());
		const meridian = getDayInfo(new Date()).hours >= 12 ? 'PM' : 'AM';
		return {
			hours: doubleDigitted(hours),
			minutes: doubleDigitted(minutes),
			seconds: doubleDigitted(seconds),
			meridian,
		};
	};

	const timeValue = `${getTimePickerValue().hours}:${getTimePickerValue().minutes} ${
		getTimePickerValue().meridian
	}`;

	return (
		<div className={styles.root}>
			{!range && (
				<TimePicker
					value={getTimePickerValue()}
					onChange={onTimeChange}
					className={styles['time-picker']}
				/>
			)}

			{datesSelected && dates?.length === 2 ? (
				<SelectedDateView
					range
					value={`${selectedRange.dates[0]} - ${selectedRange.dates[1]}`}
					icon={() => {
						return <CrossIcon className={styles.cross} />;
					}}
					action={clearRangeSelection}
				/>
			) : (
				datesSelected && (
					<SelectedDateView
						value={`${doubleDigitted(date)} ${monthInShort} ${year} - ${timeValue}`}
						icon={() => {
							return <ResetIcon />;
						}}
						action={resetDate}
					/>
				)
			)}

			{range && (
				<div className={styles['date-ranges']}>
					{dateRanges(customRanges).map(({ dateRange, title }) => {
						const selectedFixedDateRange =
							dateRange.unix.toString() === selectedRange.unix?.toString();

						return (
							<div
								className={classes(
									styles['date-range'],
									selectedFixedDateRange ? styles.selected : ''
								)}
								onClick={() => {
									selectFixedDateRange(dateRange, title);
								}}
								key={title}>
								<HalfShadeIcon />
								<span>{title}</span>
							</div>
						);
					})}
				</div>
			)}
			{datesSelected && <Button onClick={onApply} title='Apply' className={styles.apply} />}
		</div>
	);
};

export default Footer;
