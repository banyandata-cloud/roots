/* eslint-disable no-unsafe-optional-chaining */
import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { fromUnixTime, getUnixTime } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useOutsideClickListener } from '../../hooks';
import { classes, getDayInfo } from '../../utils';
import { Button } from '../buttons';
import { ErrorBoundaryWrapper } from '../errorBoundary';
import { CalenderIcon, CaretIcon, ClockIcon } from '../icons';
import { Popper } from '../popper';
import styles from './DatePicker.module.css';
import { Calender } from './calender';
import { DateAndTimeCustomRanges } from './customRanges';
import { CustomDateRanges } from './ranges';
import {
	calculateZeroHours,
	getDatePickerDisplayValue,
	getDateRangeTag,
	getFloatingReferences,
	isMaxRangeExceeded,
} from './utils';

interface MaxRange {
	value: number;
	type: 'months' | 'days';
}

interface CustomRange {
	title: string;
	type: string;
	value: number;
}

interface TimeSlot {
	HOURS?: number | undefined;
	MINS?: number | undefined;
	MER?: string | undefined;
}

interface TimeRangeSelection {
	next?: TimeSlot;
	previous?: TimeSlot;
}

interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
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

interface ApplyArgs {
	rangeSelected: SelectedRange;
	dateSelected?: SelectedDate;
}

interface DatePickerProps {
	placeholder?: string;
	label?: string;
	range?: boolean;
	onApply?: ((value: number | number[], fixedRange: string | null, tag: string) => void) | null;
	onClear?: () => void;
	value?: number | number[] | null;
	disabled?: boolean;
	disabledDates?: string[];
	maxRange?: MaxRange | null;
	className?: string;
	disableDatesBefore?: number[];
	disableDatesAfter?: number[];
	defaultRangeSelection?: number[] | null;
	customRanges?: CustomRange[] | null;
	custom?: boolean;
	highlightOnSelect?: boolean;
	valueAsRange?: boolean;
	defaultHourDiff?: number | null;
	limitHours?: number | null;
	showTime?: boolean;
	timeRange?: boolean;
	popperClassName?: string;
	showCustomRanges?: boolean;
	v2?: boolean;
	enableFutureDates?: boolean;
}

// Constants

const MONTH_NAMES: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const getDefaultSelectedMonth = (): SelectedMonth => {
	const now = new Date();
	return {
		month: MONTH_NAMES[now.getMonth()] ?? 'January',
		monthAsNumber: now.getMonth(),
		year: now.getFullYear(),
	};
};

const getDefaultTimeRangeSelection = (value: number, limitHours: number): TimeRangeSelection => {
	const sDate = fromUnixTime(value - 3600 * limitHours);
	const eDate = fromUnixTime(value);

	const startDateInfo = getDayInfo(sDate);
	const endDateInfo = getDayInfo(eDate);

	return {
		previous: {
			HOURS: startDateInfo.hours,
			MINS: startDateInfo.minutes,
			MER: 'AM',
		},
		next: {
			HOURS: endDateInfo.hours,
			MINS: endDateInfo.minutes,
			MER: endDateInfo.meridian,
		},
	};
};

// Component

const DatePicker = (props: DatePickerProps): React.JSX.Element => {
	const {
		placeholder,
		label,
		range,
		onApply,
		disabledDates,
		enableFutureDates,
		maxRange,
		value,
		disabled,
		className,
		disableDatesBefore,
		disableDatesAfter,
		onClear,
		customRanges,
		custom,
		highlightOnSelect,
		valueAsRange,
		defaultHourDiff,
		limitHours,
		showTime,
		timeRange,
		popperClassName,
		showCustomRanges,
	} = props;

	const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
	const [openCustomRange, setOpenCustomRange] = useState<boolean>(false);

	const [selectedRange, setSelectedRange] = useState<SelectedRange>(() => ({
		dates: [],
		unix: [],
	}));

	const [fixedRange, setFixedRange] = useState<string | null>(() => null);

	const [selectedDate, setSelectedDate] = useState<SelectedDate | string>(() => '');

	const [selectedMonth, setSelectedMonth] = useState<SelectedMonth>(() =>
		getDefaultSelectedMonth()
	);

	const [error, setError] = useState<string>(() => '');

	const [timeRangeSelection, setTimeRangeSelection] = useState<TimeRangeSelection>({});

	useEffect(() => {
		setTimeRangeSelection(() => {
			if (valueAsRange) {
				return getDefaultTimeRangeSelection(value as number, limitHours as number);
			}
			const selected = getDayInfo(fromUnixTime(value as number));
			return {
				previous: {
					HOURS: undefined,
					MINS: undefined,
					MER: 'AM',
				},
				next: {
					HOURS: value ? selected.hours : new Date().getHours(),
					MINS: value ? selected.minutes : new Date().getMinutes(),
					MER: value ? selected.meridian : new Date().getHours() >= 12 ? 'PM' : 'AM',
				},
			};
		});
	}, [selectedDate, value, limitHours]);

	const datePickerRef = useRef<HTMLDivElement>(null);

	const displayValue =
		value != null
			? getDatePickerDisplayValue({
					value,
					rangePicker: !!(range && (value as number[])?.filter?.(Boolean)?.length > 0),
					singlePicker: !!(!range && value),
					timeRange,
					limitHours: limitHours ?? undefined,
				})
			: '';

	const datePickerFloatingReference = useFloating(
		getFloatingReferences(openDatePicker, setOpenDatePicker)
	);

	const customRangeFloatingReference = useFloating(
		getFloatingReferences(openCustomRange, setOpenCustomRange)
	);

	const datePickerFloatingRef = useRef<HTMLElement | null>(null);
	const customRangeFloatingRef = useRef<HTMLElement | null>(null);

	const setDatePickerFloatingRef = (node: HTMLElement | null) => {
		datePickerFloatingRef.current = node;
		datePickerFloatingReference.floating(node);
	};

	const setCustomRangeFloatingRef = (node: HTMLElement | null) => {
		customRangeFloatingRef.current = node;
		customRangeFloatingReference.floating(node);
	};

	useOutsideClickListener(() => {
		return setOpenDatePicker(false);
	}, datePickerFloatingRef);

	useOutsideClickListener(() => {
		return setOpenDatePicker(false);
	}, customRangeFloatingRef);

	const datePickerInteractionProps = useInteractions([
		useClick(datePickerFloatingReference.context, {
			enabled: !disabled,
		}),
		useDismiss(datePickerFloatingReference.context),
	]);

	const customRangeInteractionProps = useInteractions([
		useClick(customRangeFloatingReference.context, {
			enabled: !disabled,
		}),
		useDismiss(customRangeFloatingReference.context),
	]);

	const apply = ({ rangeSelected }: ApplyArgs): void => {
		if (rangeSelected.dates?.length === 2) {
			if (
				maxRange != null &&
				!isMaxRangeExceeded({
					maxRange,
					selectedRange: rangeSelected,
				})
			) {
				setError('Invalid range of dates');
				setOpenDatePicker(false);
				return;
			}
			setError('');
			onApply?.(
				rangeSelected.unix ?? [],
				fixedRange,
				getDateRangeTag(rangeSelected.unix ?? [])
			);
			setOpenDatePicker(false);
		} else {
			if (valueAsRange) {
				const sd = selectedDate as SelectedDate;

				const fromUnix = getUnixTime(
					new Date(
						sd.year!,
						selectedMonth?.monthAsNumber,
						sd.date!,
						timeRangeSelection.previous?.MER === 'PM' &&
						(timeRangeSelection.previous?.HOURS ?? 0) < 12
							? (timeRangeSelection.previous?.HOURS ?? 0) + 12
							: calculateZeroHours(
									timeRangeSelection.previous?.HOURS ?? undefined,
									timeRangeSelection.previous?.MER
								),
						timeRangeSelection.previous?.MINS ?? undefined
					)
				);

				const toUnix = getUnixTime(
					new Date(
						sd.year!,
						selectedMonth?.monthAsNumber,
						sd.date!,
						timeRangeSelection.next?.MER === 'PM' &&
						(timeRangeSelection.next?.HOURS ?? 0) < 12
							? (timeRangeSelection.next?.HOURS ?? 0) + 12
							: calculateZeroHours(
									timeRangeSelection.next?.HOURS ?? undefined,
									timeRangeSelection.next?.MER
								),
						timeRangeSelection.next?.MINS ?? undefined
					)
				);
				onApply?.([fromUnix, toUnix], fixedRange, getDateRangeTag([fromUnix, toUnix]));
				setOpenDatePicker(false);
				return;
			}
			console.log(timeRangeSelection);
			const sd = selectedDate as SelectedDate;
			const singleDateUnix = getUnixTime(
				new Date(
					sd.year!,
					selectedMonth?.monthAsNumber,
					sd.date!,
					timeRangeSelection.next?.MER === 'PM' &&
					(timeRangeSelection.next?.HOURS ?? 0) < 12
						? (timeRangeSelection.next?.HOURS ?? 0) + 12
						: (timeRangeSelection.next?.HOURS ?? 0),
					timeRangeSelection.next?.MINS ?? undefined
				)
			);
			console.log({ selectedDate });
			onApply?.(singleDateUnix, fixedRange!, getDateRangeTag([singleDateUnix]));
			setOpenDatePicker(false);
		}
	};

	const calenderProps = {
		selectedDate: selectedDate as SelectedDate,
		setSelectedDate: (val: SelectedDate) => setSelectedDate(val),
		enableFutureDates: enableFutureDates ?? false,
		selectedRange,
		setSelectedRange: (val: SelectedRange) => setSelectedRange(val),
		...(fixedRange !== null ? { fixedRange: true } : {}),
		range: range ?? false,
		onApply: () => {
			apply({
				rangeSelected: selectedRange,
				dateSelected: selectedDate as SelectedDate,
			});
		},
		onClear: () => {
			onClear?.();
			setTimeRangeSelection({});
			setOpenDatePicker(false);
		},
		disabledDates: disabledDates ?? [],
		...(disableDatesBefore?.[0] !== undefined
			? { disableDatesBefore: disableDatesBefore[0] }
			: {}),
		...(disableDatesAfter?.[0] !== undefined
			? { disableDatesAfter: disableDatesAfter[0] }
			: {}),
		...(value !== undefined && value !== null ? { value } : {}),
		setFixedRange: (val: boolean) => setFixedRange(val ? fixedRange : null),
		...(customRanges ? { customRanges } : {}),
		timeRangeSelection,
		setTimeRangeSelection: (val: TimeRangeSelection) => setTimeRangeSelection(val),
		selectedMonth,
		setSelectedMonth: (val: SelectedMonth) => setSelectedMonth(val),
		...(defaultHourDiff !== null && defaultHourDiff !== undefined ? { defaultHourDiff } : {}),
		...(limitHours !== null && limitHours !== undefined ? { limitHours } : {}),
		showTime: showTime ?? true,
		valueAsRange: valueAsRange ?? false,
	};

	const customRangesProps = {
		customRanges: customRanges ?? undefined,
		selectedRange,
		setSelectedRange,
		setFixedRange,
		setOpenCustomRange,
		fixedRange,
		apply,
	};

	const hasCustomRanges = customRanges?.length && customRanges !== null;

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary'] ?? ''}
						custom={custom ?? false}
					/>
				);
			}}>
			<div className={classes(styles.root)} ref={datePickerRef}>
				{hasCustomRanges && !showCustomRanges && (
					<Button
						data-elem='custom-header'
						ref={customRangeFloatingReference.reference}
						leftComponent={() => {
							return <ClockIcon className={classes(styles.icon)} />;
						}}
						title={fixedRange || 'Custom'}
						className={classes(
							styles['custom-picker'],
							fixedRange ? styles.highlight : ''
						)}
						{...customRangeInteractionProps.getReferenceProps()}
					/>
				)}

				<div className={classes(styles['date-picker'], className)}>
					{label && !hasCustomRanges && (
						<span className={classes(styles.label)}>{label}</span>
					)}

					<div
						data-elem='header'
						ref={datePickerFloatingReference.reference}
						role='button'
						tabIndex={0}
						className={classes(
							styles.container,
							disabled ? styles.disabled : '',
							openDatePicker ? styles.open : '',
							error ? styles.error : '',
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

						<input className={styles.input} value={displayValue ?? ''} readOnly />
						<CaretIcon
							className={classes(styles.icon, openDatePicker ? styles.open : '')}
						/>
					</div>

					{error && <div className={styles['error-text']}>{error}</div>}

					<Popper open={openDatePicker} wrapperId='datePicker-popper'>
						{openDatePicker && (
							<motion.div
								{...datePickerInteractionProps.getFloatingProps({
									role: 'group',
									ref: setDatePickerFloatingRef,
									onKeyDown(event: React.KeyboardEvent) {
										if (event.key === 'Tab') {
											setOpenDatePicker(false);
										}
									},
									style: {
										position: datePickerFloatingReference.strategy,
										top: datePickerFloatingReference.y ?? 0,
										left: datePickerFloatingReference.x ?? 0,
									},
								})}
								initial={{ opacity: 0, scale: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className={classes(
									styles.popper,
									openDatePicker ? styles.open : '',
									popperClassName,
									showCustomRanges ? styles.ranges : ''
								)}>
								{showCustomRanges && <CustomDateRanges {...customRangesProps} />}
								<Calender {...calenderProps} />
							</motion.div>
						)}
					</Popper>

					<Popper open={openCustomRange} wrapperId='custom-range-popper'>
						{openCustomRange && (
							<div
								{...customRangeInteractionProps.getFloatingProps({
									role: 'group',
									ref: setCustomRangeFloatingRef,
									onKeyDown(event: React.KeyboardEvent) {
										if (event.key === 'Tab') {
											setOpenCustomRange(false);
										}
									},
									style: {
										position: customRangeFloatingReference.strategy,
										top: customRangeFloatingReference.y ?? 0,
										left: customRangeFloatingReference.x ?? 0,
									},
								})}
								className={classes(
									styles.popper,
									openCustomRange ? styles.open : ''
								)}>
								<DateAndTimeCustomRanges {...customRangesProps} />
							</div>
						)}
					</Popper>
				</div>
			</div>
		</ErrorBoundary>
	);
};

export default DatePicker;
