import React from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import styles from './Ranges.module.css';
import { dateRanges } from './utils';

interface DateRange {
	dates: string[];
	unix: number[];
}

interface CustomRange {
	title: string;
	type: string;
	value: number;
}

interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

interface CustomRangesProps {
	customRanges?: CustomRange[] | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedRange: (range: DateRange) => void;
	setFixedRange: (title: string) => void;
}

const CustomRanges = ({
	customRanges,
	selectedRange,
	setSelectedRange,
	setFixedRange,
}: CustomRangesProps): React.JSX.Element => {
	const selectFixedDateRange = (dateRange: DateRange, title: string): void => {
		setSelectedRange(dateRange);
		setFixedRange(title);
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
