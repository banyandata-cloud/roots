import React from 'react';
import { classes, getDayInfo } from '../../../utils';
import { Button } from '../../buttons';
import type { CustomRange, SelectedRange, TimeRangeSelection } from '../calender/types';
import styles from './Ranges.module.css';
import { dateRanges } from './utils';
import type { DateUnixRange } from './utils';

export interface CustomRangesProps {
	customRanges?: CustomRange[] | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedRange: (range: SelectedRange) => void;
	setFixedRange: (title: string) => void;
	fixedRange?: string | null | undefined;
	timeRange?: boolean | undefined;
	setTimeRangeSelection?: ((value: TimeRangeSelection) => void) | undefined;
	setIsDefaultRangeUntouched?: ((value: boolean) => void) | undefined;
}

const CustomRanges = ({
	customRanges,
	setSelectedRange,
	setFixedRange,
	fixedRange,
	timeRange,
	setTimeRangeSelection,
	setIsDefaultRangeUntouched,
}: CustomRangesProps): React.JSX.Element => {
	const selectFixedDateRange = (dateRange: DateUnixRange, title: string): void => {
		setSelectedRange(dateRange as unknown as SelectedRange);
		setFixedRange(title);
		setIsDefaultRangeUntouched?.(false);

		if (timeRange && setTimeRangeSelection) {
			const [startDate, endDate] = dateRange.dates;
			if (startDate && endDate) {
				const startInfo = getDayInfo(startDate);
				const endInfo = getDayInfo(endDate);
				setTimeRangeSelection({
					previous: {
						HOURS: startInfo.hours,
						MINS: startInfo.minutes,
						MER: startInfo.meridian,
					},
					next: { HOURS: endInfo.hours, MINS: endInfo.minutes, MER: endInfo.meridian },
				});
			}
		}
	};

	return (
		<div className={styles.root}>
			{dateRanges(customRanges, timeRange)?.map(({ dateRange, title }) => {
				const selectedFixedDateRange = fixedRange === title;

				return (
					<Button
						size='auto'
						key={title}
						onClick={() => {
							selectFixedDateRange(dateRange, title);
						}}
						className={classes(
							styles.option,
							selectedFixedDateRange ? styles.selected : ''
						)}
						title={title}
					/>
				);
			})}
		</div>
	);
};

export default CustomRanges;
