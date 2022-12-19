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
import { CalenderIcon, ChevronIcon, CrossIcon } from '../icons';
import { Popper } from '../popper';
import styles from './DatePicker.module.css';
import { isMaxRangeExceeded } from './utils';
import { MONTHS } from '../../constants';

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

		disableDatesBefore,
		value,
	};

	return (
		<div className={classes(styles.root, className)} ref={datePickerRef}>
			{label && <span className={classes(styles.label, styles[theme])}>{label}</span>}
			<div
				data-elem='header'
				ref={reference}
				className={classes(
					styles.container,
					disabled ? styles.disabled : '',
					open ? styles.open : '',
					error ? styles.error : '',
					styles[theme]
				)}
				{...getReferenceProps()}>
				<div>
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
					<div
						onClick={(event) => {
							event.stopPropagation();
							onClear();
						}}>
						<CrossIcon className={classes(styles.icon, styles[theme])} />
					</div>
				) : (
					<ChevronIcon
						className={classes(styles.icon, styles[theme])}
						position={open ? 'bottom' : 'top'}
					/>
				)}
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
	onClear: PropTypes.func,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	disabledDates: PropTypes.arrayOf(PropTypes.string),
	maxRange: PropTypes.shape({
		value: PropTypes.number,
		type: PropTypes.string,
	}),
	className: PropTypes.string,
	disableDatesBefore: PropTypes.arrayOf(PropTypes.string),
	theme: PropTypes.string,
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
	theme: 'dark',
	onClear: () => {},
};

export default DatePicker;
