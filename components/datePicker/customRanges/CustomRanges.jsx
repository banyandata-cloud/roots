import styles from './CustomRanges.module.css';
import { Button } from '../../buttons';
import { dateRanges } from './utils';
import { classes } from '../../../utils';

const CustomRanges = ({
	customRanges,
	selectedRange,
	setSelectedRange,
	setFixedRange,
	setOpenDatePicker,
	setOpenCustomRange,
}) => {
	const selectFixedDateRange = (dateRange, title) => {
		setSelectedRange(dateRange);
		setFixedRange(title);
		setOpenDatePicker(true);
		setOpenCustomRange(false);
	};

	return (
		<div className={styles.root}>
			{dateRanges(customRanges)?.map(({ dateRange, title }) => {
				const selectedFixedDateRange =
					dateRange.unix.toString() === selectedRange?.unix?.toString();
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
