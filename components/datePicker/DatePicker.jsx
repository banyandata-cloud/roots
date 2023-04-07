import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	useFloating,
	useInteractions,
	useDismiss,
	useClick,
} from '@floating-ui/react-dom-interactions';
import { useOutsideClickListener } from '../../hooks';
import { classes } from '../../utils';
import { Calender } from './calender';
import { CalenderIcon, ChevronIcon, ClockIcon, CrossIcon } from '../icons';
import { Popper } from '../popper';
import styles from './DatePicker.module.css';
import {
	getDatePickerDisplayValue,
	getDateRangeTag,
	isMaxRangeExceeded,
	getFloatingReferences,
} from './utils';
import { Button } from '../buttons';
import { DateAndTimeCustomRanges } from './customRanges';

const DatePicker = (props) => {
	const {
		placeholder,
		label,
		range,
		onApply,
		disabledDates,
		maxRange,
		value,
		disabled,
		className,
		disableDatesBefore,
		theme,
		onClear,
		customRanges,
	} = props;

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

	const [error, setError] = useState(() => {
		return '';
	});

	const datePickerRef = useRef();

	const displayValue = getDatePickerDisplayValue({
		value,
		rangePicker: range && value?.filter(Boolean)?.length > 0,
		singlePicker: !range && value,
	});

	const datePickerFloatingReference = useFloating(
		getFloatingReferences(openDatePicker, setOpenDatePicker)
	);

	const customRangeFloatingReference = useFloating(
		getFloatingReferences(openCustomRange, setOpenCustomRange)
	);

	useOutsideClickListener(datePickerFloatingReference.floating, () => {
		return setOpenDatePicker(false);
	});

	useOutsideClickListener(customRangeFloatingReference.floating, () => {
		return setOpenDatePicker(false);
	});

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

	const apply = () => {
		if (selectedRange.dates?.length === 2) {
			if (
				maxRange !== null &&
				!isMaxRangeExceeded({
					maxRange,
					selectedRange,
				})
			) {
				setError('Invalid range of dates');
				setOpenDatePicker(false);
				return;
			}
			setError('');
			onApply(selectedRange.unix, fixedRange, getDateRangeTag(selectedRange.unix));
			setOpenDatePicker(false);
		} else {
			onApply(selectedDate.unix);
			setOpenDatePicker(false);
		}
	};

	const calenderProps = {
		selectedDate,
		setSelectedDate,
		selectedRange,
		setSelectedRange,
		fixedRange,
		range,
		onApply: () => {
			apply();
		},
		disabledDates,

		disableDatesBefore,
		value,
		setFixedRange,
		customRanges,
	};

	const hasCustomRanges = customRanges?.length && customRanges !== null;

	return (
		<div className={classes(styles.root)} ref={datePickerRef}>
			{hasCustomRanges && (
				<Button
					data-elem='custom-header'
					ref={customRangeFloatingReference.reference}
					leftComponent={() => {
						return <ClockIcon className={classes(styles.icon, styles[theme])} />;
					}}
					title={fixedRange || 'Custom'}
					className={styles['custom-picker']}
					{...customRangeInteractionProps.getReferenceProps()}
				/>
			)}
			<div className={classes(styles['date-picker'], className, styles[theme])}>
				{label && !hasCustomRanges && (
					<span className={classes(styles.label, styles[theme])}>{label}</span>
				)}
				<div
					data-elem='header'
					ref={datePickerFloatingReference.reference}
					role='button'
					className={classes(
						styles.container,
						disabled ? styles.disabled : '',
						openDatePicker ? styles.open : '',
						error ? styles.error : '',
						customRanges ? styles['with-custom'] : '',
						styles[theme]
					)}
					{...datePickerInteractionProps.getReferenceProps()}>
					<div className={styles.left}>
						<CalenderIcon className={classes(styles.icon, styles[theme])} />
						{!displayValue && (
							<span className={classes(styles.placeholder, styles[theme])}>
								{placeholder}
							</span>
						)}
						{displayValue && (
							<div className={classes(styles.value, styles[theme])}>
								<span>{displayValue}</span>
							</div>
						)}
					</div>

					<input className={styles.input} value={displayValue} />
					{value ? (
						<Button
							size='auto'
							variant='text'
							data-elem='close'
							className={styles.close}
							onClick={(event) => {
								event.stopPropagation();
								onClear();
							}}
							rightComponent={() => {
								return (
									<CrossIcon className={classes(styles.icon, styles[theme])} />
								);
							}}
						/>
					) : (
						<ChevronIcon
							className={classes(styles.icon, styles[theme])}
							position={openDatePicker ? 'bottom' : 'top'}
						/>
					)}
				</div>
				{error && <div className={styles['error-text']}>{error}</div>}
				<Popper open={openDatePicker} wrapperid='datePicker-popper'>
					{openDatePicker && (
						<div
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
							className={classes(styles.popper, openDatePicker ? styles.open : '')}>
							<Calender {...calenderProps} />
						</div>
					)}
				</Popper>
				<Popper open={openCustomRange} wrapperid='custom-range-popper'>
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
							className={classes(styles.popper, openCustomRange ? styles.open : '')}>
							<DateAndTimeCustomRanges
								customRanges={customRanges}
								selectedRange={selectedRange}
								setSelectedRange={setSelectedRange}
								setFixedRange={setFixedRange}
								setOpenDatePicker={setOpenDatePicker}
								setOpenCustomRange={setOpenCustomRange}
								fixedRange={fixedRange}
							/>
						</div>
					)}
				</Popper>
			</div>
		</div>
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
	disableDatesBefore: PropTypes.arrayOf(PropTypes.string),
	theme: PropTypes.string,
	defaultRangeSelection: PropTypes.arrayOf(PropTypes.number),
	customRanges: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			type: PropTypes.string,
			value: PropTypes.string,
		})
	),
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
	theme: 'light',
	customRanges: null,
	defaultRangeSelection: null,
	onClear: () => {},
};

export default DatePicker;
