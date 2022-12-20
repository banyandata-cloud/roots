import { fromUnixTime, getUnixTime } from 'date-fns';
import { classes, doubleDigitted } from '../../../../utils';
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
	} = props;

	const { date, month, year } = selectedDate;

	const { dates = [] } = selectedRange;

	const monthInShort = month?.substr(0, 3);

	const datesSelected = date || dates.length === 2;

	const selectFixedDateRange = (dateRange) => {
		setSelectedRange(dateRange);
	};

	const resetDate = () => {
		goToDate(getUnixTime(new Date()));
	};

	const clearRangeSelection = () => {
		setSelectedRange({});
	};

	const onTimeChange = (time) => {
		const monthNumber = fromUnixTime(selectedDate.unix).getMonth();
		const unix = getUnixTime(
			new Date(
				selectedDate.year,
				monthNumber,
				selectedDate.date,
				time.hours,
				time.minutes,
				time.seconds
			)
		);
		setSelectedDate({
			...selectedDate,
			unix,
		});
	};

	return (
		<div className={styles.root}>
			<TimePicker onChange={onTimeChange} className={styles['time-picker']} />

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
						value={`${doubleDigitted(date)} ${monthInShort} ${year}`}
						icon={() => {
							return <ResetIcon />;
						}}
						action={resetDate}
					/>
				)
			)}

			{range && (
				<div className={styles['date-ranges']}>
					{dateRanges.map(({ dateRange, title }) => {
						const selectedFixedDateRange =
							dateRange.unix.toString() === selectedRange.unix?.toString();

						return (
							<div
								className={classes(
									styles['date-range'],
									selectedFixedDateRange ? styles.selected : ''
								)}
								onClick={() => {
									selectFixedDateRange(dateRange);
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
