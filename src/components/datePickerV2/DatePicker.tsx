/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import { getDatePickerDisplayValue } from 'components/datePicker/utils';
import { CalenderIcon } from 'components/icons';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { classes } from '../../utils';
import { ErrorBoundaryWrapper } from '../errorBoundary';
import styles from './DatePicker.module.css';

const DatePicker = ({
	placeholder = '',
	label = '',
	range = false,
	onApply = null,
	disabledDates = [''],
	enableFutureDates = false,
	maxRange = null,
	value = null,
	disabled = false,
	className = '',
	disableDatesBefore = [''],
	disableDatesAfter = [''],
	onClear = () => {
		return null;
	},
	customRanges = null,
	custom = null,
	// highlightOnSelect,
	// valueAsRange, // only for single Date Picker,
	// defaultHourDiff,
	limitHours = null,
	showTime = false,
	timeRange = [],
	popperClassName = '',
	showCustomRanges = false,
}) => {
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openCustomRange, setOpenCustomRange] = useState(false);

	const displayValue = getDatePickerDisplayValue({
		value,
		rangePicker: range && value?.filter?.(Boolean)?.length > 0,
		singlePicker: !range && value,
		timeRange,
		limitHours,
	}) as string;

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
			<div className={classes(styles.root)}>
				<div className={classes(styles['date-picker'], className)}>
					<div
						data-elem='header'
						role='button'
						tabIndex={0}
						className={classes(
							styles.container,
							disabled ? styles.disabled : '',
							openDatePicker ? styles.open : '',
							displayValue ? styles.highlight : ''
							// highlightOnSelect && value ? styles.highlightOnSelect : ''
						)}>
						<div className={styles.left}>
							<CalenderIcon />

							{!displayValue && (
								<span className={styles.placeholder}>{placeholder}</span>
							)}

							{displayValue && <span className={styles.value}>{displayValue}</span>}
						</div>

						<input className={styles.input} value={displayValue} />
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
};

export default DatePicker;
