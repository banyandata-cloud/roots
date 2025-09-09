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
	getFloatingReferences,
} from '../../components/datePicker/utils';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../../components/input';
import { BaseModal } from '../../components/modal';
import { FULL_MONTHS_INDEX } from '../../constants';
import { useOutsideClickListener } from '../../hooks';
import { classes, getDayInfo } from '../../utils';
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
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		defaultHourDiff,
		valueAsRange,
		startingYear = 1970,
	} = props;

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openCustomRange, setOpenCustomRange] = useState(false);
	const [open, setOpen] = useState(false);
	const toggle = () => {
		setOpen((prevState) => {
			return !prevState;
		});
	};

	const displayValue = getDatePickerDisplayValue({
		value,
		rangePicker: range && value?.filter?.(Boolean)?.length > 0,
		singlePicker: !range && value,
		timeRange,
		limitHours,
	});

	const datePickerFloatingReference = useFloating(
		getFloatingReferences(openDatePicker, setOpenDatePicker)
	);

	const customRangeFloatingReference = useFloating(
		getFloatingReferences(openCustomRange, setOpenCustomRange)
	);

	useOutsideClickListener(datePickerFloatingReference.floating, () => {
		console.log('CLICKED1');
		toggle();
		return setOpenDatePicker(false);
	});

	useOutsideClickListener(customRangeFloatingReference.floating, () => {
		console.log('CLICKED2');
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

	console.log({
		selectedDate,
	});

	const [fixedRange, setFixedRange] = useState(() => {
		return null;
	});

	const [selectedMonth, setSelectedMonth] = useState();
	const [displayMonthRight, setDisplayMonthRight] = useState();
	const [timeRangeSelection, setTimeRangeSelection] = useState({});

	const date = fromUnixTime(value);
	const selectedDayInfo = getDayInfo(date);

	const apply = ({ rangeSelected }) => {
		if (rangeSelected.dates?.length === 2) {
			if (
				maxRange !== null &&
				!isMaxRangeExceeded({
					maxRange,
					rangeSelected,
				})
			) {
				setError('Invalid range of dates');
				setOpenDatePicker(false);
				return;
			}
			setError('');
			onApply?.(rangeSelected.unix, fixedRange, getDateRangeTag(rangeSelected.unix));
			setOpenDatePicker(false);
		} else {
			if (valueAsRange) {
				const fromUnix = getUnixTime(
					new Date(
						selectedDate.year,
						selectedMonth?.monthAsNumber,
						selectedDate.date,
						timeRangeSelection.previous?.MER === 'PM' &&
						timeRangeSelection.previous?.HOURS < 12
							? timeRangeSelection.previous?.HOURS + 12
							: calculateZeroHours(
									timeRangeSelection.previous?.HOURS,
									timeRangeSelection.previous?.MER
								),

						timeRangeSelection.previous?.MINS
					)
				);

				const toUnix = getUnixTime(
					new Date(
						selectedDate.year,
						selectedMonth?.monthAsNumber,
						selectedDate.date,
						timeRangeSelection.next?.MER === 'PM' && timeRangeSelection.next?.HOURS < 12
							? timeRangeSelection.next?.HOURS + 12
							: calculateZeroHours(
									timeRangeSelection.next?.HOURS,
									timeRangeSelection.next?.MER
								),
						timeRangeSelection.next?.MINS
					)
				);
				onApply?.([fromUnix, toUnix], fixedRange, getDateRangeTag([fromUnix, toUnix]));
				setOpenDatePicker(false);
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
					console.log('CLICKED');
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
								className={styles.dropdown}>
								{FULL_MONTHS_INDEX?.map(({ value, label }) => {
									return (
										<DropdownItemv2
											title={label}
											value={value}
											key={value}
											className={classes(
												styles['dropdown-item'],
												value === selectedDayInfo.monthAsNumber
													? styles.selected
													: ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							<Dropdownv2 placeholder={selectedDayInfo.year}>
								{Array.from(
									{ length: selectedDayInfo.year - startingYear + 1 },
									(_, i) => selectedDayInfo.year - i
								)?.map((year) => {
									return (
										<DropdownItemv2
											title={year}
											value={year}
											key={year}
											className={classes(
												styles['dropdown-item'],
												year === selectedDayInfo.year ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							{showCustomRanges && (
								<Dropdownv2 placeholder='Last 24 hours' className={styles.dropdown}>
									{customRanges?.map((range) => {
										return (
											<DropdownItemv2
												title={range?.title}
												value={range?.value}
												key={range?.value}
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
								value={`Selected Date: ${displayValue}`}
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
								}}
							/>
						</div>
					</div>
				}
				className={styles.modal}
				open={open}
				hideCrossDismiss
				toggle={toggle}>
				<div className={styles.body}>
					<div className={styles.top}>
						<Calender {...calenderProps} />
					</div>
					<div className={styles.bottom}>
						<div className={styles['dropdown-selection']}>
							<Dropdownv2
								label='Start Time'
								placeholder='00:00'
								leftComponent={() => {
									return <ClockIcon className={classes(styles.icon)} />;
								}}
								className={styles.dropdown}>
								{['00:00', '00:30', '01:00', '01:30', '02:00']?.map((time) => {
									return (
										<DropdownItemv2
											title={time}
											value={time}
											key={time}
											className={classes(
												styles['dropdown-item'],
												time === '01:00' ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							<Dropdownv2
								label='End Time'
								placeholder='02:00'
								leftComponent={() => {
									return <ClockIcon className={classes(styles.icon)} />;
								}}
								className={styles.dropdown}>
								{['00:00', '00:30', '01:00', '01:30', '02:00']?.map((time) => {
									return (
										<DropdownItemv2
											title={time}
											value={time}
											key={time}
											className={classes(
												styles['dropdown-item'],
												time === '02:00' ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
						</div>
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
										className={styles.custom}
										// onClick={onCancel}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</BaseModal>
		</ErrorBoundary>
	);
};

export default DatePicker;
