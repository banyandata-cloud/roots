/* eslint-disable no-unsafe-optional-chaining */
import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { fromUnixTime, getUnixTime } from 'date-fns';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useOutsideClickListener } from '../../hooks';
import { classes, getDayInfo } from '../../utils';
import { Button } from '../buttons';
import { DatePickerV2 } from '../datePickerV2';
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

const getDefaultTimeRangeSelection = (value, limitHours) => {
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

const DatePicker = (props) => {
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
		valueAsRange, // only for single Date Picker,
		defaultHourDiff,
		limitHours,
		showTime,
		timeRange,
		popperClassName,
		showCustomRanges,
		v2,
	} = props;

	if (v2) {
		return <DatePickerV2 {...props} />;
	}

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openCustomRange, setOpenCustomRange] = useState(false);

	const [selectedRange, setSelectedRange] = useState(() => {
		return {
			dates: [],
			unix: [],
		};
	});

	const [fixedRange, setFixedRange] = useState(() => {
		return null;
	});

	const [selectedDate, setSelectedDate] = useState(() => {
		return '';
	});

	const [selectedMonth, setSelectedMonth] = useState();

	const [error, setError] = useState(() => {
		return '';
	});

	const [timeRangeSelection, setTimeRangeSelection] = useState({});

	useEffect(() => {
		setTimeRangeSelection(() => {
			return getDefaultTimeRangeSelection(value, limitHours);
		});
	}, [selectedDate]);

	const datePickerRef = useRef();

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

	useOutsideClickListener(() => {
		return setOpenDatePicker(false);
	}, datePickerFloatingReference.floating);

	useOutsideClickListener(() => {
		return setOpenDatePicker(false);
	}, customRangeFloatingReference.floating);

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
		onClear: () => {
			onClear();
			setTimeRangeSelection({});
			setOpenDatePicker(false);
		},
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		value,
		setFixedRange,
		customRanges,
		timeRangeSelection,
		setTimeRangeSelection,
		selectedMonth,
		setSelectedMonth,
		defaultHourDiff,
		limitHours,
		showTime,
		valueAsRange,
	};

	const customRangesProps = {
		customRanges,
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
						className={styles['error-boundary']}
						custom={custom}
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

						<input className={styles.input} value={displayValue} />
						<CaretIcon
							className={classes(
								styles.icon,

								openDatePicker ? styles.open : ''
							)}
						/>
					</div>

					{error && <div className={styles['error-text']}>{error}</div>}

					<Popper open={openDatePicker} wrapperId='datePicker-popper'>
						{openDatePicker && (
							<motion.div
								{...datePickerInteractionProps.getFloatingProps({
									role: 'group',
									ref: datePickerFloatingReference.floating,
									onKeyDown(event) {
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
								initial={{
									opacity: 0,
									scale: 0,
								}}
								animate={{
									scale: 1,
									opacity: 1,
								}}
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
									ref: customRangeFloatingReference.floating,
									onKeyDown(event) {
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

DatePicker.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	range: PropTypes.bool,
	onApply: PropTypes.func,
	onClear: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
	disabled: PropTypes.bool,
	disabledDates: PropTypes.arrayOf(PropTypes.string),
	maxRange: PropTypes.shape({
		value: PropTypes.number,
		type: PropTypes.string,
	}),
	className: PropTypes.string,
	disableDatesBefore: PropTypes.arrayOf(PropTypes.number),
	disableDatesAfter: PropTypes.arrayOf(PropTypes.number),
	defaultRangeSelection: PropTypes.arrayOf(PropTypes.number),
	customRanges: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			type: PropTypes.string,
			value: PropTypes.string,
		})
	),
	valueAsRange: PropTypes.bool, // only for single Date Picker,
	defaultHourDiff: PropTypes.number,
	limitHours: PropTypes.number,
	showTime: PropTypes.bool,
	v2: PropTypes.bool,
	enableFutureDates: PropTypes.bool,
};

DatePicker.defaultProps = {
	placeholder: '',
	label: '',
	range: false,
	onApply: null,
	disabled: false,
	disabledDates: [],
	maxRange: null,
	value: null,
	className: '',
	disableDatesBefore: [],
	customRanges: null,
	defaultRangeSelection: null,
	onClear: () => {},
	valueAsRange: false,
	defaultHourDiff: null,
	limitHours: null,
	showTime: true,
	enableFutureDates: false,
	v2: false,
};

export default DatePicker;
