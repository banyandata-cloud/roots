import React from 'react';
import styles from './CustomRanges.module.css';
import { Button } from '../../buttons';
import { dateRanges } from './utils';
import { classes } from '../../../utils';
import type { CustomRangesProps, DateRange } from './types';

export type { CustomRangesProps };

const CustomRanges = ({
	customRanges,
	selectedRange,
	setSelectedRange,
	setFixedRange,
	setOpenCustomRange,
	apply,
}: CustomRangesProps): React.JSX.Element => {
	const selectFixedDateRange = (dateRange: DateRange, title: string): void => {
		setSelectedRange(dateRange);
		setFixedRange(title);
		apply({
			rangeSelected: dateRange,
		});
		setOpenCustomRange(false);
	};

	return (
		<div className={styles.root}>
			{dateRanges(customRanges)?.map(({ dateRange, title }) => {
				const selectedFixedDateRange =
					dateRange.unix.toString() === selectedRange?.unix?.toString();
				return (
					<Button
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
