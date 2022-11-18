import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	useFloating,
	useInteractions,
	useDismiss,
	offset,
	flip,
	size,
	autoUpdate,
	useClick,
	shift,
} from '@floating-ui/react-dom-interactions';
import { fromUnixTime } from 'date-fns';
import { useOutsideClickListener } from '../../hooks';
import { classes } from '../../utils';
import { Calender } from './calender';
import { CalenderIcon, ChevronIcon } from '../icons';
import { Popper } from '../popper';
import styles from './DatePicker.module.css';
import { isMaxRangeExceeded } from './utils';
import { MONTHS } from '../../constants';

const DatePicker = (props) => {
	// eslint-disable-next-line object-curly-newline
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
		disableDatesAfter,
		disableDatesBefore,
	} = props;

	const [open, setOpen] = useState(false);

	const [selectedRange, setSelectedRange] = useState(() => {
		return {
			dates: [],
			unix: [],
		};
	});

	const [selectedDate, setSelectedDate] = useState(() => {
		return '';
	});

	const [error, setError] = useState(() => {
		return '';
	});

	const datePickerRef = useRef();

	const sDate = fromUnixTime(value);

	let displayValue = '';

	if (!range && value) {
		displayValue = ` ${sDate.getDate()} ${
			MONTHS[sDate.getMonth().toString()?.substring(0, 3)]
		} ${sDate.getFullYear()}`;
	}

	const { x, y, reference, floating, strategy, context } = useFloating({
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			size({
				apply({ rects, availableHeight, elements }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
						minWidth: 'fit-content',
						maxHeight: `${availableHeight}px`,
					});
				},
				padding: 8,
			}),
			offset(5),
			flip({
				padding: 8,
			}),
			shift({
				padding: 8,
			}),
		],
	});

	useOutsideClickListener(floating, () => {
		return setOpen(false);
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context, {
			enabled: !disabled,
		}),
		useDismiss(context),
	]);

	const apply = () => {
		if (selectedRange.dates.length === 2) {
			if (
				!isMaxRangeExceeded({
					maxRange,
					selectedRange,
				})
			) {
				setError('Invalid range of dates');
				setOpen(false);
				return;
			}
			setError('');
			onApply(selectedRange.unix);
			setOpen(false);
		} else {
			onApply(selectedDate.unix);
			setOpen(false);
		}
	};

	const calenderProps = {
		selectedDate,
		setSelectedDate,
		selectedRange,
		setSelectedRange,
		range,
		onApply: () => {
			apply();
		},
		disabledDates,
		disableDatesAfter,
		disableDatesBefore,
	};

	return (
		<div className={classes(styles.root, className)} ref={datePickerRef}>
			{label && <span className={styles.label}>{label}</span>}
			<div
				data-elem='header'
				ref={reference}
				className={classes(
					styles.container,
					disabled ? styles.disabled : '',
					open ? styles.open : '',
					error ? styles.error : ''
				)}
				{...getReferenceProps()}>
				<div>
					<CalenderIcon />
					{!displayValue && <span className={styles.placeholder}>{placeholder}</span>}
					{displayValue && (
						<span className={styles.value}>
							Selected Date: <span>{displayValue}</span>
						</span>
					)}
				</div>

				<input className={styles.input} value={displayValue} />
				<ChevronIcon className={classes(styles.icon)} position={open ? 'bottom' : 'top'} />
			</div>
			{error && <div className={styles['error-text']}>{error}</div>}
			<Popper open={open} wrapperid='datePicker-popper'>
				{open && (
					<div
						{...getFloatingProps({
							role: 'group',
							ref: floating,
							onKeyDown(event) {
								if (event.key === 'Tab') {
									setOpen(false);
								}
							},
							style: {
								position: strategy,
								top: y ?? 0,
								left: x ?? 0,
							},
						})}
						className={classes(styles.popper, open ? styles.open : '')}>
						<Calender {...calenderProps} />
					</div>
				)}
			</Popper>
		</div>
	);
};

DatePicker.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	range: PropTypes.bool,
	onApply: PropTypes.func,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	disabledDates: PropTypes.arrayOf(PropTypes.string),
	maxRange: PropTypes.shape({
		value: PropTypes.number,
		type: PropTypes.string,
	}),
	className: PropTypes.string,
	disableDatesBefore: PropTypes.arrayOf(PropTypes.string),
	disableDatesAfter: PropTypes.arrayOf(PropTypes.string),
};

DatePicker.defaultProps = {
	placeholder: '',
	label: '',
	range: false,
	onApply: null,
	disabled: false,
	disabledDates: [],
	maxRange: null,
	value: '',
	className: '',
	disableDatesBefore: [],
	disableDatesAfter: [],
};

export default DatePicker;
