/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
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
	// timeRange,
	popperClassName = '',
	showCustomRanges = false,
}) => {
	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openCustomRange, setOpenCustomRange] = useState(false);

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
			<div className={classes(styles.root)}>Date</div>
		</ErrorBoundary>
	);
};

export default DatePicker;
