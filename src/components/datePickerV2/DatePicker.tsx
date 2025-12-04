import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { fromUnixTime, getUnixTime, subHours, subMinutes } from 'date-fns';
import { useEffect, useState, type ReactElement } from 'react';
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

interface SelectedDate {
	month?: string;
	year?: number;
	date?: number;
	unix?: number;
}

interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

interface TimeSelection {
	HOURS?: number;
	MINS?: number;
	MER?: string;
}

interface TimeRangeSelection {
	previous?: TimeSelection;
	next?: TimeSelection;
}

interface CustomRange {
	title: string;
	dateRange: {
		dates: string[];
		unix: number[];
	};
}

interface DatePickerProps {
	placeholder?: string;
	range?: boolean;
	value?: number | number[] | null;
	disabled?: boolean;
	className?: string;
	customRanges?: CustomRange[] | null;
	showCustomRanges?: boolean;
	custom?: boolean;
	highlightOnSelect?: boolean;
	limitHours?: number | null;
	timeRange?: boolean;
	onClear?: () => void;
	onApply?: (value: number | number[], fixedRange: string | null, tag?: string) => void;
	enableFutureDates?: boolean;
	maxRange?: number | null;
	disabledDates?: string[];
	disableDatesBefore?: number[];
	disableDatesAfter?: number[];
	defaultHourDiff?: number;
	valueAsRange?: boolean;
	startingYear?: number;
}

interface ApplyParams {
	rangeSelected: SelectedRange;
	dateSelected?: SelectedDate;
}

interface MaxRangeParams {
	maxRange: number;
	rangeSelected: SelectedRange;
}

const isMaxRangeExceeded = ({ maxRange, rangeSelected }: MaxRangeParams): boolean => {
	const firstUnix = rangeSelected.unix?.[0];
	const secondUnix = rangeSelected.unix?.[1];

	if (firstUnix === undefined || secondUnix === undefined) {
		return false;
	}

	const daysDifference = Math.abs(secondUnix - firstUnix) / 86400;
	return daysDifference > maxRange;
};

const DatePicker = (props: DatePickerProps): ReactElement => {
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
		disabledDates = [],
		disableDatesBefore = [],
		disableDatesAfter = [],
		defaultHourDiff,
		valueAsRange,
		startingYear = 1970,
	} = props;

	const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
	const [openCustomRange, setOpenCustomRange] = useState<boolean>(false);
	const [selectedCustomRange, setSelectedCustomRange] = useState<string>('');
	const [startTime, setStartTime] = useState<number>(0);
	const [endTime, setEndTime] = useState<number>(0);
	const [fixedTime, setFixedTime] = useState<number>(0);
	const [fixedTimeRange, setFixedTimeRange] = useState<number[]>([0, 0]);
	const [open, setOpen] = useState<boolean>(false);
	const toggle = (): void => {
		setOpen((prevState: boolean) => {
			return !prevState;
		});
	};

	const datePickerFloatingReference = useFloating(
		getFloatingReferences(openDatePicker, setOpenDatePicker)
	);

	const customRangeFloatingReference = useFloating(
		getFloatingReferences(openCustomRange, setOpenCustomRange)
	);

	useOutsideClickListener(() => {
		toggle();
		setOpenDatePicker(false);
	}, datePickerFloatingReference.refs.floating);

	useOutsideClickListener(() => {
		toggle();
		setOpenDatePicker(false);
	}, customRangeFloatingReference.refs.floating);

	const datePickerInteractionProps = useInteractions([
		useClick(datePickerFloatingReference.context, {
			enabled: !disabled,
		}),
		useDismiss(datePickerFloatingReference.context),
	]);

	const [selectedDate, setSelectedDate] = useState<SelectedDate>(() => {
		return {};
	});

	const [selectedRange, setSelectedRange] = useState<SelectedRange>(() => {
		return {
			dates: [],
			unix: [],
		};
	});

	const [fixedRange, setFixedRange] = useState<string | null>(() => {
		return null;
	});

	const [selectedMonth, setSelectedMonth] = useState<SelectedMonth | undefined>(undefined);
	const [displayMonthRight, setDisplayMonthRight] = useState<SelectedMonth | undefined>(
		undefined
	);
	const [timeRangeSelection, setTimeRangeSelection] = useState<TimeRangeSelection>({});

	const valueArray = Array.isArray(value) ? value : [value];
	const firstValue = valueArray[0];
	const date =
		range && firstValue !== null && firstValue !== undefined
			? fromUnixTime(firstValue)
			: value !== null && value !== undefined && !Array.isArray(value)
				? fromUnixTime(value)
				: new Date();
	const selectedDayInfo = getDayInfo(date);

	const selectedDateUnix = selectedDate.unix;
	const activeDate =
		selectedDateUnix !== undefined ? new Date(selectedDateUnix * 1000) : new Date();
	const selectedRangeUnixSecond = selectedRange.unix?.[1];
	const activeEndDate =
		selectedRangeUnixSecond !== undefined
			? new Date(selectedRangeUnixSecond * 1000)
			: new Date();
	const currentDate = new Date();

	const isRangePicker = range && Array.isArray(value) && value.filter(Boolean).length > 0;
	const isSinglePicker = !range && value !== null;

	const displayValue = getDatePickerDisplayValue({
		value,
		rangePicker: isRangePicker,
		singlePicker: isSinglePicker,
		timeRange,
		limitHours,
	});

	const activeDisplayValue =
		!range && value !== null
			? selectedDate.unix !== undefined
				? selectedDate.unix
				: value
			: selectedRange.unix !== undefined && selectedRange.unix.length > 0
				? selectedRange.unix
				: value;

	const activeDisplay = getDatePickerDisplayValue({
		value: activeDisplayValue,
		rangePicker: isRangePicker,
		singlePicker: isSinglePicker,
		timeRange,
		limitHours,
	});

	const apply = ({ rangeSelected }: ApplyParams): void => {
		if (fixedTime !== 0) {
			onApply?.(fixedTimeRange, fixedRange, getDateRangeTag(fixedTimeRange));
			setOpenDatePicker(false);
			setStartTime(0);
			setEndTime(0);
			setFixedTime(0);
			setFixedTimeRange([0, 0]);
			return;
		}
		if (rangeSelected.dates !== undefined && rangeSelected.dates.length === 2) {
			if (
				maxRange !== null &&
				maxRange !== undefined &&
				!isMaxRangeExceeded({
					maxRange,
					rangeSelected,
				})
			) {
				setOpenDatePicker(false);
				return;
			}

			const firstUnix = rangeSelected.unix?.[0];
			const secondUnix = rangeSelected.unix?.[1];

			if (firstUnix !== undefined && secondUnix !== undefined) {
				onApply?.(
					[
						Number(firstUnix) + Number(startTime),
						Number(secondUnix) - (86399 - Number(endTime)),
					],
					fixedRange,
					getDateRangeTag(rangeSelected.unix)
				);
			}
			setOpenDatePicker(false);
			setStartTime(0);
			setEndTime(0);
			setFixedTime(0);
			setFixedTimeRange([0, 0]);
		} else {
			if (valueAsRange) {
				if (selectedDate.unix !== undefined) {
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
			}
			const nextHours = timeRangeSelection.next?.HOURS;
			const nextMins = timeRangeSelection.next?.MINS;
			const nextMer = timeRangeSelection.next?.MER;

			if (
				selectedDate.year !== undefined &&
				selectedDate.date !== undefined &&
				nextHours !== undefined &&
				nextMins !== undefined
			) {
				const singleDateUnix = getUnixTime(
					new Date(
						selectedDate.year,
						selectedMonth?.monthAsNumber ?? 0,
						selectedDate.date,
						nextMer === 'PM' && nextHours < 12 ? nextHours + 12 : nextHours,
						nextMins
					)
				);
				onApply?.(singleDateUnix, fixedRange);
			}
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
		onApply: (): void => {
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
			defaultHourDiff !== undefined ? 0 : currentTime.minutes
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
	}, [
		selectedDate.unix,
		currentTime.hours,
		currentTime.minutes,
		currentTime.meridian,
		prevTime.hours,
		prevTime.minutes,
		prevTime.meridian,
	]);

	return (
		<ErrorBoundary
			FallbackComponent={(args): ReactElement => {
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
				onClick={(): void => {
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
							customRanges !== null ? styles['with-custom'] : '',
							displayValue ? styles.highlight : '',
							highlightOnSelect && value !== null ? styles.highlightOnSelect : ''
						)}
						{...datePickerInteractionProps.getReferenceProps()}>
						<div className={styles.left}>
							<CalenderIcon />

							{!displayValue && (
								<span className={styles.placeholder}>{placeholder}</span>
							)}

							{displayValue && <span className={styles.value}>{displayValue}</span>}
						</div>

						<input className={styles.input} value={displayValue ?? ''} readOnly />
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
								value={String(selectedMonth?.monthAsNumber ?? '')}
								onChange={(_: unknown, newMonth: unknown): void => {
									const monthNumber = Number(newMonth);
									if (
										!range &&
										selectedMonth?.year !== undefined &&
										selectedDate.date !== undefined
									) {
										const newSelectedData = new Date(
											selectedMonth.year,
											monthNumber,
											selectedDate.date
										);

										setSelectedDate({
											...selectedDate,
											month: getDayInfo(newSelectedData).month,
											unix: getUnixTime(
												newSelectedData.setHours(23, 59, 59, 59)
											),
										});
									}
									const fullMonthLabel = FULL_MONTHS_INDEX?.[monthNumber]?.label;
									const nextMonthIndex = monthNumber === 11 ? 0 : monthNumber + 1;
									const nextMonthLabel =
										FULL_MONTHS_INDEX?.[nextMonthIndex]?.label;

									setSelectedMonth({
										month: fullMonthLabel ?? '',
										monthAsNumber: monthNumber,
										year: selectedMonth?.year ?? new Date().getFullYear(),
									});
									setDisplayMonthRight({
										month: nextMonthLabel ?? '',
										monthAsNumber: nextMonthIndex,
										year:
											monthNumber === 11
												? (selectedMonth?.year ??
														new Date().getFullYear()) + 1
												: (selectedMonth?.year ?? new Date().getFullYear()),
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
								value={String(selectedMonth?.year ?? '')}
								onChange={(_: unknown, newYear: unknown): void => {
									const yearNumber = Number(newYear);
									setSelectedMonth({
										...selectedMonth,
										month: selectedMonth?.month ?? '',
										monthAsNumber: selectedMonth?.monthAsNumber ?? 0,
										year: yearNumber,
									});
									setDisplayMonthRight({
										...displayMonthRight,
										month: displayMonthRight?.month ?? '',
										monthAsNumber: displayMonthRight?.monthAsNumber ?? 0,
										year:
											(selectedMonth?.monthAsNumber ?? 0) === 11
												? yearNumber + 1
												: yearNumber,
									});
								}}>
								{Array.from(
									{
										length: selectedMonth
											? selectedMonth?.year - startingYear + 1
											: 0,
									},
									(_, i) => selectedMonth!.year - i
								)?.map((year) => {
									return (
										<DropdownItemv2
											title={String(year)}
											value={year}
											key={year}
											className={classes(
												styles['dropdown-item'],
												year === selectedMonth?.year ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							{showCustomRanges && range && (
								<Dropdownv2
									placeholder='Select Custom Time'
									value={selectedCustomRange}
									onChange={(_: unknown, customTime: unknown): void => {
										const customTimeStr = String(customTime);
										const [
											dateRangeStartLabel,
											dateRangeEndLabel,
											dateRangeStartUnix,
											dateRangeEndUnix,
											customType,
										] = customTimeStr.split(',');
										setSelectedRange({
											dates: [
												dateRangeStartLabel ?? '',
												dateRangeEndLabel ?? '',
											],
											unix: [
												Number(dateRangeStartUnix),
												Number(dateRangeEndUnix),
											],
										});
										setSelectedCustomRange(
											`${dateRangeStartLabel ?? ''},${dateRangeEndLabel ?? ''},${dateRangeStartUnix ?? ''},${dateRangeEndUnix ?? ''},${customType ?? ''}`
										);
										setStartTime(0);
										setEndTime(0);
										setFixedTime(0);
										setFixedTimeRange([0, 0]);
									}}
									className={styles.dropdown}>
									{dateRanges(customRanges ?? undefined)?.map(
										({ dateRange, title }) => {
											const firstDate = dateRange?.dates?.[0];
											const secondDate = dateRange?.dates?.[1];
											const firstUnix = dateRange?.unix?.[0];
											const secondUnix = dateRange?.unix?.[1];
											return (
												<DropdownItemv2
													title={title}
													value={`${firstDate ?? ''},${secondDate ?? ''},${firstUnix ?? ''},${secondUnix ?? ''},${title}`}
													key={title}
												/>
											);
										}
									)}
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
												value: fixedTimeRange[0],
												rangePicker: false,
												singlePicker: true,
												timeRange: false,
												limitHours: null,
											})} - ${getDatePickerDisplayValue({
												value: fixedTimeRange[1],
												rangePicker: false,
												singlePicker: true,
												timeRange: false,
												limitHours: null,
											})}`
								}
								disabled
							/>
						</div>
						<div className={styles.right}>
							<Button
								title='Cancel'
								variant='outlined'
								className={styles.cancel}
								onClick={(): void => {
									onClear?.();
									toggle();
								}}
							/>
							<Button
								title='Apply'
								color='primary'
								size='sm'
								className={styles.confirm}
								onClick={(): void => {
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
									value={String(startTime)}
									leftComponent={(): ReactElement => {
										return <ClockIcon className={classes(styles.icon)} />;
									}}
									onChange={(_: unknown, customTimeStart: unknown): void => {
										setFixedTime(0);
										setFixedTimeRange([]);
										setStartTime(Number(customTimeStart));
									}}
									className={styles.dropdown}>
									{timeRanges()?.map((time) => {
										const timeValue = time?.value;
										const timeLabel = time?.label;
										if (
											!range &&
											activeDate.toDateString() ===
												currentDate.toDateString() &&
											Number(timeValue) >
												Number(currentDate.getHours()) * 3600 +
													Number(currentDate.getMinutes()) * 60
										) {
											return null;
										}
										return (
											<DropdownItemv2
												title={timeLabel ?? ''}
												value={timeValue}
												key={timeValue}
												className={classes(
													styles['dropdown-item'],
													timeValue === startTime ? styles.selected : ''
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
												? `${String(currentDate.getHours())} : 0${String(currentDate.getMinutes())}`
												: `${String(currentDate.getHours())} : ${String(currentDate.getMinutes())}`
											: '23:59'
									}
									value={String(endTime)}
									leftComponent={(): ReactElement => {
										return <ClockIcon className={classes(styles.icon)} />;
									}}
									disabled={
										!range &&
										activeDate.toDateString() === currentDate.toDateString()
									}
									onChange={(_: unknown, customTimeEnd: unknown): void => {
										setFixedTime(0);
										setFixedTimeRange([]);
										setEndTime(Number(customTimeEnd));
									}}
									className={styles.dropdown}>
									{timeRanges()?.map((time) => {
										const timeValue = time?.value;
										const timeLabel = time?.label;
										if (!range && Number(timeValue) <= Number(startTime)) {
											return null;
										}
										if (
											!range &&
											activeDate.toDateString() ===
												currentDate.toDateString() &&
											Number(timeValue) >
												Number(currentDate.getHours()) * 3600 +
													Number(currentDate.getMinutes()) * 60
										) {
											return null;
										}
										if (
											range &&
											activeEndDate.toDateString() ===
												currentDate.toDateString() &&
											Number(timeValue) >
												Number(currentDate.getHours()) * 3600 +
													Number(currentDate.getMinutes()) * 60
										) {
											return null;
										}
										return (
											<DropdownItemv2
												title={timeLabel ?? ''}
												value={timeValue}
												key={timeValue}
												className={classes(
													styles['dropdown-item'],
													timeValue === endTime ? styles.selected : ''
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
									const customValue = custom.value;
									const customLabel = custom.label;
									return (
										<Button
											key={customValue}
											title={customLabel}
											variant='outlined'
											className={classes(
												styles.custom,
												fixedTime === customValue ? styles.selected : ''
											)}
											onClick={(): void => {
												setFixedTime(customValue);
												const endUnix = getUnixTime(currentDate);
												const startUnix =
													Number(endUnix) - Number(customValue) * 3600;
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
