/* eslint-disable no-unsafe-optional-chaining */
import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { fromUnixTime, getUnixTime, subHours, subMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '../../components/buttons';
import {
	getDatePickerDisplayValue,
	getDateRangeTag,
	getFloatingReferences,
} from '../../components/datePicker/utils';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../../components/input';
import { BaseModal } from '../../components/modal';
import { FULL_MONTHS_INDEX } from '../../constants';
import { useOutsideClickListener } from '../../hooks';
import { classes, getDayInfo } from '../../utils';
import { dateRanges, timeRanges } from '../datePicker/ranges/utils';
import { ErrorBoundaryWrapper } from '../errorBoundary';
import { CalenderIcon, CaretIcon, ClockIcon } from '../icons';
import styles from './DatePicker.module.css';
import { Calender } from './calender';

const DatePicker = (props) => {
	const {
		placeholder = '',
		range = false,
		value = null,
		disabled = false,
		className = '',
		customRanges = null,
		showCustomRanges = false,
		custom,
		highlightOnSelect,
		limitHours = null,
		timeRange,
		onClear,
		onApply,
		enableFutureDates,
		maxRange,
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		defaultHourDiff,
		valueAsRange,
		startingYear = 1970,
	} = props;

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openCustomRange, setOpenCustomRange] = useState(false);
	const [selectedCustomRange, setSelectedCustomRange] = useState('');
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [fixedTime, setFixedTime] = useState(0);
	const [fixedTimeRange, setFixedTimeRange] = useState([0, 0]);
	const [open, setOpen] = useState(false);
	const toggle = () => {
		setOpen((prevState) => {
			return !prevState;
		});
	};

	const datePickerFloatingReference = useFloating(
		getFloatingReferences(openDatePicker, setOpenDatePicker)
	);

	const customRangeFloatingReference = useFloating(
		getFloatingReferences(openCustomRange, setOpenCustomRange)
	);

	useOutsideClickListener(datePickerFloatingReference.floating, () => {
		toggle();
		return setOpenDatePicker(false);
	});

	useOutsideClickListener(customRangeFloatingReference.floating, () => {
		toggle();
		return setOpenDatePicker(false);
	});

	const datePickerInteractionProps = useInteractions([
		useClick(datePickerFloatingReference.context, {
			enabled: !disabled,
		}),
		useDismiss(datePickerFloatingReference.context),
	]);

	const [selectedDate, setSelectedDate] = useState(() => {
		return '';
	});

	const [selectedRange, setSelectedRange] = useState(() => {
		return {
			dates: [],
			unix: [],
		};
	});

	const [fixedRange, setFixedRange] = useState(() => {
		return null;
	});

	const [selectedMonth, setSelectedMonth] = useState();
	const [displayMonthRight, setDisplayMonthRight] = useState();
	const [timeRangeSelection, setTimeRangeSelection] = useState({});

	const date = range ? fromUnixTime(value?.[0]) : fromUnixTime(value);
	const selectedDayInfo = getDayInfo(date);

	const activeDate = new Date(selectedDate.unix * 1000);
	const activeEndDate = new Date(selectedRange.unix?.[1] * 1000);
	const currentDate = new Date();

	const displayValue = getDatePickerDisplayValue({
		value,
		rangePicker: range && value?.filter?.(Boolean)?.length > 0,
		singlePicker: !range && value,
		timeRange,
		limitHours,
	});

	const activeDisplay = getDatePickerDisplayValue({
		value:
			!range && value
				? selectedDate.unix
				: selectedRange?.unix?.length > 0
					? selectedRange?.unix
					: value,
		rangePicker: range && value?.filter?.(Boolean)?.length > 0,
		singlePicker: !range && value,
		timeRange,
		limitHours,
	});

	const apply = ({ rangeSelected }) => {
		if (fixedTime) {
			onApply?.(fixedTimeRange, fixedRange, getDateRangeTag(fixedTimeRange));
			setOpenDatePicker(false);
			setStartTime(0);
			setEndTime(0);
			setFixedTime(0);
			setFixedTimeRange([0, 0]);
			return;
		}
		if (rangeSelected.dates?.length === 2) {
			if (
				maxRange !== null &&
				!isMaxRangeExceeded({
					maxRange,
					rangeSelected,
				})
			) {
				setOpenDatePicker(false);
				return;
			}

			onApply?.(
				[
					Number(rangeSelected.unix?.[0]) + Number(startTime),
					Number(rangeSelected.unix?.[1]) - (86399 - Number(endTime)),
				],
				fixedRange,
				getDateRangeTag(rangeSelected.unix)
			);
			setOpenDatePicker(false);
			setStartTime(0);
			setEndTime(0);
			setFixedTime(0);
			setFixedTimeRange([0, 0]);
		} else {
			if (valueAsRange) {
				const clickedDate = new Date(selectedDate.unix * 1000);
				const currentDate = new Date();

				clickedDate.setHours(0, 0, 0, 0);

				const fromUnix =
					Number(Math.floor(clickedDate.getTime() / 1000)) + Number(startTime);

				const toUnix =
					clickedDate.toDateString() === currentDate.toDateString()
						? getUnixTime(currentDate)
						: Number(Math.floor(clickedDate.getTime() / 1000)) + Number(endTime);

				onApply?.([fromUnix, toUnix], fixedRange, getDateRangeTag([fromUnix, toUnix]));
				setOpenDatePicker(false);
				setStartTime(0);
				setEndTime(0);
				setFixedTime(0);
				setFixedTimeRange([0, 0]);
				return;
			}
			const singleDateUnix = getUnixTime(
				new Date(
					selectedDate.year,
					selectedMonth?.monthAsNumber,
					selectedDate.date,
					timeRangeSelection.next?.MER === 'PM' && timeRangeSelection.next?.HOURS < 12
						? timeRangeSelection.next?.HOURS + 12
						: timeRangeSelection.next?.HOURS,
					timeRangeSelection.next?.MINS
				)
			);
			onApply?.(singleDateUnix);
			setOpenDatePicker(false);
			setStartTime(0);
			setEndTime(0);
			setFixedTime(0);
			setFixedTimeRange([0, 0]);
		}
	};

	const calenderProps = {
		selectedDate,
		setSelectedDate,
		enableFutureDates,
		selectedRange,
		setSelectedRange,
		fixedRange,
		range,
		onApply: () => {
			apply({
				rangeSelected: selectedRange,
				dateSelected: selectedDate,
			});
		},
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		value,
		setFixedRange,
		customRanges,
		selectedMonth,
		setSelectedMonth,
		displayMonthRight,
		setDisplayMonthRight,
		valueAsRange,
		setFixedTime,
		setFixedTimeRange,
	};

	let currentTime = getDayInfo(new Date());
	if (selectedDate.unix !== undefined) {
		currentTime = getDayInfo(new Date(selectedDate.unix * 1000));
	}

	const prevTime = getDayInfo(
		subMinutes(
			subHours(
				new Date(
					currentTime.year,
					currentTime.monthAsNumber,
					currentTime.dateAsNumber,
					currentTime.hoursIn12,
					currentTime.minutes
				),
				defaultHourDiff ?? currentTime.hoursIn12
			),
			defaultHourDiff ? 0 : currentTime.minutes
		)
	);

	useEffect(() => {
		setTimeRangeSelection({
			next: {
				HOURS: currentTime.hours,
				MINS: currentTime.minutes,
				MER: currentTime.meridian,
			},
			previous: {
				HOURS: prevTime.hours,
				MINS: prevTime.minutes,
				MER: prevTime.meridian,
			},
		});
	}, [selectedDate.unix]);

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
			<div
				className={styles.root}
				onClick={() => {
					toggle();
				}}>
				<div className={classes(styles['date-picker'], className)}>
					<div
						data-elem='header'
						ref={datePickerFloatingReference.reference}
						role='button'
						tabIndex={0}
						className={classes(
							styles.container,
							disabled ? styles.disabled : '',
							openDatePicker ? styles.open : '',
							customRanges ? styles['with-custom'] : '',
							displayValue ? styles.highlight : '',
							highlightOnSelect && value ? styles.highlightOnSelect : ''
						)}
						{...datePickerInteractionProps.getReferenceProps()}>
						<div className={styles.left}>
							<CalenderIcon />

							{!displayValue && (
								<span className={styles.placeholder}>{placeholder}</span>
							)}

							{displayValue && <span className={styles.value}>{displayValue}</span>}
						</div>

						<input className={styles.input} value={displayValue} />
						<CaretIcon className={classes(styles.icon)} />
					</div>
				</div>
			</div>
			<BaseModal
				renderHeader={
					<div className={styles.header}>
						<div className={styles.left}>
							<div className={styles.title}>Date & Time</div>
							<div className={styles.desc}>Select the date range and time</div>
						</div>
						<div className={styles.right}>
							<Dropdownv2
								placeholder={selectedDayInfo.month}
								className={styles.dropdown}
								value={selectedMonth?.monthAsNumber ?? ''}
								onChange={(_, newMonth) => {
									const newSelectedData = new Date(
										selectedMonth?.year,
										Number(newMonth),
										selectedDate?.date
									);
									setSelectedDate({
										...selectedDate,
										month: getDayInfo(newSelectedData).month,
										unix: getUnixTime(newSelectedData.setHours(23, 59, 59, 59)),
									});
									setSelectedMonth({
										...selectedMonth,
										month: FULL_MONTHS_INDEX?.[Number(newMonth)]?.label,
										monthAsNumber: Number(newMonth),
									});
									setDisplayMonthRight({
										month:
											Number(newMonth) === 11
												? FULL_MONTHS_INDEX?.[0]?.label
												: FULL_MONTHS_INDEX?.[Number(newMonth) + 1]?.label,
										monthAsNumber: Number(newMonth) + 1,
										year:
											Number(newMonth) === 11
												? Number(selectedMonth?.year) + 1
												: Number(selectedMonth?.year),
									});
								}}>
								{FULL_MONTHS_INDEX?.map(({ value, label }) => {
									return (
										<DropdownItemv2
											title={label}
											value={value}
											key={value}
											className={classes(
												styles['dropdown-item'],
												value === selectedMonth?.monthAsNumber
													? styles.selected
													: ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							<Dropdownv2
								value={selectedMonth?.year ?? ''}
								onChange={(_, newYear) => {
									setSelectedMonth({
										...selectedMonth,
										year: newYear,
									});
									setDisplayMonthRight({
										...displayMonthRight,
										year:
											Number(selectedMonth?.monthAsNumber) === 11
												? Number(newYear) + 1
												: Number(newYear),
									});
								}}>
								{Array.from(
									{ length: currentDate.getFullYear() - startingYear + 1 },
									(_, i) => currentDate.getFullYear() - i
								)?.map((year) => {
									return (
										<DropdownItemv2
											title={year}
											value={year}
											key={year}
											className={classes(
												styles['dropdown-item'],
												year == selectedMonth?.year ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							{showCustomRanges && range && (
								<Dropdownv2
									placeholder='Select Custom Time'
									value={selectedCustomRange ?? ''}
									onChange={(_, customTime) => {
										const [
											dateRangeStartLabel,
											dateRangeEndLabel,
											dateRangeStartUnix,
											dateRangeEndUnix,
											customType,
										] = customTime?.split(',');
										setSelectedRange({
											dates: [dateRangeStartLabel, dateRangeEndLabel],
											unix: [dateRangeStartUnix, dateRangeEndUnix],
										});
										setSelectedCustomRange(
											`${dateRangeStartLabel},${dateRangeEndLabel},${dateRangeStartUnix},${dateRangeEndUnix},${customType}`
										);
										setStartTime(0);
										setEndTime(0);
										setFixedTime(0);
										setFixedTimeRange([0, 0]);
									}}
									className={styles.dropdown}>
									{dateRanges(customRanges)?.map(({ dateRange, title }) => {
										return (
											<DropdownItemv2
												title={title}
												value={`${dateRange?.dates?.[0]},${dateRange?.dates?.[1]},${dateRange?.unix?.[0]},${dateRange?.unix?.[1]},${title}`}
												key={title}
												className={styles['dropdown-item']}
											/>
										);
									})}
								</Dropdownv2>
							)}
						</div>
					</div>
				}
				renderFooter={
					<div className={styles.footer}>
						<div className={styles.left}>
							<TextFieldv2
								className={styles.input}
								value={
									fixedTime === 0
										? `Selected Date: ${activeDisplay}`
										: `Selected Date: ${getDatePickerDisplayValue({
												value: fixedTimeRange?.[0],
												singlePicker: true,
											})} - ${getDatePickerDisplayValue({
												value: fixedTimeRange?.[1],
												singlePicker: true,
											})}`
								}
								disabled
							/>
						</div>
						<div className={styles.right}>
							<Button
								title='Cancel'
								color='default'
								variant='outlined'
								className={styles.cancel}
								onClick={() => {
									onClear();
									toggle();
								}}
							/>
							<Button
								title='Apply'
								color='primary'
								size='sm'
								className={styles.confirm}
								onClick={() => {
									apply({
										rangeSelected: selectedRange,
										dateSelected: selectedDate,
									});
									toggle();
								}}
							/>
						</div>
					</div>
				}
				className={classes(
					styles.modal,
					!range && !valueAsRange ? styles['bottom-remove'] : ''
				)}
				open={open}
				hideCrossDismiss
				toggle={toggle}>
				<div className={styles.body}>
					<div className={styles.top}>
						<Calender {...calenderProps} />
					</div>
					<div
						className={classes(
							styles.bottom,
							!range && !valueAsRange ? styles['bottom-remove'] : '',
							range ? styles['bottom-border'] : ''
						)}>
						{(range || (!range && valueAsRange)) && (
							<div className={styles['dropdown-selection']}>
								<Dropdownv2
									label='Start Time'
									placeholder='00:00'
									value={startTime ?? 0}
									leftComponent={() => {
										return <ClockIcon className={classes(styles.icon)} />;
									}}
									onChange={(_, customTimeStart) => {
										setFixedTime(0);
										setFixedTimeRange([]);
										setStartTime(customTimeStart);
									}}
									className={styles.dropdown}>
									{timeRanges()?.map((time) => {
										if (
											!range &&
											activeDate.toDateString() ===
												currentDate.toDateString() &&
											Number(time?.value) >
												Number(currentDate.getHours()) * 3600 +
													Number(currentDate.getMinutes()) * 60
										) {
											return;
										}
										return (
											<DropdownItemv2
												title={time?.label}
												value={time?.value}
												key={time?.value}
												className={classes(
													styles['dropdown-item'],
													time?.value === startTime ? styles.selected : ''
												)}
											/>
										);
									})}
								</Dropdownv2>
								<Dropdownv2
									label='End Time'
									placeholder={
										!range &&
										activeDate.toDateString() === currentDate.toDateString()
											? currentDate.getMinutes() < 10
												? `${currentDate.getHours()} : 0${currentDate.getMinutes()}`
												: `${currentDate.getHours()} : ${currentDate.getMinutes()}`
											: '23:59'
									}
									value={endTime ?? 0}
									leftComponent={() => {
										return <ClockIcon className={classes(styles.icon)} />;
									}}
									disabled={
										!range &&
										activeDate.toDateString() === currentDate.toDateString()
									}
									onChange={(_, customTimeEnd) => {
										setFixedTime(0);
										setFixedTimeRange([]);
										setEndTime(customTimeEnd);
									}}
									className={styles.dropdown}>
									{timeRanges()?.map((time) => {
										if (!range && Number(time?.value) <= Number(startTime)) {
											return;
										}
										if (
											!range &&
											activeDate.toDateString() ===
												currentDate.toDateString() &&
											Number(time?.value) >
												Number(currentDate.getHours()) * 3600 +
													Number(currentDate.getMinutes()) * 60
										) {
											return;
										}
										if (
											range &&
											activeEndDate.toDateString() ===
												currentDate.toDateString() &&
											Number(time?.value) >
												Number(currentDate.getHours()) * 3600 +
													Number(currentDate.getMinutes()) * 60
										) {
											return;
										}
										return (
											<DropdownItemv2
												title={time?.label}
												value={time?.value}
												key={time?.value}
												className={classes(
													styles['dropdown-item'],
													time?.value === endTime ? styles.selected : ''
												)}
											/>
										);
									})}
								</Dropdownv2>
							</div>
						)}
						{!range && valueAsRange && (
							<div className={styles['fixed-selection']}>
								{[
									{
										label: '1 hour',
										value: 1,
									},
									{
										label: '2 hour',
										value: 2,
									},
									{
										label: '5 hour',
										value: 5,
									},
									{
										label: '8 hour',
										value: 8,
									},
									{
										label: '11 hour',
										value: 11,
									},
									{
										label: '14 hour',
										value: 14,
									},
									{
										label: '17 hour',
										value: 17,
									},
									{
										label: '20 hour',
										value: 20,
									},
									{
										label: '24 hour',
										value: 24,
									},
								]?.map((custom) => {
									return (
										<Button
											key={custom?.value}
											title={custom?.label}
											color='default'
											variant='outlined'
											className={classes(
												styles.custom,
												fixedTime === custom?.value ? styles.selected : ''
											)}
											onClick={() => {
												setFixedTime(custom?.value);
												const endUnix = getUnixTime(currentDate);
												const startUnix =
													Number(endUnix) - Number(custom.value) * 3600;
												setFixedTimeRange([startUnix, endUnix]);
											}}
										/>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</BaseModal>
		</ErrorBoundary>
	);
};

export default DatePicker;
